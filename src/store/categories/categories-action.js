import { FETCHING_CATEGORIES_FAILED, FETCHING_CATEGORIES_START, FETCHING_CATEGORIES_SUCCESS } from "./categories-types";
import { createAction } from "../../utils/action/Action";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.component";


export const fetchingCategoriesStart = () => createAction(FETCHING_CATEGORIES_START)
export const fetchingCategoriesSuccess = (categories) => createAction(FETCHING_CATEGORIES_SUCCESS, categories)
export const fetchingCategoriesFailed = (error) => createAction(FETCHING_CATEGORIES_FAILED, error)

export const fetchingCategoriesAsync = () => async (dispatch) => {
  dispatch(fetchingCategoriesStart())

  try {
    const categories = await getCategoriesAndDocuments()

    dispatch(fetchingCategoriesSuccess(categories))
  } catch (error) {
    dispatch(fetchingCategoriesFailed(error))
  }
}
