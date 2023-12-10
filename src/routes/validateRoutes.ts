import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

const validateToken = (req:Request, res:Response, next:NextFunction) => {

    //Extraemos el token con la funcion
    const headerToken = req.headers['authorization'];
    console.log (typeof headerToken);
    console.log(headerToken);
   
    //Validamos el token
    if (headerToken != undefined && headerToken.startsWith('Bearer')) {
        
        //tiene Token
        try {
            
            //extraemos el token con la funcion jwt.slice
            const bearerToken = headerToken.slice(7);
            jwt.verify(bearerToken,  "pepito1234")
            next();        
        } catch (error) {
            
            res.status(401).json({
                msg:'Token no autorizado'
            })
        }
    } else {
        res.status(401).json({
            msg:'Acceso denegado'
        })
    }

}
export default validateToken;