const dotenv = require('dotenv');
dotenv.config();

import Telegram, { ContextMessageUpdate } from "telegraf"
import salutoController from "./Commands/SalutoController";
import getSimilarTracksController from "./Commands/GetSimilarTracksController";
import getPicController from "./Commands/GetPicController";
import getLastController from "./Commands/GetLastController";


class Bot {
    private bot: Telegram<ContextMessageUpdate>;
    
    constructor() {
        this.bot = new Telegram(process.env.BOT_TOKEN)
        this.middleware();
        this.bot.launch()
        
    }
    
    private middleware(): void {
        this.bot.start((ctx) => ctx.reply('/similar nome canzone\n/pic nome canzone'))
        this.bot.help((ctx) => ctx.reply('/similar nome canzone\n/pic nome canzone'))
        this.bot.command("/suggestion", getSimilarTracksController.cmd);
        this.bot.command("/pic", getPicController.cmd);
        this.bot.command("/last", getLastController.cmd);
    }
    
}

let bot = new Bot();