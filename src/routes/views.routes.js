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

router.get(`/products`,async(req,res)=>{
    // let productos =[]
    // productos=await pManager.getProductsLimit()
    // // console.log(productos)
    // console.log(JSON.stringify(productos))
    // res.render("products",{showProducts:productos})


    let limit = parseInt(req.query.limit)||10
    let page=parseInt(req.query.page)||1
    let category=(req.query.category)||false
    let status=(req.query.status)||false
    let sort=(req.query.sort)=="asc"?1:(req.query.sort)=="desc"?-1:false
    let filter={limit:limit,page:page,category:category,status:status,sort:sort}
    let regex=new RegExp(/page=[0-9]+$/)
    let newNextLink
    const process=await pManager.getProductsLimit(filter)
    let prevLink=process.hasPrevPage==false?null:process.page-1
    let nextLink=process.hasNextPage==false?null:process.page+1
    let newPrevUrl=prevLink==null?null:"localhost:8080"+req.url.replace(/page=[0-9]+$/,`page=${prevLink}`)
    
    if(regex.test(req.url)){
        newNextLink=nextLink==null?null:"localhost:8080"+req.url.replace(/page=[0-9]+$/,`page=${nextLink}`)
    }else{
        newNextLink=nextLink==null?null:"localhost:8080"+req.url+"?page=2"
    }
               
    process.prevLink=newPrevUrl
    process.nextLink=newNextLink

    
    res.render("products",{showProducts:process})


    
})

export default router