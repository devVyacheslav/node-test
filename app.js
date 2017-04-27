import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import bodyParser from "body-parser";
import bluebird from "bluebird";
import config from "./config";
import authRouter from "./routes/auth";
import userRouter from "./routes/user";
import pageRouter from "./routes/page";
import getUser from './middlewares/getUser';
import session from "express-session";
import errorHandler from "./middlewares/errorHandler";
import checkToken from "./middlewares/checkToken";

const app = express();

mongoose.Promise = bluebird;

mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`,
    err => {
        if (err) {
            throw err
        }

        console.log('mongo connected');
    }
);

app.listen(config.serverPort, err => {
    if (err) throw err;
    console.log(`server listening on port ${config.serverPort} `)
});

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: config.db.secret
}));

// app.get('*', async(req, res) => {
//     res.end('hello world');
// });

app.use('/api', authRouter);
app.use('/api', checkToken, userRouter);
app.use(getUser);
app.use('/api', checkToken, pageRouter);

app.use('/test', checkToken , (req,res)=>{
  res.json('test');
});
app.use(errorHandler);

