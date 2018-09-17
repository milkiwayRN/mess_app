const userStorage = {
    userStorageName: 'USER_INFO',
    get data() {
        const userData = sessionStorage.getItem(this.userStorageName);
        return userData ? JSON.parse(userData) : null;
    },

    set data(value) {
        sessionStorage.setItem(this.userStorageName, JSON.stringify(value));
    },
};

export default userStorage;
