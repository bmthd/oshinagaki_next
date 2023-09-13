"use server";
import sendMail from "@/lib/nodemailer";

export const processFormData = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;
  const result = await sendMail(email, message);
  return result;
};
