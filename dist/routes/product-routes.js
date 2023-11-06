"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_1 = require("../controllers/products");
const validateRoutes_1 = __importDefault(require("../routes/validateRoutes"));
const routes = (0, express_1.Router)();
routes.get('/', validateRoutes_1.default, products_1.getProducts);
routes.get('/:id', products_1.getProduct);
routes.put('/:id', products_1.editProduct);
routes.post('/', products_1.crearProduct);
routes.delete('/:id', products_1.deleteProduct);
exports.default = routes;
