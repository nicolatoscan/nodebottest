import { Document, Schema, Model, model } from 'mongoose';

export interface IUserData {
    chatid: string,
    lastfmusername: string,
    telegramusername: string,
    dateTime: Date,
}

export interface IUserDataModel extends IUserData, Document { }

export let UserDataSchema = new Schema({
    _id: Schema.Types.ObjectId,
    chatid: { type: String, required: true },
    lastfmusername: { type: String, required: false },
    telegramusername: { type: String, required: false },
    dateTime: { type: Date, default: Date.now }
});

export const UserDataModel: Model<IUserDataModel> = model<IUserDataModel>("UserData", UserDataSchema);
