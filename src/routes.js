import Router from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import auth from './app/middleware/auth';


const routes = new Router();
const upload = multer( multerConfig );

routes.post( '/users', UserController.store );
routes.put( '/users', auth, UserController.update );

routes.post( '/sessions', SessionController.store );

routes.post( '/files', upload.single( 'file' ), ( req, res ) => {
    return res.json( {ok: true} );
} );

export default routes;
