export function fetchClasses(){
    return({
        type: 'FETCH_CLASSES',
        payload: null
    });
}

export function setClasses(classes){
    return({
        type: 'SET_CLASSES',
        payload: classes
    });
}

// export function getSelectedClass(classID){
//     return({
//         type: 'GET_SELECTED_CLASS',
//         payload: classID
//     })
// }

export function setSelectedClass(selectedClass){
    return({
        type: 'SET_SELECTED_CLASS',
        payload: selectedClass
    })
}

// export function addStudentToClass(classID, studentID){
//     return({
//         type: 'ADD_STUDENT_TO_CLASS',
//         payload: {classID, studentID}
//     })
// }
//
// export function removeStudentFromClass(classID, studentID){
//     return({
//         type:'REMOVE_STUDENT_FROM_CLASS',
//         payload: {classID, studentID}
//     })
// }
//
// export function addProfessorToClass(classID, studentID){
//     return({
//         type: 'ADD_PROFESSOR_TO_CLASS',
//         payload: {classID, studentID}
//     })
// }
//
// export function removeProfessorFromClass(classID, studentID){
//     return({
//         type:'REMOVE_PROFESSOR_FROM_CLASS',
//         payload: {classID, studentID}
//     })
// }
//
// export function addCoursToClass(classID, coursID){
//     return({
//         type:'ADD_COURS_TO_CLASS',
//         payload: {classID, coursID}
//     })
// }
//
// export function removeCoursFromClass(classID, coursID){
//     return({
//         type:'REMOVE_COURS_FROM_CLASS',
//         payload: {classID, coursID}
//     })
// }

export function waitForData(waitFlagClass){
    return({
        type: "WAIT_FOR_DATA",
        payload: waitFlagClass
    })
}

export function createNewClass(newClass){
    return({
        type: 'CREATE_NEW_CLASS',
        payload: newClass
    })
}

export function deleteClass(classId){
    return({
        type:'DELETE_SELECTED_CLASS',
        payload: classId
    })
}

export function removeMasterOfClass(classID) {
    return({
        type:'REMOVE_MASTER_OF_CLASS',
        payload: classID
    })
}

export function assignMasterToClass(classID, professorID){
    return({
        type: 'ASSIGN_MASTER_TO_CLASS',
        payload: {classID, professorID}
    })
}

