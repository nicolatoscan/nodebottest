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

        let tracks = await DataSourceService.searchTracks(q)
        let mbids = tracks.map(t => t.mbid).filter(m => m)
        if (mbids.length <= 0) {
            ctx.reply("Immagine non trovata")
            return;
        }

        let url = await DataSourceService.getTrackImage(mbids[0])
        if (url)
            ctx.replyWithPhoto(url);
        else
            ctx.reply("Immagine non trovata")

    }
}