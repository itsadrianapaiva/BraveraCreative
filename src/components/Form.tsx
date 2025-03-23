"use client";

import React, { useState } from "react";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { TiMail, TiPhoneOutline, TiTime } from "react-icons/ti";

type FormValues = {
  name: string;
  email: string;
  telephone: string;
  message: string;
};

const Form: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      //Sending form data to the /api/sendEmail endpoint
      await axios.post("/api/sendEmail", data);
      setSuccess("Message sent successfully! We'll be in touch soon.");
      reset();
    } catch (error) {
      console.error("Error sending message:", error);
      setError("Failed to send the message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative mx-auto mb-24 max-w-2xl sm:mx-0 md:mx-8 md:mt-16 lg:my-auto">
      <h2 className="mb-6 text-3xl font-semibold text-tertiary">
        We Can&apos;t Wait to Hear From You!
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name */}
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
            className="rounded-md border border-slate-100/20 bg-gray-600/20 p-2 text-white placeholder-gray-400 outline-none backdrop-blur-md focus:ring-2 focus:ring-gray-300"
          />
        </div>

        {/* Email */}
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
            className="rounded-md border border-slate-100/20 bg-gray-600/20 p-2 text-white placeholder-gray-400 outline-none backdrop-blur-md focus:ring-2 focus:ring-gray-300"
          />
        </div>

        {/* Telephone */}
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
            className="rounded-md border border-slate-100/20 bg-gray-600/20 p-2 text-white placeholder-gray-400 outline-none backdrop-blur-md focus:ring-2 focus:ring-gray-300"
          />
        </div>

        {/* Message */}
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
            className="h-32 resize-none rounded-md border border-slate-100/20 bg-gray-600/20 p-2 text-white placeholder-gray-400 outline-none backdrop-blur-md focus:ring-2 focus:ring-gray-300"
          />
        </div>

        <button
          type="submit"
          className="mt-4 w-full rounded-lg bg-[#96ff00]/20 px-4 py-2 text-white transition-all duration-300 hover:bg-[#96ff00]/40 focus:outline-none focus:ring-2 focus:ring-[#96ff00]"
          disabled={loading}
        >
          {loading ? "Sending..." : "Submit"}
        </button>

        {/* Feedback messages */}
        {success && <p className="mt-4 text-green-400">{success}</p>}
        {error && <p className="mt-4 text-red-400">{error}</p>}
      </form>

      {/* Contact Information */}
      <div className="mt-8 flex flex-col items-start space-y-4 text-gray-400">
        <div className="flex items-center gap-2">
          <TiMail />
          <p>braveracreative@gmail.com</p>
        </div>
        <div className="flex items-center gap-2">
          <TiPhoneOutline />
          <p>123-4567-891</p>
        </div>
        <div className="flex items-center gap-2">
          <TiTime />
          <p>Mon – Fri 9AM – 5PM</p>
        </div>
      </div>
    </div>
  );
};

export default Form;
