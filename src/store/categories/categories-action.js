import { FETCHING_CATEGORIES_FAILED, FETCHING_CATEGORIES_START, FETCHING_CATEGORIES_SUCCESS } from "./categories-types";
import { createAction } from "../../utils/action/Action";


export const fetchingCategoriesStart = () => createAction(FETCHING_CATEGORIES_START)
export const fetchingCategoriesSuccess = (categories) => createAction(FETCHING_CATEGORIES_SUCCESS, categories)
export const fetchingCategoriesFailed = (error) => createAction(FETCHING_CATEGORIES_FAILED, error)

