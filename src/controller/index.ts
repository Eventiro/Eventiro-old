import { getRepository } from ".pnpm/typeorm@0.2.35_pg@8.7.1/node_modules/typeorm";
import express from "express";
import { redirectIfNoLogin } from "../authMiddleware";
import { Event } from "../entity/Event";

const app = express.Router();
app.use(redirectIfNoLogin);

app.get("/", async (req, res) => {
  const events = await getRepository(Event).find({relations:["user"]});

  res.render("home", { isLoggedIn: req.session.userId, events,event: events[0] });
});

export default app;
