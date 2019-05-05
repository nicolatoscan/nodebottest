import { ContextMessageUpdate } from "telegraf";
import dataSourceService from "../Services/DataSourceService";
import databaseService from "../Services/DatabaseService";

export default class GetLastController {

    static cmd(ctx: ContextMessageUpdate): void {

        let spaceIndex = ctx.message.text.indexOf(" ")
        let username = null;
        if (spaceIndex > 0) {
            username = ctx.message.text.substring(spaceIndex + 1)
        }
        
        
        if (username == null || username.length <= 1) {
            databaseService.getLastFMUsername(ctx.chat.id.toString(), (username) => {
                GetLastController.risp(ctx, username)
            });
        } else {
            databaseService.saveLasFMtUsername(ctx.chat.id.toString(), username, ctx.from.username);
            GetLastController.risp(ctx, username)
        }

    }

    private static risp(ctx: ContextMessageUpdate, username: string) {
        if (username == null || username == undefined) {
            ctx.reply("/last username")
            return;
        }
        console.log(username);
        dataSourceService.getLastTracks(username, (tracks) => {
            ctx.reply(tracks.join("\n"))
        })
    }


}

//const getLastController = new GetLastController();
//export default getLastController;