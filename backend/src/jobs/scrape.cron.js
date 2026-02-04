import cron from "node-cron";
import { runScrapers } from "../scrapers/index.js";

export const startScrapeCron = () => {
    console.log("[CRON] Scrape cron registered");
    
    cron.schedule("0 */3 * * *", async () => {
    console.log("[CRON] Cron scrape started");

    try {
      const result = await runScrapers();
      console.log("[CRON] Cron scrape finished", result);
    } catch (err) {
      console.error("[CRON] Cron scrape failed", err);
    }
  });
};
