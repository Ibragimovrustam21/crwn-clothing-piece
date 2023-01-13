import React from 'react'
import SignUp from '../sign-up/SignUp'
import SignIn from '../sign-in/SignIn'

import { AuthenticationContainer } from './authentication.styles'

const Authentication = () => {
  return (
    <AuthenticationContainer>
      <SignIn />
      <SignUp />
    </AuthenticationContainer>
  )
}

export default Authentication
