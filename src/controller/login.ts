import { getRepository } from ".pnpm/typeorm@0.2.35_pg@8.7.1/node_modules/typeorm";
import express from "express";
import { User } from "../entity/User";
import { compare } from "bcrypt";
import { redirectIfLogin } from "../authMiddleware";

const app = express.Router();

app.use(redirectIfLogin);

app.get("/", (req, res) => {
  res.render("login");
});

app.post("/", async (req, res) => {
  const { email, password } = req.body;

  const userRepo = getRepository(User);

  const user = await userRepo.findOne({
    where: {
      email,
    },
  });

  if (!user) {
    res.render("login", {
      error: "User with given credentials does not exist",
    });
    return;
  }

  if (!compare(password, user.password)) {
    res.render("login", {
      error: "User with given credentials does not exist",
    });
    return;
  }

  req.session.userId = user.id;
  res.render("login", { msg: "Sucess" });
});

export default app;
