import {Router} from 'express';
import { deleteProduct, crearProduct, editProduct, getProduct, getProducts } from '../controllers/products';


const routes = Router();

routes.get('/',getProducts);

routes.get('/:id',getProduct);

routes.put('/:id', editProduct);

routes.post('/', crearProduct);

routes.delete('/:id', deleteProduct) 

export default routes;