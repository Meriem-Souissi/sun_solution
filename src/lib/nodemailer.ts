import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true, // true pour le port 465, false pour les autres ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

type SendEmailParams = {
  subject: string;
  htmlContent: string;
  replyTo: string;
};

export async function sendEmail({
  subject,
  htmlContent,
  replyTo,
}: SendEmailParams) {
  const mailOptions = {
    from: `"Sun Solution" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_RECEIVER_EMAIL,
    replyTo: replyTo,
    subject: subject,
    html: htmlContent,
  };

  return transporter.sendMail(mailOptions);
}
