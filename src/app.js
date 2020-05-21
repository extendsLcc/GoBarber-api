import express from 'express';
import Yonch from 'youch';
import path from 'path';
import * as Sentry from '@sentry/node';
import 'express-async-errors';

import routes from './routes.js';
import sentryConfig from './config/sentry';

import './database';

class App {

    constructor() {

        this.server = express();

        Sentry.init( sentryConfig );

        this.server.use( Sentry.Handlers.requestHandler() );

        this.middlewares();
        this.routes();
        this.exceptionHandler();

        this.server.use( Sentry.Handlers.errorHandler() );

    }

    middlewares() {

        this.server.use( express.json() );
        this.server.use( '/files', express.static( path.resolve( __dirname, '..', 'temp', 'uploads' ) ) );

    }

    routes() {

        this.server.use( routes );

    }

    exceptionHandler() {

        this.server.use( async ( err, req, res, next ) => {

            const errors = await new Yonch( err, req ).toJSON();

            return res.status( 500 ).json( errors );

        } );

    }

}

export default new App().server;