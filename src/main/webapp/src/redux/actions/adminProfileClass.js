export function fetchProfileClassData(classId){
    return({
        type: 'FETCH_PROFILE_CLASS_DATA',
        payload: classId
    });
}

export function setProfileClassData(data){
    return({
       type: 'SET_PROFILE_CLASS_DATA',
       payload: data
    });
}

export function setClassProfileStudents(data) {
    return({
        type: 'SET_CLASS_PROFILE_STUDENTS',
        payload: data
    })
}

export function setClassProfileCourses(data) {
    return({
        type: 'SET_CLASS_PROFILE_COURSES',
        payload: data
    })
}

export function setClassProfileMaster(data) {
    return({
        type: 'SET_CLASS_PROFILE_MASTER',
        payload: data
    })
}

export function fetchFreeStudents(){
    return({
        type: 'FETCH_FREE_STUDENTS',
        payload: null
    })
}

export function setFreeStudents(data){
    return({
        type: 'SET_ALL_FREE_STUDENTS',
        payload: data
    })
}

export function assignManyStudentsToClass(classStudents){
    return({
        type: 'ASSIGN_MANY_STUDENTS_TO_CLASS',
        payload: classStudents
    })
}

export function removeSelectedStudentFromClass(classId, studentId){
    return({
        type: 'REMOVE_SELECTED_STUDENT_FROM_CLASS',
        payload: {classId, studentId}
    })
}

export function fetchFreeCoursesClass(classId){
    return({
        type: 'FETCH_FREE_COURSES_CLASS',
        payload: classId
    })
}

export function setFreeCoursesClass(data){
    return({
        type: 'SET_FREE_COURSES_CLASS',
        payload: data
    })
}

export function assignManyCoursesToClass(classId, courses){
    return({
        type: 'ASSIGN_MANY_COURSES_TO_CLASS',
        payload: {classId, courses}
    })
}

export function removeCoursAndProfessorFromClass(classId, coursId){
    return({
        type: 'REMOVE_COURS_PROFESSOR_FROM_CLASS',
        payload: {classId, coursId}
    })
}

export function getAllProfessorsThatAreNotMasters(){
    return({
        type: 'GET_ALL_PROFESSORS_THAT_ARE_NOT_MASTERS',
        payload: null
    })
}

export function setAllProfessorsThatAreNotMasters(data){
    return({
        type: 'SET_ALL_PROFESSORS_THAT_ARE_NOT_MASTERS',
        payload: data
    })
}

export function assignStudentToClassSemI(studentID, classID){
    return({
        type: 'ASSIGN_STUDENT_TO_CLASS_SEM_I',
        payload: {studentID, classID}
    })
}

export function modalForTransfStudent(show){
    return({
        type: 'MODAL_FOR_TRANSF_STUDENT',
        payload: show
    })
}

export function setDifferenceCourses(data){
    return({
        type: 'SET_DIFFERENCE_COURSES',
        payload: data
    })
}

export function assignTransferredStudentToClass(data){
    return({
        type: 'ASSIGN_TRANSFERRED_STUDENT_TO_CLASS',
        payload: data
    })
}

export function changeProfileClassData(data){
    return({
        type: 'CHANGE_PROFILE_CLASS_DATA',
        payload: data
    })
}

