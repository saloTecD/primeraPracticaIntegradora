import { Router } from "express";
import cartManager from "../api/dao/cartManagerDB.js"
import productManager from "../api/dao/productManagerDB.js"

const router= Router()
const cManager=new cartManager()
const pManager=new productManager()
router.post(`/carts`,async(req,res)=>{
    res.status(200).send(await cManager.createCart())
})

router.get(`/carts/:cid`,async(req,res)=>{
    let id=req.params.cid
    res.status(200).send(await cManager.listCartProducts(id))
})

router.post(`/carts/:cid/product/:pid`,async(req,res)=>{
    let cid=req.params.cid
    let pid=req.params.pid
    if(await pManager.getProductById(pid)==="Not Found"){
        
        res.status(200).send("El producto que quieres agregar no existe")
    }else{
    res.status(200).send(await cManager.addCartProduct(cid,pid))
    }
})

export default router