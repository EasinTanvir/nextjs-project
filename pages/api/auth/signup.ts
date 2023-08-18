import { connect } from "db/mongoConfig";
import USER from "models/auth";
import bcrypt from "bcryptjs";

connect();
export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    let user, hashPassword, existingUser, existingEmail;
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
      return res.status(500).json({ message: "Invalid Credentials" });
    }

    try {
      existingUser = await USER.findOne({
        userName: { $regex: new RegExp(userName, "i") },
      });
    } catch (err) {
      return res.status(500).json({ message: "find Email failed" });
    }
    try {
      existingEmail = await USER.findOne({
        email: { $regex: new RegExp(email, "i") },
      });
    } catch (err) {
      return res.status(500).json({ message: "find Email failed" });
    }

    if (existingUser) {
      return res.status(500).json({ message: "Sorry UserName already taken" });
    }
    if (existingEmail) {
      return res.status(500).json({ message: "Sorry Email already taken" });
    }

    if (password.trim().length < 6) {
      return res
        .status(500)
        .json({ message: "password must have at least six characters" });
    }

    try {
      const salt = await bcrypt.genSalt(10);
      hashPassword = await bcrypt.hash(password, salt);
    } catch (err) {
      return res.status(500).json({ message: "hashpassword failed" });
    }

    try {
      user = await USER.create({ ...req.body, password: hashPassword });
    } catch (err) {
      return res.status(500).json({ message: "Create user failed" });
    }
    return res
      .status(200)
      .json({ user: "Registration Successful. Please Login" });
  }
}
