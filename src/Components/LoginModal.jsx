import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { auth } from '../Firebase'
import { signInWithEmailAndPassword } from 'firebase/auth';
import toast from 'react-hot-toast';

const LoginModal = ({ show, onHide, setModalSignUp }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                toast.success('Login Successfully !')
                onHide()
                console.log(userCredential)
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

                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default LoginModal;
