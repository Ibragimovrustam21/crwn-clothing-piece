import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Button from '../../components/UI/button/Button'
import FormInput from '../../components/UI/form-input/FormInput'
import { emailSignUpStart } from '../../store/user/user-action'

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
  const dispatch = useDispatch()
  const handleSubmit = async (event) => {
    event.preventDefault()

    if (password !== confirmPassword) {
      alert('passwords do not match')
      return
    }

    dispatch(emailSignUpStart(email, password, displayName))
    setFormFields(initialFormFields) // formFields ni reset qildik
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