import { ContextMessageUpdate } from "telegraf";
import { BaseCommandController } from "./BaseCommandController";
import dataSourceService from "../Services/DataSourceService";

class GetLastController extends BaseCommandController {

    cmd(ctx: ContextMessageUpdate): void {

        let username = ctx.message.text.substring(ctx.message.text.indexOf(" ") + 1)
        
        
        if (username.length <= 1) {
            ctx.reply("/last username")
            return;
        }

        console.log(username);

        dataSourceService.getLastTracks(username, (tracks) => {
            ctx.reply(tracks.join("\n"))
        })

    }
}

const getLastController = new GetLastController();
export default getLastController;