import { ArrowRight , Leaf ,Layers,  Scissors , TreePine , Flower,  ChevronDown, ChevronUp } from "lucide-react";
import { useState } from 'react'
import Image from 'next/image'
import BookingCalendar from '../BookingCalendar/page'

export default function Benefit() {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookedSlots, setBookedSlots] = useState({});
  const BOOKING_LIMIT_PER_SLOT = 2;

  // Mapping service IDs to massage type values
  const serviceTypeMapping = {
    "thaimassage": "thai",
    "oilmassage": "oil", 
    "thaideeptissuemassage": "deep-tissue",
    "neckmassage": "neck-shoulder",
    "footmassage": "foot",
    "aromatherapy": "aromatherapy",
    "bodyscrub": "bodyscrub"
  };

  const handleSlotSelect = (slotDate) => {
    setSelectedSlot(slotDate);
  };

  const handleConfirmBooking = (bookingData) => {
    if (!bookingData || !bookingData.slot) return;

    const slotIso = bookingData.slot.toISOString();
    const currentCount = bookedSlots[slotIso] || 0;

    if (currentCount >= BOOKING_LIMIT_PER_SLOT) {
      alert("ขออภัย ช่องเวลานี้เต็มแล้ว");
      return;
    }

    setBookedSlots((prevSlots) => ({
      ...prevSlots,
      [slotIso]: currentCount + 1,
    }));

    setSelectedSlot(null);
  };
return <div>
<section id="services" className="py-10 pb-20 bg-white relative">
<div className="container mx-auto px-4">
  <div className="text-center">
    <h2 className="text-2xl font-bold !text-[#9f0600] mb-7">
      <Flower className="w-8 h-8 inline-block" />
      <span className="ml-2">บริการของเรา</span>
    </h2>
  </div>

  {/* Arrow indicator */}
  <div className="absolute top-5/9 right-0 sm:right-9 -translate-y-1/2 z-10 pointer-events-none animate-bounce">
    <ArrowRight className="w-8 h-8 text-gray-500 z-10" />
  </div>

  {/* Horizontal scroll container */}
  <div className="overflow-x-auto overflow-y-hidden w-[90%] mx-auto relative">
    <div className="flex gap-10 w-full pt-8 pb-10">
      <div className="w-[20px]"></div>

      {[
        {
          id : "thaimassage",
          name: "นวดไทย",
          desc: "สัมผัสประสบการณ์นวดไทย ให้ร่างกายคลายความตึงเครียด ผ่อนคลายทุกอาการเมื่อยล้า และเติมความสดชื่นให้ชีวิตประจำวันของคุณ",
          price: "",
          icon: '',
          img: "/thaimassage.webp",
          buttonBg: "bg-white text-black border border-black hover:text-white hover:bg-black",
          features: [
            "• 1 ชั่วโมง <span class='font-bold'>199 บาท</span>",
            "• 1.5 ชั่วโมง <span class='font-bold'>299 บาท</span>",
            "• <span>2</span> ชั่วโมง <span class='font-bold'>399 บาท</span> ",
            "• เพิ่ม <span>30</span> นาที <span class='font-bold'>100 บาท</span>"
          ]
        },{
          id : "oilmassage",
          name: "นวดน้ำมัน",
          desc: "ผ่อนคลายร่างกายและจิตใจด้วยนวดน้ำมันสูตรพิเศษ ช่วยให้กล้ามเนื้อคลายตัวอย่างล้ำลึก กระตุ้นการไหลเวียนเลือด รู้สึกได้ตั้งแต่สัมผัสแรกผ่อนคลายร่างกายและจิตใจด้วยนวดน้ำมันสูตรพิเศษ  ",
          price: "",
          icon: '',
          img: "/oilmassage.webp",
          gradient: "from-yellow-50 to-yellow-100",
          iconBg: "bg-yellow-600 group-hover:bg-yellow-700",
          buttonBg: "bg-white text-black border border-black hover:text-white hover:bg-black",
          features: [
            "• 1 ชั่วโมง <span class='font-bold'>399 บาท</span> ",
            "• 1.5 ชั่วโมง <span class='font-bold'>499 บาท</span>",
            "• <span>2</span> ชั่วโมง <span class='font-bold'>599 บาท</span>",
            "• เพิ่ม <span>30</span> นาที <span class='font-bold'>100 บาท</span> "
          ]
        },
        {
          id : "thaideeptissuemassage",
          name: "นวดไทยรีดเส้น",
          icon: '',
          desc: "ปลดล็อกความตึงเครียดและคลายกล้ามเนื้อด้วยนวดไทยรีดเส้น เทคนิคดั้งเดิมที่เน้นการกดจุดและยืดเหยียดเส้นให้คลายตัว ช่วยกระตุ้นการไหลเวียนของเลือด ให้ร่างกายรู้สึกเบาสบาย สดชื่น และพร้อมรับวันใหม่",
          price: "",
          img: "/reedsenmassage.webp",
          gradient: "from-gray-50 to-gray-100",
          iconBg: "bg-gray-600 group-hover:bg-gray-700",
          buttonBg: "bg-white text-black border border-black hover:text-white hover:bg-black",
          features: [
            "• 1 ชั่วโมง <span class='font-bold'>299 บาท</span>",
            "• 1.5 ชั่วโมง <span class='font-bold'>399 บาท</span>",
            "• <span>2</span> ชั่วโมง <span class='font-bold'>499 บาท</span>",
            "• เพิ่ม <span>30</span> นาที <span class='font-bold'>100 บาท</span> "
          ]
        },
        {
          id : "neckmassage",
          name: "นวดคอบ่าไหล",
          icon: '',
          desc: "คลายอาการตึงเครียดและปวดบ่าไหล่ด้วยนวดมืออาชีพ เทคนิคเฉพาะที่เน้นการกดจุดและนวดแบบลึกถึงกล้ามเนื้อ ช่วยให้คุณรู้สึกผ่อนคลาย ลดความตึงเครียด และเคลื่อนไหวได้อย่างคล่องตัวอีกครั้ง",
          price: "",
          img: "/neckmassage.webp",
          gradient: "from-emerald-50 to-emerald-100",
          iconBg: "bg-emerald-600 group-hover:bg-emerald-700",
          buttonBg: "bg-white text-black border border-black hover:text-white hover:bg-black",
          features: [
            "• 1 ชั่วโมง <span class='font-bold'>299 บาท</span>",
            "• 1.5 ชั่วโมง <span class='font-bold'>399 บาท</span>",
            "• <span>2</span> ชั่วโมง <span class='font-bold'>499 บาท</span>",
            "• เพิ่ม <span>30</span> นาที <span class='font-bold'>100 บาท</span> "
          ]
        },
        {
          id : "footmassage",
          name: "นวดเท้า",
          desc: "สัมผัสความผ่อนคลายจากปลายเท้าสู่ทั่วร่างกายด้วยศาสตร์การนวดกดจุดฝ่าเท้า ที่มุ่งเน้นไปที่การกระตุ้นจุดสะท้อนต่าง ๆ บนฝ่าเท้า ซึ่งเชื่อมโยงกับอวัยวะและระบบต่าง ๆ ทั่วร่างกาย ",
          price: "",
          icon: '',
          img: "/footmassage.webp",
          gradient: "from-yellow-50 to-yellow-100",
          iconBg: "bg-yellow-600 group-hover:bg-yellow-700",
          buttonBg: "bg-white text-black border border-black hover:text-white hover:bg-black",
          features: [
            "• 1 ชั่วโมง <span class='font-bold'>199 บาท</span>",
            "• 1.5 ชั่วโมง <span class='font-bold'>299 บาท</span>",
            "• <span>2</span> ชั่วโมง <span class='font-bold'>399 บาท</span>",
            "• เพิ่ม <span>30</span> นาที <span class='font-bold'>100 บาท</span>"
          ]
        },{
          id : "aromatherapy",
          name: "อโรม่า",
          desc: "สัมผัสประสบการณ์นวดอโรม่าแบบพรีเมียม ด้วยน้ำมันหอมระเหยสูตรพิเศษ  ช่วยคลายความตึงเครียดของกล้ามเนื้อ  พร้อมกลิ่นหอมละมุนจากธรรมชาติ มอบความสดชื่นและผ่อนคลายลึกถึงจิตใจ เหมาะสำหรับผู้ที่ต้องการฟื้นฟูร่างกายและเติมพลังให้ชีวิตประจำวัน",
          price: "",
          icon: '',
          img: "/5.webp",
          gradient: "from-yellow-50 to-yellow-100",
          iconBg: "bg-yellow-600 group-hover:bg-yellow-700",
          buttonBg: "bg-white text-black border border-black hover:text-white hover:bg-black",
          features: [
            "• 1 ชั่วโมง <span class='font-bold'>499 บาท</span>",
            "• 1.5 ชั่วโมง <span class='font-bold'>599 บาท</span>",
            "• <span>2</span> ชั่วโมง <span class='font-bold'>699 บาท</span>",
            "• เพิ่ม <span>30</span> นาที <span class='font-bold'>100 บาท</span> "
          ]
        },{
          id : "bodyscrub",
          name: "ขัดผิว",
          desc: "สัมผัสประสบการณ์ขัดผิวแบบพรีเมียม ด้วยสูตรสครับจากธรรมชาติ ช่วยขจัดเซลล์ผิวเสื่อมสภาพ เผยผิวเนียนนุ่ม กระจ่างใส พร้อมกระตุ้นการไหลเวียนเลือด ให้ร่างกายรู้สึกสดชื่นและผ่อนคลายทุกสัมผัส ",
          price: "",
          icon: <Leaf className="w-8 h-8 inline-block mr-3" />,
          img: "/9.webp",
          gradient: "from-yellow-50 to-yellow-100",
          iconBg: "bg-yellow-600 group-hover:bg-yellow-700",
          buttonBg: "bg-white text-black border border-black hover:text-white hover:bg-black",
          features: [
            "• 1 ชั่วโมง <span class='font-bold'>499 บาท</span> ",
            "• 1.5 ชั่วโมง <span class='font-bold'>599 บาท</span>",
            "• <span>2</span> ชั่วโมง <span class='font-bold'>699 บาท</span>",
            "• เพิ่ม <span>30</span> นาที <span class='font-bold'>100 บาท</span>"
          ]
        }

    
      ].map((service, index) => (
        <div
          id={service.id} 
          key={index}
          className="w-[500px] shrink-0 group"
        >
          <div className={`bg-gradient-to-br bg-white  shadow-xl rounded-2xl p-8 h-full hover:shadow-2xl transition-all group-hover:transform group-hover:scale-105`}>
            <h3 className="text-xl font-bold text-[#5A352C] mb-4">{service.icon}<span>{service.name}</span></h3>
             <div className={`w-full  h-[400px] ${service.iconBg} rounded-2xl relative mb-10`}>
              <Image loading="lazy" alt="grass image" className="object-cover rounded-xl" src = {service.img} fill />
            </div>
            <p className="text-gray-600 mb-6 text-lg">{service.desc}</p>
            <ul className="text-gray-600 space-y-2 mb-6">
              {service.features.map((feature, idx) => (
                <li key={idx} dangerouslySetInnerHTML={{ __html: feature }}></li>
              ))}
            </ul>
            <div className="flex flex-col gap-4">
              <span className="text-xl font-bold text-gray-800">{service.price}</span>
              <BookingCalendar
                bookedSlots={bookedSlots}
                bookingLimit={BOOKING_LIMIT_PER_SLOT}
                onSlotClick={handleSlotSelect}
                selectedSlot={selectedSlot}
                onConfirmBooking={handleConfirmBooking}
                dialogTitle={`จองนัดหมาย${service.name}`}
                preSelectedService={serviceTypeMapping[service.id]}
                triggerButton={
                  <button className="w-full bg-[#9f0600] text-white px-5 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 text-sm font-semibold">
                    จองคิวเลย
                  </button>
                }
              />
            </div>
          </div>
        </div>
      ))}
      <div className="w-[500px]">d</div>
    </div>
  </div>
</div>
</section>

</div>
}
