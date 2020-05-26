import saveImage from './saveImage';

export default async (
    latestMessage: any,
) => {
    if (latestMessage[0].embeds.length) {
        console.log(`[Message]: ${latestMessage[0].embeds[0].description}`);
        if (latestMessage[0].embeds[0].description.startsWith('Guess the pokémon')) {
            await saveImage(latestMessage[0].embeds[0].image.url);
            // const data = {
            //     content: '@everyone 抓寶囉 計時60秒',
            //     tts: false,
            // };
            // await axios.post(config.url, data, { headers });
            // await sleep(60000);
        }
    }
    if (latestMessage[0].author.bot && latestMessage[0].content) {
        console.log(`[Message]: ${latestMessage[0].content}`);
    }
};
