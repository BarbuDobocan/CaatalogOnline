export function startNewYear(){
    return ({
        type: 'START_NEW_YEAR',
        payload: null
    })
}

export function startSemI() {
    return ({
        type: 'START_SEM_I',
        payload: null
    });
}

export function stopSemI() {
    return ({
        type: 'STOP_SEM_I',
        payload: null
    });
}

export function startSemII() {
    return ({
        type: 'START_SEM_II',
        payload: null
    });
}

export function stopSemII() {
    return ({
        type: 'STOP_SEM_II',
        payload: null
    });
}

export function finishTheYear() {
    return ({
        type: 'FINISH_THE_YEAR',
        payload: null
    });
}

export function getYearStructure() {
    return ({
        type: 'GET_YEAR_STRUCTURE',
        payload: null
    });
}

export function setYearStructure(data){
    return ({
        type: 'SET_YEAR_STRUCTURE',
        payload: data
    });
}
