import axios from "axios";
import * as cheerio from "cheerio";
import crypto from "crypto";

export const fetchTimeoutEvents = async () => {
  const url = "https://www.timeout.com/sydney/things-to-do";

  const { data: html } = await axios.get(url, {
    headers: {
      "User-Agent": "Mozilla/5.0",
    },
  });

  const $ = cheerio.load(html);
  const events = [];

  $("article").each((_, el) => {
  const title = $(el).find("h3").first().text().trim();

  const description = $(el)
    .find("p")
    .first()
    .text()
    .trim();

  const link = $(el).find("a").attr("href");

  if (!title || !link) return;

  // 🔥 IMAGE EXTRACTION
  const img = $(el).find("img").first();

  let imageUrl =
    img.attr("src") ||
    img.attr("data-src") ||
    img.attr("data-original") ||
    "";

  // Handle srcset
  if (!imageUrl) {
    const srcset = img.attr("srcset");
    if (srcset) {
      imageUrl = srcset.split(",")[0].split(" ")[0];
    }
  }

  // Convert relative → absolute
  if (imageUrl && imageUrl.startsWith("/")) {
    imageUrl = `https://www.timeout.com${imageUrl}`;
  }

  const normalized = {
    title,
    description,
    date: null,
    venue: "",
    address: "",
    city: "Sydney",
    imageUrl,
    category: ["Things to do"],
    source: "Time Out Sydney",
    originalUrl: link.startsWith("http")
      ? link
      : `https://www.timeout.com${link}`,
    lastScrapedAt: new Date(),
  };

  normalized.hash = crypto
    .createHash("sha256")
    .update(JSON.stringify(normalized))
    .digest("hex");

  events.push(normalized);
});


  return events;
};
