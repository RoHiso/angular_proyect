"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../controllers/users");
const routes = (0, express_1.Router)();
routes.get('/', users_1.getAllUsers);
routes.get('/:id', users_1.getUser);
exports.default = routes;
