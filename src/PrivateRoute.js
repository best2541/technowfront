import React from 'react'
import { Navigate, Route } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {

    // Add your own authentication on the below line.
    const isLoggedIn = window.localStorage.getItem('accessToken')

    return (
        <Route
            {...rest}
            render={props => {
                return isLoggedIn ? (
                    <Component {...props} />
                ) : (
                    <Navigate to={{ pathname: '/login', state: { from: props.location } }} />
                )
            }
            }
        />
    )
}

export default PrivateRoute