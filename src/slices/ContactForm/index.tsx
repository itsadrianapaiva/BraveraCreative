"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type FormValues = {
  name: string;
  email: string;
  telephone: string;
  message: string;
};

const ContactForm: React.FC = () => {
  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
      {/* Scheduling Container */}
      <div className="flex flex-col items-start justify-center space-y-6 rounded-xl border border-slate-100/20 bg-gradient-to-b from-slate-500/10 to-black p-8 backdrop-blur-sm">
        <h3 className="text-2xl font-semibold text-white">
          Schedule a Free Meeting
        </h3>
        <p className="text-gray-300">
          Let&apos;s discuss how we can grow your business together!
        </p>
        <a
          href="https://calendly.com/braveracreative/meeting"
          target="_blank"
          className="mt-4 inline-block rounded-lg bg-[#96ff00]/20 px-4 py-2 text-white transition-all duration-300 hover:bg-[#96ff00]/40 focus:outline-none focus:ring-2 focus:ring-[#96ff00]"
        >
          Book a Meeting
        </a>
      </div>

      {/* Contact Form */}
      <div className="relative mx-auto -mt-24 mb-24 max-w-2xl rounded-xl border border-slate-100/20 bg-gradient-to-b from-slate-500/10 to-black px-8 py-8 backdrop-blur-sm lg:mx-0">
        <div className="glow absolute -z-10 aspect-square w-full max-w-xl rounded-full bg-[#96ff00]/15 blur-3xl filter" />
        <h2 className="mb-6 text-3xl font-semibold text-white">
          We can&apos;t wait to hear from you!
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col">
            <label
              className="mb-2 text-sm font-medium text-gray-300"
              htmlFor="name"
            >
              Name
            </label>
            <input
              id="name"
              {...register("name", { required: true })}
              placeholder="Your Name"
              className="rounded-md border border-slate-100/20 bg-black/20 p-2 text-white placeholder-gray-400 outline-none backdrop-blur-md focus:ring-2 focus:ring-[#96ff00]"
            />
          </div>

          <div className="flex flex-col">
            <label
              className="mb-2 text-sm font-medium text-gray-300"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              {...register("email", { required: true })}
              placeholder="Your Email"
              className="rounded-md border border-slate-100/20 bg-black/20 p-2 text-white placeholder-gray-400 outline-none backdrop-blur-md focus:ring-2 focus:ring-[#96ff00]"
            />
          </div>

          <div className="flex flex-col">
            <label
              className="mb-2 text-sm font-medium text-gray-300"
              htmlFor="telephone"
            >
              Telephone
            </label>
            <input
              id="telephone"
              {...register("telephone")}
              placeholder="Your Telephone"
              className="rounded-md border border-slate-100/20 bg-black/20 p-2 text-white placeholder-gray-400 outline-none backdrop-blur-md focus:ring-2 focus:ring-[#96ff00]"
            />
          </div>

          <div className="flex flex-col">
            <label
              className="mb-2 text-sm font-medium text-gray-300"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              id="message"
              {...register("message", { required: true })}
              placeholder="Your Message"
              className="h-32 resize-none rounded-md border border-slate-100/20 bg-black/20 p-2 text-white placeholder-gray-400 outline-none backdrop-blur-md focus:ring-2 focus:ring-[#96ff00]"
            />
          </div>

          <button
            type="submit"
            className="mt-4 w-full rounded-lg bg-[#96ff00]/20 px-4 py-2 text-white transition-all duration-300 hover:bg-[#96ff00]/40 focus:outline-none focus:ring-2 focus:ring-[#96ff00]"
          >
            Submit
          </button>
        </form>

        {/* Contact Information */}
        <div className="mt-8 text-center text-gray-400">
          <p>braveracreative@gmail.com</p>
          <p>123-4567-891</p>
          <p>Mon – Fri 9AM – 5PM</p>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
