import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { auth } from '../Firebase'
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import authSlice, { userSignIn } from '../store/slices/authSlice';

const LoginModal = ({ show, onHide, setModalSignUp }) => {

    const [email, setEmail] = useState('wrteamshahid03@gmail.com')
    const [password, setPassword] = useState('')

    const [number, setNumber] = useState('')

    const dispatch = useDispatch();

    const forgotPasswordHandler = (e) => {
        // alert('clicked')
        e.preventDefault();
        if (email) {
            sendPasswordResetEmail(auth, email).then((data) => {
                toast.success('Reset password email sent!')
            }).catch(error => {
                toast.error(error)
            })
        }
        else {
            toast.error('Please enter email first')
        }
    }

    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user
                toast.success('Login Successfully !')
                onHide()
                console.log(userCredential, 'userCredential')
                console.log('user', user)
                dispatch(userSignIn({ user }))
            }).catch((error) => {
                console.log(error)
            })
    }

    return (
        <div>
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={show}
                onHide={onHide}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Login Modal
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={signIn}>
                        <div className='sign-in-container d-flex justify-content-between align-items-center flex-column'>
                            <h5 className='text-center'>Does't have account ? <Button onClick={() => {
                                onHide()
                                setModalSignUp(true)
                            }}>SignUp</Button></h5>
                            <input type="email" placeholder='Enter your  email' className='mt-3' value={email} onChange={(e) => setEmail(e.target.value)} />
                            <input type="password" placeholder='Enter your password' className='mt-3' value={password} onChange={(e) => setPassword(e.target.value)} />
                            <Button type='submit' className='mt-3 text-center' >Log In</Button>

                            <span className='mt-3 text-danger'
                                onClick={forgotPasswordHandler}
                                style={{ cursor: 'pointer' }}>Forgot Password ?</span>

                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default LoginModal;
