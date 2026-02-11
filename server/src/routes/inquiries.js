import express from "express";
import Inquiry from "../models/Inquiry.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", requireAuth, async (req, res) => {
  try {
    const items = await Inquiry.find().sort({ createdAt: -1 }).limit(50);
    res.json({ items });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch inquiries." });
  }
});

router.post("/", async (req, res) => {
  const { name, email, projectType, message } = req.body;

  if (!name || !email || !projectType || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const inquiry = await Inquiry.create({ name, email, projectType, message });
    res.status(201).json(inquiry);
  } catch (error) {
    res.status(500).json({ message: "Failed to create inquiry." });
  }
});

export default router;
