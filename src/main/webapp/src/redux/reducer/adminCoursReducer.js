const initState = {
    courses: null,
};

export default (adminCoursesState = initState, action) => {
    switch (action.type) {
        case 'SET_COURSES':
            const courses =  action.payload;
            return {
                ...adminCoursesState, ...{courses}
            };
        default:
            return adminCoursesState
    }
}
