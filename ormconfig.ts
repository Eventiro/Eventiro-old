require("dotenv").config();

//For secure connection:
import * as fs from "fs";

module.exports = {
  type: "cockroachdb",
  host: process.env.HOST,
  port: 26257,
  username: process.env.USER,
  password: process.env.PASS,
  database: process.env.DB,
  //For secure connection:
  ssl: {
    ca: fs.readFileSync("./cert.crt").toString(),
  },
  synchronize: true,
  logging: false,
  entities: ["src/entity/**/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber",
  },
};
