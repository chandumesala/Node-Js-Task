import * as axios from "axios";

interface Config {
    method: string;
    url: string;
    data: object;
    headers: object;
    params: object;
}


const apiAgent = async (config: Config) => {
    const {method, url, data, headers, params} = config;
    // @ts-ignore
    const response = await axios({
        method,
        url,
        data,
        headers,
        params
    });
    const result: object = response.data;
    return result;
}

export default apiAgent;
