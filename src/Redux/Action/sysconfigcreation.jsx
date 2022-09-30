import { createAction } from "redux-actions";
import * as actions from "../constant";

console.log("action")
export const postSystemConfigcreationRequest = createAction(
      actions.POST_SYSCONFIGCREATION_REQUEST
);
export const postSystemConfigcreationSuccess = createAction(
      actions.POST_SYSCONFIGCREATION_SUCCESS
);
export const postSystemConfigcreationError = createAction(
      actions.POST_SYSCONFIGCREATION_ERROR
);
export const getglprimaryRequest = createAction(
      actions.GET_GLPRIMARY_REQUEST
);
export const getglprimarySuccess = createAction(
      actions.GET_GLPRIMARY_SUCCESS
);
export const getglprimaryError = createAction(
      actions.GET_GLPRIMARY_ERROR
);

