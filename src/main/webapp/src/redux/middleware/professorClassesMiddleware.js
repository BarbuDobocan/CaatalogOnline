import {setClasses} from "../actions/adminClasses";
import {
    setStudentsForSelectedClass,
    setProfessorClassCommonCourses,
    setDataForFinalGrade,
    setStudentCoursMissings
} from "../actions/professorClasses";

export const professorClassesMiddleware = ({dispatch}) => (next) => (action) =>{
    next(action);
    switch(action.type) {
        case 'FETCH_PROFESSORS_CLASSES': {
            fetch('http://localhost:8080/professor/getMyClasses', {
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
        }

        case 'FETCH_STUDENTS_FROM_SELECTED_CLASS':{
            let classId = action.payload;
            fetch('http://localhost:8080/professor/findAllStudentsFromAClass/' + classId, {
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
                    dispatch(setStudentsForSelectedClass(result.students))
                    dispatch(setProfessorClassCommonCourses(result.commonCours))
                });
            break;
        }
        case 'FETCH_PROFESSOR_CLASS_COMMON_COURSES':
        {
            let classId = action.payload;
            fetch('http://localhost:8080/professor/findCommonProfessorClassCourses/' + classId, {
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
                    dispatch(setProfessorClassCommonCourses(result))
                });
            break;
        }

        case 'ASSIGN_GRADE_TO_STUDENT':{
            let newGrade = action.payload;
            debugger;
            fetch('http://localhost:8080/professor/assignGradeToStudent', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
                },
                body: JSON.stringify(newGrade)
            })
                .then(response => response.json())
                .then(finalGradeForStudentData => {
                    debugger;
                    dispatch(setDataForFinalGrade(finalGradeForStudentData.body))
                });
            break;
        }

        case 'ASSIGN_MISSING_TO_STUDENT':{
            let newMissing = action.payload;
            fetch('http://localhost:8080/professor/addAbsenceToStudent', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
                },
                body: JSON.stringify(newMissing)
            })
                .then(response => response.json())
                .then(selectedStudentMissings => {
                    console.log(selectedStudentMissings);
                    dispatch(setStudentCoursMissings(selectedStudentMissings))
                });
            break;
        }

        case 'FETCH_DATA_FOR_FINAL_GRADE':
        {
            let {studentId, coursId, semester} = action.payload;
            fetch('http://localhost:8080/professor/findStudentGradesForFinal/'+studentId+'/'+coursId+'/'+semester, {
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
                    dispatch(setDataForFinalGrade(result))
                });
            break;
        }

        case 'NEW_FINAL_GRADE_FOR_STUDENT':
        {
            let {newFinalGrade} = action.payload;
            debugger;
            fetch('http://localhost:8080/professor/setStudentFinalGrade', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
                },
                body: JSON.stringify(newFinalGrade)
            })
                .then(response => response.json())
                .then(result => {
                    dispatch(setDataForFinalGrade(result))
                });
            break;
        }

        case 'DELETE_STUDENT_FINAL_GRADE':{
            let finalGradeId = action.payload;
            fetch('http://localhost:8080/professor/removeStudentFinalGrade/' + finalGradeId, {
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
                    dispatch(setDataForFinalGrade(result))
                });
            break;
        }

        case 'FETCH_STUDENT_COURS_MISSINGS':{
            let {studentId, coursId, semester} = action.payload;
            fetch('http://localhost:8080/professor/findStudentAbsences/' + studentId + '/' + coursId + '/' + semester, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
                },
                body: null
            })
                .then(response => response.json())
                .then(selectedStudentMissings => {
                    dispatch(setStudentCoursMissings(selectedStudentMissings))
                });
            break;
        }

        case 'DELETE_GRADE_OF_STUDENT':{
            debugger;
            let gradeId = action.payload;
            fetch('http://localhost:8080/professor/deleteGrade/' + gradeId, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
                },
                body: null
            })
                .then(response => response.json())
                .then(data => {
                    dispatch(setDataForFinalGrade(data))
                });
            break;
        }

        case 'DELETE_ABSENCE_OF_STUDENT':{
            let absenceId = action.payload;
            debugger;
            fetch('http://localhost:8080/professor/deleteAbsence/' + absenceId, {
                method: 'DELETE',
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

        case 'DELETE_THESIS_OF_STUDENT':{
            let tezaId = action.payload;
            debugger;
            fetch('http://localhost:8080/professor/deleteTezaFromStudent/' + tezaId, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
                },
                body: null
            })
                .then(response => response.json())
                .then(data => {
                    debugger;
                    dispatch(setDataForFinalGrade(data))
                });
            break;
        }

        case 'ASSIGN_THESIS_TO_STUDENT':{
            let newThesis = action.payload;
            debugger;
            fetch('http://localhost:8080/professor/assignTezaToStudent', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
                },
                body: JSON.stringify(newThesis)
            })
                .then(response => response.json())
                .then(result => {
                    debugger;
                    dispatch(setDataForFinalGrade(result))
                });
            break;
        }

    }
};
