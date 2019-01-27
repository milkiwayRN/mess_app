import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import DialogsMenu from '../../components/dialogsMenu/DialogsMenu';

export default class UserMainPage extends PureComponent {
 static propTypes = {
     dialogs: PropTypes.object,
     requestUserDialogsIds: PropTypes.func.isRequired,
 };

 componentDidMount() {
     const { requestUserDialogsIds } = this.props;
     requestUserDialogsIds();
 }

 render() {
     const { dialogs } = this.props;
     return (
         <div>
             <DialogsMenu dialogsIds={ dialogs.dialogsIds } />
             <div>There is should be dialogs</div>
         </div>
     );
 }
}
