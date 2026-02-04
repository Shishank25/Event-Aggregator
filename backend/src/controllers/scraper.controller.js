import Event from "../models/Event.js";
import { fetchTimeoutEvents  } from "../scrapers/timeout.scraper.js";
import {
  fetchConcretePlaygroundEvents,
} from "../scrapers/concretepg.scraper.js";
import { runScrapers } from "../scrapers/index.js";


export const runTimeoutScraper = async (req, res) => {
  try {
    const scrapedEvents = await fetchTimeoutEvents();

    let newCount = 0;

    for (const scraped of scrapedEvents) {
      const exists = await Event.findOne({
        originalUrl: scraped.originalUrl,
      });

      if (!exists) {
        await Event.create({
          ...scraped,
          status: ["new"],
        });
        newCount++;
      }
    }

    res.json({
      message: "Time Out scrape complete",
      new: newCount,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const runConcretePlaygroundScraper = async (req, res) => {
  try {
    const scrapedEvents = await fetchConcretePlaygroundEvents();

    let newCount = 0;

    for (const scraped of scrapedEvents) {
      const exists = await Event.findOne({
        originalUrl: scraped.originalUrl,
      });

      if (!exists) {
        await Event.create({
          ...scraped,
          status: ["new"],
        });
        newCount++;
      }
    }

    res.json({
      message: "Concrete Playground scrape complete",
      new: newCount,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const runAllScrapers = async (req, res) => {
  try {
    const result = await runScrapers();
    res.json({
      message: "Scraping completed",
      ...result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Scraping failed" });
  }
}
