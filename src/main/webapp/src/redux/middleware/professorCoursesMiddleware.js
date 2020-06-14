import { setCourses } from "../actions/adminCours";


export const professorCoursesMiddleware= ({dispatch}) => (next) => (action) => {
    next(action);
    switch(action.type) {
        case 'FETCH_PROFESSORS_COURSES': {
            fetch('http://localhost:8080/professor/getMyCourses', {
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
                    console.log(result);
                    dispatch(setCourses(result));
                });
            break;
        }

    }
}
