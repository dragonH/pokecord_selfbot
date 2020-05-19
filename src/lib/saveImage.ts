import fs from 'fs';
import crypto from 'crypto';
import axios from 'axios';

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
    if (Object.keys(pokemonList).indexOf(imageHash) === -1) {
        fs.writeFileSync(`./images/${imageHash}.jpg`, binaryImage, 'binary');
        pokemonList[imageHash] = '';
        fs.writeFileSync('./pokemon-list.json', JSON.stringify(pokemonList));
        console.log('[Message]: New pokemon image saved');
    }
};
