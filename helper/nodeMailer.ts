import nodemailer from "nodemailer";
import USER from "models/auth";
import bcrypt from "bcryptjs";

export const sendEmail = async ({ email }: any) => {
  try {
    const token = await bcrypt.hash(email.toString(), 10);

    await USER.findOneAndUpdate(
      { email: email },
      {
        verifyToken: token,
        verifyTokenExpire: Date.now() + 3600000,
      },
      { new: true }
    );

    return token;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
