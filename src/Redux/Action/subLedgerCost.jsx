import { createAction } from "redux-actions";
import * as actions from "../constant";

export const getSubLedgerCostRequest = createAction(
  actions.GET_SUBLEDGERCOST_REQUEST
);
export const getSubLedgerCostListSuccess = createAction(
  actions.GET_SUBLEDGERCOST_SUCCESS
);
export const getSubLedgerCostError = createAction(
  actions.GET_SUBLEDGERCOST_ERROR
);
// export const getClassDataRequest = createAction(
//   actions.GET_HIER2DATA_REQUEST
// );
// export const getClassDataSuccess = createAction(
// actions.GET_HIER2DATA_SUCCESS
// );
// export const getClassDataError = createAction(
// actions.GET_HIER2DATA_ERROR
// );
// export const getLocationDataRequest = createAction(
// actions.GET_LOCATIONDATA_REQUEST
// );
// export const getLocationDataSuccess = createAction(
// actions.GET_LOCATIONDATA_SUCCESS
// );
// export const getLocationDataError = createAction(
// actions.GET_LOCATIONDATA_ERROR
// );