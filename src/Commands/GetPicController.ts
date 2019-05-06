import { ContextMessageUpdate } from "telegraf";
import DataSourceService from "../Services/DataSourceService";

export default class GetPicController {

    static async cmd(ctx: ContextMessageUpdate): Promise<void> {

        let spaceIndex = ctx.message.text.indexOf(" ")
        let q: string = null;
        if (spaceIndex > 0) {
            q = ctx.message.text.substring(spaceIndex + 1)
        }

        if (q == null || q.length <= 0) {
            ctx.reply("/pic nome canzone")
            return;
        }

        console.log(q);

        let mbid = await DataSourceService.searchArtistsMbid(q)
        if (mbid == null || mbid == "") {
            ctx.reply("Immagine non trovata")
            return;
        }

        let url = await DataSourceService.getTrackImage(mbid)
        if (url)
            ctx.replyWithPhoto(url);
        else
            ctx.reply("Immagine non trovata")

    }
}