'use client';

import { useState } from 'react';
import Navbar from '@/components/page';
import Image from 'next/image';
import { ArrowRightIcon } from 'lucide-react';
export default function Home() {

  return (
    <div className="min-h-screen bg-white flex flex-col gap-0">
      {/* Navbar */}
      <Navbar />
      {/* Hero Section */}
      <section className="bg-black py-20 h-screen flex items-center  justify-center">
        <Image src="/hero.jpg" width={1000} height={1000} className="absolute top-0 left-0 w-full h-full object-cover z-1 opacity-50" />
        <div className="pt-13 z-2 
         px-4 sm:px-6 lg:px-8">
          <div className="text-center flex flex-col items-center justify-center gap-2">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-wide " style={{ textShadow: "16px 16px 64px rgba(0,0,0,2)" }}>
            คลายเมื่อย คลายเครียด
            </h1>
            <p className="text-xl  mb-8 max-w-3xl mx-auto text-white " style={{ textShadow: "16px 16px 64px rgba(0,0,0,2)" }}>
            สัมผัสศิลปะแห่งการนวดไทย ท่ามกลางบรรยากาศแสนผ่อนคลาย <br /> <span>ดนตรีบำบัด และช่างนวดผู้เชี่ยวชาญ</span></p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button className="bg-[#9f0600] flex transition-colors items-center justify-center shadow-lg text-white tracking-wide w-[200px] py-3 rounded-lg text-lg font-semibold 
               group">
                <span className="flex items-center gap-2">
                  จองคิวเลย 
                  <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 
                  group-hover:translate-x-2" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex md:flex-row flex-col">
            {/* Service 1 */}
            <div className="text-center flex flex-col gap-5 p-6">
              <div className="flex flex-row items-center justify-center self-start md:self-center gap-5">
                <div className="bg-green-100 w-16 h-16 rounded-tl-[20px]  overflow-hidden flex items-center justify-center">
                  <Image src="/feature.png" width={100} height={100} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-semibold text-[#5A352C]">บรรยากาศผ่อนคลาย</h3>
              </div>
              <p className="text-start md:text-center text-[#5A352C]">
                 ช่วยคลายกล้ามเนื้อ ลดความเครียด และปรับสมดุลร่างกาย
              </p>
            </div>

            {/* Service 2 */}
            <div className="text-center  flex flex-col gap-5 p-6">
              <div className="flex flex-row items-center justify-center self-end md:self-center gap-5">
                <div className=" md:flex hidden bg-green-100 w-16 h-16 rounded-[4px] overflow-hidden flex items-center justify-center">
                  <Image src="/feature.png" width={100} height={100} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-semibold text-[#5A352C]">ดนตรีบำบัด</h3>
                <div className=" md:hidden flex bg-green-100 w-16 h-16 rounded-[4px] overflow-hidden flex items-center justify-center">
                  <Image src="/feature.png" width={100} height={100} className="w-full h-full object-cover" />
                </div>
              </div>
              <p className=" text-end md:text-center  text-[#5A352C]">
                 ช่วยคลายกล้ามเนื้อ ลดความเครียด และปรับสมดุลร่างกาย
              </p>
            </div>
            {/* Service 3 */}
            <div className="text-center flex flex-col gap-5 p-6">
              <div className="flex flex-row items-center justify-center self-start md:self-center gap-5">
                <div className="bg-green-100 w-16 h-16 rounded-tr-[20px] overflow-hidden flex items-center justify-center">
                  <Image src="/feature.png" width={100} height={100} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-semibold text-[#5A352C]">ช่างนวดผู้เชี่ยวชาญ</h3>
              </div>
              <p className=" text-start md:text-center text-[#5A352C]">
                 ช่วยคลายกล้ามเนื้อ ลดความเครียด และปรับสมดุลร่างกาย
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* benefit section */}
      <section className='h-[2880px] w-full bg-white'>
      {/* benefit 1 */}
        <div className='relative flex md:flex-row flex-col items-center justify-center md:gap-[100px] md:px-[100px]'>
        <div className='absolute top-0 left-[100px] text-[16pt] font-bold text-[#9f0600] text-center'>ประโยชน์</div>
          <div className='md:w-1/2 w-full'>
            <div className='flex flex-col items-center justify-center gap-5 '>
              <span className='text-[24pt] font-bold text-[#5A352C]'>คลายเครียด และผ่อนคลาย</span>
              <span className='text-[16pt] text-[#5A352C] text-start '>ความเครียดจากงาน ชีวิตประจำวัน หรือการเรียนสะสมในร่างกาย ทำให้กล้ามเนื้อเกร็ง และจิตใจอึดอัด การนวดช่วยให้ร่างกายและใจผ่อนคลาย ทำให้คุณรู้สึกสบาย สดชื่น และเบาขึ้น ไม่ใช่แค่กล้ามเนื้อที่คลาย แต่ใจคุณก็สงบขึ้น นอนหลับง่าย และพร้อมมีพลังสำหรับวันต่อไป</span>
            </div>
          </div>
          <div className='md:w-1/2 w-full flex items-center justify-center'>
            <Image src="/feature.png" width={300} height={700} className='  w-full h-screen  rounded-tl-[200px] rounded-br-[200px]' />
          </div>
            
        </div>
      {/* benefit 2 */}
        <div>

        </div>
      </section>

      {/* Customer Reviews */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              รีวิวจากลูกค้า
            </h2>
            <p className="text-xl text-gray-600">
              ความพึงพอใจจากลูกค้าจริง
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {'★'.repeat(5)}
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "นวดดีมาก ช่างนวดมืออาชีพ ผ่อนคลายมาก ราคาไม่แพง จะมาอีกแน่นอน"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                  ส
                </div>
                <div>
                  <p className="font-semibold text-gray-900">สมชาย</p>
                  <p className="text-gray-500 text-sm">ลูกค้าประจำ</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {'★'.repeat(5)}
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "บรรยากาศดี ห้องสะอาด ช่างนวดใจดี นวดแล้วหายปวดหลังเลย"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                  ก
                </div>
                <div>
                  <p className="font-semibold text-gray-900">กานดา</p>
                  <p className="text-gray-500 text-sm">พนักงานออฟฟิศ</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {'★'.repeat(5)}
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "บริการดีมาก ราคาเป็นมิตร ช่างนวดมีประสบการณ์ แนะนำเลย"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                  น
                </div>
                <div>
                  <p className="font-semibold text-gray-900">นิดา</p>
                  <p className="text-gray-500 text-sm">แม่บ้าน</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              คำถามที่พบบ่อย
            </h2>
            <p className="text-xl text-gray-600">
              สิ่งที่คุณควรรู้ก่อนมาใช้บริการ
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                ต้องจองล่วงหน้ากี่วัน?
              </h3>
              <p className="text-gray-600">
                สามารถจองได้ล่วงหน้า 1-2 วัน หรือโทรจองในวันเดียวกันได้เลย หากมีช่างนวดว่าง
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                ราคาเท่าไหร่?
              </h3>
              <p className="text-gray-600">
                นวดไทย 1 ชั่วโมง เริ่มต้นที่ 300 บาท นวดเท้า 1 ชั่วโมง 250 บาท นวดสมุนไพร 1 ชั่วโมง 400 บาท
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                เปิดบริการวันไหนบ้าง?
              </h3>
              <p className="text-gray-600">
                เปิดบริการทุกวัน ตั้งแต่ 9:00 - 21:00 น. สามารถโทรสอบถามหรือจองได้ตลอดเวลา
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                มีที่จอดรถไหม?
              </h3>
              <p className="text-gray-600">
                มีที่จอดรถให้บริการฟรี อยู่ด้านหน้าตึก สามารถจอดได้สะดวก
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-green-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            พร้อมผ่อนคลายแล้วหรือยัง?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            มาใช้บริการนวดกับเราเพื่อสุขภาพและความผ่อนคลายที่ดีที่สุด
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg">
              จองคิวเลย
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors">
              โทรสอบถาม
            </button>
          </div>
          <p className="text-green-200 text-sm mt-4">
            โทร: 02-123-4567 • เปิดทุกวัน 9:00-21:00 • ราคาเริ่มต้น 250 บาท
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-green-400 mb-4">🌿 สลาลันสุข</h3>
              <p className="text-gray-400">
                ร้านนวดไทยแท้ เพื่อสุขภาพและความผ่อนคลายที่ดีที่สุด
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">บริการ</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">นวดไทย</a></li>
                <li><a href="#" className="hover:text-white transition-colors">นวดเท้า</a></li>
                <li><a href="#" className="hover:text-white transition-colors">นวดสมุนไพร</a></li>
                <li><a href="#" className="hover:text-white transition-colors">แพ็คเกจ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">ข้อมูลร้าน</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">เกี่ยวกับเรา</a></li>
                <li><a href="#" className="hover:text-white transition-colors">ช่างนวด</a></li>
                <li><a href="#" className="hover:text-white transition-colors">ข่าวสาร</a></li>
                <li><a href="#" className="hover:text-white transition-colors">ติดต่อเรา</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">ติดต่อ</h4>
              <ul className="space-y-2 text-gray-400">
                <li>📞 02-123-4567</li>
                <li>📧 info@salaansuk.com</li>
                <li>📍 123 ถนนสุขุมวิท กรุงเทพฯ</li>
                <li>🕘 เปิดทุกวัน 9:00-21:00</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 สลาลันสุข. สงวนลิขสิทธิ์.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
