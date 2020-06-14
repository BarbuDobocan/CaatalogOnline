const initState = {
    professorSelectedClass: [],
    professorClassCommonCourses: [],
    finalGradeForStudentData: null,
    selectedStudentMissings: []
};

export default (professorSelectedClassState = initState, action) => {
    switch (action.type) {
        case 'SET_NULL_STUDENT_GRADES':{
            let finalGradeForStudentData = action.payload;
            return {
                ...professorSelectedClassState , ...{finalGradeForStudentData}
            };
        }

        case 'SET_NULL_STUDENT_MISSINGS':{
            let selectedStudentMissings = [];
            return {
                ...professorSelectedClassState , ...{selectedStudentMissings}
            };
        }

        case 'SET_STUDENTS_FOR_SELECTED_CLASS':
        {
            let professorSelectedClass = action.payload;
            return {
                ...professorSelectedClassState , ...{professorSelectedClass}
            };
            break;
        }

        case 'SET_PROFESSOR_CLASS_COMMON_COURSES':
        {
            let professorClassCommonCourses = action.payload;
            return {
                ...professorSelectedClassState , ...{professorClassCommonCourses}
            };
            break;
        }

        case 'SET_DATA_FOR_FINAL_GRADE':
        {
            let finalGradeForStudentData = action.payload.data;
            return {
                ...professorSelectedClassState , ...{finalGradeForStudentData}
            };
            break;
        }

        case 'SET_STUDENT_COURS_MISSINGS':{
            let selectedStudentMissings = action.payload;
            return {
                ...professorSelectedClassState , ...{selectedStudentMissings}
            };
            break;
        }

        default:
            return professorSelectedClassState;
    }
}
