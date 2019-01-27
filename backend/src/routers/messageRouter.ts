import * as express from 'express';
import * as mongoose from 'mongoose';
import { DialogModel } from '../models/DialogModel';
import { IMessage } from '../interfaces/Message';

import { CREATED_MESSAGE } from '../constants/WebActionsTypes';



function initMessageRouter(userIds: any, webSocketID: any) {

    const messageRouter = express.Router();


    messageRouter.put('', function (req, res, next) {
        const { dialogId, createDate, text } = req.body;
        const senderId = req.user._id;


        const newMessageData = <IMessage>{
            _id: new mongoose.Types.ObjectId(),
            dialog: dialogId,
            sender: senderId,
            createdAt: createDate,
            text,
        };

        DialogModel.findById(dialogId, (err, dialog) => {
            if (dialog === null || err) {
                res.send(500);
            }
            else {
                const isSenderParticipant: mongoose.Types.ObjectId | null = dialog.participants
                    .reduce((acc: any, userId: mongoose.Types.ObjectId) => {
                        if (acc != null) return acc;
                        if (userId === senderId) {
                            return userId;
                        }
                        else {
                            return null;
                        }

                    }, null);

                if (isSenderParticipant) {
                    dialog.messages.push(newMessageData);
                    const messages = dialog.messages;
                    dialog.set({ messages });
                    dialog.save((err, updatedDialog) => {
                        if (err) {
                            res.send(500);
                        }
                        else {
                            const action = {
                                type: CREATED_MESSAGE,
                                payload: newMessageData,
                            };

                            const actionString = JSON.stringify(action);

                            updatedDialog.participants.forEach(userId => {
                                if(userId !== senderId) {
                                    new Promise(resolve => {
                                        if(userIds[userId.toString()]) {
                                            webSocketID[userIds[userId.toString()]].send(actionString)
                                        }
                                        resolve();
                                    });
                                }
                            });
                            res.status(201).json(updatedDialog);
                        }

                    });
                }
                else {
                    res.send(403);
                }
            }

        });
    });

    return messageRouter;
}

export default initMessageRouter;
