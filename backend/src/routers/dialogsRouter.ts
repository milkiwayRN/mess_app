import * as express from 'express';
import * as mongoose from 'mongoose';
import { DialogModel } from '../models/DialogModel';
import UserDialogsModel, { IUserDialogsModel } from '../models/UserDialogsModel';
import { rejects } from 'assert';

const dialogsRouter = express.Router();

dialogsRouter.get('', function (req, res) {
    const userId = req.user._id;
    UserDialogsModel.findOne({ userId }, (err, userDialogs) => {
        if (err) {
            res.send(500);
        }
        else {
            res.status(200).json(userDialogs);
        }
    })
});

dialogsRouter.put('', function (req, res) {
    const { isPrivate, participants } = req.body;
    if (isPrivate && participants.length > 2) {
        res.send(500);
    }

    const newDialogData = {
        _id: new mongoose.Types.ObjectId(),
        participants,
        messages: [],
        isPrivate,
        admin: isPrivate ? null : req.user._id, 
    };

    DialogModel.create(newDialogData, (err: any, responseDialog: any) => {
        if (err) {
          res.send(500);
        }
        else {
            const addParticipantsDialog = responseDialog.participants.map((userId: any) => new Promise((resolve, reject) => {
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
                        else {
                            const newUserDialogsData = {
                                _id: mongoose.Types.ObjectId(),
                                userId,
                                dialogsIds: [responseDialog._id],
                            };
                            UserDialogsModel.create(newUserDialogsData, (err: any, resUserDialogs: any) => {
                                if (err) {
                                    reject('can\'t create userDialogs');
                                }
                                resolve();
                            });
                        }
                    }
                });
            }));

            Promise.all(addParticipantsDialog)
                .then(() => {
                    res.status(200).json(newDialogData);
                })
                .catch((err: any) => {
                    console.error(err);
                });
        }
    });   
});

export default dialogsRouter;
