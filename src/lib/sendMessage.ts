import axios from 'axios';
import type { IHeader, IConfig } from '../types';

export default async (
    headers: IHeader,
    config: IConfig,
) => {
    const data = {
        content: new Date(),
        tts: false,
    };
    await axios.post(config.url, data, { headers });
};
