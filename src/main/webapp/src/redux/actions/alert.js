export function showAlert(show, messageAlert){
    return({
        type: 'SHOW_ALERT',
        payload: {show, messageAlert}
    })
}

export function setNewUserError(newUserError){
    return({
        type: 'NEW_USER_ERROR',
        payload: {newUserError}
    })
}
