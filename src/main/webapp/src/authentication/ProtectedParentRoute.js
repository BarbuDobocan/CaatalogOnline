import React from 'react';
import { Route, Redirect } from "react-router-dom";
import HeaderParent from "../components/parent/HeaderParent";

export const ProtectedParentRoute = ({component: Component, ...rest}) => {
    return(
        <Route
            {...rest}
            render = {props => {
                if(localStorage.getItem('loggedUser') && JSON.parse(localStorage.getItem('loggedUser')).roles[0].id === 3)
                {
                    return <div> <HeaderParent {...props} />  <Component {...props} /> </div>
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
