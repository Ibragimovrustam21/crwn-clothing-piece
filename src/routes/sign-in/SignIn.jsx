import { useState } from 'react'
import { useDispatch } from 'react-redux'
import Button, { BUTTON_TYPE_CLASSES } from '../../components/UI/button/Button'
import FormInput from '../../components/UI/form-input/FormInput'
import { emailSignInStart, googleSignInStart } from '../../store/user/user-action'

import { ButtonsContainer, SignInContainer } from './signIn.styles'


const initialFormFields = {
  email: '',
  password: '',
}

const SignIn = () => {
  const [formFields, setFormFields] = useState(initialFormFields)
  const { email, password } = formFields
  const dispatch = useDispatch()

  const signInWithGoogle = () => dispatch(googleSignInStart())

  const handleSubmit = (event) => {
    event.preventDefault()

    dispatch(emailSignInStart(email, password))
    setFormFields(initialFormFields)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormFields({ ...formFields, [name]: value })
  }

  return (
    <SignInContainer>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
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
        <ButtonsContainer>
          <Button type='submit'>
            Submit
          </Button>
          <Button
            type='button'
            onClick={signInWithGoogle}
            buttonType={BUTTON_TYPE_CLASSES.google}
          >
            Google sign in
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  )
}



export default SignIn