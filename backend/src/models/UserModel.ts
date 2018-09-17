import { Document, Schema, Model, model} from "mongoose";
import { IUser } from "../interfaces/User";

export interface IUserModel extends IUser, Document{};

export const UserSchema: Schema = new Schema({
  _id: Schema.Types.ObjectId,
  passwordHash: String,
  email: String,
  firstName: String,
  lastName: String,
  avatar: String,
});

export const UserModel: Model<IUserModel> = model<IUserModel>("User", UserSchema);