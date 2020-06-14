const initState = {
    result: "asaassas"
};

export default (simpleState = initState, action) => {
    switch (action.type) {
        case 'SIMPLE_ACTION':
            console.log("Am ajuns in reducer SIMPLE_ACTION   ", action.payload);
            const result =  action.payload;
            return {
              ...simpleState, ...{ result }
            };
        default:
            return simpleState
    }
}
