import express, {json, Router} from "express";
import cors from 'cors';
import 'express-async-errors';
import rateLimit from 'express-rate-limit';
import {handleError, ValidationError} from "./utils/errors";
import {adRouter} from "./routers/ad.recdord";


const  app = express()
app.use(cors({
    origin: 'http://localhost:3000',
}))
app.use(rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 5 minutes)
}))
app.use(json());
//Routes...
const router = Router();
app.use('/ad',adRouter)
//router.use('/ad', adRouter);
//app.use('/api', router);

// app.get('/', async (req, res) =>{
// throw new ValidationError('dame')
// })
app.use(handleError);

app.listen(3001,
    '0.0.0.0',()=>{
    console.log('listening on port http://localhost:3001');
    })
