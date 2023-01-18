import { createAction } from "../../utils/action/Action";
import {
  CHECK_USER_SESSION,
  GOOGLE_SIGN_IN,
  EMAIL_SIGN_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILED,
  SIGN_UP_START,
  SIGN_UP_FAILED,
  SIGN_UP_SUCCESS,
  SIGN_OUT_START,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_FAILED
} from "./user-types";

// check user session
export const checkUserSession = () => createAction(CHECK_USER_SESSION)
// google sign in
export const googleSignInStart = () => createAction(GOOGLE_SIGN_IN)
// sign in
export const emailSignInStart = (email, password) => createAction(EMAIL_SIGN_IN, { email, password })
// sign up
export const emailSignUpStart = (email, password, displayName) => createAction(SIGN_UP_START, { email, password, displayName })
export const emailSignUpSuccess = (user, additionalDetails) => createAction(SIGN_UP_SUCCESS, { user, additionalDetails })
export const emailSignUpFailed = (error) => createAction(SIGN_UP_FAILED, error)
// sign out
export const signOutStart = () => createAction(SIGN_OUT_START)
export const signOutSuccess = () => createAction(SIGN_OUT_SUCCESS)
export const signOutFailed = (error) => createAction(SIGN_OUT_FAILED, error)
// sign in result
export const signInSuccess = (user) => createAction(SIGN_IN_SUCCESS, user)
export const signInFailed = (error) => createAction(SIGN_IN_FAILED, error)