import { Document, Schema, Model, model, Types } from "mongoose";

export interface IUserDialogsModel extends  Document {
    dialogsIds: Array<Types.ObjectId>;
};

export const UserDialogsSchema: Schema = new Schema({
    _id: Schema.Types.ObjectId,
    userId: Schema.Types.ObjectId,
    dialogsIds: Array,
  
});

const UserDialogsModel: Model<IUserDialogsModel> = model<IUserDialogsModel>("UserDialogs", UserDialogsSchema);
export default UserDialogsModel;