import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../../lib/supabaseClient";

//For email notifications (configure later)
import nodemailer from "nodemailer";

type FormValues = {
  name: string;
  email: string;
  telephone: string;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, telephone, message }: FormValues = req.body;

  //1.Validate Input
  if (!name || !email || !telephone || !message) {
    return res.status(400).json({ error: "Please fill in all fields" });
  }
  try {
    //2.Insert data into Supabase
    const { data, error } = await supabase
      .from("form_submissions")
      .insert([{ name, email, telephone, message }]);

    if (error) throw error;

    //3.Send email notification (will configure this later)
    await sendNotificationEmail({ name, email, telephone, message });

    return res
      .status(200)
      .json({ message: "Form submitted successfully", data });
  } catch (error) {
    console.error("Error submitting form:", error);
    return res
      .status(500)
      .json({ error: "Failed to submit form. Please try again later." });
  }
}

//Helper function to send email notification
async function sendNotificationEmail(formData: FormValues) {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
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

  await transporter.sendMail(mailOptions);
}
