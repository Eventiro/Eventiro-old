require("dotenv").config()

import "reflect-metadata";
import { createConnection } from "typeorm";

import {join} from "path"
import * as session from "express-session"

const express = require("express")

async function main(){

    await createConnection();

    const app = express()
    app.set('view engine','pug')
    app.set('views', join(__dirname,"/views"))
    app.use(express.urlencoded())
    app.use(session({
        secret:process.env.SECRET,
        name:"eventiro",
        saveUninitialized:false
    }))

    app.get("/",async(req,res)=>{
        res.render('index')
    })

    app.get("/register",async(req,res)=>{
        res.render("register")
    })

    app.post("/register",async(req,res)=>{
        res.render("register")
    })

    app.get("/login",async(req,res)=>{
        res.render("login")
    })

    app.post("/login",async(req,res)=>{
        res.render("login")
    })

    app.listen(5002)
}

main()
