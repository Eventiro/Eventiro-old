import { getRepository } from ".pnpm/typeorm@0.2.35_pg@8.7.1/node_modules/typeorm";
import express from "express";
import { redirectIfNoLogin } from "../authMiddleware";
import { Event } from "../entity/Event";
import { JoinRequest } from "../entity/JoinRequest";
import { User } from "../entity/User";

const app = express.Router();
app.use(redirectIfNoLogin);

app.get("/:id/manage", async (req, res) => {
  const eventId = req.params.id;

  const user = await getRepository(User).findOne(req.session.userId);
  const event = await getRepository(Event).findOne({
    where: { id: eventId },
    relations: ["user"],
  });
  console.log(event);

  if (event.user.id !== user.id) {
    res.render("eventManage", { error: "You do not own this event" });
    return;
  }

  const joinRequests = await getRepository(JoinRequest).find({
    where: {
      event,
    },
    relations: ["user", "event"],
  });

  console.log(joinRequests);
  res.render("eventManage", { joinRequests });
});

app.post("/:id/manage", async (req, res) => {
  const eventId = req.params.id;

  const user = await getRepository(User).findOne(req.session.userId);
  const event = await getRepository(Event).findOne({
    where: { id: eventId },
    relations: ["user"],
  });
  console.log(event);

  if (event.user.id !== user.id) {
    res.render("eventManage", { error: "You do not own this event" });
    return;
  }

  const mutType = req.body.type;

  if (!mutType) {
    res.render("eventManage", { error: "incorrect mutation type" });
    return;
  }

  const status = getStatus(mutType);
  const { joinReqId } = req.body;

  await getRepository(JoinRequest).update(joinReqId, {
    status,
  });

  res.render("eventManage", { message: "success" });
});

app.get("/:id", async (req, res) => {
  const user = await getRepository(User).findOne(req.session.userId);
  const event = await getRepository(Event).findOne(req.params.id);

  const joinReq = await getRepository(JoinRequest).findOne({
    where: {
      user,
      event,
    },
  });

  if (!joinReq) {
    // TODO logic
    res.render("event", { error: "no access" });

    return;
  }

  res.render("event", { message: joinReq.status });
});

function getStatus(mutType: string) {
  return mutType === "allow" ? "ALLOW" : "DISALLOW";
}

export default app;
