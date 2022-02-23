/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-alert */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUserProfile } from '../actions/userActions';
import Loading from '../components/Loading';
import TextMessage from '../components/TextMessage';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

export default function ProfileScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [sellerName, setSellerName] = useState('');
    const [sellerLogo, setSellerLogo] = useState('');
    const [sellerDescription, setSellerDescription] = useState('');
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;
    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const { success: successUpdate, error: errorUpdate, loading: loadingUpdate } = userUpdateProfile;
    const dispatch = useDispatch();
    useEffect(() => {
        if (!user) {
            dispatch({ type: USER_UPDATE_PROFILE_RESET });
            dispatch(detailsUser(userInfo._id));
        } else {
            setName(user.name);
            setEmail(user.email);
            if (user.seller) {
                setSellerName(user.seller.name);
                setSellerLogo(user.seller.logo);
                setSellerDescription(user.seller.description);
            }
        }
    }, [dispatch, userInfo._id, user]);
    const submitHandler = (e) => {
        e.preventDefault();
        // dispatch update profile
        if (password !== confirmPassword) {
            alert('Password and Confirm Password Are Not Matched');
        } else {
            dispatch(
                updateUserProfile({
                    userId: user._id,
                    name,
                    email,
                    password,
                    sellerName,
                    sellerLogo,
                    sellerDescription,
                }),
            );
        }
    };
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>User Profile</h1>
                </div>
                {loading ? (
                    <Loading />
                ) : error ? (
                    <TextMessage variant="danger">{error}</TextMessage>
                ) : (
                    <>
                        {loadingUpdate && <Loading />}
                        {errorUpdate && <TextMessage variant="danger">{errorUpdate}</TextMessage>}
                        {successUpdate && <TextMessage variant="success">Profile Updated Successfully</TextMessage>}
                        <div>
                            <label htmlFor="name">Name</label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Enter password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                id="confirmPassword"
                                type="password"
                                placeholder="Enter confirm password"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        {user.isSeller && (
                            <>
                                <h2>Seller</h2>
                                <div>
                                    <label htmlFor="sellerName">Seller Name</label>
                                    <input
                                        id="sellerName"
                                        type="text"
                                        placeholder="Enter Seller Name"
                                        value={sellerName}
                                        onChange={(e) => setSellerName(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="sellerLogo">Seller Logo</label>
                                    <input
                                        id="sellerLogo"
                                        type="text"
                                        placeholder="Enter Seller Logo"
                                        value={sellerLogo}
                                        onChange={(e) => setSellerLogo(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="sellerDescription">Seller Description</label>
                                    <input
                                        id="sellerDescription"
                                        type="text"
                                        placeholder="Enter Seller Description"
                                        value={sellerDescription}
                                        onChange={(e) => setSellerDescription(e.target.value)}
                                    />
                                </div>
                            </>
                        )}
                        <div>
                            <label />
                            <button className="primary" type="submit">
                                Update
                            </button>
                        </div>
                    </>
                )}
            </form>
        </div>
    );
}
