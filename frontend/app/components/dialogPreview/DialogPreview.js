import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

function getUserNickName() {
    return Promise.resolve('Petya');
}

export default class DialogPreview extends PureComponent {
    static propTypes = {
        isPrivate: PropTypes.bool,
        participants: PropTypes.array,
        messages: PropTypes.array,
        user: PropTypes.object,
    };

    state = {
        title: 'mock title',
    };

    componentDidMount() {
        const { user, participants, isPrivate } = this.props;
        if (isPrivate) {
            const friendId = participants.reduce((acc, id) => {
                if (!acc) return id === user._id;
                return acc;
            }, null);

            getUserNickName(friendId)
                .then(name => this.setState(() => ({
                    title: name,
                })));
        }
    }

    proceedLastMessage(lastMessage) {
        let createdAt,
            text,
            date,
            time;
        if (lastMessage) {
            createdAt = lastMessage.createdAt;
            text = lastMessage.text;
            date = moment(createdAt);
            time = date.format('DD-MM-YYYY') === moment().format('DD-MM-YYYY') ?
                date.format('h:mm') :
                date.format('DD-MM-YYYY');
        }
        else {
            time = '';
            text = 'there is no message yet';
        }


        let message;

        if (text.length > 35) {
            message = `${text.slice(0, 35)}...`;
        }
        else {
            message = text;
        }

        return {
            message,
            time,
        };
    }

    renderDialogLastMessageText = () => {
        const { user, messages, isPrivate } = this.props;
        const lastMessage = messages.length ? messages[messages.length - 1] : null;
        let author = '';
        if (isPrivate) {
            if (lastMessage.sender === user._id) {
                author = 'you:';
            }
            else {
                author = '';
            }
        }
        const { message, time } = this.proceedLastMessage(lastMessage);
        const lastMessageText = `${author} ${message} ${time}`;
        return (
            <span> { lastMessageText } </span>
        );
    };

    render() {
        const { title } = this.state;
        return (
            <div>
                <h5> { title } </h5>
                { this.renderDialogLastMessageText() }
            </div>
        );
    }
}
