/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

export default function AdminView({ component: Component, ...rest }) {
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    return (
        <div>
            <Route
                {...rest}
                render={(props) =>
                    userInfo && userInfo.isAdmin ? <Component {...props} /> : <Redirect to="/signin" />
                }
            />
        </div>
    );
}
