import * as express from 'express';
import * as mongoose from 'mongoose';
import { DialogModel } from '../models/DialogModel';
import UserDialogsModel from '../models/UserDialogsModel';

const dialogsRouter = express.Router();


dialogsRouter.put('/dialogs', function (req, res, next) {
    const { isPrivate, participants } = req.body;
    if (isPrivate && participants.length > 2) {
        res.send(500);
    }

    const newDialogData = {
        _id: new mongoose.Types.ObjectId(),
        participants,
        messages: [],
        isPrivate,
    };

    DialogModel.create(newDialogData, (err: any, responseDialog: any) => {
        if (err) {
          res.send(500);
        }
        else {
            const addParticipantsDialog = responseDialog.participants.map((userId: any) => new Promise((resolve) => {
                UserDialogsModel.findById(userId, (err, UserDialogs) =>  {
                    if (err) {
                        res.send(500);
                    }
                    else {
                        if(UserDialogs !== null){
                            const dialogsIds = UserDialogs.dialogsIds.push(responseDialog._id);
                            UserDialogs.set({ dialogsIds });
                            UserDialogs.save((err) => {
                                if (err) {
                                    res.send(501);
                                }
                                resolve();
                            })
                        }
                    }
                });
            }));

            Promise.all(addParticipantsDialog)
                .then(() => {
                    res.status(200).json(newDialogData);
                });
        }
    });   
});
