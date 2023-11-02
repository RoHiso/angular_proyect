"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_1 = __importDefault(require("../routes/products"));
const user_1 = __importDefault(require("../routes/user"));
//import dbconfig from '../dbconfig/config';
const config_1 = __importDefault(require("../dbconfig/config"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = "3001";
        this.listening();
        this.middlewares();
        this.routing();
        this.testconection();
    }
    listening() {
        this.app.listen(this.port, () => {
            console.log(`Escuchando en el puerto ${this.port}`);
        });
    }
    routing() {
        this.app.get('/', (req, res) => {
            res.json({
                msg: 'Api corriendo en el puerto 4000'
            });
        }),
            this.app.use('/api/productos', products_1.default);
        this.app.use('/api/usuarios', user_1.default);
    }
    middlewares() {
        this.app.use(express_1.default.json());
    }
    testconection() {
        try {
            config_1.default.authenticate();
            console.log('Conexion establecida satisfactoriamente');
        }
        catch (error) {
            console.error(error);
            console.log('error de conexion');
        }
    }
}
exports.default = Server;
