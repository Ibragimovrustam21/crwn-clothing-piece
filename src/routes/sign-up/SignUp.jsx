import React, { useState } from 'react'
import Button from '../../components/UI/button/Button'
import FormInput from '../../components/UI/form-input/FormInput'
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth
} from '../../utils/firebase/firebase.component'

import { SignUpContainer } from './signUp.styles'

const initialFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignUp = () => {
  const [formFields, setFormFields] = useState(initialFormFields)
  const { displayName, email, password, confirmPassword } = formFields

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (password !== confirmPassword) {
      alert('passwords do not match')
      return
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password) // userni firebasega joylab quydik 
      await createUserDocumentFromAuth(user, { displayName }) // userni firestore Database ga ham joyladik

      setFormFields(initialFormFields) // formFields ni reset qildik
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormFields({ ...formFields, [name]: value })
  }

  return (
    <SignUpContainer>
      <h2>Don`t have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Display name'
          name='displayName'
          type='text'
          required
          value={displayName}
          onChange={handleChange}
        />

        <FormInput
          label='Email'
          name='email'
          type='email'
          required
          value={email}
          onChange={handleChange}
        />

        <FormInput
          label='Password'
          name='password'
          type='password'
          required
          value={password}
          onChange={handleChange}
        />

        <FormInput
          label='Confirm password'
          name='confirmPassword'
          type='password'
          required
          value={confirmPassword}
          onChange={handleChange}
        />

        <Button type='submit'>
          Submit
        </Button>
      </form>

    </SignUpContainer>
  )
}

export default SignUp