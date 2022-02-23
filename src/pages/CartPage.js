/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import EmptyCart from '../components/EmptyCart';
import ErrorMessage from '../components/ErrorMessage';
import Loading from '../components/Loading';

function CartPage(props) {
    const ColoredLine = ({ color }) => (
        <hr
            style={{
                color,
                backgroundColor: color,
                height: 0.01,
            }}
        />
    );
    const productId = props.match.params.id;
    const qty = props.location.search ? Number(props.location.search.split('=')[1]) : 1;
    const cart = useSelector((state) => state.cart);
    const { loading, cartItems, error } = cart;
    const dispatch = useDispatch();
    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty]);
    const removeFromCartHandler = (id) => {
        // delete action
        dispatch(removeFromCart(id));
    };
    const checkoutHandler = () => {
        props.history.push('/signin?redirect=shipping');
    };

    return (
        <div className="row top">
            <div className="col-2">
                <h1>Shopping Cart</h1>
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                {cartItems.length === 0 ? (
                    <EmptyCart>
                        It feels so light here.{' '}
                        <Link to="/">
                            <h2>Go Shopping</h2>
                        </Link>
                    </EmptyCart>
                ) : (
                    <ul>
                        {cartItems.map((item) => (
                            <li key={item.product}>
                                <div className="row">
                                    <div>
                                        <img src={item.image} alt={item.name} className="small" />
                                    </div>
                                    <div className="min-30">
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </div>
                                    <div>
                                        <select
                                            value={item.qty}
                                            onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                                        >
                                            {[...Array(item.countInStock).keys()].map((x) => (
                                                <option key={x + 1} value={x + 1}>
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>Price: ${item.price}</div>
                                    <div>
                                        <button type="button" onClick={() => removeFromCartHandler(item.product)}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                                <ColoredLine color="#e07a5f" />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="col-1">
                <div className="card card-body">
                    <ul>
                        <li>
                            <h2>
                                Subtotal ({cartItems.reduce((accumulator, current) => accumulator + current.qty, 0)}
                                items) : $
                                {cartItems.reduce(
                                    (accumulator, current) => accumulator + current.price * current.qty,
                                    0,
                                )}
                            </h2>
                        </li>
                        <li>
                            <button
                                type="button"
                                onClick={checkoutHandler}
                                className="primary block"
                                disabled={cartItems.length === 0}
                            >
                                Proceed to Checkout
                            </button>
                        </li>
                        {loading && <Loading />}
                        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                    </ul>
                </div>
            </div>
        </div>
    );
}
export default CartPage;
