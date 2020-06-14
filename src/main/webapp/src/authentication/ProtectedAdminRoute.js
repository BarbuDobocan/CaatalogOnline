import React from 'react';
import { Route, Redirect } from "react-router-dom";
import auth from "./auth";
import HeaderAdmin from "../components/admin/HeaderAdmin";

export const ProtectedAdminRoute = ({component: Component, ...rest}) => {
    return(
        <Route
            {...rest}
            render = {props => {
                    if(localStorage.getItem('loggedUser') && JSON.parse(localStorage.getItem('loggedUser')).roles[0].id === 1)
                    {
                        return <div> <HeaderAdmin  {...props} /> <Component {...props} /> </div>
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
