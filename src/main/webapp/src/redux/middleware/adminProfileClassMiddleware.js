import {
    setClassProfileMaster,
    setClassProfileCourses,
    setClassProfileStudents,
    setFreeStudents,
    setFreeCoursesClass,
    setAllProfessorsThatAreNotMasters,
    modalForTransfStudent,
    setDifferenceCourses
} from "../actions/adminProfileClass";

export const adminProfileClassMiddleware = ({dispatch}) => (next) => (action) =>{
    next(action);
    switch(action.type) {
        case 'FETCH_PROFILE_CLASS_DATA':{
            let classId = action.payload;
            fetch('http://localhost:8080/admin/getClassProfileData/' + classId, {
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
                    //dispatch(setProfileClassData(result));
                    dispatch(setClassProfileStudents(result));
                    dispatch(setClassProfileCourses(result));
                    dispatch(setClassProfileMaster(result));
                });
            break;
        }

        case 'FETCH_FREE_STUDENTS':{
            fetch('http://localhost:8080/admin/getFreeStudents', {
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
                    dispatch(setFreeStudents(result))
                });
            break;
        }

        case 'ASSIGN_MANY_STUDENTS_TO_CLASS':{
            let classStudents = action.payload;
            fetch('http://localhost:8080/admin/assignManyStudentsToClass', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
                },
                body: JSON.stringify(classStudents)
            })
                .then(response => response.json())
                .then(students => {
                    dispatch(setClassProfileStudents({students}));
                });
            break;
        }

        case 'ASSIGN_STUDENT_TO_CLASS_SEM_I':{
            let {studentID, classID} = action.payload;
            fetch('http://localhost:8080/admin/assignStudentToClass/' + classID + '/' + studentID, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
                },
                body: null
            })
                .then(response => response.json())
                .then(students => {
                    debugger;
                    if(students.showModal)
                    {
                        dispatch(modalForTransfStudent(students.showModal));
                        let courses = students.response;
                        courses.map((item) => {
                            item.grade = 1;
                        });
                        dispatch(setDifferenceCourses(courses));
                    }
                    else{
                        dispatch(setClassProfileStudents({students}));
                    }
                });
            break;
        }

        case 'REMOVE_SELECTED_STUDENT_FROM_CLASS':{
            let data = action.payload;
            fetch('http://localhost:8080/admin/takeOutStudentFromClass/' + data.studentId + '/' + data.classId, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
                },
                body: null
            })
                .then(response => response.json())
                .then(students => {
                    dispatch(setClassProfileStudents({students}));
                });
            break;
        }

        case 'FETCH_FREE_COURSES_CLASS':{
            let classId = action.payload;
            fetch('http://localhost:8080/admin/findUnassignedCoursesProfToClass/'+classId, {
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
                    let result2 = result;
                    result2.map((item) => {
                        item.checked = false;
                    });
                    dispatch(setFreeCoursesClass(result2))
                });
            break;
             }

        case 'ASSIGN_MANY_COURSES_TO_CLASS':{
            let {classId, courses} = action.payload;
            fetch('http://localhost:8080/admin/assignManyCoursesToAClass/'+classId, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
                },
                body: JSON.stringify(courses)
            })
                .then(response => response.json())
                .then(courses => {
                    dispatch(setClassProfileCourses({courses}))
                });
            break;
        }

        case 'REMOVE_COURS_PROFESSOR_FROM_CLASS':{
            let {classId, coursId} = action.payload;
            fetch('http://localhost:8080/admin/removeCoursByProfessorFromClass/' + classId + '/' + coursId, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
                },
                body: null
            })
                .then(response => response.json())
                .then(courses => {
                    dispatch(setClassProfileCourses({courses}))
                });
            break;
        }

        case 'GET_ALL_PROFESSORS_THAT_ARE_NOT_MASTERS':{
            fetch('http://localhost:8080/admin/getProfessorsThatAreNotMastersForClassProfile', {
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
                    dispatch(setAllProfessorsThatAreNotMasters(result))
                });
            break;
        }

        case 'ASSIGN_TRANSFERRED_STUDENT_TO_CLASS':{
            let data = action.payload;
            debugger;
            fetch('http://localhost:8080/admin/addFinalsToStudentAndAssignHimToClass', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(students => {
                    debugger;
                    dispatch(setClassProfileStudents({students}));
                });
            break;
        }

        case 'CHANGE_PROFILE_CLASS_DATA':{
            let data = action.payload;
            debugger;
            fetch('http://localhost:8080/admin/changeClassProfileData', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(result => {
                    debugger;
                    dispatch(setClassProfileStudents(result));
                    dispatch(setClassProfileCourses(result));
                    dispatch(setClassProfileMaster(result));
                });
            break;
        }

        default:
            return null;
        }
};
