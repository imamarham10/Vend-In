/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-alert */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-underscore-dangle */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, deleteProduct, productLists } from '../actions/productActions';
import Loading from '../components/Loading';
import TextMessage from '../components/TextMessage';
import { PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET } from '../constants/productConstants';

export default function ProductListScreen(props) {
    const sellerMode = props.match.path.indexOf('/seller') >= 0;
    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;
    const productDelete = useSelector((state) => state.productDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete;
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const productCreate = useSelector((state) => state.productCreate);
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        product: createdProduct,
    } = productCreate;
    const dispatch = useDispatch();

    useEffect(() => {
        if (successCreate) {
            dispatch({ type: PRODUCT_CREATE_RESET });
            props.history.push(`/product/${createdProduct._id}/edit`);
        }
        if (successDelete) {
            dispatch({ type: PRODUCT_DELETE_RESET });
        }
        dispatch(productLists({ seller: sellerMode ? userInfo._id : '' }));
    }, [createdProduct, dispatch, props.history, sellerMode, successCreate, successDelete, userInfo._id]);

    const deleteHandler = (product) => {
        /// TODO: dispatch delete action
        if (window.confirm('Are you sure to delete?')) {
            dispatch(deleteProduct(product._id));
        }
    };
    const createHandler = () => {
        dispatch(createProduct());
    };
    return (
        <div>
            <div className="row">
                <h1>Products</h1>
                <button type="button" className="primary" onClick={createHandler}>
                    Create Product
                </button>
            </div>

            {loadingDelete && <Loading />}
            {errorDelete && <TextMessage variant="danger">{errorDelete}</TextMessage>}

            {loadingCreate && <Loading />}
            {errorCreate && <TextMessage variant="danger">{errorCreate}</TextMessage>}
            {loading ? (
                <Loading />
            ) : error ? (
                <TextMessage variant="danger">{error}</TextMessage>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="small"
                                        onClick={() => props.history.push(`/product/${product._id}/edit`)}
                                    >
                                        Edit
                                    </button>
                                    <button type="button" className="small" onClick={() => deleteHandler(product)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
