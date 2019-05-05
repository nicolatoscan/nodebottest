import * as mongoose from 'mongoose';
import { UserDataModel, IUserDataModel } from '../Model/UserData';
import { ContextMessageUpdate } from 'telegraf';


export default class DatabaseService {

    constructor() {
    }

    static getLastFMUsername(chatId: string, callback: (lastFMUsername: string) => void) {
        UserDataModel
            .findOne({
                chatid: chatId
            })
            .then(userData => {
                if (userData)
                    callback(userData.lastfmusername)
                else
                    callback(null)
            })
    }

    static saveLasFMtUsername(chatId: string, lastFMUsername: string, telegramUsername: string) {
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
                    })
                    .catch(err => {
                        console.log(err)
                    })

            })
    }

    static handleUsername(ctx: ContextMessageUpdate, callback: (usernam: string) => void) {
        let spaceIndex = ctx.message.text.indexOf(" ")
        let username = null;
        if (spaceIndex > 0) {
            username = ctx.message.text.substring(spaceIndex + 1)
        }
        
        
        if (username == null || username.length <= 1) {
            DatabaseService.getLastFMUsername(ctx.chat.id.toString(), (username) => {
                callback(username)
            });
        } else {
            DatabaseService.saveLasFMtUsername(ctx.chat.id.toString(), username, ctx.from.username);
            callback(username)
        }
    }

}