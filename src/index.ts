require("dotenv").config();

import "reflect-metadata";
import { createConnection } from "typeorm";

import { join } from "path";
import session from "express-session";

import express from "express";

import register from "./controller/register";

async function main() {
  await createConnection();

  const app = express();
  app.set("view engine", "pug");
  app.set("views", join(__dirname, "/views"));
  app.use(express.urlencoded());
  app.use(
    session({
      secret: process.env.SECRET,
      name: "eventiro",
      saveUninitialized: false,
    })
  );

  app.use("/register", register);

  app.get("/", async (req, res) => {
    res.render("index");
  });

  app.get("/login", async (req, res) => {
    res.render("login");
  });

  app.post("/login", async (req, res) => {
    res.render("login");
  });

  app.listen(5002);
}

main();
