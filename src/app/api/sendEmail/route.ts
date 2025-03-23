import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { supabase } from "../../../../lib/supabaseClient";

export async function POST(request: Request) {
  try {
    const { name, email, telephone, message } = await request.json();

    //1.Save data to Supabase
    const { error: supabaseError } = await supabase
      .from("form_submissions")
      .insert([{ name, email, telephone, message }]);
    if (supabaseError) {
      console.error("Error saving to Supabase:", supabaseError);
      return NextResponse.json(
        { message: "Failed to save form submission." },
        { status: 500 },
      );
    }

    //2.Send email notification
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "braveracreative@gmail.com", //Dedicated contact email if necessary
      subject: "New Form Submission",
      text: `Name: ${name}\nEmail: ${email}\nTelephone: ${telephone}\nMessage: ${message}`,
    });

    return NextResponse.json(
      { message: "Form submitted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error submitting form:", error);
    return NextResponse.json(
      { message: "Something went wrong. Please try again later." },
      { status: 500 },
    );
  }
}
