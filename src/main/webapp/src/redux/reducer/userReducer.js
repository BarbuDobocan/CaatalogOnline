const initState = {
    roles: null
};

export default (userState = initState, action) => {
    switch (action.type) {
        case 'SET_ROLES':
            const roles =  action.payload;
            return {
                ...userState, ...{roles}
            };
        default:
            return userState
    }
}
