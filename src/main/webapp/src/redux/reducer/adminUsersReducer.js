const initState = {
    fetchedUsers: null,
    selectedUser: null,
    unassignedCoursesToProfessor: [],
    unassignedClassesToProfessor: [],
    classesWithoutMaster: [],
    studentsThatAreNotKids: [],
    goBackToUsersPage: false
};

export default (adminUsersState = initState, action) => {
    switch (action.type) {

        case 'GO_BACK_TO_USERS_PAGE':{
            let goBackToUsersPage = action.payload;
            return {
                ...adminUsersState, ...{goBackToUsersPage}
            }
        }

        case 'SET_STUDENTS_THAT_ARE_NOT_KIDS': {
            const studentsThatAreNotKids = action.payload;
            return {
                ...adminUsersState, ...{studentsThatAreNotKids}
            }
        }

        case 'SET_USERS':
            const fetchedUsers =  action.payload;
            return {
                ...adminUsersState, ...{fetchedUsers}
            };
            break;

        case 'SET_USER_PROFILE_DATA':
        {
            const selectedUser = action.payload;
            return {
                ...adminUsersState, ...{selectedUser}
            };
            break;
        }

        case 'SET_PROFESSOR_UNASSIGNED_COURSES':
            const unassignedCoursesToProfessor = action.payload;
            return {
                ...adminUsersState, ...{unassignedCoursesToProfessor}
            };
            break;

        case 'SET_PROFESSOR_COURSES':
        {
            const professorCourses = action.payload;
            let selectedUser = adminUsersState.selectedUser;
            selectedUser.courses = professorCourses;
            return {
                ...adminUsersState, ...{selectedUser}
            };
            break;
        }

        case 'SET_PROFESSOR_UNASSIGNED_CLASSES':
        {
            const unassignedClassesToProfessor = action.payload;
            return {
                ...adminUsersState, ...{unassignedClassesToProfessor}
            }
            break;
        }

        case 'SET_PROFESSOR_ASSIGNED_CLASSES':
        {
            let classes = action.payload;
            let selectedUser = adminUsersState.selectedUser;
            selectedUser.classes = classes;
            return {
                ...adminUsersState, ...{selectedUser}
            };
            break;
        }

        case 'SET_PROFESSOR_MASTER_OF_CLASS':
        {
            let masterOfClass = action.payload;
            let selectedUser = adminUsersState.selectedUser;
            selectedUser.masterOfClass = masterOfClass;
            return {
                ...adminUsersState, ...{selectedUser}
            }
            break;
        }

        case 'SET_CLASSES_WITHOUT_MASTER':
        {
            let classesWithoutMaster = action.payload;
            return {
                ...adminUsersState, ...{classesWithoutMaster}
            }
            break;
        }

        case 'SET_NULL_SELECTED_USER': {
            let selectedUser = action.payload;
            return {
                ...adminUsersState, ...{selectedUser}
            }
            break;
        }

        default:
            return adminUsersState
    }
}
