import dotenv from 'dotenv';
import { IConfig, IHeader } from './types';
import sendMessage from './lib/sendMessage';
import sleep from './lib/sleep';
import getLatestMessage from './lib/getLatestMessage';

(async () => {
    try {
        dotenv.config();
        if (!process.env.url || !process.env.token) {
            throw new Error('.env file error');
        }
        const config: IConfig = {
            url: process.env.url,
            token: process.env.token,
        };
        const headers: IHeader = {
            authorization: config.token,
        };
        while (1) {
            await sendMessage(headers, config);
            await sleep(900);
            await getLatestMessage(headers, config);
        }
    } catch (error) {
        console.log(`[Error]: ${error}`);
    }
})();
