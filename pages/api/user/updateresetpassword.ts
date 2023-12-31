import { connect } from "db/mongoConfig";
import USER from "models/auth";
import bcrypt from "bcryptjs";

connect();
export default async function handler(req: any, res: any) {
  let user, hashPassword;
  const { token, updatePassword } = req.body;

  try {
    user = await USER.findOne({
      verifyToken: token,
      verifyTokenExpire: { $gt: Date.now() },
    });
  } catch (err) {
    return res.status(500).json({ message: "Find User Failed" });
  }

  if (!user) {
    return res.status(500).json({ message: "Sorry No User Found" });
  }

  if (updatePassword.trim().length < 6) {
    return res
      .status(500)
      .json({ message: "password must have at least six characters" });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    hashPassword = await bcrypt.hash(updatePassword, salt);
  } catch (err) {
    return res.status(500).json({ message: "hashpassword failed" });
  }

  user.password = hashPassword;
  user.verifyToken = undefined;
  user.verifyTokenExpire = undefined;

  try {
    await user.save();
  } catch (err) {
    return res.status(500).json({ message: "update user failed" });
  }

  return res.status(200).json({
    message: "Password update successfull",
  });
}
