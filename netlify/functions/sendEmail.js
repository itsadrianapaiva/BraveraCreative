import nodemailer from "nodemailer";
import { createClient } from '@supabase/supabase-js';


console.log("Function started");

exports.handler = async (event) => {
  console.log("Event received:", event);

  if (event.httpMethod !== "POST") {
    console.log("Method not allowed");
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  let data;
  try {
    data = JSON.parse(event.body);
    console.log("Parsed data:", data);
  } catch (error) {
    console.error("Failed to parse body:", error);
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Invalid request body" }),
    };
  }

  const { name, email, telephone, message } = data;

  // Initialize Supabase
  console.log("Initializing Supabase");
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  // Save to Supabase
  console.log("Saving to Supabase");
  const { error: supabaseError } = await supabase
    .from("form_submissions")
    .insert([{ name, email, telephone, message }]);
  if (supabaseError) {
    console.error("Supabase error:", supabaseError);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to save form submission", error: supabaseError.message }),
    };
  }

  // Send email
  console.log("Setting up Nodemailer");
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  console.log("Sending email");
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: "braveracreative@gmail.com",
    subject: "New Form Submission",
    text: `Name: ${name}\nEmail: ${email}\nTelephone: ${telephone}\nMessage: ${message}`,
  });

  console.log("Function completed successfully");
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Form submitted successfully" }),
  };
};