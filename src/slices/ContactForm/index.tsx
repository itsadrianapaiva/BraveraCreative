import React from "react";
import Bounded from "@/components/Bounded";
import ContactForm from "@/components/ContactForm"; 
import Image from "next/image";
import videocall from "./videocall.png";


const ContactFormSlice: React.FC = () => {
  // Renamed to avoid conflict
  return (
    <Bounded className="-mt-24 lg:-mt-36">
      <div className="relative m-10 flex flex-col items-start space-y-12 md:space-x-6 md:space-y-0 lg:flex-row lg:space-x-10">
        {/* Scheduling Container */}
        <div className="glass-container flex flex-col items-start justify-center space-y-6 rounded-xl bg-gradient-to-b from-slate-500/10 to-black p-8 md:flex-row md:gap-8 lg:w-1/3 lg:flex-col-reverse">
          <div className="space-y-4 md:space-y-6">
            <h3 className="text-balance text-2xl font-semibold text-tertiary">
              Book a Free 30-Minute Strategy Session
            </h3>
            <p className="text-balance text-gray-300">
              Want to know how to elevate your business to achieve its goal?
              Schedule a complimentary strategy session with Gustavo, our CEO,
              to discuss your goals and brainstorm ideas for the future. Let’s
              build your path to success!
            </p>
            <a
              href="https://calendly.com/braveracreative/meeting"
              target="_blank"
              className="mt-4 inline-block rounded-lg bg-[#96ff00]/20 px-4 py-2 text-white transition-all duration-300 hover:bg-[#96ff00]/40 focus:outline-none focus:ring-2 focus:ring-[#96ff00]"
            >
              Book a Meeting
            </a>
          </div>
          <div className="">
            <Image
              src={videocall}
              alt="Videocall"
              className="rounded-lg object-cover md:max-w-sm lg:max-w-full"
              width={500}
              height={300}
            />
          </div>
        </div>

        {/* Contact Form */}
        <div className="flex-1 lg:w-2/3">
          <ContactForm />
        </div>
      </div>
    </Bounded>
  );
};

export default ContactFormSlice;
