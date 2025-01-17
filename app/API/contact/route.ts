// Modified by Satoru Saito on 2023/05/16.
// Original source is https://github.com/luckystar628/Agency_Portfolio

import { NextResponse } from "next/server";
import { Resend } from "resend";
import EmailTemplate from "@/components/email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email, subject, message } = await req.json();

    if (!email || !subject || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 400 }
      );
    }

    const data = await resend.emails.send({
      from: "caltonmori2191004@gmail.com",
      to: ["luckystar000628@gmail.com"],
      replyTo: email,
      subject: subject,
      react: EmailTemplate({ subject, message }),
    });

    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
      data,
    });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send email",
      },
      { status: 500 }
    );
  }
}
