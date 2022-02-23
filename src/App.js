/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
// import data from "./Data";
// import Product from './components/Product';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import SigninPage from './pages/SigninPage';
import RegisterPage from './pages/RegisterPage';
import PaymentPage from './pages/PaymentMethodPage';
import { signout } from './actions/userActions';
import ShippingPage from './pages/ShippingAddressPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderPage from './pages/OrderPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
// import ProfilePage from "./pages/ProfilePage";
import PrivateRoute from './components/PrivateRoute';
import ProfileScreen from './pages/ProfilePage';
import AdminView from './components/AdminView';
import ProductListPage from './pages/ProductListPage';
import ProductEditPage from './pages/ProductEditPage';
import OrderListPage from './pages/OrderListPage';
import UserListPage from './pages/UserListPage';
import UserEditPage from './pages/UserEditPage';
import SellerView from './components/SellerView';

function App() {
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const dispatch = useDispatch();
    const signoutHandler = () => {
        dispatch(signout());
    };
    return (
        <BrowserRouter>
            <div className="grid-container">
                <header className="row">
                    <div>
                        <Link to="/" className="brand-name">
                            VEND-IN
                        </Link>
                    </div>
                    <div>
                        <Link to="/cart">
                            Cart
                            {cartItems.length > 0 && <span className="icon">{cartItems.length}</span>}
                        </Link>
                        {userInfo ? (
                            <div className="dropdown">
                                <Link to="#">
                                    {userInfo.name} <i className="fa fa-caret-down" />
                                </Link>
                                <ul className="dropdown-content">
                                    <li>
                                        <Link to="/orderhistory">Order History</Link>
                                    </li>
                                    <li>
                                        <Link to="/profile">User Profile</Link>
                                    </li>
                                    <li>
                                        <Link to="#signout" onClick={signoutHandler}>
                                            Sign Out
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <Link to="/signin">Sign In</Link>
                        )}
                        {userInfo && userInfo.isSeller && (
                            <div className="dropdown">
                                <Link to="#admin">
                                    Seller <i className="fa fa-caret-down" />
                                </Link>
                                <ul className="dropdown-content">
                                    <li>
                                        <Link to="/productlist/seller">Products</Link>
                                    </li>
                                    <li>
                                        <Link to="/orderlist/seller">Orders</Link>
                                    </li>
                                </ul>
                            </div>
                        )}
                        {userInfo && userInfo.isAdmin && (
                            <div className="dropdown">
                                <Link to="#admin">
                                    Admin <i className="fa fa-caret-down" />
                                </Link>
                                <ul className="dropdown-content">
                                    <li>
                                        <Link to="/dashboard">Dashboard</Link>
                                    </li>
                                    <li>
                                        <Link to="/productlist">Products</Link>
                                    </li>
                                    <li>
                                        <Link to="/orderlist">Orders</Link>
                                    </li>
                                    <li>
                                        <Link to="/userlist">Users</Link>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </header>
                <main>
                    <Route path="/cart/:id?" component={CartPage} />
                    <Route path="/product/:id" component={ProductPage} exact />
                    <Route path="/product/:id/edit" component={ProductEditPage} exact />
                    {/* when user enter address with this parameter, ProductPage will load */}
                    <Route path="/signin" component={SigninPage} />
                    <Route path="/register" component={RegisterPage} />
                    <Route path="/shipping" component={ShippingPage} />
                    <Route path="/payment" component={PaymentPage} />
                    <Route path="/placeorder" component={PlaceOrderPage} />
                    <Route path="/order/:id" component={OrderPage} />
                    <Route path="/orderhistory" component={OrderHistoryPage} />
                    <PrivateRoute path="/profile" component={ProfileScreen} />
                    <AdminView path="/productlist" component={ProductListPage} exact />
                    <AdminView path="/orderlist" component={OrderListPage} exact />
                    <AdminView path="/userlist" component={UserListPage} />
                    <AdminView path="/user/:id/edit" component={UserEditPage} />
                    <SellerView path="/productlist/seller" component={ProductListPage} />
                    <SellerView path="/orderlist/seller" component={OrderListPage} />
                    {/* <Route path="/profile" component={ProfilePage}></Route> */}
                    <Route path="/" component={HomePage} exact />
                </main>
                <footer className="row center">All Rights Reseved</footer>
            </div>
        </BrowserRouter>
    );
}

export default App;
