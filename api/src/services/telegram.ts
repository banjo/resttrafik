import TelegramBot from "node-telegram-bot-api";

const token = process.env.TELEGRAM_TOKEN;
const chatId = process.env.CHAT_ID;

if (chatId == null || token == null) {
    console.error("Could not fetch token or chatID for telegram bot.");
    throw new Error("Could not fetch token or chatID for telegram bot.");
}

const bot = new TelegramBot(token);

export const sendTelegramMessage = (message: string) => {
    bot.sendMessage(chatId, message);
};
