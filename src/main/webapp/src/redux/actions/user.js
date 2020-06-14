export function fetchRoles(){
    return({
        type: 'FETCH_ROLES',
        payload: null
    });
}

export function setRoles(roles){
    return({
        type: 'SET_ROLES',
        payload: roles
    })
}
