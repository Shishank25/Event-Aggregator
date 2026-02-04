import express from "express";
import Event from "../models/Event.js";
import { getEvents } from "../controllers/event.controller.js";

const router = express.Router();

/**
 * GET /api/events
 * Public endpoint
 * Supports filters later (city, keyword, date)
 */
router.get("/", getEvents);

export default router;
