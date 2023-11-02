import express, {NextFunction, Request,Response} from 'express';

import Producto from '../models/product';

export const getProducts = async (req:Request, res:Response)=>{

    const listProducts = await Producto.findAll();
    res.json({
        listProducts
    })

}

export const getProduct = async (req:Request, res:Response, next:NextFunction)=>{
    const {id}=req.params;
    const product = await Producto.findByPk(id);
    if(product){
        res.json(product).status(200)
    }else{

         res.json({
            msg:`No se encontro el producto con el ID: ${id}`
         })
    }
}

export const editProduct = async (req:Request, res:Response)=>{
    const {id} = req.params;
    const {body}= req;

    try {
        const product = await Producto.findByPk(id);
        if (product) {
            product.update(body);
            console.log(`El producto con id ${id}, se actualizo exitosamente`);
        } else {
            console.log('No se encontro el producto con ID: ' + id);
            res.json({
                msg:"No existe el producto con ese ID"
            })
        }

    } catch (error) {
        console.log(error)
    }
     
}

export const deleteProduct = async (req:Request, res:Response)=>{
    const {id}=req.params;
    try {
        const product = await Producto.findByPk(id);
        if (product) {
            product.destroy()
            res.json({
                msg:"Se elimino el producto con el ID: " + id + "  exitosamente"
            })
        } else {
            console.log('No se encontro el producto con ID: ' + id);
            res.json({
                msg:"No existe el producto con ese ID"
            })
        }
    } catch (error) {
        console.log(error)
    }
}

export const crearProduct = (req:Request,res:Response) => {
    const {body}= req;

    Producto.create(body);

    
     res.json({
        msg:`se agregó un nuevo producto`
       
    })
}