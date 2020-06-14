import { BehaviorSubject } from 'rxjs';
//const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));
class Auth {

 constructor() {
     this.authenticated = false;
     this.token = null;
 }

 login(username, password, cb, showAlert) {
     fetch('http://localhost:8080/users/login', {
         method: 'POST',
         headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
         },
         body: JSON.stringify({
             "username": username,
             "password": password,
         })
     })
         .then(response => response.json())
         .then(result => {
             if(result && result.accessToken)
             {
                 localStorage.setItem('jwtToken', result.accessToken);
                 this.authenticated = true;
                 cb();
             }
             else
                 if(result.error){
                     console.log(result);
                     showAlert(result);
                 }
          });
 }

 logout(cb) {
     localStorage.removeItem('jwtToken');
     localStorage.removeItem('loggedUser');
     localStorage.removeItem('currentUser');
     this.authenticated = false;
     cb();
 }

 isAuthenticated() {
     return this.authenticated;
 }
}

export default new Auth();
