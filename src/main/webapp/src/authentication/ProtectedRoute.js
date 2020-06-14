import React from 'react';
import { Route, Redirect } from "react-router-dom";
import auth from "./auth";

export const ProtectedRoute = ({component: Component, ...rest}) => (
    <Route
        {...rest}
        render = {props => {
            if(localStorage.getItem('jwtToken')){
                return <Component {...props} />;
            } else {
                return <Redirect
                    to={{
                        pathname: "/",
                        state:  { from: props.location }
                    }}
                />
            }
        }
        }
        />
);
