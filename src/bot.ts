const dotenv = require('dotenv');
dotenv.config();

import Telegram, { ContextMessageUpdate } from "telegraf"
import * as mongoose from 'mongoose';
import SalutoController from "./Commands/SalutoController";
import GetSimilarTracksController from "./Commands/GetSimilarTracksController";
import GetPicController from "./Commands/GetPicController";
import GetLastController from "./Commands/GetLastController";


class Bot {
    private bot: Telegram<ContextMessageUpdate>;
    
    constructor() {

        mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true });

        this.bot = new Telegram(process.env.BOT_TOKEN)
        this.middleware();
        this.bot.launch()
        
    }
    
    private middleware(): void {
        this.bot.start((ctx) => ctx.reply('/similar nome canzone\n/pic nome canzone'))
        this.bot.help((ctx) => ctx.reply('/similar nome canzone\n/pic nome canzone'))
        this.bot.command("/suggestion", GetSimilarTracksController.cmd);
        this.bot.command("/pic", GetPicController.cmd);
        this.bot.command("/last", GetLastController.cmd);
    }
    
}

const bot = new Bot();