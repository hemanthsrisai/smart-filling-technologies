import { NextResponse } from "next/server";

// TODO: Configure email service (Resend, SendGrid, etc.)
// Install: npm install resend
// import { Resend } from 'resend';
// const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields on the server side
    const { name, company, country, email, phone, machine } = body;
    if (!name || !company || !country || !email || !phone || !machine) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // TODO: Replace console.log with actual email sending service
    // Example with Resend:
    //
    // await resend.emails.send({
    //   from: 'Smart Filling Technologies <quotes@smartfillingtech.com>',
    //   to: 'sales@smartfillingtech.com',
    //   subject: `Quote Request: ${body.machine} from ${body.company} (${body.country})`,
    //   html: `
    //     <h2>New Quote Request</h2>
    //     <p><strong>Name:</strong> ${body.name}</p>
    //     <p><strong>Company:</strong> ${body.company}</p>
    //     <p><strong>Country:</strong> ${body.country}</p>
    //     <p><strong>Email:</strong> ${body.email}</p>
    //     <p><strong>Phone:</strong> ${body.phone}</p>
    //     <p><strong>Machine:</strong> ${body.machine}</p>
    //     <p><strong>Quantity:</strong> ${body.quantity || 'Not specified'}</p>
    //     <p><strong>Message:</strong> ${body.message || 'None'}</p>
    //   `,
    // });

    console.log("═══ QUOTE REQUEST RECEIVED ═══");
    console.log(JSON.stringify(body, null, 2));
    console.log("══════════════════════════════");

    return NextResponse.json({
      success: true,
      message: "Quote request received. We will contact you within 24 hours.",
    });
  } catch (error) {
    console.error("Quote submission error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to submit quote request. Please try again." },
      { status: 500 }
    );
  }
}
