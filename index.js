const axios = require('axios');
const config = require('./config');

const sleep = (
  time
) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time)
  })
}

const getLatestMessage = async (
  headers
) => {
  const response = await axios.default.get(config.url, { headers });
  if (response.data[0].embeds.length) {
    console.log(`[Message]: ${response.data[0].embeds[0].description}`);
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
  } catch (err) {
    print(err)
    main();
  }
})()
