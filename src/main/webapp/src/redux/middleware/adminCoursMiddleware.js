import {setCourses} from "../actions/adminCours";

export const adminCoursMiddleware = ({dispatch}) => (next) => (action) =>{
    next(action);

    switch(action.type) {
        case 'FETCH_COURSES':
        {
            fetch('http://localhost:8080/admin/getCourses', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
                },
                body: null
            })
                .then(response => response.json())
                .then(result => {
                    dispatch(setCourses(result));
                });
            break;
        }

        case 'ADD_NEW_COURS':
        {
            fetch('http://localhost:8080/admin/addNewCours', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
                },
                body: JSON.stringify(action.payload)
            })
                .then(response => response.json())
                .then(result => {
                    console.log("new Courses ", result);
                    dispatch(setCourses(result));
                });
            break;
        }

        case 'DELETE_SELECTED_COURS':
        {
            debugger;
            fetch('http://localhost:8080/admin/removeCours/' + action.payload, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
                },
                body: null
            })
                .then(response => response.json())
                .then(result => {
                    debugger;
                    dispatch(setCourses(result));
                });
            break;
        }

        default:
            return null;
    }
};
