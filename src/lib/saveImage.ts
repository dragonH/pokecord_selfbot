import fs from 'fs';
import crypto from 'crypto';
import axios from 'axios';
import sendMessage from './sendMessage';
import { IHeader, IConfig } from '../types';
import sleep from './sleep';
import getLatestMessage from './getLatestMessage';

export default async (
    url: string,
) => {
    if (!fs.existsSync('./images')) {
        fs.mkdirSync('./images');
    }
    const binaryImage = (await axios.get(url, { responseType: 'arraybuffer' })).data;
    const image = Buffer.from(binaryImage, 'binary').toString('base64');
    const md5 = crypto.createHash('md5');
    const imageHash = md5.update(image).digest('hex');
    const pokemonList = JSON.parse(fs.readFileSync('./pokemon-list.json', 'utf8'));
    const pokemonPosition = Object.keys(pokemonList).indexOf(imageHash);
    if (pokemonPosition === -1) {
        fs.writeFileSync(`./images/${imageHash}.jpg`, binaryImage, 'binary');
        pokemonList[imageHash] = '';
        fs.writeFileSync('./pokemon-list.json', JSON.stringify(pokemonList, null, 4));
        console.log('[Message]: New pokemon image saved');
    }
    if (pokemonList[imageHash]) {
        const config: IConfig = {
            url: process.env.url!,
            token: process.env.token!,
        };
        const headers: IHeader = {
            authorization: config.token,
        };
        await sendMessage(headers, config, `p!catch ${pokemonList[imageHash]}`);
        await sleep(1000);
        const latestMessage = await getLatestMessage(headers, config);
        if (latestMessage[0].author.username === 'Pokécord') {
            if (!latestMessage[0].content.startsWith('Congratulations')) {
                const wrongPokemonList = JSON.parse(fs.readFileSync('./pokemon-list-wrong.json', 'utf8'));
                wrongPokemonList[imageHash] = '';
                fs.writeFileSync('./pokemon-list-wrong.json', JSON.stringify(wrongPokemonList, null, 4));
            } else {
                console.log(`[Message]: ${latestMessage[0].content}`);
            }
        }
    }
};
