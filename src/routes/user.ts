import { Router } from "express";
import { getUser,getAllUsers, deleteUser, newUser, editUser, loginUser } from "../controllers/users";

const routes = Router();

routes.get('/',getAllUsers);

routes.get('/:id',getUser);

routes.put('/:id', editUser);

routes.delete('/:id', deleteUser);

routes.post('/', newUser);

routes.post('/login', loginUser);


export default routes;