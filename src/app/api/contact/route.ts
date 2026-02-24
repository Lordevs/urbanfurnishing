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
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #e8e4db; background-color: #ffffff;">
          <h2 style="color: #5c4d3d; border-bottom: 2px solid #5c4d3d; padding-bottom: 10px; font-weight: normal; margin-top: 0;">New Customer Inquiry</h2>
          <p style="color: #6b6256; line-height: 1.6;">You have received a new contact form submission via the <strong>Urban Furnishing</strong> website.</p>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 25px;">
            <tr>
              <td style="padding: 12px 10px; border-bottom: 1px solid #f6f4f0; font-weight: bold; color: #5c4d3d; width: 120px;">Full Name:</td>
              <td style="padding: 12px 10px; border-bottom: 1px solid #f6f4f0; color: #6b6256;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 10px; border-bottom: 1px solid #f6f4f0; font-weight: bold; color: #5c4d3d;">Email:</td>
              <td style="padding: 12px 10px; border-bottom: 1px solid #f6f4f0;"><a href="mailto:${email}" style="color: #8e8578; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 12px 10px; border-bottom: 1px solid #f6f4f0; font-weight: bold; color: #5c4d3d;">Phone:</td>
              <td style="padding: 12px 10px; border-bottom: 1px solid #f6f4f0; color: #6b6256;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 12px 10px; border-bottom: 1px solid #f6f4f0; font-weight: bold; color: #5c4d3d;">Subject:</td>
              <td style="padding: 12px 10px; border-bottom: 1px solid #f6f4f0; color: #6b6256;">${subject}</td>
            </tr>
          </table>
          
          <div style="margin-top: 30px; padding: 20px; background-color: #fdfaf6; border: 1px solid #f3efe8;">
            <h3 style="margin-top: 0; font-size: 14px; color: #5c4d3d; text-transform: uppercase; letter-spacing: 1px;">Message / Details</h3>
            <p style="white-space: pre-wrap; line-height: 1.6; color: #6b6256; margin-bottom: 0;">${message}</p>
          </div>
          
          <p style="font-size: 11px; color: #9A8C7A; margin-top: 40px; text-align: center; text-transform: uppercase; letter-spacing: 2px;">
            Sent securely via Urban Furnishing
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
    const urlBase =
      process.env.NEXT_PUBLIC_FRONTEND_URL || "https://urbanfurnishing.ae";
    const packagesLink = `${urlBase}/packages`;

    await resend.emails.send({
      from: process.env.SENDER_EMAIL || "onboarding@resend.dev",
      to: isTesting ? contactEmail : email,
      subject: "Inquiry Received - Urban Furnishing",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; text-align: center; background-color: #ffffff; border: 1px solid #e8e4db;">
          
          <div style="margin-bottom: 30px;">
            <h1 style="color: #5c4d3d; font-weight: normal; margin-bottom: 10px;">Thank You, ${name}.</h1>
            <div style="width: 40px; height: 1px; background-color: #d2cab9; margin: 0 auto;"></div>
          </div>

          <p style="font-size: 15px; color: #6b6256; line-height: 1.8; margin-bottom: 30px;">
            We successfully received your inquiry regarding <strong>${subject}</strong>. 
            Our regional team will review your project details and reach out to you shortly to schedule your consultation.
          </p>
          
          <div style="margin: 40px 0; padding: 40px 30px; background-color: #fdfaf6; border: 1px solid #f3efe8;">
            <h2 style="margin-top: 0; color: #5c4d3d; font-weight: normal; font-size: 20px;">Explore Our Pathways</h2>
            <p style="color: #8e8578; font-size: 14px; margin-bottom: 25px;">Discover our carefully designed turnkey furnishing pathways built for speed, quality, and design intent.</p>
            <a href="${packagesLink}" style="display: inline-block; background-color: #5D4E3C; color: #ffffff; padding: 14px 32px; text-decoration: none; font-weight: bold; font-size: 13px; letter-spacing: 1px; text-transform: uppercase;">
              View Packages
            </a>
          </div>
          
          <p style="font-size: 13px; color: #9A8C7A; margin-bottom: 40px;">
            Need immediate assistance? Feel free to reply to this email directly.
          </p>
          
          <div style="border-top: 1px solid #e8e4db; margin-top: 30px; padding-top: 30px;">
            <p style="font-size: 11px; color: #9A8C7A; text-transform: uppercase; letter-spacing: 2px;">
              Urban Furnishing<br/>
              <span style="display: inline-block; margin-top: 5px; color: #d2cab9;">Turnkey Furnishing & Fit-Out</span>
            </p>
          </div>
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
