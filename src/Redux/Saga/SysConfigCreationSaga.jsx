import { call, put, takeLatest } from "redux-saga/effects";
import {
  postSystemConfigcreationSuccess,
  postSystemConfigcreationError,
  getglprimarySuccess,
  getglprimaryError,  
} from "../Action/sysconfigcreation";
import * as actions from "../constant";
import axiosCall from "../../services/index";
import { API } from "../../services/api";

function* fetchDataSaga(action) {
  try {
    const response = yield call(axiosCall, "GET", API.FETCHGLPRIMARY,action.payload);
    if (response?.data?.status == 500) {
      yield put(getglprimaryError({primary: response?.data}));
    } else {
      yield put(getglprimarySuccess({ primary: response?.data }));
    }
  } catch (e) {
    yield put(getglprimaryError(e.message));
  }
}

export function* GlPrimary() {
  yield takeLatest(actions.GET_GLPRIMARY_REQUEST, fetchDataSaga);
}


function* insertDataSaga(action) {
  try {
    const response = yield call(axiosCall, "POST", API.CREATESYSCONF,action.payload);
    console.log("hgfc")
    if (response?.status == 200) {
      yield put(postSystemConfigcreationSuccess({ Data: response?.data }));
      console.log("response",response)
    } else {
      yield put(postSystemConfigcreationError(response?.data?.message));
    }
  } catch (e) {
    yield put(postSystemConfigcreationError(e.message));
  }
}

export function* SysConfigcreation() {
  yield takeLatest(actions.POST_SYSCONFIGCREATION_REQUEST, insertDataSaga);
}

