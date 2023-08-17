import { connect } from "db/mongoConfig";
import USER from "models/auth";
import { sendEmail } from "helper/nodeMailer";

connect();
export default async function handler(req: any, res: any) {
  let user;
  const { email } = req.body;

  try {
    user = await USER.findOne({ email });
  } catch (err) {
    return res.status(500).json({ message: "Find User Failed" });
  }

  if (!user) {
    return res.status(500).json({ message: "Invalid Email Address" });
  }

  const token = await sendEmail({ email });

  return res.status(200).json({
    token,
    message: "Password reset email has been sent to your email address",
  });
}
