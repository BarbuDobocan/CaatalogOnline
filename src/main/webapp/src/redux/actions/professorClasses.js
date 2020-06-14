export function fetchProfessorsClasses(){
    return({
        type: 'FETCH_PROFESSORS_CLASSES',
        payload: null
    });
}

export function fetchStudentsFromSelectedClass(classId){
    return({
        type: 'FETCH_STUDENTS_FROM_SELECTED_CLASS',
        payload: classId
    });
}

//aduce studentii si cursurile comune
export function setStudentsForSelectedClass(data){
    return({
        type: 'SET_STUDENTS_FOR_SELECTED_CLASS',
        payload: data
    })
}

export function fetchProfessorClassCommonCourses(classId){
    return({
        type: 'FETCH_PROFESSOR_CLASS_COMMON_COURSES',
        payload: classId
    })
}

export function setProfessorClassCommonCourses(data){
    return({
        type: 'SET_PROFESSOR_CLASS_COMMON_COURSES',
        payload: data
    })
}

export function assignGradeToStudent(newGrade){
    return({
        type: 'ASSIGN_GRADE_TO_STUDENT',
        payload: newGrade
        })
}

export function assignMissingToStudent(newMissing){
    return({
        type: 'ASSIGN_MISSING_TO_STUDENT',
        payload: newMissing
    })
}

export function fetchDataForFinalGrade(studentId, coursId, semester){
    return({
        type: 'FETCH_DATA_FOR_FINAL_GRADE',
        payload: {studentId, coursId, semester}
    })
}

export function setDataForFinalGrade(data){
    return({
        type: 'SET_DATA_FOR_FINAL_GRADE',
        payload: {data}
    })
}

export function newFinalGradeForStudent(newFinalGrade){
    return({
        type: 'NEW_FINAL_GRADE_FOR_STUDENT',
        payload: {newFinalGrade}
    })
}

export function deleteStudentFinalGrade(finalGradeId){
    return({
        type: 'DELETE_STUDENT_FINAL_GRADE',
        payload: finalGradeId
    })
}

export function fetchStudentCoursMissings(studentId, coursId, semester) {
    return({
        type: 'FETCH_STUDENT_COURS_MISSINGS',
        payload: {studentId, coursId, semester}
    })
}
export function setStudentCoursMissings(data){
    return({
        type: 'SET_STUDENT_COURS_MISSINGS',
        payload: data
    })
}
export function deleteGrade(gradeId){
    return({
        type: 'DELETE_GRADE_OF_STUDENT',
        payload: gradeId
    })
}
export function deleteMissing(absenceId){
    return({
        type: 'DELETE_ABSENCE_OF_STUDENT',
        payload: absenceId
    })
}

export function assignThesisToStudent(thesis){
    return({
        type: 'ASSIGN_THESIS_TO_STUDENT',
        payload: thesis
    })
}

export function deleteThesis(thesisId){
    return({
        type: 'DELETE_THESIS_OF_STUDENT',
        payload: thesisId
    })
}
