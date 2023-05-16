import { Router } from "express";
import productManager from "../api/dao/productManagerDB.js"
const router= Router()
const pManager=new productManager()



router.get(`/realtimeproducts`,async(req,res)=>{
    let productos =[]
    productos=await pManager.getProducts()
    res.render("realTimeProducts",{showProducts:productos})
})

router.get(`/`,async(req,res)=>{
    let productos =[]
    productos=await pManager.getProducts()
    // console.log(productos)
    res.render("index",{showProducts:productos})
    
})

router.get(`/chat`,async(req,res)=>{
    
    res.render("chat",{})
})

export default router