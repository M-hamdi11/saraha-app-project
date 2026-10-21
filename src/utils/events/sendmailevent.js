import { EventEmitter } from "events";
import { sendmails } from "../sendmailfunction/sendmail.js";
import { error_handler } from "../../errorHandling/errorclass.js";

export const email_event = new EventEmitter();

email_event.on("send-otp-email", async ({ email, otp }) => {
    try {
        await sendmails({
            to: email,
            subject: "كود التحقق من حسابك في Saraha App",
            html: `
    <div style="font-family: Arial, sans-serif; direction: rtl">
      <h2>مرحبًا بك في Saraha App</h2>
      <p>كود التحقق الخاص بك هو:</p>
      <h1 style="letter-spacing: 6px;">${otp}</h1>
      <p>الكود صالح لمدة 5 دقائق. لو مطلبتش الكود ده تجاهل الرسالة.</p>
    </div>
  `,
        });
    } catch (err) {
        throw new error_handler('Failed to send otp email')
    }
});
