import * as mongoose from 'mongoose';

// simple message interface. can be extended in a future
export interface IMessage {
    _id: mongoose.Types.ObjectId;
    text: string;
    sender: mongoose.Types.ObjectId;
    dialog: mongoose.Types.ObjectId;
    createdAt: Date;
};
