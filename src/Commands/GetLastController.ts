import { ContextMessageUpdate } from "telegraf";
import DataSourceService from "../Services/DataSourceService";
import DatabaseService from "../Services/DatabaseService";

export default class GetLastController {

    static async cmd(ctx: ContextMessageUpdate): Promise<void> {

        let username = await DatabaseService.handleUsername(ctx)
        if (username == null || username == undefined) {
            ctx.reply("/last username")
            return;
        }

        let tracks = await DataSourceService.getLastTracks(username)
        ctx.reply(tracks.map(t => t.name + " - " + t.artist["#text"]).join("\n"))
    }
}