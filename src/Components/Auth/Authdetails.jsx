import React from 'react'
import { Button } from 'react-bootstrap'

const Authdetails = ({ authUser, userSignOut }) => {
  return (
    <>
      <span>{authUser.email}</span>
        <Button onClick={userSignOut} className='ms-2'>Sign Out</Button>
    </>

  )
}

export default Authdetails
