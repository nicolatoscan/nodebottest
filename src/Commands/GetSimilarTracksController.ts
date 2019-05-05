import { ContextMessageUpdate } from "telegraf";
import dataSourceService from "../Services/DataSourceService";

export default class GetSimilarTracksController {

    static cmd(ctx: ContextMessageUpdate): void {

        let q = ctx.message.text.substring(ctx.message.text.indexOf(" ") + 1)

        if (q.length <= 1) {
            ctx.reply("/similar nome canzone")
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