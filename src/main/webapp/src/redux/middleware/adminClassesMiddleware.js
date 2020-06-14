import {setClasses} from "../actions/adminClasses";
import {setSelectedClass} from "../actions/adminClasses";
import {waitForData} from "../actions/adminClasses";
import {setUsers} from "../actions/adminUsers";
import {setClassProfileMaster} from "../actions/adminProfileClass";

export const adminClassesMiddleware = ({dispatch}) => (next) => (action) =>{
    next(action);
    switch(action.type) {
        case 'FETCH_CLASSES':
            fetch('http://localhost:8080/admin/getClasses', {
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
                    dispatch(setClasses(result));
                });
        break;
        case 'GET_SELECTED_CLASS':
            const classID = action.payload;
            fetch('http://localhost:8080/admin/getClass/'+classID, {
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
                    if(result.error == null) {
                        dispatch(setSelectedClass(result));
                        dispatch(waitForData(true))
                    }
                });
            break;

        case 'ADD_STUDENT_TO_CLASS':
            const data = action.payload;
            fetch('http://localhost:8080/admin/addStudentToClass/'+data.classID+'/'+data.studentID, {
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
                    if(result.error == null) {
                        dispatch(setSelectedClass(result));
                        dispatch(waitForData(true))
                    }
                });
            break;

        case 'REMOVE_STUDENT_FROM_CLASS':
            const data1 = action.payload;
            fetch('http://localhost:8080/admin/removeStudentFromClass/'+data1.classID+'/'+data1.studentID, {
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
                    if(result.error == null) {
                        dispatch(setSelectedClass(result));
                        dispatch(waitForData(true))
                    }
                });
            break;

            //asta ii folosit la pagina de Classes
        case 'ADD_PROFESSOR_TO_CLASS':
            const data2 = action.payload;
            fetch('http://localhost:8080/admin/assignProfessorToClass/'+data2.classID+'/'+data2.studentID, {
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
                    if(result.error == null) {
                        dispatch(setSelectedClass(result));
                        dispatch(waitForData(true))
                    }
                });
            break;

        //asta ii folosit la pagina de Classes
        case 'REMOVE_PROFESSOR_FROM_CLASS':
            const data3 = action.payload;
            fetch('http://localhost:8080/admin/removeProfessorFromClass/'+data3.classID+'/'+data3.studentID, {
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
                    if(result.error == null) {
                        dispatch(setSelectedClass(result));
                        dispatch(waitForData(true))
                    }
                });
            break;

        case 'ADD_COURS_TO_CLASS':
            const data4 = action.payload;
            fetch('http://localhost:8080/admin/assignCoursToClass/'+data4.classID+'/'+data4.coursID, {
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
                    if(result.error == null) {
                        dispatch(setSelectedClass(result));
                        ///functia asta se asigura de faptul ca setState ul din didUpdate se face doar dupa ce au venit datele
                        dispatch(waitForData(true))
                    }
                });
            break;

        case 'REMOVE_COURS_FROM_CLASS':
            const data5 = action.payload;
            fetch('http://localhost:8080/admin/removeCoursFromClass/'+data5.classID+'/'+data5.coursID, {
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
                    if(result.error == null) {
                        dispatch(setSelectedClass(result));
                        dispatch(waitForData(true))
                    }
                });
            break;

        case 'CREATE_NEW_CLASS':
        {
            fetch('http://localhost:8080/admin/addNewClass', {
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
                    if(result.error == null)
                    {
                        dispatch(setClasses(result));
                    }
                });
            break;
        }

        case 'DELETE_SELECTED_CLASS':
        {
            fetch('http://localhost:8080/admin/deleteClass/' + action.payload, {
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
                    if(result.error == null)
                    {
                        dispatch(setClasses(result));
                    }
                });
            break;
        }

        case 'REMOVE_MASTER_OF_CLASS':
        {
            fetch('http://localhost:8080/admin/removeMasterOfClass/' + action.payload, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
                },
                body: null
            })
                .then(response => response.json())
                .then(response => {
                    if(response === false)
                    {
                        let masterOfClass = null;
                        dispatch(setClassProfileMaster({masterOfClass}));
                    } else {
                        let masterOfClass = response;
                        dispatch(setClassProfileMaster({masterOfClass}));
                    }

                });
            break;
        }

        case 'ASSIGN_MASTER_TO_CLASS':
        {
            let {classID, professorID} = action.payload;
            fetch('http://localhost:8080/admin/assignMasterToClass/'+classID+'/'+professorID, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
                },
                body: null
            })
                .then(response => response.json())
                .then(masterOfClass => {
                    if(masterOfClass.error == null)
                    {
                        // dispatch(setSelectedClass(result));
                        // ///functia asta se asigura de faptul ca setState ul din didUpdate se face doar dupa ce au venit datele
                        // dispatch(waitForData(true))
                        dispatch(setClassProfileMaster({masterOfClass}))
                    }
                });
            break;
        }

        default:
            return null;
    }
};
