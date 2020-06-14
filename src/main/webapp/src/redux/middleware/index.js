import {adminUsersMiddleware} from "./adminUsersMiddleware";
import {adminCoursMiddleware} from "./adminCoursMiddleware";
import {adminProfileClassMiddleware} from "./adminProfileClassMiddleware";
import {adminClassesMiddleware} from "./adminClassesMiddleware";
import {professorClassesMiddleware} from "./professorClassesMiddleware";
import {professorCoursesMiddleware} from "./professorCoursesMiddleware";
import {professorMasterClassMiddleware} from './professorMasterClassMiddleware';
import {userMiddleware} from "./userMiddleware";
import {yearStructureMiddleware} from "./yearStructureMiddleware"
import {parentMiddleware} from "./parentMiddleware";

export const appMidleware = [
    adminUsersMiddleware,
    adminCoursMiddleware,
    adminProfileClassMiddleware,
    adminClassesMiddleware,
    professorClassesMiddleware,
    professorCoursesMiddleware,
    professorMasterClassMiddleware,
    userMiddleware,
    yearStructureMiddleware,
    parentMiddleware
];
