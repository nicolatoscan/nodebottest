import { BaseCommandController } from "./BaseCommandController";
import { ContextMessageUpdate } from "telegraf";

class SalutoController extends BaseCommandController {

    cmd(ctx: ContextMessageUpdate): void {
        ctx.reply(ctx.message.text);
    }

}

const salutoController = new SalutoController();
export default salutoController;

