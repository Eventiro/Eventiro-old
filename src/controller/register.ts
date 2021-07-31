import { User } from "../entity/User";
import { hash } from "bcrypt";
import { getRepository } from "typeorm";
import express from "express";

// Mounted under /register
const app = express.Router();

app.get("/", async (req, res) => {
  res.render("register");
});

app.post("/", async (req, res) => {
  const userRepo = getRepository(User);

  const userCount = await userRepo.findOne({
    where: { email: req.body.email },
  });
  if (userCount) {
    res.status(400);
    res.render("register", { error: "User already exists" });
    return;
  }

  const { firstName, lastName, userName, password, email } = req.body;
  const user = new User(
    firstName,
    lastName,
    userName,
    email,
    await hash(password, 10)
  );

  await userRepo.save(user);

  res.render("register", { msg: "Success" });
});

export default app;
