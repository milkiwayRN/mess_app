import { Document, Schema, Model, model} from "mongoose";

export interface IDialogModel extends  Document{};

export const DialogSchema: Schema = new Schema({
  _id: Schema.Types.ObjectId,
  participants: Array,
  messages: Array,
  isPrivate: Boolean,
});

export const DialogModel: Model<IDialogModel> = model<IDialogModel>("Dialog", DialogSchema);