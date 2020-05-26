import axios from 'axios';
import type { IHeader, IConfig } from '../types';

export default async (
    headers: IHeader,
    config: IConfig,
    content: string | number,
) => {
    const data = {
        content,
        tts: false,
    };
    await axios.post(config.url, data, { headers });
};
