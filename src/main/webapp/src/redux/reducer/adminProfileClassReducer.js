const initState = {
    students: [],
    courses: [],
    masterOfClass: null,
    allFreeStudents: [],
    allFreeUnassignedCourses:[],
    simpleProfessors:[],
    showModalForTransfStudent: false,
    differenceCourses: [],
};

export default (selectedClassProfileState = initState, action) => {
    switch (action.type) {
        case 'SET_ALL_FREE_STUDENTS':{
            const allFreeStudents = action.payload;
            return {
                ...selectedClassProfileState, ...{allFreeStudents}
            };
        }

        case 'SET_CLASS_PROFILE_STUDENTS':
        {
            const students = action.payload;
            return {
                ...selectedClassProfileState, ...students
            };
        }


        case 'SET_CLASS_PROFILE_COURSES':
        {
            const courses = action.payload;
            return {
                ...selectedClassProfileState, ...courses
            };
        }


        case 'SET_CLASS_PROFILE_MASTER':
        {
            const masterOfClass = action.payload;
            return {
                ...selectedClassProfileState, ...masterOfClass
            };
        }

        case 'SET_FREE_COURSES_CLASS':{
            const allFreeUnassignedCourses = action.payload;
            return {
                ...selectedClassProfileState, ...{allFreeUnassignedCourses}
            };
        }

        case 'SET_ALL_PROFESSORS_THAT_ARE_NOT_MASTERS': {
            const simpleProfessors = action.payload;
            return {
                ...selectedClassProfileState, ...{simpleProfessors}
            }
        }

        case 'MODAL_FOR_TRANSF_STUDENT':{
            const showModalForTransfStudent = action.payload;
            return {
                ...selectedClassProfileState, ...{showModalForTransfStudent}
            }
        }

        case 'SET_DIFFERENCE_COURSES':{
            const differenceCourses = action.payload;
            return {
                ...selectedClassProfileState, ...{differenceCourses}
            }
        }

        default:
            return selectedClassProfileState
    }
}
