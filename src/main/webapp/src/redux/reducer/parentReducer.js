const initState = {
    myKids: []
};

export default (parentState = initState, action) => {
    switch (action.type) {
        case 'SET_MY_KIDS':
            const myKids =  action.payload;
            return {
                ...parentState, ...{myKids}
            };
        default:
            return parentState
    }
}
