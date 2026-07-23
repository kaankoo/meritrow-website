// Cloudflare Pages Function endpoint: /api/contact
export async function onRequestPost(context) {
  try {
    const request = context.request;
    const data = await request.json();

    console.log("New MeritRow Lead Captured:", JSON.stringify(data));

    if (context.env && context.env.RESEND_API_KEY && context.env.NOTIFICATION_EMAIL) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${context.env.RESEND_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: "leads@meritrow.com",
          to: context.env.NOTIFICATION_EMAIL,
          subject: `New MeritRow Lead: ${data.name} (${data.company})`,
          html: `
            <h2>New Enterprise Lead Received</h2>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Company:</strong> ${data.company}</p>
            <p><strong>Role Needed:</strong> ${data.roleNeed}</p>
            <p><strong>Team Size:</strong> ${data.teamSize}</p>
            <p><strong>Timeline:</strong> ${data.timeline}</p>
            <p><strong>Message:</strong> ${data.message}</p>
          `
        })
      });
    }

    return new Response(JSON.stringify({ success: true, message: "Lead captured successfully" }), {
      headers: { "Content-Type": "application/json" },
      status: 200
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500
    });
  }
}
