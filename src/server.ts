require('dotenv').config()
import * as Express from 'express';
import * as morgan from "morgan";
import * as cors from 'cors';
import * as bodyParser from "body-parser";
import apiRoutes from './api';

const SERVER_PORT: string | number = process.env.SERVER_PORT || 4000;
const app: Express.Application = Express();
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(
    cors({
        origin: ['http://localhost:3000'],
        optionsSuccessStatus: 200,
        credentials: true
    })
);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(apiRoutes);
app.listen(SERVER_PORT, () => {
    console.log(`[Server] listening on port ${SERVER_PORT}`);
});

export default app;
