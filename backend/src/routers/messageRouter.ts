import * as express from 'express';
import * as mongoose from 'mongoose';
import { DialogModel } from '../models/DialogModel';
import { IMessage } from '../interfaces/Message';


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
                res.status(200).json(messages);
                // dialog.set({ messages });
                // dialog.save((err, updatedDialog) => {
                //     if (err) {
                //         res.send(500);
                //     }
                //     else {
                //         res.status(201).json(updatedDialog);
                //     }

                // });
            }
            else {
                res.send(403);
            }
        }

    });
});

export default messageRouter;
