export function fetchUsers(roleID){
    return({
        type: 'FETCH_USERS',
        payload: roleID
    });
}

export function setUsers(users){
    return({
        type: 'SET_USERS',
        payload: users
    })
}

export function addNewUser(user){
    return({
        type: 'ADD_USER',
        payload: user
    })
}

export function fetchStudentData(studentID){
    return({
        type: 'FETCH_STUDENT_DATA',
        payload: studentID
    })
}

export function fetchProfessorData(professorID){
    return({
        type: 'FETCH_PROFESSOR_DATA',
        payload: professorID
    })
}

export function setUserProfileData(data){
    return({
        type:'SET_USER_PROFILE_DATA',
        payload: data
    })
}

export function setProfessorCourses(data){
    return ({
        type:'SET_PROFESSOR_COURSES',
        payload: data
    })
}

export function getProfessorUnassignedCourses(professorID){
    return({
        type:'GET_PROFESSOR_UNASSIGNED_COURSES',
        payload: professorID
    })
}

export function setProfessorUnassignedCourses(professorID){
    return({
        type:'SET_PROFESSOR_UNASSIGNED_COURSES',
        payload: professorID
    })
}

export function assignCoursToProfessor(coursId, professorId){
    return({
        type: 'ASSIGN_COURS_TO_PROFESSOR',
        payload: {coursId, professorId}
    })
}

export function removeCoursFromProfessor(coursId, professorId){
    return({
        type: "REMOVE_COURS_FROM_PROFESSOR",
        payload: {coursId, professorId}
    })
}

export function assignProfessorToClass(classID, professorID){
    return({
        type: 'ASSIGN_PROFESSOR_TO_CLASS',
        payload: {classID, professorID}
    })
}

export function setProfessorAssignedClasses(data){
    return({
        type: 'SET_PROFESSOR_ASSIGNED_CLASSES',
        payload: data
    })
}

//removeClassFromProfessor/{classID}/{professorID}
export function removeClassFromProfessor(classID, professorID){
    return({
        type: 'REMOVE_CLASS_FROM_PROFESSOR',
        payload: {classID, professorID}
    })
}

////getProfessorUnassignedClasses/{professorId}
export function getProfessorUnassignedClasses(professorId){
    return({
        type: 'FETCH_PROFESSOR_UNASSIGNED_CLASSES',
        payload: professorId
    })
}

export function setProfessorUnassignedClasses(data){
    return({
        type: 'SET_PROFESSOR_UNASSIGNED_CLASSES',
        payload: data
    })
}

export function removeClassFromMaster(professorID){
    return({
        type: 'REMOVE_CLASS_FROM_MASTER',
        payload: professorID
    })
}

export function setClassesWithoutMaster(data){
    return({
        type: 'SET_CLASSES_WITHOUT_MASTER',
        payload: data
    })
}

export function setProfessorMasterOfClass(data){
    return({
        type: 'SET_PROFESSOR_MASTER_OF_CLASS',
        payload: data
    })
}

export function setNULLSelectedUser(){
    return({
        type: 'SET_NULL_SELECTED_USER',
        payload: null
    })
}

export function setNULLStudentGrades(){
    return({
        type: 'SET_NULL_STUDENT_GRADES',
        payload: null
    })
}

export function setNULLStudentMissing(){
    return({
        type: 'SET_NULL_STUDENT_MISSINGS',
        payload: null
    })
}

export function findParentProfileData(parentID){
    return({
        type: 'FIND_PARENT_PROFILE_DATA',
        payload: parentID
    })
}

export function removeKidFromParent(parentID, kidID){
    return({
        type: 'REMOVE_KID_FROM_PARENT',
        payload: {parentID, kidID}
    })
}

export function findStudentThatAreNotKids(parentID){
    return({
        type: 'FIND_STUDENT_THAT_ARE_NOT_KIDS',
        payload: parentID
    })
}

export function setStudentsThatAreNotKids(data){
    return({
        type: 'SET_STUDENTS_THAT_ARE_NOT_KIDS',
        payload: data
    })
}

export function addKidsToParent(data){
    return({
        type: 'ADD_KIDS_TO_PARENT',
        payload: data
    })
}

export function changeUserData(data) {
    return({
      type: 'CHANGE_USER_DATA',
      payload: data
    })
}

export function deleteUser(userId, roleId){
    return({
        type: 'DELETE_SELECTED_USER',
        payload: {userId, roleId}
    })
}

export function goBackToUsersPage(bool){
    return({
        type: 'GO_BACK_TO_USERS_PAGE',
        payload: bool
    })
}
