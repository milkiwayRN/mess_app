import React, { PureComponent } from 'react';

export default class UserMainPage extends PureComponent {
    render() {
        return (
            <div>
                <DialogsMenu/>
                <DialogChat/>
            </div>
        );
    }
}
