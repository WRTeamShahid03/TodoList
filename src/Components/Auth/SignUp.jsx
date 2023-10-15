import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { auth } from '../../Firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth';

const SignUp = ({ show, onHide }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const signUp = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
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
                        Create Account
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={signUp}>
                        <div className='sign-in-container d-flex justify-content-center align-items-center flex-column'>
                            <h5>SignUp now</h5>
                            <input type="email" placeholder='Enter your email' className='mt-3' value={email} onChange={(e) => setEmail(e.target.value)} /> 
                            <input type="password" placeholder='Enter your password' className='mt-3' value={password} onChange={(e) => setPassword(e.target.value)} /> 
                            <Button type='submit' className='mt-3' >Sign Up</Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default SignUp;
