import jwt from 'jsonwebtoken';

import config from '../config';

export default async (req, res, next) => {
    const token = req.headers['authorization'];

    if(!token) {
        return next({
            status: 403,
            message: 'forbidden. no token ! >_<'
        });
    }

    //раберем и распарсим

    let tokenObj = null;
    try {
        tokenObj = jwt.verify(token, config.db.secret);
    } catch ({message}) {
        return next({
            status:400,
            message
        })
    }
    req.token = tokenObj;
    console.log(req.token);
    next();
}