/* eslint-disable @typescript-eslint/no-require-imports */
const axios = require("axios");
const { createClient } = require("@supabase/supabase-js");

// Dummy form data with a unique identifier
const uniqueMessage = `Test message from automation - ${Date.now()}`; // Unique timestamp
const formData = {
  name: "Test User",
  email: "test@example.com",
  telephone: "+14374484877",
  message: uniqueMessage,
};

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

async function testFormSubmission() {
  try {
    // Step 1: Send POST request to the Netlify function
    const response = await axios.post(
      "https://braveracreative.com/.netlify/functions/sendEmail",
      formData,
      {
        headers: { "Content-Type": "application/json" },
      },
    );

    if (response.status !== 200) {
      console.error("Unexpected status code:", response.status);
      process.exit(1);
    }
    console.log("Form submission sent successfully:", response.data);

    // Step 2: Verify the data in Supabase
    const { data, error } = await supabase
      .from("form_submissions")
      .select("*")
      .eq("message", uniqueMessage) // Match the unique message
      .single(); // Expect one row

    if (error || !data) {
      console.error(
        "Supabase verification failed:",
        error?.message || "No data found",
      );
      process.exit(1);
    }

    console.log("Supabase verification successful:", data);
    process.exit(0); // All checks passed
  } catch (error) {
    console.error("Test failed:", error.message);
    process.exit(1);
  }
}

// Run the test
testFormSubmission();
