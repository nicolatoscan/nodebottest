import { ContextMessageUpdate } from "telegraf";
import dataSourceService from "../Services/DataSourceService";
import DatabaseService from "../Services/DatabaseService";

export default class GetTopController {

    static cmd(ctx: ContextMessageUpdate): void {

        DatabaseService.handleUsername(ctx, (username) => {
            if (username == null || username == undefined) {
                ctx.reply("/top username")
                return;
            }
            console.log(username);
            dataSourceService.getTopTracks(username, (tracks) => {
                ctx.reply(tracks.join("\n"))
            })
        })

    }

}

//const getLastController = new GetLastController();
//export default getLastController;