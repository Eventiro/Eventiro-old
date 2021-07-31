import {
  getRepository,
  JoinTable,
} from ".pnpm/typeorm@0.2.35_pg@8.7.1/node_modules/typeorm";
import express from "express";
import { redirectIfNoLogin } from "../authMiddleware";
import { Event } from "../entity/Event";
import { JoinRequest } from "../entity/JoinRequest";
import { User } from "../entity/User";

const app = express.Router();
app.use(redirectIfNoLogin);

app.get("/", (req, res) => {
  res.redirect("/");
});

app.post("/", async (req, res) => {
  const eventId = req.body.id;

  const user = await getRepository(User).findOne(req.session.userId);
  const event = await getRepository(Event).findOne(eventId);

  if (event.joinedMembers === event.maxMembers) {
    res.render("join", { error: "max members reached" });
    return;
  }

  if (event.user.id === user.id) {
    res.render("join", { error: "can not send a request for your own event!" });
    return;
  }

  const joinReqRepo = getRepository(JoinRequest);

  const existing = await joinReqRepo.findOne({
    where: {
      user: user,
      event: event,
    },
  });

  if (existing) {
    res.render("join", {
      error: "Already sent a request. Wait for confirmation",
    });
    return;
  }

  const joinReq = new JoinRequest();
  joinReq.event = event;
  joinReq.user = user;
  joinReq.message = req.body.message;

  await joinReqRepo.save(joinReq);

  res.render("join", { msg: "success" });
});

export default app;
