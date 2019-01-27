import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import DialogPreview from '../dialogPreview/DialogPreview';
import DialogsService from '../../services/DialogsService';

export default class DialogsMenu extends PureComponent {
    static propTypes = {
        dialogsIds: PropTypes.array,
    };

    state = {
        dialogs: [],
    };

    componentDidUpdate(prevProps) {
        const { dialogsIds } = this.props;
        const oldDialogsIds = prevProps.dialogsIds;
        if (dialogsIds !== oldDialogsIds) {
            const dialogsIdsFilter = dialogsIds.filter(id => id !== 2);
            const dialogsData = dialogsIdsFilter.map(id => DialogsService.getDialogById(id));
            Promise.all(dialogsData)
                .then(dialogsFetchedData => {
                    this.setState({
                        dialogs: dialogsFetchedData,
                    });
                });
        }
    }


    render() {
        const { dialogs } = this.state;
        const dialogsPreview = dialogs.map(dialog => {
            const { isPrivate, participants, messages, _id } = dialog;
            return (
                <DialogPreview
                    key={ _id }
                    isPrivate={ isPrivate }
                    participants={ participants }
                    messages={ messages }
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
