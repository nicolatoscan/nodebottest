import { ContextMessageUpdate } from "telegraf";

export default class SalutoController {

    static cmd(ctx: ContextMessageUpdate): void {
        ctx.reply(ctx.message.text);
    }

}

//const salutoController = new SalutoController();
//export default salutoController;

