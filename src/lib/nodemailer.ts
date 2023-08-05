import { createTransport } from "nodemailer";

const sendMail = async (email: string, message: string) => {
  const transporter = createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_ADDRESS,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.GMAIL_ADDRESS,
    subject: "コミケお品書きまとめサイト お問い合わせフォームからのメッセージ",
    text: message,
  };

  await transporter.sendMail(mailOptions);
};

export default sendMail;
