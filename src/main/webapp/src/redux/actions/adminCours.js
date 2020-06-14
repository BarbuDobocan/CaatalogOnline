export function fetchCourses(){
    return({
        type: 'FETCH_COURSES',
        payload: null
    });
}

export function setCourses(courses){
    return({
        type: 'SET_COURSES',
        payload: courses
    });
}

export function addNewCours(cours){
    return({
        type: 'ADD_NEW_COURS',
        payload: cours
    })
}

export function deleteSelectedCours(coursId){
    return({
        type: 'DELETE_SELECTED_COURS',
        payload: coursId
    })
}
