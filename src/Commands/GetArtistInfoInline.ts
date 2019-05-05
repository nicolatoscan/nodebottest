import { ContextMessageUpdate } from "telegraf";
console.log("aaaaaaaaaaaaaaa")
import dataSourceService from "../Services/DataSourceService";
import DatabaseService from "../Services/DatabaseService";
import { InlineQuery } from "telegram-typings";
import { InlineQueryResult, ExtraAnswerInlineQuery } from "telegraf/typings/telegram-types";

export default class GetArtistInfoInline {

    static async cmd(inlineQuery: InlineQuery, answerInlineQuery: (results: InlineQueryResult[], extra?: ExtraAnswerInlineQuery) => Promise<boolean>) {

        console.log(inlineQuery.query);

        if (inlineQuery.query.length <= 2) {
            answerInlineQuery([])
            return;
        }

        dataSourceService.searchArtists(inlineQuery.query, (mbid) => {
            console.log(mbid);

            dataSourceService.getArtistInfo(mbid, (info) => {
                console.log(info);

                let result: InlineQueryResult[] = [{
                    type: 'article',
                    id: "1",
                    title: info.name,
                    description: info.bio,
                    input_message_content: {
                        message_text: info.name + "\n\n" + info.bio,
                        parse_mode: 'Markdown'
                    }
                }]

                answerInlineQuery(result)
            })
        })



    }

}

//const getLastController = new GetLastController();
//export default getLastController;