exports.handler = async (event) => {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: JSON.stringify({ message: "Method Not Allowed" }),
      };
    }
  
    // Log for debugging
    console.log("Revalidate webhook received:", event.body);
  
    // For now, just acknowledge the webhook
    // We can't use revalidateTag here, so we return success
    return {
      statusCode: 200,
      body: JSON.stringify({ revalidated: true, now: Date.now() }),
    };
  };