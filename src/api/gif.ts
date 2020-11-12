import * as Express from "express";
import * as CircuitBreaker from "opossum";
import apiAgent from "../commonUtils/apiAgent";

const router: Express.Router = Express.Router();
const gif_api_key: string | any = process.env.gif_api_key;
const gif_api_url: string | any = process.env.gif_api_url;
const url: string = gif_api_url;
const method: string = "GET";

const options = {
    timeout: 5000,
    errorThresholdPercentage: 50,
    resetTimeout: 40000
};


const searchGif = async (req: Express.Request, res: Express.Response) => {
    const {q, limit} = req.query
    const params = {q, limit, key: gif_api_key}
    // @ts-ignore
    const data = await apiAgent({
        url,
        method,
        params
    });
    return Promise.resolve(data);
}
// @ts-ignore
const breaker = new CircuitBreaker(searchGif, options);
breaker.fallback(() => {
    return ({circuitBreak: true});
});

router.get('/searchGif', async (req: Express.Request, res: Express.Response) => {
    const result = await breaker.fire(req, res);
    let status = 'ok';
    if (result.circuitBreak) {
        status = 'API is down, try after sometime.'
        delete result.circuitBreak;
    }
    return res.send({
        status,
        ...result
    });
});

export default router;
