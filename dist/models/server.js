"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_routes_1 = __importDefault(require("../routes/product-routes"));
const user_routes_1 = __importDefault(require("../routes/user-routes"));
const cors_1 = __importDefault(require("cors"));
const user_1 = __importDefault(require("./user"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = "3001";
        this.listening();
        this.middlewares();
        this.syncTables();
        this.routing();
    }
    listening() {
        this.app.listen(this.port, () => {
            console.log(`Escuchando en el puerto ${this.port}`);
        });
    }
    middlewares() {
        //parseamos el Body
        this.app.use(express_1.default.json());
        //cors
        this.app.use((0, cors_1.default)());
    }
    routing() {
        this.app.get('/', (req, res) => {
            res.json({
                msg: 'Api corriendo en el puerto 3001'
            });
        }),
            this.app.use('/api/productos', product_routes_1.default);
        this.app.use('/api/usuarios', user_routes_1.default);
    }
    syncTables() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield user_1.default.sync();
                console.log('Tabla usuarios sincronizada exitosamente');
            }
            catch (error) {
                console.error(error);
                console.log('error de conexion');
            }
        });
    }
}
exports.default = Server;
