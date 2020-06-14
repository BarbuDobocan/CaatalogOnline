import {setMasterAssignedClass, setStudentAllTypeFinalGrades} from '../actions/professorMasterClass'
import {setDataForFinalGrade, setStudentCoursMissings} from "../actions/professorClasses";

export const professorMasterClassMiddleware= ({dispatch}) => (next) => (action) => {
    next(action);
    switch (action.type) {
        case 'FETCH_MASTER_ASSIGNED_CLASS': {
            debugger;
            fetch('http://localhost:8080/professor/masterForThisClass', {
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
                    if(!result.error)
                    {
                        dispatch(setMasterAssignedClass(result));
                    }
                });
            break;
        }

        case 'MOTIVATE_STUDENT_ABSENCE':{
            let {missingId, coursId} = action.payload;
            debugger;
            fetch('http://localhost:8080/professor/motivateAbsence/' + missingId + '/' + coursId, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
                },
                body: null
            })
                .then(response => response.json())
                .then(selectedStudentMissings => {
                    debugger;
                    dispatch(setStudentCoursMissings(selectedStudentMissings))
                });
            break;
        }

        case 'FETCH_STUDENT_ALL_TYPE_FINAL_GRADES':{
            let studentId = action.payload;
            fetch('http://localhost:8080/professor/findStudentAllTypeGrades/' + studentId, {
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
                    dispatch(setStudentAllTypeFinalGrades(result));
                });
            break;
        }

        case 'SET_STUDENT_FINAL_GRADE_BEHAVIOR':{
            let newFinalGrade = action.payload;
            fetch('http://localhost:8080/professor/setStudentFinalGradeBehavior', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
                },
                body: JSON.stringify(newFinalGrade)
            })
                .then(response => response.json())
                .then(studentAllFinalGrades => {
                    debugger;
                    dispatch(setStudentAllTypeFinalGrades(studentAllFinalGrades))
                });
            break;
        }

        case 'DELETE_STUDENT_FINAL_BEHAVIOR_GRADE':{
            let studentId = action.payload;
            fetch('http://localhost:8080/professor/deleteStudentFinalGrade/' + studentId, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
                },
                body: null
            })
                .then(response => response.json())
                .then(studentAllFinalGrades => {
                    debugger;
                    dispatch(setStudentAllTypeFinalGrades(studentAllFinalGrades))
                });
            break;
        }

        case 'ASSIGN_STUDENT_TOTAL_GRADE':{
            let totalGradeDTO = action.payload;
            debugger;
            fetch('http://localhost:8080/professor/setStudentTotalGrade', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
                },
                body: JSON.stringify(totalGradeDTO)
            })
                .then(response => response.json())
                .then(studentAllFinalGrades => {
                    dispatch(setStudentAllTypeFinalGrades(studentAllFinalGrades))
                });
            break;
        }

        case 'DELETE_STUDENT_TOTAL_GRADE':{
            let totalGradeId= action.payload;
            fetch('http://localhost:8080/professor/deleteStudentTotalGrade/' + totalGradeId, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
                },
                body: null
            })
                .then(response => response.json())
                .then(studentAllFinalGrades => {
                    dispatch(setStudentAllTypeFinalGrades(studentAllFinalGrades))
                });
            break;
        }
    }
};
