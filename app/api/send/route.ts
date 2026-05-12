import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { subject, name, email, message } = await req.json();

    const data = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>', // Sa simula, ito muna gamitin mo
      to: ['kevinrehan16@gmail.com'], // Dito mo matatanggap ang message
      subject: `My Portfolio Email: New Message from ${name}: ${subject}`,
      replyTo: email,
      text: message,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}