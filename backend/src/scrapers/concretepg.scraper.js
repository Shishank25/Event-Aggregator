import axios from "axios";
import * as cheerio from "cheerio";
import crypto from "crypto";
import fs from "fs";
import { parseDate } from "../utils/date.js";

const BASE_URL = "https://concreteplayground.com";

const CATEGORIES = [
  "arts-entertainment",
];

const sleep = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const fetchConcretePlaygroundEvents = async () => {
  const allEvents = [];

  for (const category of CATEGORIES) {
    await sleep(2000);
    const url = `${BASE_URL}/sydney/events/?categories=${category}`;

    const { data: html } = await axios.get(url, {
        headers: {
        "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Accept":
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Referer": "https://concreteplayground.com/",
        },
        timeout: 15000,
    });

    // console.log("HTML length:", html.length);
    // fs.writeFileSync("cp.html", html);

    const $ = cheerio.load(html);

    // Fixed selector - the actual structure uses "li.item.content-card"
    $("li.item.content-card").each((_, el) => {
      // Title is inside h2.name.title a
      const title = $(el)
        .find("h2.name.title a")
        .text()
        .trim();

      // Link is from the h2.name.title a href
      const link = $(el)
        .find("h2.name.title a")
        .attr("href");

      if (!title || !link) return;

      // Description is in p.excerpt
      const description = $(el)
        .find("p.excerpt")
        .text()
        .trim();

      // Date is in p.dates
      const dateText = $(el)
        .find("p.dates")
        .text()
        .trim();

      // Venue is in p.nearestPlace
      const venue = $(el)
        .find("p.nearestPlace")
        .text()
        .trim();

      // Image URL - get the src from the first img tag
      const imageUrl =
        $(el).find("img").first().attr("src") || "";

      // You can also extract from data attributes on the li element
      const dataUrl = $(el).attr("data-url") || "";
      const dataTitle = $(el).attr("data-title") || "";
      const latitude = $(el).attr("data-latitude") || "";
      const longitude = $(el).attr("data-longitude") || "";

      console.log("Scraped event:", {
        title,
        link,
        description,
        dateText,
        venue,
        imageUrl,
        dataUrl,
        latitude,
        longitude
      });

      const normalized = {
        title,
        description,
        date: parseDate(dateText),
        venue,
        address: "",
        city: "Sydney",
        imageUrl,
        category: [category],
        source: "Concrete Playground",
        originalUrl: link || dataUrl,
        lastScrapedAt: new Date(),
        // Optional: store coordinates if you need them
        latitude: latitude ? parseFloat(latitude) : null,
        longitude: longitude ? parseFloat(longitude) : null,
      };

      normalized.hash = crypto
        .createHash("sha256")
        .update(JSON.stringify(normalized))
        .digest("hex");

      allEvents.push(normalized);
    });
  }

  console.log("Total events extracted:", allEvents.length);
  console.log("First 2 events:", JSON.stringify(allEvents.slice(0, 2), null, 2));

  return allEvents;
};