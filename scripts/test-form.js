import axios from "axios";

// Dummy form data to simulate a submission
const formData = {
  name: "Test User",
  email: "test@example.com",
  telephone: "+14374484877", // A valid phone number format
  message: "This is a test message from the automation script.",
};

// Function to test the form submission
async function testFormSubmission() {
  try {
    // Send POST request to the Netlify function
    const response = await axios.post(
      "https://braveracreative.com/.netlify/functions/sendEmail",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    // Check if the response status is 200 (success)
    if (response.status === 200) {
      console.log("Form submission successful:", response.data);
      process.exit(0); // Exit with success code
    } else {
      console.error("Unexpected status code:", response.status);
      process.exit(1); // Exit with failure code
    }
  } catch (error) {
    // Log any errors (e.g., network issues, server errors)
    console.error("Form submission failed:", error.message);
    process.exit(1); // Exit with failure code
  }
}

// Run the test
testFormSubmission();
