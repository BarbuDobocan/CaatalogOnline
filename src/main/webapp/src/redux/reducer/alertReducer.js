const initState = {
    show: false,
    messageAlert: null,
    newUserError: null
};

export default (alertState = initState, action) => {
    switch (action.type) {
        case 'SHOW_ALERT':
            const {show, messageAlert} =  action.payload;
            return {
                ...alertState, ...{show}, ...{messageAlert}
            };

        case 'NEW_USER_ERROR':{
            const {newUserError} =  action.payload;
            return {
                ...alertState, ...{newUserError}
            };
        }

        default:
            return alertState
    }
}
