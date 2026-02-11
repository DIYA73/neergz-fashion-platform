import express from "express";
import { signToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const adminEmail = process.env.ADMIN_EMAIL || "admin@neergz.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "changeme";

  if (email !== adminEmail || password !== adminPassword) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = signToken({ email });
  return res.json({ token });
});

export default router;
