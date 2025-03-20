"use client";

import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { usePathname } from "next/navigation";
import React from "react";
import Bounded from "@/components/Bounded";
import Image from "next/image";
import videocall from "./videocall.png";
import Form from "@/components/Form";

/**
 * Props for `Contact`.
 */
export type ContactProps = SliceComponentProps<Content.ContactSlice>;

/**
 * Component for "Contact" Slices.
 */
const Contact: FC<ContactProps> = ({ slice }) => {
  const pathname = usePathname();
  const isContactPage = pathname?.includes("/contact");

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={`${isContactPage ? "-mt-56" : "mt-20"}`} // Adjust margin top based on the page
    >
      {/* Heading */}
      <div className="max-w-2xl text-balance text-center text-5xl font-medium md:text-6xl">
        <PrismicRichText field={slice.primary.heading} />
      </div>

      {/* Body */}
      <div className="mx-auto mb-24 mt-6 max-w-md text-balance text-center text-tertiary">
        <PrismicRichText field={slice.primary.body} />
      </div>

      <div className="relative flex flex-col items-start space-y-12 md:space-x-6 md:space-y-0 lg:flex-row lg:space-x-10">
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
          <Form />
        </div>
      </div>
    </Bounded>
  );
};

export default Contact;
