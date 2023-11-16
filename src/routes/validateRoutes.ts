import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
const validateToken = (req:Request, res:Response, next:NextFunction) => {

    //Extraemos el token con la funcion
    const headerToken = req.headers['authorization'];
    //console.log(headerToken);
    if (headerToken != undefined && headerToken.startsWith('Bearer')) {
        
        //console.log(bearerToken);
        try {
            
            const bearerToken = headerToken.slice(7);
            jwt.verify(bearerToken,  "pepito1234")
            next();        
        } catch (error) {
            console.log(error);
            res.status(401).json({
                msg:'Token no autorizado'
            })
        }
    } else {
        res.status(401).json({
            msg:'Acceso denegado'
        })
    }
    //Validamos el token
    //extraemos el token con la funcion jwt.slice

}
export default validateToken;