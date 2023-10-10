import React, { useState } from 'react'
import OtpInput from 'otp-input-react'
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import 'react-phone-number-input/style.css'

const OtpModal = ({show,onHide,otp,onOPtVerify,setOtp}) => {
    // const [otp, setOtp] = useState('')
    return (
        <>
           <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={show}
                onHide={onHide}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        OTP Modal
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <OtpInput
                    OTPLength={6}
                    value={otp}
                    onChange={setOtp}
                    otpType='number'
                    disabled={false}
                    autoFocus
                    >                   
                    </OtpInput>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onOPtVerify}>Verify OTP</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default OtpModal
