import {setYearStructure} from "../actions/yearStuctureAction"

export const yearStructureMiddleware = ({dispatch}) => (next) => (action) => {
    next(action);
    switch (action.type) {
        case 'START_NEW_YEAR':
        {
            fetch('http://localhost:8080/admin/startNewYear' , {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
                },
                body: null
            })
                .then(response => response.json())
                .then(result => {
                    if(result.error == null)
                    {
                        dispatch(setYearStructure(result));
                    }
                });
            break;
        }

        case 'START_SEM_I':
        {
            fetch('http://localhost:8080/admin/startSemI' , {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
                },
                body: null
            })
                .then(response => response.json())
                .then(result => {
                    if(result.error == null)
                    {
                        dispatch(setYearStructure(result));
                    }
                });
            break;
        }

        case 'STOP_SEM_I':
        {
            debugger;
            fetch('http://localhost:8080/admin/stopSemI' , {
                method: 'PUT',
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
                    if(result.error == null)
                    {
                        debugger;
                        dispatch(setYearStructure(result));
                    }
                });
            break;
        }

        case 'START_SEM_II':
        {
            fetch('http://localhost:8080/admin/startSemII' , {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
                },
                body: null
            })
                .then(response => response.json())
                .then(result => {
                    if(result.error == null)
                    {
                        dispatch(setYearStructure(result));
                    }
                });
            break;
        }

        case 'STOP_SEM_II':
        {
            fetch('http://localhost:8080/admin/stopSemII' , {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
                },
                body: null
            })
                .then(response => response.json())
                .then(result => {
                    if(result.error == null)
                    {
                        dispatch(setYearStructure(result));
                    }
                });
            break;
        }

        case 'FINISH_THE_YEAR':
        {
            fetch('http://localhost:8080/admin/yearIsFinished' , {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
                },
                body: null
            })
                .then(response => response.json())
                .then(result => {
                    if(result.error == null)
                    {
                        dispatch(setYearStructure(result));
                    }
                });
            break;
        }

        case 'GET_YEAR_STRUCTURE':
        {
            fetch('http://localhost:8080/admin/getYearStructure' , {
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
                    if(result.error == null)
                    {
                        dispatch(setYearStructure(result));
                    }
                });
            break;
        }

    }
}
