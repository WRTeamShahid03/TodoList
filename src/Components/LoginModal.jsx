import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { authentication } from '../Firebase.config';

const LoginModal = ({ show, onHide }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [recaptchaVerifier, setRecaptchaVerifier] = useState(null);

    useEffect(() => {
        // Initialize RecaptchaVerifier when the component mounts
        if (recaptchaVerifier) {
            const verifier = new RecaptchaVerifier('recaptcha-container', {
                'size': 'invisible',
                'callback': (response) => {
                    // Callback logic after reCAPTCHA verification is completed
                }
            }, authentication);

            // Render reCAPTCHA widget
            verifier.render().then(widgetId => {
                // Do something with the widget ID, if needed
            });

            setRecaptchaVerifier(verifier);

            // Clean up the recaptchaVerifier on component unmount (optional)
            return () => {
                verifier.clear();
            };
        }
    }, [recaptchaVerifier]);

    const onSignup = async () => {
        // Start the reCAPTCHA verification and then proceed with phone number verification
        if (recaptchaVerifier) {
            signInWithPhoneNumber(authentication, phoneNumber, recaptchaVerifier)
                .then((confirmationResult) => {
                    // SMS verification sent successfully
                    // Store confirmationResult to use later for verifying the code
                    console.log("SMS sent successfully");
                })
                .catch((error) => {
                    // Handle errors here
                    console.error(error);
                });
        }
    };

    const onVerifyCode = async () => {
        // Use the verificationCode to confirm the phone number
        if (verificationCode && recaptchaVerifier) {
            const confirmationResult = new ConfirmationResult(authentication, verificationCode);

            try {
                await confirmationResult.confirm(verificationCode);
                console.log("Phone number verified successfully!");
            } catch (error) {
                // Handle verification errors
                console.error(error);
            }
        }
    };

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
                <div id="recaptcha-container"></div>
                    <input
                        type="text"
                        placeholder="Enter phone number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <Button onClick={onSignup}>Send Verification Code</Button>
                    <br />
                    <input
                        type="text"
                        placeholder="Enter verification code"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                    />
                    <Button onClick={onVerifyCode}>Verify Code</Button>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default LoginModal;
