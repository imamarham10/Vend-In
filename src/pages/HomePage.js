/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-filename-extension */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { productLists } from '../actions/productActions';

function HomePage() {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;
    useEffect(() => {
        dispatch(productLists({}));
    }, [dispatch]);
    return (
        <div>
            {loading ? (
                <Loading />
            ) : error ? (
                <ErrorMessage variant="danger">{error}</ErrorMessage>
            ) : (
                <div className="row center">
                    {/* <!--Card--> */}
                    {products.map((product) => (
                        <Product key={product._id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}
export default HomePage;
