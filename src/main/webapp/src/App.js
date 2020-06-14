import React from 'react';
import { BrowserRouter, Route, Switch} from "react-router-dom";
import LoginPage from "./authentication/LoginPage.js";
import Admin from "./components/admin/Admin.js";
import Admin2 from "./components/admin/Admin2";
import AdminUsers from "./components/admin/adminUsers/AdminUsers";
import AdminCours from "./components/admin/adminCourses/AdminCours";
import AdminClasses from "./components/admin/adminClasses/AdminClasses";
import AdminUserProfile from "./components/admin/adminUsers/AdminUserProfile";
import AdminClassProfile from "./components/admin/adminClasses/profileClass/AdminClassProfile";
import AdminHome from "./components/admin/adminHome/AdminHome";
import User from  "./authentication/User";
import Professor from "./components/professor/ProfessorHome/Professor.js";
import ProfessorClasses from "./components/professor/ProfessorClasses/ProfessorClasses";
import ProfessorCourses from "./components/professor/ProfessorCourses/ProfessorCourses";
import ProfessorMasterClass from "./components/professor/ProfessorMasterClass/ProfessorMasterClass";
import ProfessorClassProfile from "./components/professor/ProfessorClasses/ProfessorClassProfile";
import ProfessorStudentProfile from "./components/professor/ProfessorClasses/ProfessorStudentProfile";
import StudentProfile from "./components/professor/ProfessorMasterClass/ProfessorStudentProfile/StudentProfile";
import Parent from "./components/parent/Parent";
import ParentKids from "./components/parent/ParentKids";
import Student from "./components/student/Student";
import MyProfile from "./components/MyProfile/MyProfile";
import {ProtectedAdminRoute} from "./authentication/ProtectedAdminRoute.js";
import {ProtectedProfessorRoute} from "./authentication/ProtectedProfessorRoute";
import {ProtectedParentRoute} from "./authentication/ProtectedParentRoute";
import {ProtectedStudentRoute} from "./authentication/ProtectedStudentRoute";
import {ProtectedRoute} from "./authentication/ProtectedRoute.js";


export default function App() {
    return (
      <div className={"App"}>

          <BrowserRouter>
              <Switch>
                  <Route exact path={"/"} component={LoginPage}/>
                  <ProtectedRoute path={"/user"} component={User} />
                  <ProtectedAdminRoute path={"/admin"} component={Admin} />
                  <ProtectedAdminRoute path={"/adminUsers"} component={AdminUsers}/>
                  <ProtectedAdminRoute path={"/adminCourses"} component={AdminCours}/>
                  <ProtectedAdminRoute path={"/adminClasses"} component={AdminClasses}/>
                  <ProtectedAdminRoute path={"/adminHome"} component={AdminHome}/>
                  <ProtectedAdminRoute path={"/adminUserProfile"} component={AdminUserProfile}/>
                  <ProtectedAdminRoute path={"/protectedRouteAdmin2"} component={Admin2} />
                  <ProtectedAdminRoute path={"/adminClassProfile"} component={AdminClassProfile}/>
                  <ProtectedProfessorRoute path={"/professor"} component={Professor} />
                  <ProtectedProfessorRoute path={"/professorClasses"} component={ProfessorClasses} />
                  <ProtectedProfessorRoute path={"/professorCourses"} component={ProfessorCourses} />
                  <ProtectedProfessorRoute path={"/professorMasterClass"} component={ProfessorMasterClass} />
                  <ProtectedProfessorRoute path={"/professorSelectedClass"} component={ProfessorClassProfile} />
                  <ProtectedProfessorRoute path={"/professorSelectedStudentProfile"} component={StudentProfile} />
                  <ProtectedProfessorRoute path={"/professorStudentProfile"} component={ProfessorStudentProfile} />
                  <ProtectedParentRoute path={"/parent"} component={Parent} />
                  <ProtectedParentRoute path={"/myKids"} component={ParentKids} />
                  <ProtectedParentRoute path={"/parentUserProfile"} component={AdminUserProfile}/>
                  <ProtectedStudentRoute path={"/student"} component={Student} />
                  <ProtectedStudentRoute path={"/myGrades"} component={AdminUserProfile} />

                  <ProtectedAdminRoute path={"/myProfileAdmin"} component={MyProfile}/>
                  <ProtectedProfessorRoute path={"/myProfileProfessor"} component={MyProfile}/>
                  <ProtectedParentRoute path={"/myProfileParent"} component={MyProfile}/>
                  <ProtectedStudentRoute path={"/myProfileStudent"} component={MyProfile}/>
              </Switch>
          </BrowserRouter>
      </div>
    );
}
