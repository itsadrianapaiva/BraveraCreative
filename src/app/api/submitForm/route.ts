import { NextResponse } from "next/server";
import { supabase } from "../../../../lib/supabaseClient";
import nodemailer from "nodemailer";

type FormValues = {
  name: string;
  email: string;
  telephone: string;
  message: string;
};

export async function POST(request: Request) {
  // Convert request handling
  const formData: FormValues = await request.json();

  // Validation
  if (
    !formData.name ||
    !formData.email ||
    !formData.telephone ||
    !formData.message
  ) {
    return NextResponse.json(
      { error: "Please fill in all fields" },
      { status: 400 },
    );
  }
  try {
    const { data, error } = await supabase.from("form_submissions").insert([
      {
        name: formData.name,
        email: formData.email,
        telephone: formData.telephone,
        message: formData.message,
      },
    ]);

    if (error) {
      console.error("Supabase insert error:", error);
      throw error;
    }

    //Send email notification
    await sendNotificationEmail(formData);

    return NextResponse.json(
      { message: "Form submitted successfully", data },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error submitting form:", error);
    return NextResponse.json(
      { error: "Failed to submit form. Please try again later." },
      { status: 500 },
    );
  }
}

//Helper function to send email notification
async function sendNotificationEmail(formData: FormValues) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "braveracreative@gmail.com",
    subject: "New Form Submission - Bravera Agency",
    text: `You have a new form submission:\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.telephone}\nMessage: ${formData.message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (mailError) {
    console.error("Nodemailer sendMail error:", mailError);
    throw mailError;
  }
  
}
