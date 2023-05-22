import mongoose from "mongoose"
import cartModel from "./models/cart.model.js"

class CartManager {
    constructor() {
        this.cStatus = 1
    }

    createCart = async () => {
        const nCart = await cartModel.collection.insertOne({})
        return nCart
    }
    listCartProducts = async (id) => {
        try {
            const arreglo = await cartModel.findById(id)
            if (arreglo === null) {
                return "El ID del carrito que busca no existe"
            } else {
                return arreglo
            }
        } catch (e) {

            console.log("Update Product error de formato de codigo")
            return "Formato de codigo erroneo"
        }
    }
    addCartProduct = async (cid, pid) => {
        try {
            const arreglo = await cartModel.findById(cid)
            if (arreglo === null) {
                return "El ID del carrito que busca no existe"
            } else {

                const existe = await cartModel.find({ "_id": cid, "products.pid": pid })


                if (existe == "") {
                    await cartModel.updateOne(
                        { "_id": new mongoose.Types.ObjectId(cid) },
                        { $push: { products: { pid: pid, quantity: 1 } } }
                    )

                } else {
                    const found = existe[0].products.findIndex(e => JSON.stringify(e.pid) == JSON.stringify(pid))
                    let cantidad = existe[0].products[found].quantity

                    cantidad++

                    await cartModel.updateOne({ "_id": new mongoose.Types.ObjectId(cid), "products.pid": pid }, { $set: { "products.$.quantity": cantidad } })
                }
                return "Producto Agregado Correctamente"
            }
        }catch(e){
            console.log("Update Product error de formato de codigo")
            return "Formato de codigo erroneo"
        }
    }
    deleteCartProduct=async(cid,pid)=>{
        try{
            let fil={$pull:{"products":{pid:pid}}}
             const arreglo = await cartModel.updateOne({"_id":new mongoose.Types.ObjectId(cid)},fil)
             
             if(arreglo.matchedCount==0){
                return "El ID del carrito no existe"
             }else if(arreglo.modifiedCount==0){
                return "El id del Producto indicado no esta en este carrito"
             }else{
                return "Producto eliminado exitosamente"
             }

        }catch(e){
            console.log("Update Product error de formato de codigo")
            return "Formato de codigo erroneo"
        }
    }

    }



export default CartManager