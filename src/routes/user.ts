import { Router } from "express";
import { getUser,getAllUsers, deleteUser } from "../controllers/users";

const routes = Router();

routes.get('/',getAllUsers);

routes.get('/:id',getUser);

routes.delete('/:id', deleteUser);

export default routes;