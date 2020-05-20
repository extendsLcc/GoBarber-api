import { resolve } from 'path';
import nodemailer from 'nodemailer';
import expHbs from 'express-handlebars';
import nodemailerHbs from 'nodemailer-express-handlebars';

import mailConfig from '../config/mail';


class Mail {

    constructor() {

        const { host, port, auth, secure } = mailConfig;

        this.transporter = nodemailer.createTransport( {
            host,
            port,
            secure,
            auth: auth.user ? auth : null
        } );

        this.configureTemplates();

    }

    configureTemplates() {

        const viewPath = resolve( __dirname, '..', 'app', 'views', 'emails' );

        this.transporter.use( 'compile', nodemailerHbs( {
            viewEngine: expHbs.create( {
                layoutsDir: resolve( viewPath, 'layouts' ),
                partialsDir: resolve( viewPath, 'partials' ),
                defaultLayout: 'default',
                extname: '.hbs'
            } ),
            viewPath,
            extName: '.hbs'
        } ) );

    }

    sendMail( message ) {

        return this.transporter.sendMail( {
            ...mailConfig.default,
            ...message,
        } );

    }

}

export default new Mail();