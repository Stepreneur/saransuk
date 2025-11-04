//recently added please make sure this route work well with the booking calendar
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
  export async function POST(req) {
      const {v4:uuidv4} = require('uuid');
      const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    // อ่านข้อมูลจาก body (ต้อง await)
    const { user, product, booking, returnUrl } = await req.json();

    const order_id = uuidv4();

    try{
      const session  = await stripe.checkout.sessions.create({
        payment_method_types: ['card','promptpay'],
        mode: 'payment',
        line_items: [
          {
            price_data: {
              currency: 'thb',
              product_data: {
                name: product.name
              },
              unit_amount: product.price * 100,
            },
            quantity: product.quantity,
          }
        ],
        success_url: `${(returnUrl || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000')}${(returnUrl && !returnUrl.includes('?')) ? '' : ''}?checkout_result=success&order_id=${order_id}`,
        cancel_url: `${(returnUrl || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000')}${(returnUrl && !returnUrl.includes('?')) ? '' : ''}?checkout_result=cancel&order_id=${order_id}`,
        metadata: {
          // booking metadata used by webhook to create Booking
          slot: booking?.slot || '',
          duration: String(booking?.duration || ''),
          massageType: booking?.massageType || '',
          name: booking?.name || user?.fullname || '',
          email: booking?.email || '',
          phone: booking?.phone || '',
          order_id,
        }
      });

      console.log("Checkout Session:", session?.id);
      try {
        await prisma.paymentTransaction.create({
          data: {
            fullname: user.fullname,
            address: user.address,
            order_id,
            session_id: session.id,
            status: 'open'
          }
        });
      } catch (dbErr) {
        console.error('Failed to persist payment transaction (non-fatal):', dbErr);
        // do not throw; allow client to proceed with embedded checkout
      }

      return Response.json({
        success: true,
        order_id,
        session_id: session.id,
        client_secret: session.client_secret,
        url: session.url,
      });
    }catch(error){
      console.error("Error creating Stripe Checkout Session:", error);
      return Response.json({ success: false, message: 'Failed to create session' }, { status: 500 });
    }
  }
