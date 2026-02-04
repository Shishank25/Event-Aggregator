import Event from "../models/Event.js";
import { fetchTimeoutEvents } from "./timeout.scraper.js";
import { fetchConcretePlaygroundEvents } from "./concretepg.scraper.js";

export const runScrapers = async () => {
  console.log("🚀 Running all scrapers...");

  let allEvents = [];

  try {
    const timeoutEvents = await fetchTimeoutEvents();
    console.log(`⏱️ Time Out: ${timeoutEvents.length} events`);
    allEvents.push(...timeoutEvents);
  } catch (err) {
    console.error("❌ Time Out scraper failed", err);
  }

  try {
    const concreteEvents = await fetchConcretePlaygroundEvents();
    console.log(
      `🧱 Concrete Playground: ${concreteEvents.length} events`
    );
    allEvents.push(...concreteEvents);
  } catch (err) {
    console.error("❌ Concrete Playground scraper failed", err);
  }

  console.log(`📦 Total scraped events: ${allEvents.length}`);

  let inserted = 0;
  let skipped = 0;

  for (const event of allEvents) {
    const result = await Event.updateOne(
      { originalUrl: event.originalUrl },
      {
        $setOnInsert: {
          ...event,
          status: ["pending"], // IMPORTANT
        },
      },
      { upsert: true }
    );

    if (result.upsertedCount > 0) {
      inserted++;
    } else {
      skipped++;
    }
  }

  console.log(
    `✅ Scraper finished: ${inserted} inserted, ${skipped} skipped`
  );

  return {
    totalScraped: allEvents.length,
    inserted,
    skipped,
  };
};
