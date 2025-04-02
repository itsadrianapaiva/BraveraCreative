"use client";

import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { usePathname } from "next/navigation";
import Bounded from "@/components/Bounded";
import Image from "next/image";
import videocall from "./videocall.png";
import Form from "@/components/Form";

export type ContactProps = SliceComponentProps<Content.ContactSlice>;

const Contact: FC<ContactProps> = ({ slice }) => {
  const pathname = usePathname();
  const lang = pathname?.startsWith("/pt-br") ? "pt-br" : "en";
  const isContactPage = pathname?.includes("/contact");

  // Language-specific text
  const scheduling = {
    "en": {
      title: "Book a Free 30-Minute Strategy Session",
      description:
        "Want to know how to elevate your business to achieve its goal? Schedule a complimentary strategy session with Gustavo, our CEO, to discuss your goals and brainstorm ideas for the future. Let’s build your path to success!",
      button: "Book a Meeting",
    },
    "pt-br": {
      title: "Agende uma Sessão Estratégica Gratuita de 30 Minutos",
      description:
        "Quer saber como elevar seu negócio para alcançar seus objetivos? Agende uma sessão estratégica gratuita com Gustavo, nosso CEO, para discutir suas metas e trocar ideias para o futuro. Vamos construir seu caminho para o sucesso!",
      button: "Agendar uma Reunião",
    },
  };

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={`${isContactPage ? "-mt-56" : "mt-12"}`}
    >
      {/* Heading */}
      <div className="max-w-2xl text-balance text-center text-5xl font-medium md:text-6xl">
        <PrismicRichText field={slice.primary.heading} />
      </div>

      {/* Body */}
      <div className="mx-auto mb-24 mt-6 max-w-md text-balance text-center text-tertiary">
        <PrismicRichText field={slice.primary.body} />
      </div>

      <div className="relative flex flex-col items-start space-y-12 px-2 md:space-x-6 md:space-y-0 lg:flex-row lg:space-x-10">
        {/* Scheduling Container */}
        <div className="glass-container flex flex-col items-start justify-center space-y-6 rounded-xl bg-gradient-to-b from-slate-500/10 to-black p-8 md:flex-row md:gap-8 lg:w-1/3 lg:flex-col-reverse">
          <div className="space-y-4 md:space-y-6">
            <h3 className="text-balance text-2xl font-semibold text-tertiary">
              {scheduling[lang].title}
            </h3>
            <p className="text-balance text-gray-300">
              {scheduling[lang].description}
            </p>
            <a
              href="https://calendly.com/braveracreative/meeting"
              target="_blank"
              className="mt-4 inline-block rounded-lg bg-[#96ff00]/20 px-4 py-2 text-white transition-all duration-300 hover:bg-[#96ff00]/40 focus:outline-none focus:ring-2 focus:ring-[#96ff00]"
            >
              {scheduling[lang].button}
            </a>
          </div>
          <div className="">
            <Image
              src={videocall}
              alt="Videocall"
              className="h-auto rounded-lg object-cover md:max-w-sm lg:max-w-full"
              width={500}
            />
          </div>
        </div>

        {/* Contact Form */}
        <div className="flex-1 lg:w-2/3">
          <Form lang={lang} />
        </div>
      </div>
    </Bounded>
  );
};

export default Contact;