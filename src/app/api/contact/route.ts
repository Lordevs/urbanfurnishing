import { Resend } from "resend";
import { NextResponse } from "next/server";

// Initialize Resend with API Key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    // Basic validation
    if (!name || !email || !phone || !subject || !message) {
      return NextResponse.json(
        {
          error:
            "All fields (Name, Email, Phone, Subject, and Message) are mandatory.",
        },
        { status: 400 },
      );
    }

    // 1. Get the contact email from environment variables
    const contactEmail = process.env.CONTACT_EMAIL;
    if (!contactEmail) {
      throw new Error("CONTACT_EMAIL is not defined in environment variables");
    }

    // Detection for Resend testing tier (onboarding@resend.dev)
    const isTesting =
      !process.env.SENDER_EMAIL ||
      process.env.SENDER_EMAIL === "onboarding@resend.dev";

    // 1. Send lead notification email to the Company
    const leadEmailResult = await resend.emails.send({
      from: process.env.SENDER_EMAIL || "onboarding@resend.dev",
      to: contactEmail, // Always send leads to the defined contact email
      subject: `New Customer Inquiry: ${subject}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #1a1a1a; border-bottom: 2px solid #000; padding-bottom: 10px;">New Customer Inquiry</h2>
          <p>You have received a new contact form submission via Fadi Fragrance.</p>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Full Name:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Phone:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Subject:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${subject}</td>
            </tr>
          </table>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-radius: 5px;">
            <h3 style="margin-top: 0; font-size: 16px;">Message:</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>
          
          <p style="font-size: 12px; color: #666; margin-top: 30px; text-align: center;">
            Sent from Fadi Fragrance Website.
          </p>
        </div>
      `,
    });

    if (leadEmailResult.error) {
      throw new Error(
        `Inquiry notification failed: ${leadEmailResult.error.message}`,
      );
    }

    // 2. Send confirmation email to the Applicant
    const shopLink = `${process.env.NEXT_PUBLIC_FRONTEND_URL || "https://fadifragrance.com"}/shop`;

    await resend.emails.send({
      from: process.env.SENDER_EMAIL || "onboarding@resend.dev",
      to: isTesting ? contactEmail : email,
      subject: "Inquiry Received - Fadi Fragrance",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; text-align: center;">

          <h1 style="color: #000;">Thank You, ${name}!</h1>
          <p style="font-size: 16px; color: #333; line-height: 1.6;">
            We have received your inquiry regarding <strong>${subject}</strong>. 
            Our team will reach out to you within 24 hours.
          </p>
          
          <div style="margin: 40px 0; padding: 30px; background-color: #f4f4f4; border-radius: 15px;">
            <h2 style="margin-top: 0;">Explore Our Collection</h2>
            <p>Discover our latest fragrances and signature scents.</p>
            <a href="${shopLink}" style="display: inline-block; background-color: #000; color: white; padding: 15px 30px; text-decoration: none; border-radius: 30px; font-weight: bold; margin-top: 15px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);">
              Browse Shop
            </a>
          </div>
          
          <p style="font-size: 14px; color: #666;">
            Need immediate assistance? Reach out to our support team.
          </p>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
          
          <p style="font-size: 12px; color: #999;">
            Fadi Fragrance<br/>
            Premium Scent Collection
          </p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Inquiry sent successfully.",
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : "Something went wrong while sending your message.";
    console.error("Contact API Error:", error);
    return NextResponse.json(
      {
        error: message,
      },
      { status: 500 },
    );
  }
}
