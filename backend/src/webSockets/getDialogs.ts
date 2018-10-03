import UserDialogsModel, { IUserDialogsModel } from '../models/UserDialogsModel';

export default function getUserDialogs(userId: any, callback: Function) {
    UserDialogsModel.findOne({ userId }, (err, userDialogs: IUserDialogsModel) => {
        if (!err && userDialogs) {
            return callback(userDialogs);
        }
        else {
            return callback(null);
        }
    });
}