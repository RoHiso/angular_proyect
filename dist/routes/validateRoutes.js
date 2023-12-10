"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateToken = (req, res, next) => {
    //Extraemos el token con la funcion
    const headerToken = req.headers['authorization'];
    console.log(typeof headerToken);
    console.log(headerToken);
    //Validamos el token
    if (headerToken != undefined && headerToken.startsWith('Bearer')) {
        //tiene Token
        try {
            //extraemos el token con la funcion jwt.slice
            const bearerToken = headerToken.slice(7);
            jsonwebtoken_1.default.verify(bearerToken, "pepito1234");
            next();
        }
        catch (error) {
            res.status(401).json({
                msg: 'Token no autorizado'
            });
        }
    }
    else {
        res.status(401).json({
            msg: 'Acceso denegado'
        });
    }
};
exports.default = validateToken;
