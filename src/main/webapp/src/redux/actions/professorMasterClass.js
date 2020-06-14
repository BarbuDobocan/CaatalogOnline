export function fetchMasterAssignedClass(){
    return({
        type: 'FETCH_MASTER_ASSIGNED_CLASS',
        payload: null
    });
}

export function setMasterAssignedClass(data){
    return({
        type: 'SET_MASTER_ASSIGNED_CLASS',
        payload: data
    })
}

export function motivateAbsence(missingId, coursId){
    return({
        type: 'MOTIVATE_STUDENT_ABSENCE',
        payload: {missingId, coursId}
    })
}

export function fetchStudentAllTypeFinalGrades(studentId){
    return({
        type: 'FETCH_STUDENT_ALL_TYPE_FINAL_GRADES',
        payload: studentId
    })
}

export function setStudentAllTypeFinalGrades(data){
    return({
        type: 'SET_STUDENT_ALL_TYPE_FINAL_GRADES',
        payload: data
    })
}

export function setStudentFinalGradeBehavior(newFinalGrade) {
    return({
        type: 'SET_STUDENT_FINAL_GRADE_BEHAVIOR',
        payload: newFinalGrade
    })
}

export function deleteStudentFinalBehaviorGrade(studentId){
    return({
        type: 'DELETE_STUDENT_FINAL_BEHAVIOR_GRADE',
        payload: studentId
    })
}

export function assignStudentTotalGrade(totalGradeDTO){
    return({
        type: 'ASSIGN_STUDENT_TOTAL_GRADE',
        payload: totalGradeDTO
    })
}

export function deleteStudentTotalGrade(totalGradeId){
    return({
        type:'DELETE_STUDENT_TOTAL_GRADE',
        payload: totalGradeId
    })
}
