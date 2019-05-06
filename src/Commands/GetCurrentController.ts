import { ContextMessageUpdate } from "telegraf";
import DataSourceService from "../Services/DataSourceService";
import DatabaseService from "../Services/DatabaseService";

export default class GetCurrentController {

    static async cmd(ctx: ContextMessageUpdate): Promise<void> {

        let username = await DatabaseService.handleUsername(ctx)
        if (username == null || username == undefined) {
            ctx.reply("/current username")
            return;
        }

        let currentTrack = (await DataSourceService.getLastTracks(username))[0]
        let mbid = currentTrack.mbid

        let infoTrack = null;
        if (mbid)
            infoTrack = await DataSourceService.getTrackInfo(mbid)

        let res = currentTrack.name + " - " + currentTrack.artist["#text"]

        if (infoTrack && infoTrack.wiki && infoTrack.wiki.summary)
            res += "\n\n" + infoTrack.wiki.summary

        ctx.reply(res)

    }

}