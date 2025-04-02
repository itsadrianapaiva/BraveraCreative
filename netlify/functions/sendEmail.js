const nodemailer = require("nodemailer");
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_KEY,
);

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { name, email, telephone, message } = JSON.parse(event.body);

  const { error: supabaseError } = await supabase
    .from("form_submissions")
    .insert([{ name, email, telephone, message }]);
  if (supabaseError) {
    console.error("Supabase error:", supabaseError);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to save form submission." }),
    };
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: "braveracreative@gmail.com",
    subject: "New Form Submission",
    text: `Name: ${name}\nEmail: ${email}\nTelephone: ${telephone}\nMessage: ${message}`,
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Form submitted successfully" }),
  };
};
