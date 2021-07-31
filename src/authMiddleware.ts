import express from "express";

export function redirectIfLogin(
  req: express.Request,
  res: express.Response,
  next: any
) {
  console.log("called");
  console.log(req.session.userId);
  if (req.session.userId) {
    console.log("here");
    res.redirect("/");
    return;
  }
  next();
}

export function redirectIfNoLogin(req: express.Request, res: express.Response) {
  if (!req.session.userId) {
    res.redirect("/login");
  }
}
