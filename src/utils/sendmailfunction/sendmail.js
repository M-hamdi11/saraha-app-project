import { transporter } from "../../common/clients/nodemailer.js";
import { error_handler } from "../../errorHandling/errorclass.js";

export async function sendmails({ to, subject = "No Subject", text, html }) {
    if (!to) {
        throw new error_handler("recipient (to) is required");
    }
    if (!text && !html) {
        throw new error_handler("please send text or html");
    }

    try {
        const info = await transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject,
            text,
            html,
        });

        console.log("Message sent: %s", info.messageId);
     
        return info;
    } catch (err) {
        console.error("Error while sending mail:", err);
        throw err;
    }
}