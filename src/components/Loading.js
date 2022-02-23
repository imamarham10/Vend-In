/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { ReactComponent as LoadingIcon } from '../resources/loading.svg';

function Loading() {
    return (
        <div className="column top center">
            <div className="loading">
                <i className="fa fa-spinner fa-spin" />
                Loading...
            </div>
            <div>
                <LoadingIcon />
            </div>
        </div>
    );
}

export default Loading;
