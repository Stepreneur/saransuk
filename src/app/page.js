'use client';
import Link from "next/link";
import { useState, useRef, useEffect } from 'react';
import Benefit from '@/components/Benefit/page';
import Navbar from '@/components/Navbar/page';
import Image from 'next/image';
import { ArrowRightIcon, ChevronsDown, CircleChevronDown, Flower, Rose, Star, X, ChevronDown, ChevronUp, CalendarCheck, PersonStanding, Facebook } from 'lucide-react';
export default function Home() {
  const [activeCard, setActiveCard] = useState(0);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviewerName, setReviewerName] = useState('');
  const [openFAQ, setOpenFAQ] = useState(null);
  const scrollContainerRef = useRef(null);
  const cards = [
    {
      title: "ปล่อยวางความเหนื่อยล้า",
      description: "หลังจากวันที่ยาวนาน แค่ได้เอนกายให้นักนวดมืออาชีพดูแล คุณจะรู้สึกเบาสบาย ความเครียดเหมือนถูกละลายไป เหลือไว้แค่ความสงบในใจ"
    },
    {
      title: "บอกลาอาการปวดเมื่อย",
      description: "ไม่ว่าจะปวดคอ บ่า ไหล่ หรือล้าจากการทำงาน การนวดช่วยคลายกล้ามเนื้อที่ตึงแน่น ทำให้ร่างกายกลับมาสดชื่น เคลื่อนไหวได้อย่างสบายเหมือนเดิม"
    },
    {
      title: "ปล่อยวางความเหนื่อยล้า",
      description: "หลังจากวันที่ยาวนาน แค่ได้เอนกายให้นักนวดมืออาชีพดูแล คุณจะรู้สึกเบาสบาย ความเครียดเหมือนถูกละลายไป เหลือไว้แค่ความสงบในใจ"
    },
    {
      title: "ปล่อยวางความเหนื่อยล้า",
      description: "หลังจากวันที่ยาวนาน แค่ได้เอนกายให้นักนวดมืออาชีพดูแล คุณจะรู้สึกเบาสบาย ความเครียดเหมือนถูกละลายไป เหลือไว้แค่ความสงบในใจ"
    },
  ];

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const children = Array.from(container.children);
      
      // Find which card is most visible
      let bestCard = 0;
      let bestVisibility = 0;
      
      children.forEach((child, index) => {
        const rect = child.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        
        // Calculate how much of the card is visible
        const visibleLeft = Math.max(rect.left, containerRect.left);
        const visibleRight = Math.min(rect.right, containerRect.right);
        const visibleWidth = Math.max(0, visibleRight - visibleLeft);
        const visibility = visibleWidth / rect.width;
        
        if (visibility > bestVisibility) {
          bestVisibility = visibility;
          bestCard = index;
        }
      });
      
      setActiveCard(bestCard);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmitReview = () => {
    if (rating === 0) {
      alert('กรุณาให้คะแนนดาว');
      return;
    }
    if (!reviewText.trim()) {
      alert('กรุณาเขียนรีวิว');
      return;
    }
    if (!reviewerName.trim()) {
      alert('กรุณาใส่ชื่อ');
      return;
    }
    
    // Here you would typically send the review to your backend
    console.log('Review submitted:', { rating, reviewText, reviewerName });
    
    // Reset form and close modal
    setRating(0);
    setReviewText('');
    setReviewerName('');
    setShowReviewModal(false);
    alert('ขอบคุณสำหรับรีวิว!');
  };

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <>
      {/* SEO Meta Tags */}
      <head>
        <title>สลาลันสุข - ร้านนวดไทยแท้ เพื่อสุขภาพและความผ่อนคลาย</title>
        <meta name="description" content="ร้านนวดไทยแท้ บริการนวดไทย นวดเท้า นวดสมุนไพร บรรยากาศผ่อนคลาย ดนตรีบำบัด ช่างนวดผู้เชี่ยวชาญ ราคาเริ่มต้น 250 บาท" />
        <meta name="keywords" content="นวดไทย, นวดเท้า, นวดสมุนไพร, บรรยากาศผ่อนคลาย, ดนตรีบำบัด, ช่างนวด, สุขภาพ, ผ่อนคลาย, กรุงเทพฯ" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="สลาลันสุข - ร้านนวดไทยแท้" />
        <meta property="og:description" content="บริการนวดไทยแท้ บรรยากาศผ่อนคลาย ดนตรีบำบัด ช่างนวดผู้เชี่ยวชาญ" />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://salaansuk.com" />
      </head>
      
      <div className="min-h-screen bg-white flex flex-col gap-0 overflow-x-hidden">
        {/* Navigation */}
        <Navbar />
        
        {/* Main Content */}
        <main>
          {/* Hero Section */}
          <header className="bg-black py-20 h-screen flex items-center  justify-center relative">
            <Image src="/hero.webp" width={1000} height={1000} className="absolute top-0 left-0 w-full h-full object-cover z-1 opacity-50" alt="ภาพพื้นหลังร้านนวด" />
            <div className=" z-2 px-4 sm:px-6 lg:px-8">
              <div className="text-center lg:pb-[50px] lg:gap-5 flex flex-col items-center justify-center ">
                <h1 className=" lg:text-6xl
                text-4xl  font-extrabold text-white mb-6 tracking-wide " style={{ textShadow: "16px 16px 64px rgba(0,0,0,2)" }}>
                คลายเมื่อย คลายเครียด
                </h1>
                <p className=" lg:text-4xl lg:font-normal lg:leading-relaxed
                text-xl  mb-8  mx-auto text-white " style={{ textShadow: "16px 16px 64px rgba(0,0,0,2)" }}>
                สัมผัสศิลปะแห่งการนวดไทย ท่ามกลางบรรยากาศแสนผ่อนคลาย <br /> <span>ดนตรีบำบัด และช่างนวดผู้เชี่ยวชาญ</span></p>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                  <button className="lg:w-[210px] lg:h-[70px] lg:rounded-xl
                  bg-[#9f0600] flex transition-colors items-center justify-center shadow-lg text-white tracking-wide w-[200px] py-3 rounded-lg text-lg font-semibold group">
                    <span className=" lg:text-[22px] flex items-center gap-2">
                      จองคิวเลย 
                      <ArrowRightIcon className="lg:h-6 lg:w-6 lg:group-hover:translate-x-5
                      h-4 w-4 transition-transform duration-300  inline-block group-hover:translate-x-2" />
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <ChevronsDown className='absolute bottom-10 left-[50%] translate-x-[-50%] w-10 h-10 animate-bounce text-white' />
          </header>

          {/* Services Section */}
          <section id="services" className="py-20 bg-white " aria-labelledby="services-heading">
            <div className=" mx-auto px-4 sm:px-6 lg:px-8 lg:w-screen">
                    <h2 className="text-center text-2xl font-bold !text-[#9f0600] mb-7">
              <PersonStanding className="w-8 h-8 inline-block" />
              <span className="ml-2">จุดขายของเรา</span>
            </h2>
              <div className="flex md:flex-row flex-col justify-center lg:gap-20">
                {/* Service 1 */}
                <article className="text-center flex flex-col gap-5 p-6">
                  <div className="flex flex-row items-center justify-center self-start md:self-center gap-5">
                    <div className="lg:w-60 lg:h-60 lg:rounded-tl-[100px] w-16 h-16 rounded-tl-[20px] overflow-hidden flex items-center justify-center">
                      <Image src="/5.webp" width={100} height={100} className="w-full h-full object-cover" alt="ภาพบรรยากาศผ่อนคลาย" />
                    </div>
                    <h3 className="lg:self-end lg:text-[27px] text-xl font-semibold text-[#5A352C]">ห้องนวดส่วนตัว ฟรี!</h3>
                  </div>
                  <p className="lg:text-[22px] text-start md:text-center text-[#5A352C]">
                    เราอยากให้คุณรู้สึกสงบอย่างแท้จริง และเราให้ความสำคัญกับความเป็นส่วนตัว
                  </p>
                </article>

                {/* Service 2 */}
                <article className="text-center flex flex-col gap-5 p-6">
                  <div className="flex flex-row items-center justify-center self-end md:self-center gap-5">
                    <div className="lg:w-60 lg:h-60 lg:rounded-tl-[100px] md:flex hidden bg-green-100 w-16 h-16 rounded-[4px] overflow-hidden flex items-center justify-center">
                      <Image src="/6.webp" width={100} height={100} className="w-full h-full object-cover" alt="ภาพดนตรีบำบัด" />
                    </div>
                    <h3 className="lg:self-end lg:text-[27px] text-xl font-semibold text-[#5A352C]">เสียงดนตรีบำบัด</h3>
                    <div className="lg:w-60 lg:h-60 lg:rounded-tl-[100px] md:hidden flex bg-green-100 w-16 h-16 rounded-[4px] overflow-hidden flex items-center justify-center">
                      <Image src="/6.webp" width={100} height={100} className="w-full h-full object-cover" alt="ภาพดนตรีบำบัด" />
                    </div>
                  </div>
                  <p className="lg:text-[22px] text-end md:text-center text-[#5A352C]">
                    เราคัดสรรและออกแบบเสียงดนตรีเพื่อช่วยคลายความเครียดโดยเฉพาะ
                  </p>
                </article>

                {/* Service 3 */}
                <article className="text-center flex flex-col gap-5 p-6">
                  <div className="flex flex-row items-center justify-center self-start md:self-center gap-5">
                    <div className="lg:w-60 lg:h-60 lg:rounded-tl-[100px] lg:rounded-tr-[0] bg-green-100 w-16 h-16 rounded-tr-[20px] overflow-hidden flex items-center justify-center">
                      <Image src="/10.webp" width={100} height={100} className="w-full h-full object-cover" alt="ภาพช่างนวดผู้เชี่ยวชาญ" />
                    </div>
                    <h3 className="lg:self-end lg:text-[27px] text-xl font-semibold text-[#5A352C]">ช่างนวดที่เข้าใจคุณ</h3>
                  </div>
                  <p className="lg:text-[22px] text-start md:text-center text-[#5A352C]">
                    ช่างนวดของเรายิ้มแย้ม เอาใจใส่และพร้อมที่จะรับฟังปัญหาของคุณ
                  </p>
                </article>

              </div>
            </div>
          </section>


          <Benefit />


          {/* Customer Reviews */}
          <section id="testimonials" className="py-20" aria-labelledby="testimonials-heading">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <header className="text-center mb-1">
                <h2 id="testimonials-heading" className="text-3xl md:text-4xl font-bold text-[#5A352C] mb-4">
                  รีวิวจากลูกค้า
                </h2>
                <p className="text-[#5A352C]">
                  รีวิวจากลูกค้าจริง
                </p>
              </header>

              <div className="grid md:grid-cols-3 gap-8">
                <article className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-center mb-4" role="img" aria-label="5 ดาว">
                    <div className="flex text-[#5A352C]">
                      {'★'.repeat(5)}
                    </div>
                  </div>
                  <blockquote className="text-[#5A352C] mb-4">
                    "นวดดีมาก ช่างนวดมืออาชีพ ผ่อนคลายมาก ราคาไม่แพง จะมาอีกแน่นอน"
                  </blockquote>
                  <footer className="flex flex-col">
                  <div >
                      <cite className="font-semibold text-[#5A352C] not-italic">ธนานันต์ อิ่มบุญ</cite>
                    </div>
                    <Image src="/review3.webp" width={100} height={100} className="w-[300px] h-[300px] object-cover rounded-full self-center" alt="นิดา" />
                  </footer>
                </article>

                <article className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-center mb-4" role="img" aria-label="5 ดาว">
                    <div className="flex text-[#5A352C]">
                      {'★'.repeat(5)}
                    </div>
                  </div>
                  <blockquote className="text-[#5A352C] mb-4">
                    "บรรยากาศดี ห้องสะอาด ช่างนวดใจดี นวดแล้วหายปวดหลังเลย"
                  </blockquote>
                  <footer className="flex flex-col">
                  <div >
                      <cite className="font-semibold text-[#5A352C] not-italic">Darlyn Chainam</cite>
                    </div>
                    <Image src="/review.webp" width={100} height={100} className="w-[300px] h-[300px] object-cover rounded-full self-center" alt="นิดา" />
                  </footer>
                </article>

                <article className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-center mb-4" role="img" aria-label="5 ดาว">
                    <div className="flex text-[#5A352C]">
                      {'★'.repeat(5)}
                    </div>
                  </div>
                  <blockquote className="text-[#5A352C] mb-4">
                    "บริการดีมาก ราคาเป็นมิตร ช่างนวดมีประสบการณ์ แนะนำเลย"
                  </blockquote>
                  <footer className="flex flex-col">
                    <div >
                      <cite className="font-semibold text-[#5A352C] not-italic">Kanpirom Munacata</cite>
                    </div>
                    <Image src="/review2.webp" width={100} height={100} className="w-[300px] h-[300px] object-cover rounded-full self-center" alt="นิดา" />
                  </footer>
                </article>
                <aside className=' w-full flex-col items-center justify-center gap-6 hidden'>
                  <div className='self-center text-center text-[14px] text-gray-500 underline'>แสดงทั้งหมด</div>
                  <button 
                    onClick={() => setShowReviewModal(true)}
                    className="bg-[#5A352C] w-full  text-white px-6 py-4 rounded-lg font-semibold hover:bg-[#7a0500] transition-colors shadow-lg"
                    aria-label="เขียนรีวิวใหม่"
                  >
                    เขียนรีวิว
                  </button>
                </aside>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faq" className="py-20 bg-white" aria-labelledby="faq-heading">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <header className="text-center mb-9">
                <h2 id="faq-heading" className="text-3xl md:text-4xl font-bold text-[#5A352C] mb-4">
                  คำถามที่พบบ่อย
                </h2>
                <p className="text-xl text-[#5A352C]">
                  สิ่งที่คุณควรรู้ก่อนมาใช้บริการ
                </p>
              </header>

              <div className="space-y-4">
                {[
                  {
                    question: "ต้องจองล่วงหน้ากี่วัน?",
                    answer: "สามารถจองได้ล่วงหน้า 1-2 วัน หรือโทรจองในวันเดียวกันได้เลย หากมีช่างนวดว่าง"
                  },
                  {
                    question: "ราคาเท่าไหร่?",
                    answer: "นวดไทย นวดเท้า 1 ชั่วโมง เริ่มต้นที่ 199 บาท , นวดรีดเส้น นวดคอบ่าไหล่ 1 ชั่วโมง เริ่มต้น 299 บาท นวดน้ำมัน เริ่มต้น 399 บาท , นวดอโรม่า ขัดผิว เริ่มต้น 499 บาท"
                  },
                  {
                    question: "เปิดบริการวันไหนบ้าง?",
                    answer: "เปิดบริการทุกวัน ตั้งแต่ 10:00 - 21:00 น. สามารถโทรสอบถามหรือจองได้ตลอดเวลา"
                  },
                  {
                    question: "มีที่จอดรถไหม?",
                    answer: "มีที่จอดรถให้บริการฟรี อยู่ด้านหน้าตึก และบริเวณใกล้เคียง สามารถจอดได้สะดวก"
                  }
                ].map((faq, index) => (
                  <article key={index} className="bg-gray-50 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-100 transition-colors"
                      aria-expanded={openFAQ === index}
                      aria-controls={`faq-answer-${index}`}
                    >
                      <h3 className="text-lg font-semibold text-[#5A352C]">
                        {faq.question}
                      </h3>
                      {openFAQ === index ? (
                        <ChevronUp className="w-5 h-5 text-[#5A352C]" aria-hidden="true" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-[#5A352C]" aria-hidden="true" />
                      )}
                    </button>
                    {openFAQ === index && (
                      <div id={`faq-answer-${index}`} className="px-6 pb-6 faq-answer">
                        <p className="text-[#5A352C] leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Final CTA Section */}
          <section className="py-20" aria-labelledby="cta-heading">
            <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
              <h2 id="cta-heading" className="text-3xl md:text-4xl font-bold text-[#5A352C] mb-4">
                พร้อมผ่อนคลายแล้วหรือยัง?
              </h2>
              <p className="text-xl text-[#5A352C] mb-8">
                มาใช้บริการนวดกับเราเพื่อสุขภาพและความผ่อนคลายที่ดีที่สุด
              </p>
              <nav className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-[#9f0600] flex items-center justify-center text-white px-8 py-4 rounded-sm text-lg font-semibold transition-colors shadow-lg">
                  <CalendarCheck className='inline-block mr-2' aria-hidden="true"/> จองคิวเลย
                </button>
                <a href="tel:0876732013" className="block ">
                  <button className="border-2 block w-full border-[#5A352C] text-[#5A352C] px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
                    โทรสอบถาม
                  </button>
                </a>
              </nav>
              <address className="text-[#5A352C] text-sm mt-4 not-italic">
                โทร: 087-673-2013 • เปิดทุกวัน 10:00-21:00 • ซอย สวนผัก 32 ถนน ปลายบาง นนทบุรี
              </address>
            </div>
          </section>
        </main>

        <section className="mt-20">
            
          <h2 className="text-center text-2xl font-bold !text-[#9f0600] mb-7">
              <Facebook className="w-8 h-8 inline-block" />
              <span className="ml-2">คอนเท้นของเรา</span>
            </h2>
          <div className="flex flex-row items-center justify-center">
          <iframe className="w-[50%] md:w-[267px] mx-auto" 
          src="https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F779969274740620%2F&show_text=false&width=267&t=0" 
          width="267" 
          height="476" 
          style={{ border: "none", overflow: "hidden" }}
          scrolling="no"
          frameBorder="0" 
          allowfullscreen 
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" 
          ></iframe>

          <iframe className="md:block hidden mx-auto"
            src="https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1289125769559919%2F&show_text=false&width=267&t=0"
            width="267"
            height="476"
            style={{ border: "none", overflow: "hidden" }}
            scrolling="no"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
            ></iframe>
          
          <iframe className="w-[50%] md:w-[267px] mx-auto"
            src="https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1929491644501197%2F&show_text=false&width=267&t=0"
            width="267"
            height="476"
            style={{ border: "none", overflow: "hidden" }}
            scrolling="no"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>

          </div>
       </section>

         

        {/* Footer */}
        <footer id="contact" className="bg-white mt-20 text-[#5A352C] py-12 flex flex-col items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8  ">
              <section className='text-center flex flex-col items-center'>
                <h3 className="text-2xl font-bold flex flex-col items-center justify-center text-[#5A352C] mb-4"> <Image src="/logo-removebg.webp" width={50} height={50} className="w-[50px] h-[50px] object-cover" alt="ภาพบรรยากาศผ่อนคลาย" /> <span>สลาลันสุข</span></h3>
                <p className="text-gray-400">
                  ร้านนวดไทยแท้ เพื่อสุขภาพและความผ่อนคลายที่ดีที่สุด
                </p>
              </section>
              
              <section>
                <h4 className="text-lg font-semibold mb-4">บริการ</h4>
                <nav>
                  <ul className="space-y-2 text-gray-400">
                    <li><a href="#thaimassage" >นวดไทย</a></li>
                    <li><a href="#footmassage" >นวดเท้า</a></li>
                    <li><a href="#neckmassage" >นวดคอบ่าไหล่</a></li>
                    <li><a href="#oilmassage" >นวดน้ำมัน</a></li>
                    <li><a href="#thaideeptissuemassage" >นวดรีดเส้น</a></li>
                    <li><a href="#aromatherapy" >นวดอโรม่า</a></li>
                    <li><a href="#bodyscrub" >นวดขัดผิว</a></li>
                  </ul>
                </nav>
              </section>
              
              <section className="">
                <h4 className="text-lg font-semibold mb-4 ">ข้อมูลร้าน</h4>
                <nav>
                  <ul className="space-y-2 text-gray-400">
                    <li><a href="#" className="hover:text-white transition-colors">เกี่ยวกับเรา</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">ช่างนวด</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">ข่าวสาร</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">ติดต่อเรา</a></li>
                  </ul>
                </nav>
              </section>
              
              <section>
                <h4 className="text-lg font-semibold mb-4">ติดต่อ</h4>
                <address className="not-italic">
                  <ul className="space-y-2 text-gray-400">
                    <li>📞 087-673-2013</li>
                    <li>📧 saransukmassage@gmail.com</li>
                    <li>📍 102/50 ถนน ปลายบาง, ซอย สวนผัก 32, ตำบล มหาสวัสดิ์, อำเภอบางกรวย, จังหวัดนนทบุรี 11130</li>
                    <li>🕘 เปิดทุกวัน 10:00-21:00</li>
                  </ul>
                </address>
              </section>
            </div>
            
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2025 สลาลันสุข. สงวนลิขสิทธิ์.</p>
            </div>
          </div>
        </footer>

        {/* Review Modal */}
        {showReviewModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" role="dialog" aria-modal="true" aria-labelledby="review-modal-title">
            <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
              <button
                onClick={() => setShowReviewModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                aria-label="ปิดหน้าต่างรีวิว"
              >
                <X className="w-6 h-6" />
              </button>
              
              <h3 id="review-modal-title" className="text-2xl font-bold text-gray-900 mb-6">เขียนรีวิว</h3>
            
              {/* Star Rating */}
              <fieldset className="mb-6">
                <legend className="block text-sm font-medium text-gray-700 mb-2">
                  ให้คะแนน (1-5 ดาว)
                </legend>
                <div className="flex gap-1" role="radiogroup" aria-label="ให้คะแนนดาว">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="focus:outline-none"
                      role="radio"
                      aria-checked={rating === star}
                      aria-label={`ให้คะแนน ${star} ดาว`}
                    >
                      <Star
                        className={`w-8 h-8 transition-colors ${
                          star <= (hoverRating || rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </fieldset>

              {/* Name Input */}
              <div className="mb-6">
                <label htmlFor="reviewer-name" className="block text-sm font-medium text-gray-700 mb-2">
                  ชื่อ
                </label>
                <input
                  id="reviewer-name"
                  type="text"
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9f0600] focus:border-transparent"
                  placeholder="ใส่ชื่อของคุณ"
                />
              </div>

              {/* Review Text */}
              <div className="mb-6">
                <label htmlFor="review-text" className="block text-sm font-medium text-gray-700 mb-2">
                  รีวิว
                </label>
                <textarea
                  id="review-text"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9f0600] focus:border-transparent"
                  placeholder="เขียนรีวิวของคุณที่นี่..."
                />
              </div>

              {/* Submit Button */}
              <div className="flex gap-3">
                <button
                  onClick={handleSubmitReview}
                  className="flex-1 bg-[#9f0600]  text-white py-2 px-4 rounded-md font-semibold hover:bg-[#7a0500] transition-colors"
                >
                  ส่งรีวิว
                </button>
                <button
                  onClick={() => setShowReviewModal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md font-semibold hover:bg-gray-400 transition-colors"
                >
                  ยกเลิก
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
