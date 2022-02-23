/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';

export default function TextMessage(props) {
    return <div className={`alert alert-${props.variant || 'info'}`}>{props.children}</div>;
}
