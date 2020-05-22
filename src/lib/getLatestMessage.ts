import axios from 'axios';
import { IHeader, IConfig } from '../types';
import saveImage from './saveImage';
import sleep from './sleep';

export default async (
    headers: IHeader,
    config: IConfig,
) => {
    const response = await axios.get(config.url, { headers });
    if (response.data[0].embeds.length) {
        console.log(`[Message]: ${response.data[0].embeds[0].description}`);
        if (response.data[0].embeds[0].description.startsWith('Guess the pokémon')) {
            await saveImage(response.data[0].embeds[0].image.url);
            // const data = {
            //     content: '@everyone 抓寶囉 計時60秒',
            //     tts: false,
            // };
            // await axios.post(config.url, data, { headers });
            // await sleep(60000);
        }
    }
    if (response.data[0].author.bot && response.data[0].content) {
        console.log(`[Message]: ${response.data[0].content}`);
    }
};
