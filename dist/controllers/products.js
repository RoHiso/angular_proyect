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
exports.crearProduct = exports.deleteProduct = exports.editProduct = exports.getProduct = exports.getProducts = void 0;
const product_1 = __importDefault(require("../models/product"));
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listProducts = yield product_1.default.findAll();
    res.json({
        listProducts
    });
});
exports.getProducts = getProducts;
const getProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const product = yield product_1.default.findByPk(id);
    if (product) {
        res.json(product).status(200);
    }
    else {
        res.json({
            msg: `No se encontro el producto con el ID: ${id}`
        });
    }
});
exports.getProduct = getProduct;
const editProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const product = yield product_1.default.findByPk(id);
        if (product) {
            product.update(body);
            console.log(`El producto con id ${id}, se actualizo exitosamente`);
        }
        else {
            console.log('No se encontro el producto con ID: ' + id);
            res.json({
                msg: "No existe el producto con ese ID"
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.editProduct = editProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const product = yield product_1.default.findByPk(id);
        if (product) {
            product.destroy();
            res.json({
                msg: "Se elimino el producto con el ID: " + id + "  exitosamente"
            });
        }
        else {
            console.log('No se encontro el producto con ID: ' + id);
            res.json({
                msg: "No existe el producto con ese ID"
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteProduct = deleteProduct;
const crearProduct = (req, res) => {
    const { body } = req;
    product_1.default.create(body);
    res.json({
        msg: `se agregó un nuevo producto`
    });
};
exports.crearProduct = crearProduct;
