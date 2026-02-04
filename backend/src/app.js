import "dotenv/config";

import express from "express";
import cors from "cors";
import passport from "passport";
import "./config/passport.js";

// Route Imports
import eventRoutes from "./routes/events.routes.js";
import scraperRoutes from "./routes/scraper.routes.js";
import subscriptionRoutes from "./routes/subscription.routes.js";
import authRoutes from "./routes/auth.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";


const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());


// Routes
app.use("/api/events", eventRoutes);
app.use("/api/scrape", scraperRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
  res.send("API running");
});

export default app;
