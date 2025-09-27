import { ArrowRight , Leaf ,Layers,  Scissors , TreePine , ChevronDown, ChevronUp } from "lucide-react";
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

  export default function Product() {
return <div>
<section id="products" className="py-20 relative" style={{ backgroundColor: '#FFFFFF' }}>
    <div className="container mx-auto px-4">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-green-900 mb-7"><span className="text-4xl">🌿</span><span className="ml-4">หญ้าคุณภาพ หลากหลายสายพันธุ์</span></h2>
        <p className="text-4xl font-bold text-black ">
          สไลด์ข้างเพื่อเลือกดูหญ้า
        </p>
      </div>

      {/* สไลด์แนวนอน */}
      <div className="absolute top-5/9 right-0 sm:right-9 -translate-y-1/2 z-10 pointer-events-none animate-bounce">
      <ArrowRight className="w-8 h-8 text-gray-500 z-10" />
    </div>
      <div className="overflow-x-auto overflow-y-hidden w-[90%] mx-auto relative ">
        <div className="flex gap-10 w-full pt-10 pb-10">
          <div className="w-[10px]"></div>
          {[
            {
              name: "หญ้านวลน้อย",
              desc: "หญ้าทีมีความทนทานสูง ชอบอยู่ในที่ ที่มีแดดจัด ใบนุ่ม ทนต่อการเหยียบย่ำ",
              price: "เริ่ม ฿14/ตร.ม.",
              img: "/product/nuannoy.jpg",
              id: "service#nuannoy"
            },
            {
              name: "หญ้ามาเลเซีย",
              desc: "หญ้าใบกว้าง เหมาะปลูกในที่ที่ร่มรื่น และมีแสงแดดรำไร",
              price: "เริ่ม ฿17/ตร.ม.",
              img: "/product/malaysia.jpg",
              id: "service#malaysia"
            },
            {
              name: "หญ้าไทเป",
              desc: "เป็นหญ้าใบกว้าง ที่ไม่ต้องตัดใบ แต่จะมีการเติบโตที่ช้า",
              price: "฿90/กิโลกรัม",
              img: "/product/thaipay.jpg",
              id: "service#thaipay"
            },
            {
              name: "หญ้าพาสพาลัม",
              desc: "หญ้าใบนุ่ม เหมาะสมในที่พี่มีแสงแดดครับ และทนต่อน้ำกร่อยได้ดี และมีการเติบโตช้าไม่ต้องตัดใบบ่อย ใช้ในสนามฟุตบอลและสนามกอล์ฟ",
              price: "เริ่ม ฿16/ตร.ม.",
              img: "/product/plaspalum.jpg",
              id: "service#plaspalum"
            },
            {
              name: "หญ้าญี่ปุ่น",
              desc: "หญ้าใบเล็ก เหมาะปลูกในพื้นที่ที่มีแสงแดดจัด ทนต่อการเหยียบย่ำ",
              price: "เริ่ม ฿15/ตร.ม.",
              img: "/product/japan.jpg",
              id: "service#japan"
            },
            {
              name: "หญ้าเบอร์มิวด้า",
              desc: "หญ้าใบแคบ เหมาะปลูกในที่ที่มีแสงแดดจัด น้ำที่กร่อยสามารถใช้รดได",
              price: "฿32/ตร.ม.",
              img: "/product/bermuda.jpg",
              id: "service#bermuda"
            },
          ].map((grass, index) => (
            <div
              key={index}
              className="w-80 shrink-0 bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all hover:transform hover:scale-105"
            >
              <div className={`relative h-60 bg-gradient-to-br `}>
                <Image alt='grass image' src = {grass.img} fill className="object-cover" />
              </div>
              <div className="p-6 h-full">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{grass.name}</h3>
                <p className="text-gray-600 mb-4 text-lg">{grass.desc}</p>
                <div className="flex flex-col gap-5 items-start mt-4">
                  <span className="text-xl font-bold text-black">{grass.price}</span>
                  <button  className="w-full bg-green-800 text-white px-5 py-2 rounded-full shadow-md hover:shadow-lg hover:bg-green-700 transition-all duration-300 text-sm font-semibold">
                    <Link href="https://line.me/ti/p/guAbCz7twh" target="_blank" className="block">สอบถาม</Link>
                  </button>
                  <Link
                    href={grass.id}
                    className="bg-white border w-full text-center border-green-900 text-green-900 px-5 py-2 rounded-full shadow-md hover:shadow-lg hover:brightness-105 hover:bg-green-900 hover:text-white transition-all duration-300 text-sm font-semibold"
                  >
                    ดูรายละเอียด
                  </Link>
                </div>
              </div>
            </div>
          ))}
          <div className="w-[500px]">dd</div>
        </div>
      </div>
    </div>
  </section>
  
</div>
}
