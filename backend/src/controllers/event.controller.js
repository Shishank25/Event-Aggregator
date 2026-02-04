import Event from "../models/Event.js";

/**
 * GET /api/events
 */
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find({
      status: { $ne: "inactive" }
    }).sort({ date: 1 });

    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
