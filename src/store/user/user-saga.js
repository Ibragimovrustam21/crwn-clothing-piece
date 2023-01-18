import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  getCurrentUser,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
  signOutUser
} from "../../utils/firebase/firebase.component";
import {
  emailSignUpSuccess,
  signInFailed,
  signInSuccess,
  signOutFailed,
  signOutSuccess
} from "./user-action";
import {
  CHECK_USER_SESSION,
  EMAIL_SIGN_IN,
  GOOGLE_SIGN_IN,
  SIGN_OUT_START,
  SIGN_UP_START,
  SIGN_UP_SUCCESS
} from "./user-types";

// start user check session 
export function* getSnapshotFromUserAuth(userAuth, additionalInformation) {
  try {
    const userSnapshot = yield call(createUserDocumentFromAuth, userAuth, additionalInformation)
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }))
  } catch (error) {
    yield put(signInFailed(error))
  }
}

export function* workerCheckUserSession() {
  try {
    const userAuth = yield call(getCurrentUser)
    if (!userAuth) return

    yield call(getSnapshotFromUserAuth, userAuth)
  } catch (error) {
    yield put(signInFailed(error))
  }
}

export function* watcherOnCheckUserSession() {
  yield takeLatest(CHECK_USER_SESSION, workerCheckUserSession)
}
// end user check session

// start google sign in
export function* workerGoogleSignIn() {
  try {
    const { user } = yield call(signInWithGooglePopup)
    yield call(getSnapshotFromUserAuth, user)
  } catch (error) {
    yield put(signInFailed(error))
  }
}
export function* watcherGoogleSignIn() {
  yield takeLatest(GOOGLE_SIGN_IN, workerGoogleSignIn)
}
// end google sign in

// start sign in
export function* workerSignIn({ payload: { email, password } }) {
  try {
    const { user } = yield call(signInAuthUserWithEmailAndPassword, email, password)
    yield call(getSnapshotFromUserAuth, user)
  } catch (error) {
    yield put(signInFailed(error))
  }
}

export function* watcherSignIn() {
  yield takeLatest(EMAIL_SIGN_IN, workerSignIn)
}
// end sign in

// start sign up
export function* signInAfterSignUp({ payload: { user, additionalInformation } }) {
  yield call(getSnapshotFromUserAuth, user, additionalInformation)
}

export function* workerSignUp({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield call(createAuthUserWithEmailAndPassword, email, password)
    yield put(emailSignUpSuccess(user, { displayName }))
  } catch (error) {
    yield put(signInFailed(error))
  }
}

export function* watcherSignInAfterSignUp() {
  yield takeLatest(SIGN_UP_SUCCESS, signInAfterSignUp)
}

export function* watcherSignUp() {
  yield takeLatest(SIGN_UP_START, workerSignUp)
}
// end sign up

// start sign out
export function* workerSignOut() {
  try {
    yield call(signOutUser)
    yield put(signOutSuccess())
  } catch (error) {
    yield put(signOutFailed())
  }
}
export function* watcherSignOut() {
  yield takeLatest(SIGN_OUT_START, workerSignOut)
}
// end sign out



export function* userSaga() {
  yield all(
    [
      call(watcherOnCheckUserSession),
      call(watcherGoogleSignIn),
      call(watcherSignIn),
      call(watcherSignUp),
      call(watcherSignInAfterSignUp),
      call(watcherSignOut)
    ]
  )
}