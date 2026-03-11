"use client";

import { useRef, useState } from "react";
import StarIcon from "./ui/StarIcon";
import emailjs from "@emailjs/browser";

// init emailjs, public key taro sini
emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!  );

export default function ContactUs() {
  const formRef = useRef<HTMLFormElement>(null);
  const [sending, setSending] = useState(false); // buat disable tombol pas lg ngirim

  // handle kirim email pake emailjs
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);

    const serviceID = "default_service";
    const templateID = "template_red7217";

    // masukin waktu kirim ke hidden input biar kerecord
    const form = e.currentTarget;
    const timeInput =
      form.querySelector<HTMLInputElement>('input[name="time"]');
    if (timeInput) {
      timeInput.value = new Date().toLocaleString();
    }

    emailjs
      .sendForm(serviceID, templateID, form)
      .then(() => {
        setSending(false);
        alert("Sent!");
        formRef.current?.reset();
      })
      .catch((err) => {
        setSending(false);
        alert(JSON.stringify(err));
      });
  };
  return (
    <section className="w-full py-8 sm:py-12 md:py-24 px-4 sm:px-8 md:px-12 lg:px-20">
      {/* judul section */}
      <div className="w-full flex flex-col items-center gap-4 sm:gap-6 md:gap-10">
        <h3
          className="flex items-center gap-2 text-2xl sm:text-3xl md:text-4xl font-bold text-red-500 space-mono"
          style={{ fontFamily: '"Space Mono", monospace' }}
        >
          <StarIcon className="w-6 h-6" />
          Contact Us
        </h3>
        <h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center"
          style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
        >
          Create Partnership
        </h2>
      </div>

      {/* 2 kolom: kiri info kontak, kanan form */}
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 mt-8 sm:mt-12 md:mt-16">
        <div
          className="rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 lg:p-12 bg-white"
          style={{
            border: "2px solid #ef4444",
          }}
        >
          {/* email & telpon */}
          <div className="flex gap-10 sm:gap-16 md:gap-24 mb-6 sm:mb-8 md:mb-10">
            <div>
              <h4
                className="text-red-500 font-bold text-lg sm:text-xl md:text-2xl mb-1 sm:mb-2"
                style={{ fontFamily: '"Space Mono", monospace' }}
              >
                Email
              </h4>
              <p
                className="text-gray-500 text-sm sm:text-base"
                style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
              >
                nevtik@gmail.com
              </p>
            </div>
            <div>
              <h4
                className="text-red-500 font-bold text-lg sm:text-xl md:text-2xl mb-1 sm:mb-2"
                style={{ fontFamily: '"Space Mono", monospace' }}
              >
                Phone
              </h4>
              <p
                className="text-gray-500 text-sm sm:text-base"
                style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
              >
                0821-1234-2567
              </p>
            </div>
          </div>

          {/* alamat kampak */}
          <div className="mb-6 sm:mb-8 md:mb-10">
            <h4
              className="text-red-500 font-bold text-lg sm:text-xl md:text-2xl mb-1 sm:mb-2"
              style={{ fontFamily: '"Space Mono", monospace' }}
            >
              Addresses
            </h4>
            <p
              className="text-gray-500 text-sm sm:text-base leading-relaxed"
              style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
            >
              Jl. Raya Karadenan No.7, Karadenan, Kec. Cibinong, Kabupaten
              Bogor, Jawa Barat 16111
            </p>
          </div>

          {/* embed google maps */}
          <div className="w-full rounded-xl sm:rounded-2xl overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d393.27820349767234!2d106.80716148185854!3d-6.522185779648023!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c3b0c14d0b25%3A0x1704bad96516ada!2sNEVTIK!5e0!3m2!1sen!2ssg!4v1772834164507!5m2!1sen!2ssg"
              width="100%"
              height="200"
              className="sm:h-[250px] md:h-[300px]"
              style={{ border: 0, borderRadius: "16px", minHeight: "180px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* card kanan: form pesan */}
        <div
          className="rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 lg:p-12 bg-white"
          style={{
            border: "2px solid #ef4444",
          }}
        >
          <h4
            className="flex items-center gap-2 text-red-500 font-bold text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 md:mb-10"
            style={{ fontFamily: '"Space Mono", monospace' }}
          >
            <StarIcon className="w-5 h-5" />
            Form Message
          </h4>

          <form
            ref={formRef}
            className="flex flex-col gap-3 sm:gap-4"
            onSubmit={handleSubmit}
          >
            {/* hidden input buat judul sm waktu */}
            <input type="hidden" name="title" value="Contact Form - Nevtik" />
            <input type="hidden" name="time" value="" />

            <div>
              <label
                htmlFor="name"
                className="block text-red-500 font-bold text-base sm:text-lg mb-1 sm:mb-2"
                style={{ fontFamily: '"Space Mono", monospace' }}
              >
                Your Full Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="nevtik academy"
                className="w-full px-4 py-2.5 sm:px-5 sm:py-3 rounded-lg sm:rounded-xl border border-gray-300 text-sm sm:text-base focus:outline-none focus:border-red-400"
                style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-red-500 font-bold text-base sm:text-lg mb-1 sm:mb-2"
                style={{ fontFamily: '"Space Mono", monospace' }}
              >
                Your Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="nevtik@gmail.com"
                className="w-full px-4 py-2.5 sm:px-5 sm:py-3 rounded-lg sm:rounded-xl border border-gray-300 text-sm sm:text-base focus:outline-none focus:border-red-400"
                style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-red-500 font-bold text-base sm:text-lg mb-1 sm:mb-2"
                style={{ fontFamily: '"Space Mono", monospace' }}
              >
                Your Message
              </label>
              <textarea
                name="message"
                id="message"
                placeholder="Your Message"
                rows={4}
                className="w-full px-4 py-2.5 sm:px-5 sm:py-3 rounded-lg sm:rounded-xl border border-gray-300 text-sm sm:text-base resize-none focus:outline-none focus:border-red-400"
                style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
              />
            </div>

            {/* tombol kirim, disabled pas lg proses */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={sending}
                className="px-6 py-3 sm:px-8 sm:py-4 rounded-lg text-white font-bold text-sm sm:text-base tracking-wide cursor-pointer disabled:opacity-60"
                style={{
                  backgroundColor: "#8B1A1A",
                  fontFamily: '"Space Mono", monospace',
                }}
              >
                {sending ? "Sending..." : "Send Email"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
