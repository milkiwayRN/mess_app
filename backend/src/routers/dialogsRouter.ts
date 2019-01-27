import * as express from 'express';
import * as mongoose from 'mongoose';
import { DialogModel } from '../models/DialogModel';
import UserDialogsModel from '../models/UserDialogsModel';
import { CREATED_DIALOG } from '../constants/WebActionsTypes';

function initDialogsRouter(userIds: any, webSocketID: any) {

    const dialogsRouter = express.Router();

    dialogsRouter.get('', function (req, res) {
        const userId = req.user._id;
        UserDialogsModel.findById(userId, (err, userDialogs) => {
            if (err) {
                res.send(500);
            }
            else {
                res.status(200).json(userDialogs);
            }
        })
    });

    dialogsRouter.get('/:id', function (req, res) {
        const { id } = req.params;
        DialogModel.findById(id, function(err, dialog) {
            if (err) {
                res.send(500);
            }
            else {
                if (dialog === null) {
                    res.send(404);
                }
                else {
                    let isUserParticipant :boolean = false;
                    for(let i = 0; i < dialog.participants.length; i++) {
                        if (dialog.participants[i] === req.user._id) {
                            isUserParticipant = true;
                            break;
                        }
                    }
                    if (isUserParticipant){
                        res.json(dialog);
                    }
                    else {
                        res.send(403);
                    }

                }
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
                const actionString = JSON.stringify({
                    type: CREATED_DIALOG,
                    payload: responseDialog,
                });
                const addParticipantsDialog = responseDialog.participants.map((userId: any) => new Promise((resolve, reject) => {
                    UserDialogsModel.findById(userId, (err, UserDialogs) => {
                        if (err) {
                            res.send(500);
                        }
                        else {
                            if (UserDialogs !== null) {
                                UserDialogs.dialogsIds.push(responseDialog._id);
                                const dialogsIds = UserDialogs.dialogsIds;
                                UserDialogs.set({ dialogsIds });
                                UserDialogs.save((err) => {
                                    if (err) {
                                        res.send(501);
                                    }
                                    if(userIds[userId.toString()]) {
                                        webSocketID[userIds[userId.toString()]].send(actionString);
                                    }
                                    resolve();
                                })
                            }
                            else {
                                const newUserDialogsData = {
                                    _id: userId,
                                    dialogsIds: [responseDialog._id],
                                };
                                UserDialogsModel.create(newUserDialogsData, (err: any, resUserDialogs: any) => {
                                    if (err) {
                                        reject('can\'t create userDialogs');
                                    }
                                    if(userIds[userId.toString()]) {
                                        webSocketID[userIds[userId.toString()]].send(actionString);
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

    return dialogsRouter;
}

export default initDialogsRouter;
