export function findMyKids(){
    return({
        type: 'FIND_MY_KIDS',
        payload: null
    })
}

export function setMyKids(data){
    return({
        type: 'SET_MY_KIDS',
        payload: data
    })
}
