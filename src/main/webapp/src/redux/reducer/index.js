import { combineReducers } from 'redux';
import simpleReducer from './simpleReducer';
import adminUserReducer from './adminUsersReducer';
import adminCoursReducer from "./adminCoursReducer";
import adminClassesReducer from "./adminClassesReducer";
import userReducer from "./userReducer";
import yearStructureReducer from "./yearStructureReducer";
import professorMasterClassReducer from "./professorMasterClassReducer";
import professorSelectedClassReducer from "./professorSelectedClassReducer";
import adminProfileClassReducer from "./adminProfileClassReducer";
import parentReducer from "./parentReducer";
import alertReducer from "./alertReducer";

export const reducers = combineReducers({
    simpleReducer,
    adminUserReducer,
    adminCoursReducer,
    adminClassesReducer,
    adminProfileClassReducer,
    userReducer,
    yearStructureReducer,
    professorMasterClassReducer,
    professorSelectedClassReducer,
    parentReducer,
    alertReducer
});
