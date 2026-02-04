import express from "express";
import {
  runTimeoutScraper,
  runConcretePlaygroundScraper,
  runAllScrapers,
} from "../controllers/scraper.controller.js";

const router = express.Router();

router.get("/timeout", runTimeoutScraper);
router.get("/concrete-playground", runConcretePlaygroundScraper);
router.get("/run", runAllScrapers);

export default router;
