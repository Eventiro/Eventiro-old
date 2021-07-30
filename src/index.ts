require("dotenv").config()

import {User} from "./entity/User"
import "reflect-metadata";
import { createConnection ,getRepository} from "typeorm";

import {join} from "path"
import * as session from "express-session"

import {hash} from "bcrypt"
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

        const userRepo = getRepository(User);

        const userCount = await userRepo.findOne({where:{email:req.body.email}})
        if(userCount){
            res.status(400);
            res.render("register",{error:"User already exists"})
            return
        }


        const{firstName,lastName,userName,password,email} = req.body
        const user = new User(
            firstName,lastName,userName,email,await hash(password,10)
        )

        await userRepo.save(user)

        res.render("register",{msg:"Success"})

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
