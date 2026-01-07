'use client'
import { Phone, Mail, MapPin } from 'lucide-react';
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export default function ContactSection() {
  const formRef = useRef<HTMLFormElement>(null); // ใช้สำหรับอ้างอิง Form
  const [isLoading, setIsLoading] = useState(false); // สถานะกำลังส่ง
  const [statusMessage, setStatusMessage] = useState(""); // ข้อความแจ้งผล
  const startTime = useRef(Date.now());

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //เช็คความปลอดภัย: ถ้าหาฟอร์มไม่เจอ ให้หยุดทำงาน (กัน Error)
    if (!formRef.current) return
    setIsLoading(true);
    setStatusMessage("");

    //honeypot
    if (formRef.current.company.value !== "") {
      return;
    }

    // แทนค่า YOUR_... ด้วยค่าจริงจาก EmailJS Dashboard
    const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID";
    const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID";
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY";

    const timeSpent = Date.now() - startTime.current;
    // ถ้ากรอกเร็วเกิน 3 วิ
    if (timeSpent < 3000) {
      return;
    }

    try {
      const result = await emailjs.sendForm(
        serviceID,
        templateID,
        formRef.current,
        { publicKey }
      );
      setIsLoading(false);
      setStatusMessage("success");
      formRef.current.reset();
      alert("Thank you! Your message has been sent. I will get back to you shortly.");
    } catch (error: any) { // ใช้ any ชั่วคราวเพื่อให้ดึง error.text ได้ง่าย
      setIsLoading(false);
      setStatusMessage("error");
      alert("Failed to send message. Please try again.");
    }
  }

  //1c1c22

  return (
    <section className={`bg-[#030303] min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-[#27272c] p-8 rounded-xl shadow-lg order-2 md:order-1">
          <h3 className="text-4xl font-bold text-emerald-400 mb-6">Let's work together</h3>
          <p className="text-gray-400 mb-8 text-sm">
            If you are interested in working together, please send me a message.
          </p>

          {/* ref={formRef} และ onSubmit={sendEmail} คือส่วนสำคัญ */}
          <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* First Name */}
              <input
                type="text"
                name="firstname"
                placeholder="Firstname"
                className="w-full bg-[#1c1c22] text-white border border-gray-700 rounded-md px-4 py-3 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
              />
              {/* Last Name */}
              <input
                type="text"
                name="lastname"
                placeholder="Lastname"
                className="w-full bg-[#1c1c22] text-white border border-gray-700 rounded-md px-4 py-3 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Email */}
              <input
                type="email"
                name="email"
                required
                placeholder="Your email address"
                className="w-full bg-[#1c1c22] text-white border border-gray-700 rounded-md px-4 py-3 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
              />
              {/* Phone */}
              <input
                type="tel"
                name="phone"
                placeholder="Phone number"
                className="w-full bg-[#1c1c22] text-white border border-gray-700 rounded-md px-4 py-3 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition"
              />
            </div>

            {/* Message Textarea */}
            <textarea
              placeholder="Type your message here."
              name="message"
              className="w-full bg-[#1c1c22] text-white border border-gray-700 rounded-md px-4 py-3 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition resize-none"
            ></textarea>

            <input
              type="text"
              name="company"
              style={{ display: "none" }}
              autoComplete="off"
            />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading} // ป้องกันการกดซ้ำขณะส่ง
              className={`font-semibold py-3 px-8 rounded-full transition duration-300 
                active:scale-95
                ${isLoading
                ? "bg-gray-500 cursor-not-allowed text-white"
                : "bg-emerald-400 hover:bg-emerald-500 text-black"
                }`}
            >
              Send message
            </button>

            {statusMessage === 'success' && <p className="text-emerald-400 mt-2">Message sent successfully!</p>}
            {statusMessage === 'error' && <p className="text-red-500 mt-2">Failed to send message.</p>}

          </form>
        </div>
        <div className="flex flex-col justify-center space-y-8 order-1 md:order-2 pl-0 md:pl-10 text-white">
          {/* Phone Item */}
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-[#27272c] rounded-md flex items-center justify-center text-emerald-400 shrink-0">
              {/* Icon Phone */}
              <Phone size={30} />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Phone</p>
              <p className="text-xl font-medium">(+66) 864 372 503</p>
            </div>
          </div>
          {/* Email Item */}
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-[#27272c] rounded-md flex items-center justify-center text-emerald-400 shrink-0">
              {/* Icon Mail */}
              < Mail size={30} />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Email</p>
              <p className="text-xl font-medium">supachaiwijaiya@gmail.com</p>
            </div>
          </div>
          {/* Address Item */}
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-[#27272c] rounded-md flex items-center justify-center text-emerald-400 shrink-0">
              {/* Icon Location */}
              <MapPin size={30} />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Address</p>
              <p className="text-xl font-medium">Bang Kapi, Bangkok 10240</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}    
