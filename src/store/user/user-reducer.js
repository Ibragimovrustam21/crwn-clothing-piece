import {
  SIGN_IN_FAILED,
  SIGN_IN_SUCCESS,
  SIGN_OUT_FAILED,
  SIGN_OUT_SUCCESS,
  SIGN_UP_FAILED
} from "./user-types"



const initialState = {
  currentUser: null,
  error: null
}

export const UserReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: payload
      }
    case SIGN_IN_FAILED:
    case SIGN_UP_FAILED:
    case SIGN_OUT_FAILED:
      return {
        ...state,
        error: payload
      }
    case SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null
      }
    default:
      return state
  }
}

