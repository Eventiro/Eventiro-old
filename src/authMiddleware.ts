import express from "express";

export function redirectIfLogin(
  req: express.Request,
  res: express.Response,
  next: any
) {
  if (req.session.userId) {
    res.redirect("/");
    return;
  }
  next();
}

export function redirectIfNoLogin(
  req: express.Request,
  res: express.Response,
  next: any
) {
  if (!req.session.userId) {
    res.redirect("/login");
    return;
  }
  next();
}
