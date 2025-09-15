import { Kanit } from "next/font/google";
import "./globals.css";

const kanit = Kanit({
  variable: "--font-kanit",
  subsets: ["thai", "latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "สลาลันสุข - ร้านนวดไทยแท้ เพื่อสุขภาพและความผ่อนคลาย",
  description: "บริการนวดไทยแบบดั้งเดิม นวดเท้า และนวดสมุนไพร จากช่างนวดมืออาชีพ ราคาเป็นมิตร บรรยากาศผ่อนคลาย จองคิวได้เลย",
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body
        className={`${kanit.variable} font-kanit antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
