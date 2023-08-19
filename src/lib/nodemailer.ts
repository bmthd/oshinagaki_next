import { createTransport } from "nodemailer";

const sendMail = async (email: string, message: string): Promise<boolean> => {
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

  const result = await transporter
    .sendMail(mailOptions)
    .then(() => {
      return true;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });

  return result;
};

export default sendMail;
