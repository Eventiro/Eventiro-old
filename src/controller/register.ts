import { User } from "../entity/User";
import { hash } from "bcrypt";
import { getRepository } from "typeorm";
import express from "express";
import { redirectIfLogin } from "../authMiddleware";

// Mounted under /register
const app = express.Router();

app.use(redirectIfLogin);

app.get("/", async (_, res) => {
  res.render("signup");
});

app.post("/", async (req, res) => {
  const userRepo = getRepository(User);

  const userCount = await userRepo.findOne({
    where: { email: req.body.email },
  });
  if (userCount) {
    res.render("signup", { error: "User already exists" });
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

  req.session.userId = user.id;
  res.render("signup", { msg: "Success" });
});

export default app;
