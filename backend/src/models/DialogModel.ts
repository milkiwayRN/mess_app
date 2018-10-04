import { Document, Schema, Model, model, Types } from "mongoose";
import { IMessage } from '../interfaces/Message';

export interface IDialogModel extends  Document{
  participants: Array<Types.ObjectId>;
  messages: Array<IMessage>;
  admin: Types.ObjectId | null;
};

export const DialogSchema: Schema = new Schema({
  _id: Schema.Types.ObjectId,
  participants: Array,
  messages: Array,
  isPrivate: Boolean,
  admin: Schema.Types.ObjectId,
});

export const DialogModel: Model<IDialogModel> = model<IDialogModel>("Dialog", DialogSchema);