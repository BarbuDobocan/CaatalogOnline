const initState = {
    yearStructure: null
};

export default (yearStructureState = initState, action) => {
    switch (action.type) {
        case 'SET_YEAR_STRUCTURE':
            const yearStructure =  action.payload;
            return {
                ...yearStructureState, ...{yearStructure}
            };
        default:
            return yearStructureState;
    }
}
