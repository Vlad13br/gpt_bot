  const {Telegraf} = require('telegraf')
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()

const telegramToken = process.env.TELEGRAM_TOKEN
const openaiToken = process.env.OPENAI_TOKEN

const bot = new Telegraf(telegramToken)

const config = new Configuration({
  organization: 'telegraf',
  apiKey: openaiTokene
})

const openai = new OpenAIApi(config)

bot.on("text", async (ctx) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 2000));

    const chatResponse = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: ctx.message.text }],
    });

    ctx.reply(chatResponse.data.choices[0].message.content);
  } catch (error) {
    console.error("Error:", error);
    ctx.reply("An error occurred while processing your request.");
  }
});

bot.launch()
