import { Router } from "express";
import { getUser,getAllUsers } from "../controllers/users";

const routes = Router();

routes.get('/',getAllUsers);

routes.get('/:id',getUser);

export default routes;