import express from "express";
import { redirectIfNoLogin } from "../authMiddleware";
import { User } from "../entity/User";
import { getRepository } from "typeorm";
import { Event } from "../entity/Event";

const app = express.Router();

app.use(redirectIfNoLogin);

app.get("/", (_, res) => {
  res.render("create");
});

app.post("/", async (req, res) => {
  const user = await getRepository(User).findOne(req.session.userId);

  const event = new Event();
  event.user = user;
  event.joinedMembers = 0;
  Object.assign(event, req.body);

  await getRepository(Event).save(event);
  res.render("create", { msg: "Success" });
});

export default app;
