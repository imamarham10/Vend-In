/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

export default function SellerView({ component: Component, ...rest }) {
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    return (
        <Route
            {...rest}
            render={(props) => (userInfo && userInfo.isSeller ? <Component {...props} /> : <Redirect to="/signin" />)}
        />
    );
}
