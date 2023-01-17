import { SET_CURRENT_USER } from "./user-types"


const initialState = {
  currentUser: null
}

export const UserReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload
      }
    default:
      return state
  }
}

