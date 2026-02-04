import express from "express";
import { protect } from "../middleware/auth.js";
import Event from "../models/Event.js";

const router = express.Router();

router.get("/events", protect, async (req, res) => {
  const events = await Event.find().sort({
    createdAt: -1,
  });
  res.json(events);
});

router.post(
  "/events/:id/import",
  protect,
  async (req, res) => {
    const event = await Event.findById(req.params.id);
    if (!event)
      return res.status(404).json({ message: "Not found" });

    event.status = "imported";
    await event.save();

    res.json(event);
  }
);

export default router;
