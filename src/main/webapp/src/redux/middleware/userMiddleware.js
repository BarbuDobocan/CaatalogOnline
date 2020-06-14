import {setRoles} from "../actions/user";

export const userMiddleware = ({dispatch}) => (next) => (action) => {
    next(action);

    switch(action.type) {
        case 'FETCH_ROLES':
            fetch('http://localhost:8080/admin/getRoles', {
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
                    dispatch(setRoles(result));
                });
        default:
            return null;
    }
}
