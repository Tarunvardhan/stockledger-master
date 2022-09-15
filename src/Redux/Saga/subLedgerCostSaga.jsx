import { call, put, takeLatest } from "redux-saga/effects";
import {
  getSubLedgerCostListSuccess,
  getSubLedgerCostError, 
} from "../Action/subLedgerCost";

import * as actions from "../constant";
import axiosCall from "../../services/index";
import { API } from "../../services/api";

function* FetchSubLedgerCost(action) {
  try {
    const response = yield call(axiosCall, "POST", API.FETCHSUBLEDGERCOST,action.payload);
    if (response?.data?.status == 500) {
      yield put(getSubLedgerCostError({Data: response?.data}));
    } else {
      yield put(getSubLedgerCostListSuccess({ Data: response?.data }));
    }
  } catch (e) {
    yield put(getSubLedgerCostError(e.message));
  }
}

export function* SubLedgerCost() {
  yield takeLatest(actions.GET_SUBLEDGERCOST_REQUEST, FetchSubLedgerCost);
}


