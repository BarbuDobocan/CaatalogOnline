const initState = {
    classes: null,
    selectedClass: null,
    waitFlagClass: false
};

export default (adminClassesState = initState, action) => {
    switch (action.type) {
        case 'SET_CLASSES':
            const classes =  action.payload;
            return {
                ...adminClassesState, ...{classes}
            };

        case 'SET_SELECTED_CLASS':
            const selectedClass =  action.payload;
            return {
                ...adminClassesState, ...{selectedClass}
            };

        case 'WAIT_FOR_DATA':
            const waitFlagClass = action.payload;
            return {
                ...adminClassesState, ...{waitFlagClass}
            };
        default:
            return adminClassesState
    }
}
