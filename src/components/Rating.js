/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';

function Rating(props) {
    const { rating, numberOfReviews, caption } = props;
    return (
        <div className="rating">
            <span>
                <i className={rating >= 1 ? 'fa fa-star' : rating >= 0.5 ? 'fa fa-star-half-o' : 'fa fa-star-o'} />
            </span>
            <span>
                <i className={rating >= 2 ? 'fa fa-star' : rating >= 1.5 ? 'fa fa-star-half-o' : 'fa fa-star-o'} />
            </span>
            <span>
                <i className={rating >= 3 ? 'fa fa-star' : rating >= 2.5 ? 'fa fa-star-half-o' : 'fa fa-star-o'} />
            </span>
            <span>
                <i className={rating >= 4 ? 'fa fa-star' : rating >= 3.5 ? 'fa fa-star-half-o' : 'fa fa-star-o'} />
            </span>
            <span>
                <i className={rating >= 5 ? 'fa fa-star' : rating >= 4.5 ? 'fa fa-star-half-o' : 'fa fa-star-o'} />
            </span>
            {caption ? <span>{caption}</span> : <span>{`${numberOfReviews} reviews`}</span>}
        </div>
    );
}
export default Rating;
