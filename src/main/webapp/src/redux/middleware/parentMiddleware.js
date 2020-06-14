import {setMyKids} from "../actions/parent"

export const parentMiddleware = ({dispatch}) => (next) => (action) => {
    next(action);

    switch (action.type) {
        case 'FIND_MY_KIDS': {
            fetch('http://localhost:8080/parent/findMyKids', {
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
                    if (result.error == null) {
                       dispatch(setMyKids(result))
                    }
                });
            break;
        }
    }
};

