import { ContextMessageUpdate } from "telegraf";
import dataSourceService from "../Services/DataSourceService";

export default class GetPicController {

    static cmd(ctx: ContextMessageUpdate): void {

        let q = ctx.message.text.substring(ctx.message.text.indexOf(" ") + 1)
        
        
        if (q.length <= 1) {
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