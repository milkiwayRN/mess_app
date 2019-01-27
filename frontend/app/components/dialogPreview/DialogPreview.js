import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

export default class DialogPreview extends PureComponent {
    static propTypes = {
        isPrivate: PropTypes.bool.isRequired,
        participants: PropTypes.array,
        lastMessage: PropTypes.object,
        getUserNickName: PropTypes.func,
        user: PropTypes.object,
    };

    state = {
        title: 'mock title',
    };

    componentDidMount() {
        const { user, participants, isPrivate, getUserNickName } = this.props;
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

    renderDialogLastMessageText = () => {
        const { user, lastMessage: { createdAt, text, sender }, isPrivate } = this.props;
        let author = '';
        const date = moment(createdAt);
        const time = date.format('DD-MM-YYYY') === moment().format('DD-MM-YYYY') ?
            date.format('h:mm') :
            date.format('DD-MM-YYYY');

        let message;

        if (text.length > 35) {
            message = `${text.slice(0, 35)}...`;
        }
        else {
            message = text;
        }

        if (isPrivate) {
            if (sender === user._id) {
                author = 'you:';
            }
            else {
                author = '';
            }
        }
        const lastMessageText = `${author} ${message} ${time}`;
        return (
            <span> { lastMessageText } </span>
        );
    };

    render() {
        const { title } = this.state;
        return (
            <div>
                <span> { title } </span>
                { this.renderDialogLastMessageText() }
            </div>
        );
    }
}
