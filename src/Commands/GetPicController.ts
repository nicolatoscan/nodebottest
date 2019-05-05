import { ContextMessageUpdate } from "telegraf";
import dataSourceService from "../Services/DataSourceService";

export default class GetPicController {

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

        dataSourceService.getTrackImage(q, (url) => {
            if (url == null)
                ctx.reply("Immagine non trovata")
            else
                ctx.replyWithPhoto(url);
        })

    }
}

//const getPicController = new GetPicController();
//export default getPicController;