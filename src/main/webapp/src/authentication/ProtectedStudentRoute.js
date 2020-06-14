import React from "react";
import { Route, Redirect } from "react-router-dom";
import HeaderStudent from './../components/student/HeaderStudent';

export const ProtectedStudentRoute = ({component: Component, ...rest}) => {
    return(
        <Route
            {...rest}
            render = {props => {
                if(localStorage.getItem('loggedUser') && JSON.parse(localStorage.getItem('loggedUser')).roles[0].id === 4)
                {
                    return <div> <HeaderStudent {...props} />  <Component {...props} /> </div>
                }
                else
                {
                    return (
                        <Redirect
                            to={{
                                pathname: "/",
                                state: {from:props.location}
                            }}
                        />
                    );
                }
            }
            }/>
    )
};
