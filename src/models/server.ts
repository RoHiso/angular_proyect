import express, { Application, Request, Response } from 'express';
import routesProducts from '../routes/products';
import routesUsuarios from '../routes/user';
//import dbconfig from '../dbconfig/config';
import sequelize from '../dbconfig/config';

class Server{

   private app:Application;
   private port:string;  

   constructor(){
    this.app=express();
    this.port="3001";
    this.listening();
    this.middlewares();
    this.routing();
    this.testconection();
   }

   listening(){
    this.app.listen(this.port, ()=>{
        console.log(`Escuchando en el puerto ${this.port}`);
    })
   }
   routing(){
    this.app.get('/',(req:Request,res:Response)=>{
        res.json({
            msg:'Api corriendo en el puerto 4000'
        });
    }),
    this.app.use('/api/productos', routesProducts);

    this.app.use('/api/usuarios', routesUsuarios);

   }
   middlewares(){
    this.app.use(express.json())
   }

   testconection(){
    try {
        sequelize.authenticate();
        console.log('Conexion establecida satisfactoriamente')
    } catch (error) {
        console.error(error);
        console.log('error de conexion')
    }
   }

}

export default Server