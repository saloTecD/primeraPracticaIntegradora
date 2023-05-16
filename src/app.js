import {} from "dotenv/config"
import express from "express";
import router from "../src/routes/products.routes.js"
import routerCart from "../src/routes/carts.routes.js"
import {__dirname} from "../src/utils.js"
import { engine } from "express-handlebars"
import views from "./routes/views.routes.js"
import  mongoose from "mongoose"
import {Server} from "socket.io"

const PORT=parseInt(process.env.PORT)
const server = express()
const MONGOOSEURL=process.env.MONGOOSEURL

try{
    await mongoose.connect(MONGOOSEURL)
    const httpServer=server.listen(PORT,()=>console.log("Listening on PORT 8080"))
    const io=new Server(httpServer)


// Integracion Chat----------------------------------------------------------------------------------
let messages=[]
io.on('connection',socket=>{
    console.log("Nuevo Cliente Conectado")
    socket.on('message',data=>{
        messages.push(data)

        
        io.emit('messageLogs',messages)
    })
})
}catch(e){
    console.log("No se ha podido establecer la conexion con el puerto")
}

// Fin integracion Chat------------------------------------------------------------------------------

server.use(express.json())
server.use(express.urlencoded({ extended: true }))

server.use("/api", router)
server.use("/api", routerCart)
server.use("/", views)

server.use("/public",express.static(`${__dirname}/public`))


server.engine("handlebars", engine())
server.set("view engine", "handlebars")
server.set("views", `${__dirname}/views`)










// try{
//     await mongoose.connect(MONGOOSEURL)
//     server.listen(PORT,()=>{
//         console.log(`Servidor express activo en puerto:${PORT}`)
//     })
    
// }catch(err){
//     console.log("No se ha podido establecer la conexion con el puerto")
// }