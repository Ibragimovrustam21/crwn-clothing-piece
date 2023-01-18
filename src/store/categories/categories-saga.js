import { all, call, put, takeLatest } from "redux-saga/effects";
import { FETCHING_CATEGORIES_START } from "./categories-types";
import { fetchingCategoriesFailed, fetchingCategoriesSuccess } from './categories-action'
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.component'

export function* workerFetchingGetCategories() {
  try {
    const categories = yield call(getCategoriesAndDocuments)
    yield put(fetchingCategoriesSuccess(categories))
  } catch (error) {
    yield put(fetchingCategoriesFailed(error))
  }

}

export function* watcherGetCategories() {
  yield takeLatest(FETCHING_CATEGORIES_START, workerFetchingGetCategories)
}

export function* categoriesSaga() {
  yield all([call(watcherGetCategories)])
}