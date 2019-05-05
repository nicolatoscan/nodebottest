const dotenv = require('dotenv');
dotenv.config();

import Telegram, { ContextMessageUpdate } from "telegraf"
import * as mongoose from 'mongoose';
import GetSimilarTracksController from "./Commands/GetSimilarTracksController";
import GetPicController from "./Commands/GetPicController";
import GetLastController from "./Commands/GetLastController";
import GetTopController from "./Commands/GetTopController";
import GetArtistInfoInline from "./Commands/GetArtistInfoInline";
import { InlineQueryResult } from "telegraf/typings/telegram-types";


class Bot {
    private bot: Telegram<ContextMessageUpdate>;
    
    constructor() {

        mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true });

        this.bot = new Telegram(process.env.BOT_TOKEN)
        this.middleware()
        this.bot.launch()
        
    }
    
    private middleware(): void {
        this.bot.start(this.helloMessage)
        this.bot.help(this.helloMessage)
        this.bot.command("/ping", ctx => ctx.reply("pong"))
        this.bot.command("/suggestion", GetSimilarTracksController.cmd)
        this.bot.command("/pic", GetPicController.cmd)
        this.bot.command("/last", GetLastController.cmd)
        this.bot.command("/top", GetTopController.cmd)
        this.bot.on('inline_query', async ({ inlineQuery, answerInlineQuery }) => { GetArtistInfoInline.cmd(inlineQuery, answerInlineQuery) })
    }

    private helloMessage(ctx: ContextMessageUpdate) {
        ctx.reply("/suggestion - Ottieni canzoni simili\n/pic - Ottieni la foto dell'album\n/top - Le tue canzoni più ascoltate\n/last - I tuoi ultimi ascolti")
    }
    
}

const bot = new Bot();