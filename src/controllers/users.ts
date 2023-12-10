 import express, {NextFunction, Request,Response} from 'express';
 import bcrypt from 'bcrypt';
import Usuario from "../models/user";
import jwt from 'jsonwebtoken';

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

export const deleteUser = async (req:Request, res:Response) => {
    const {id}=req.params;

    try {
            const user = await Usuario.findByPk(id);
            if (user) {
                await user.destroy();
                
                res.json({
                    msg:"usuario eliminado satisfactoriamente"
            })
            } else {
                res.json({
                    msg:"no existe el usuario con ese id: " + id
                })
                
            }
    } catch (error) {
        console.log(error)
    }

}

export const editUser = async (req:Request, res:Response) => {
    const {id}=req.params;
    const {body}= req;
    try {
            const user = await Usuario.findByPk(id);
            if (user) {
                await user.update(body);
                
                res.json({
                    msg:"Usuario actualizado con exito"
            })
            } else {
                res.json({
                    msg:"no existe el usuario con ese id: " + id
                })
                
            }
    } catch (error) {
        console.log(error)
    }

}

export const newUser = async (req:Request, res:Response)=>{
    const {username, password, email} = req.body;
    // console.log(username);
    // console.log(password);
    try {
        // hashed (encriptar) la contraseña  
        const hashedPassword:string = await bcrypt.hash(password,10);
        console.log(hashedPassword);
        console.log(typeof hashedPassword);
       const user = await Usuario.findOne({where:{username:username}});
       if (user) {
            return res.status(400).json({
               msg:`El usuario ${username} ya existe!!`
           })          
      }else{
        Usuario.create({
            username:username,
            password:hashedPassword,
            email:email    
        } );
        res.json({
            usuario:`se agrego al usuario ${username} exitosamente`
        })
      }
              
    } catch (error) {
        console.log(error);
    }
}

export const loginUser = async (req:Request, res:Response)=>{
    const {username, password} = req.body;

    //validacion si existe usuario en la base de datos
    try {
        const user:any = await Usuario.findOne({where:{username:username}})
        if(!user){
            return res.status(400).json({
                msg:`No existe el usuario: ${username} en la base de datos`
            });
        }
        //Validamos que la contraseña (password) sea correcta, ejemplo tenga mas de 8 caracteres
         const passwordValid = await bcrypt.compare(password, user.password);
         console.log(passwordValid);
         if(!passwordValid){
             return res.status(400).json({
                 msg:`Contraseña Incorrecta`
             });
         }

    } catch (error) {
        console.log(error);
    }
    //Generamos el token
    const token:string = jwt.sign(username, "pepito1234");
    res.json(token)
}