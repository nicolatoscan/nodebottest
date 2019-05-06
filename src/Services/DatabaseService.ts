import * as mongoose from 'mongoose';
import { UserDataModel, IUserDataModel } from '../ModelDB/UserData';
import { ContextMessageUpdate } from 'telegraf';


export default class DatabaseService {

    constructor() {
    }

    static getLastFMUsername(chatId: string): Promise<string> {

        return new Promise<string>((resolve, reject) => {

            UserDataModel
                .findOne({
                    chatid: chatId
                })
                .then(userData => {
                    if (userData)
                        resolve(userData.lastfmusername)
                    else
                        resolve(null)
                })
        })

    }

    static saveLasFMtUsername(chatId: string, lastFMUsername: string, telegramUsername: string): Promise<void> {

        return new Promise<void>((resolve, reject) => {

            UserDataModel
                .find({
                    chatid: chatId
                })
                .then(userDatas => {

                    let usedata = null;

                    if (userDatas.length >= 1) { //Edit

                        usedata = userDatas[0];
                        usedata.lastfmusername = lastFMUsername
                        usedata.telegramusername = telegramUsername
                        usedata.dateTime = new Date()

                    } else { //Add

                        usedata = new UserDataModel({
                            _id: new mongoose.Types.ObjectId(),
                            chatid: chatId,
                            lastfmusername: lastFMUsername,
                            telegramusername: telegramUsername,
                            dateTime: new Date()
                        })

                    }

                    usedata.save()
                        .then(res => {
                            console.log("Db modificato");
                            resolve()
                        })
                        .catch(err => {
                            console.log(err)
                            reject()
                        })

                })

        })
    }

    static async handleUsername(ctx: ContextMessageUpdate): Promise<string> {

        let spaceIndex = ctx.message.text.indexOf(" ")
        let username = null;
        if (spaceIndex > 0) {
            username = ctx.message.text.substring(spaceIndex + 1)
        }


        if (username == null || username.length <= 1) {
            username = await DatabaseService.getLastFMUsername(ctx.chat.id.toString());
        } else {
            DatabaseService.saveLasFMtUsername(ctx.chat.id.toString(), username, ctx.from.username);
        }

        return username;
    }

}