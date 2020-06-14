const initState = {
    professorMasterClass: null,
    studentAllFinalGrades: null
};

export default (professorMasterClassState = initState, action) => {
    switch (action.type) {
        case 'SET_MASTER_ASSIGNED_CLASS':
        {
            let professorMasterClass = action.payload;
            return {
                ...professorMasterClassState, ...{professorMasterClass}
            };
            break;
        }

        case 'SET_STUDENT_ALL_TYPE_FINAL_GRADES':{
            let studentAllFinalGrades = action.payload;
            return {
                ...professorMasterClassState, ...{studentAllFinalGrades}
            };
            break;
        }
        default:
            return professorMasterClassState;
    }
}
