const axios = require('axios');
const crypto = require('crypto');
const config = require('./config');
const fs = require('fs');

const sleep = (
  time
) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time)
  })
}

const saveImage = async (url) => {
  if (!fs.existsSync('images')) {
    fs.mkdirSync('images');
  }
  const binaryImage = (await axios.default.get(url, { responseType: 'arraybuffer' })).data;
  const image = Buffer.from(binaryImage, 'binary').toString('base64')
  const md5 = crypto.createHash('md5')
  const imageHash = md5.update(image).digest('hex');
  const pokemonList = JSON.parse(fs.readFileSync('./pokemon-list.json'));
  if (Object.keys(pokemonList).indexOf(imageHash) === -1) {
    fs.writeFileSync(`./images/${imageHash}.jpg`, binaryImage, 'binary', () => {});
    pokemonList[imageHash] = '';
    fs.writeFileSync(`pokemon-list.json`, JSON.stringify(pokemonList), () => {});
    console.log(`[Message]: New pokemon image saved`);
  }
}

const getLatestMessage = async (
  headers
) => {
  const response = await axios.default.get(config.url, { headers });
  if (response.data[0].embeds.length) {
    console.log(`[Message]: ${response.data[0].embeds[0].description}`);
    
    if (response.data[0].embeds[0].description.startsWith('Guess the pokémon')) {
      await saveImage(response.data[0].embeds[0].image.url);
      // let data = {
      //   "content": "@everyone 抓寶囉 計時60秒",
      //   "tts": false
      // };
      // await axios.default.post(config.url, data, { headers });
      // await sleep(60000)
    }
  }
  if (response.data[0].author.bot && response.data[0].content) {
    console.log(`[Message]: ${response.data[0].content}`);
  }
}

const sendMessage = async (
  headers
) => {
  let data = {
    "content": new Date(),
    "tts": false
  };
  const response = await axios.default.post(config.url, data, { headers });
  id = response.data.id;
}

const main = async () => {
  const headers = {
    authorization: config.token,
  }
  while (1) {
    await sendMessage(headers);
    await sleep(900);
    await getLatestMessage(headers);
  }
}

(async () => {
  try {
    main();
  } catch (error) {
    console.log(`[Error]: ${error}`);
    main();
  }
})()