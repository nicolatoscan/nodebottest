import { ContextMessageUpdate } from "telegraf";
import dataSourceService from "../Services/DataSourceService";

export default class GetSimilarTracksController {

    static cmd(ctx: ContextMessageUpdate): void {

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

        dataSourceService.getSimilarTracks(q, (tracks) => {
            tracks.join("\n")
            ctx.reply(tracks.join("\n"));
        })
        
    }

}

//const getSimilarTracksController = new GetSimilarTracksController();
//export default getSimilarTracksController;