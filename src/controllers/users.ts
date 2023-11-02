 import express, {NextFunction, Request,Response} from 'express';
import Usuario from "../models/user";

export const getAllUsers =async (req:Request, res:Response)=>{
    const listUsers = await Usuario.findAll();
    res.json({
        listUsers
    })

}

export const getUser = async (req:Request, res:Response) =>{
    const {id}= req.params;

    try {
        const usuario = await Usuario.findByPk(id)
        if (usuario) {
            res.status(200).json({
                usuario
            })
        } else {
            res.json({
                msg:"No se encontro al usuario con identificacion : " + id
            })
        }
    } catch (error) {
       console.log(error) 
    }
}