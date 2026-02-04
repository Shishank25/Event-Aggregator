import EmailSubscription from "../models/EmailSubscription.js";

export const createSubscription = async (req, res) => {
  try {
    const { email, consent, eventId } = req.body;

    if (!email || !consent || !eventId) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const subscription = await EmailSubscription.create({
      email,
      consent,
      eventId,
    });

    res.status(201).json(subscription);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
