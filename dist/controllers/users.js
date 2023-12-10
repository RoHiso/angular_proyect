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
exports.loginUser = exports.newUser = exports.editUser = exports.deleteUser = exports.getUser = exports.getAllUsers = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listUsers = yield user_1.default.findAll();
    res.json({
        listUsers
    });
});
exports.getAllUsers = getAllUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const usuario = yield user_1.default.findByPk(id);
        if (usuario) {
            res.status(200).json({
                usuario
            });
        }
        else {
            res.json({
                msg: "No se encontro al usuario con identificacion : " + id
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.getUser = getUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield user_1.default.findByPk(id);
        if (user) {
            yield user.destroy();
            res.json({
                msg: "usuario eliminado satisfactoriamente"
            });
        }
        else {
            res.json({
                msg: "no existe el usuario con ese id: " + id
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteUser = deleteUser;
const editUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const user = yield user_1.default.findByPk(id);
        if (user) {
            yield user.update(body);
            res.json({
                msg: "Usuario actualizado con exito"
            });
        }
        else {
            res.json({
                msg: "no existe el usuario con ese id: " + id
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.editUser = editUser;
const newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, email } = req.body;
    // console.log(username);
    // console.log(password);
    try {
        // hashed (encriptar) la contraseña  
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        console.log(hashedPassword);
        console.log(typeof hashedPassword);
        const user = yield user_1.default.findOne({ where: { username: username } });
        if (user) {
            return res.status(400).json({
                msg: `El usuario ${username} ya existe!!`
            });
        }
        else {
            user_1.default.create({
                username: username,
                password: hashedPassword,
                email: email
            });
            res.json({
                usuario: `se agrego al usuario ${username} exitosamente`
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.newUser = newUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    //validacion si existe usuario en la base de datos
    try {
        const user = yield user_1.default.findOne({ where: { username: username } });
        if (!user) {
            return res.status(400).json({
                msg: `No existe el usuario: ${username} en la base de datos`
            });
        }
        //Validamos que la contraseña (password) sea correcta, ejemplo tenga mas de 8 caracteres
        const passwordValid = yield bcrypt_1.default.compare(password, user.password);
        console.log(passwordValid);
        if (!passwordValid) {
            return res.status(400).json({
                msg: `Contraseña Incorrecta`
            });
        }
    }
    catch (error) {
        console.log(error);
    }
    //Generamos el token
    const token = jsonwebtoken_1.default.sign(username, "pepito1234");
    res.json(token);
});
exports.loginUser = loginUser;
