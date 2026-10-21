import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service:"Gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.GMAIL_APP_PASS,
  },
});

export async function sendmail_connection() {
    try {
  await transporter.verify();
  console.log("Server is ready to take our messages");
} catch (err) {
  console.error("Verification failed:", err);
}
    
}