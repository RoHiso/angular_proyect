import express, { Application, Request, Response } from 'express';
import routesProducts from '../routes/product-routes';
import routesUsuarios from '../routes/user-routes';
import cors from 'cors';
import sequelize from '../dbconfig/config';
import Usuario from './user';

class Server{

   private app:Application;
   private port:string;  

   constructor(){
    this.app=express();
    this.port="3001";
    this.listening(); 
    this.middlewares();
    this.syncTables();
    this.routing();
   }

   listening(){
    this.app.listen(this.port, ()=>{
        console.log(`Escuchando en el puerto ${this.port}`);
    })
   }
   
   middlewares(){
    //parseamos el Body
    this.app.use(express.json())
    //cors
    this.app.use(cors());
   }

   routing(){
    this.app.get('/',(req:Request,res:Response)=>{
        res.json({
            msg:'Api corriendo en el puerto 3001'
        });
    }),
    this.app.use('/api/productos', routesProducts);

    this.app.use('/api/usuarios', routesUsuarios);

   }

   async syncTables(){
    try {
       await Usuario.sync()
        console.log('Tabla usuarios sincronizada exitosamente')
    } catch (error) {
        console.error(error);
        console.log('error de conexion')
    }
   }

}

export default Server