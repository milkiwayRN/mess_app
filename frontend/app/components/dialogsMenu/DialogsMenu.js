import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class DialogsMenu extends PureComponent {
    static propTypes = {
        dialogs: PropTypes.array,
    };

    render() {
        const { dialogs } = this.props;
        const dialogsPreview = dialogs.map(dialog => {
            const { isPrivate, participants, lastMessage, _id } = dialog;
            return (
                <DialogPreview
                    key={ _id }
                    isPrivate={ isPrivate }
                    participants={ participants }
                    lastMessage={ lastMessage }
                />
            );
        });

        return (
            <aside>
                { dialogsPreview }
            </aside>
        );
    }
}
