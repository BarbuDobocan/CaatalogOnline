import {
    setUsers,
    setUserProfileData,
    setProfessorUnassignedCourses,
    setProfessorCourses,
    setProfessorUnassignedClasses,
    setProfessorAssignedClasses,
    setClassesWithoutMaster,
    setProfessorMasterOfClass,
    setStudentsThatAreNotKids,
    goBackToUsersPage
} from "../actions/adminUsers";
import {setNewUserError} from "../actions/alert";
import history from './history/history';

export const adminUsersMiddleware = ({dispatch}) => (next) => (action) => {
    next(action);

    switch(action.type) {
        case 'FETCH_USERS':
            const roleID =  action.payload;
            fetch('http://localhost:8080/admin/findAllUsersWithRole/'+roleID, {
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
                //    console.log(" ============ ", result);
                    dispatch(setUsers(result));
                });
            break;

        case 'ADD_USER':
            fetch('http://localhost:8080/admin/addNewUser', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
                },
                body: JSON.stringify(action.payload)
            })
                .then(response => response.json())
                .then(result => {
                    debugger;
                    if(result.error == null)
                    {
                        dispatch(setUsers(result));
                    }else
                    {
                        if(result.error === true){
                            dispatch(setNewUserError(result.message))
                        }
                    }

                });
            break;

        case 'FETCH_STUDENT_DATA':
            const studentID = action.payload;
            fetch('http://localhost:8080/professor/getStudentProfileData/'+studentID, {
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
                        dispatch(setUserProfileData(result));
                    }

                });
            break;

        case 'FETCH_PROFESSOR_DATA':
        {
            const professorID = action.payload;
            fetch('http://localhost:8080/admin/getProfessorProfileData/'+professorID, {
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
                        dispatch(setUserProfileData(result));
                    }
                });
            break;
        }

        case 'FIND_PARENT_PROFILE_DATA':{
            const parentID = action.payload;
            debugger;
            fetch('http://localhost:8080/admin/getParentProfileData/'+parentID, {
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
                        debugger;
                        dispatch(setUserProfileData(result));
                    }
                });
            break;
        }

        case 'GET_PROFESSOR_UNASSIGNED_COURSES':
        {
            const professorId = action.payload;
            fetch('http://localhost:8080/admin/getProfessorUnassignedCourses/'+professorId, {
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
                        dispatch(setProfessorUnassignedCourses(result));
                    }
                });
            break;
        }

        case 'ASSIGN_COURS_TO_PROFESSOR':
        {
            const assigCoursData = action.payload;
            debugger;
            fetch('http://localhost:8080/admin/assignCoursToProfessor/' + assigCoursData.professorId + '/' + assigCoursData.coursId , {
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
                 //   console.log(result);
                    if(result.error == null)
                    {
                        debugger;
                        // console.log('==-=-=-=-=-', result);
                        // dispatch(setProfessorUnassignedCourses(result.unassignedCourses));
                        // dispatch(setProfessorCourses(result.assignedCourses));
                        dispatch(setUserProfileData(result))
                    }
                });
            break;
        }

        case 'REMOVE_COURS_FROM_PROFESSOR':
        {
            const assigCoursData = action.payload;
          //  console.log('REMOVE_COURS_FROM_PROFESSOR ', assigCoursData);
            fetch('http://localhost:8080/admin/removeCoursFromProfessor/' + assigCoursData.professorId + '/' + assigCoursData.coursId , {
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
                   // console.log(result);
                    if(result.error == null)
                    {
                        // dispatch(setProfessorUnassignedCourses(result.unassignedCourses));
                        // dispatch(setProfessorCourses(result.assignedCourses));
                        dispatch(setUserProfileData(result))
                    }
                });
            break;
        }


        //asta e folosit de pe pagina de USER PROFILE
        case 'ASSIGN_PROFESSOR_TO_CLASS':
        {
            let assignClassData = action.payload;//classID, professorID
            fetch('http://localhost:8080/admin/assignClassToProfessor/'+ assignClassData.classID +'/'+ assignClassData.professorID ,{
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
                   // console.log(result);
                    if(result.error == null)
                    {
                        dispatch(setProfessorUnassignedClasses(result.unassignedClasses));
                        dispatch(setProfessorAssignedClasses(result.assignedClasses));
                    }
                });
            break;
        }

        ////asta e folosit de pe pagina de USER PROFILE
        case 'REMOVE_CLASS_FROM_PROFESSOR':
        {
            let removeClassData = action.payload;//classID, professorID
            fetch('http://localhost:8080/admin/removeClassFromProfessor/'+ removeClassData.classID +'/'+ removeClassData.professorID ,{
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
                   // console.log(result);
                    if(result.error == null)
                    {
                        dispatch(setProfessorUnassignedClasses(result.unassignedClasses));
                        dispatch(setProfessorAssignedClasses(result.assignedClasses));
                    }
                });
            break;
        }


        //asta e folosit de pe pagina de USER PROFILE
        case 'FETCH_PROFESSOR_UNASSIGNED_CLASSES':
        {
            const professorId = action.payload;
            fetch('http://localhost:8080/admin/getProfessorUnassignedClasses/'+professorId, {
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
                        dispatch(setProfessorUnassignedClasses(result));
                    }
                });
            break;
        }

        //asta e folosit de pe pagina de USER PROFILE(profesor), profesorul nu mai este diriginte
        case 'REMOVE_CLASS_FROM_MASTER':
        {
            const professorId = action.payload;
            fetch('http://localhost:8080/admin/removeClassFromMaster/'+professorId, {
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
                        dispatch(setClassesWithoutMaster(result.classesWithoutMaster));
                        dispatch(setProfessorMasterOfClass(result.masterOfClass))
                    }
                });
            break;
        }

        case 'REMOVE_KID_FROM_PARENT':{
            const {parentID, kidID} = action.payload;
            debugger;
            fetch('http://localhost:8080/admin/removeKidFromParent/' + parentID + '/' + kidID, {
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
                        dispatch(setUserProfileData(result));
                    }
                });
            break;
        }

        case 'FIND_STUDENT_THAT_ARE_NOT_KIDS':{
            const professorId = action.payload;
            debugger;
            fetch('http://localhost:8080/admin/getStudentsThatAreNotHisKids/'+professorId, {
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
                        debugger;
                        dispatch(setStudentsThatAreNotKids(result));
                    }
                });
            break;
        }

        case 'ADD_KIDS_TO_PARENT':{
            fetch('http://localhost:8080/admin/addKidsToParent', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
                },
                body: JSON.stringify(action.payload)
            })
                .then(response => response.json())
                .then(result => {
                    if(result.error == null)
                    {
                        dispatch(setUserProfileData(result));
                    }

                });
            break;
        }

        case 'CHANGE_USER_DATA':{
            fetch('http://localhost:8080/admin/changeSelectedUserData', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
                },
                body: JSON.stringify(action.payload)
            })
                .then(response => response.json())
                .then(result => {
                    if(result.error == null)
                    {
                        dispatch(setUserProfileData(result));
                    }

                });
            break;
        }

        case 'DELETE_SELECTED_USER':{
            debugger;
            let {userId, roleId} = action.payload;
            fetch('http://localhost:8080/admin/deleteUserById/' + userId, {
                method: 'DELETE',
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
                        dispatch(goBackToUsersPage(true));
                        // history.push(
                        //     {
                        //         pathname: '/adminUsers',
                        //         state: roleId
                        //     })
                });
            break;
        }

        default:
            return null;
    }
}
