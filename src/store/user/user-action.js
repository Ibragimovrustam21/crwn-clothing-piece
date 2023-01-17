import { createAction } from "../../utils/action/Action";
import { SET_CURRENT_USER } from "./user-types";

export const setCurrentUser = (user) => createAction(SET_CURRENT_USER, user)