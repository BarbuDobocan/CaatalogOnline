import React from 'react';
import { Route, Redirect } from "react-router-dom";
import HeaderProfessor from "../components/professor/HeaderProfessor";
import auth from "./auth";

export const ProtectedProfessorRoute = ({component: Component, ...rest}) => {
    return(
        <Route
            {...rest}
            render = {props => {
                if(localStorage.getItem('loggedUser') && JSON.parse(localStorage.getItem('loggedUser')).roles[0].id === 2)
                {
                    return <div> <HeaderProfessor {...props} />  <Component {...props} /> </div>
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
