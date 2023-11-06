import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useSelector,useDispatch } from 'react-redux'
import { userProfile } from '../store/slices/authSlice'
import { toast } from 'react-hot-toast'
import defaultProfile from '../assets/3.svg'


const Profile = ({ show, onHide, setModalSignUp }) => {
    const dispatch = useDispatch()
    const authUser = useSelector(state => state.authSlice)

    const [name, setName] = useState(authUser.userName)
    const [profileImage, setProfileImage] = useState(authUser.userProfile || defaultProfile);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleProfileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
            setSelectedFile(file);
        }
    };

    const updateProfileData = (e) => {
        e.preventDefault();
        dispatch(userProfile({name,profile:profileImage})) 
        onHide() 
        toast.success('Profile Update Successfully!')
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
                        Your Profile
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className='d-flex justify-content-center align-items-center' onSubmit={updateProfileData}>
                        <div className='sign-in-container d-flex justify-content-center align-items-center flex-column'>
                            <h5 className='text-center'> <img src={profileImage?profileImage:defaultProfile} alt="profile" className='profileImg'/></h5>
                            <div className="profileWrapper d-flex justify-content-start align-items-start flex-column">
                                <div className='profileName d-flex justify-content-center align-items-baseline gap-2'>
                                    <span>Your Name : </span>
                                    <input type="text" placeholder='Enter Your Name' className='mt-3' value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className=' d-flex justify-content-center align-items-baseline gap-2'>
                                    <span>Update Profile : </span>
                                    <input type="file" placeholder='' className='mt-3' onChange={handleProfileChange} />
                                </div>
                                <div className='d-flex justify-content-center align-items-center gap-2 w-100'>
                                <Button type='submit' className='mt-4 text-center m-auto ' >Update Profile</Button>
                                </div>
                            </div>



                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Profile
