/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { ReactComponent as Empty } from '../resources/empty_cart.svg';

function EmptyCart(props) {
    return (
        <div className={`alert alert-${props.variant || 'info'}`}>
            {props.children}
            <div>
                <Empty className="empty-icon" />
            </div>
        </div>
    );
}
export default EmptyCart;
