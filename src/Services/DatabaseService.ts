import * as mongoose from 'mongoose';
import { UserDataModel, IUserDataModel } from '../Model/UserData';


class DatabaseService {

    constructor() {
    }

    getLastFMUsername(chatId: string, callback: (lastFMUsername: string) => void) {
        console.log(chatId)
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

    saveLasFMtUsername(chatId: string, lastFMUsername: string, telegramUsername: string) {
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

}

const databaseService = new DatabaseService()
export default databaseService;