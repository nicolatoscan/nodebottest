import { ContextMessageUpdate } from "telegraf";
import DataSourceService from "../Services/DataSourceService";
import DatabaseService from "../Services/DatabaseService";
import { InlineQuery } from "telegram-typings";
import { InlineQueryResult, ExtraAnswerInlineQuery } from "telegraf/typings/telegram-types";

export default class GetArtistInfoInline {

    static async cmd(inlineQuery: InlineQuery, answerInlineQuery: (results: InlineQueryResult[], extra?: ExtraAnswerInlineQuery) => Promise<boolean>) {

        let noresult: InlineQueryResult[] = [{
            type: 'article',
            id: "1",
            title: "Nessun risultato",
            description: "Nessun risultato",
            input_message_content: {
                message_text: "Nessun risultato",
                parse_mode: 'Markdown'
            }
        }]

        console.log(inlineQuery.query);

        if (inlineQuery.query.length <= 2) {
            answerInlineQuery(noresult)
            return;
        }

        let mbid = await DataSourceService.searchArtistsMbid(inlineQuery.query)
        if (mbid == undefined || mbid == null) {
            answerInlineQuery(noresult)
            return;
        }

        let info = await DataSourceService.getArtistInfo(mbid)

        let result: InlineQueryResult[] = [{
            type: 'article',
            id: "1",
            title: info.name,
            description: info.bio.summary,
            input_message_content: {
                message_text: info.name + "\n\n" + info.bio.summary,
                parse_mode: 'Markdown'
            }
        }]

        await answerInlineQuery(result)

    }

}
