import {
  FETCHING_CATEGORIES_FAILED,
  FETCHING_CATEGORIES_START,
  FETCHING_CATEGORIES_SUCCESS
} from "./categories-types"

const initialState = {
  categories: [],
  isLoading: false,
  error: null
}

export const CategoriesReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case FETCHING_CATEGORIES_START:
      return {
        ...state,
        isLoading: true
      }
    case FETCHING_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: payload,
        isLoading: false
      }
    case FETCHING_CATEGORIES_FAILED:
      return {
        ...state,
        isLoading: false,
        error: payload
      }

    default:
      return state
  }
}

