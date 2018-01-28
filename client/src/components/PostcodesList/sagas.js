import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { POSTCODES_GETTING } from "./constants";
import { postcodesGetSuccess, postcodesGetError } from "./actions";
import { API_ROOT } from "../../config";

const getPostcodesUrl = `${API_ROOT}/api/postcodes`;

function getPostcodesApi() {
  return axios
    .get(getPostcodesUrl)
    .then(function(response) {
      return response.data.postcodes;
    })
    .catch(function(error) {
      throw error;
    });
}

function* getPostcodesFlow(action) {
  try {
    const response = yield call(getPostcodesApi);
    yield put(postcodesGetSuccess(response));
  } catch (error) {
    yield put(postcodesGetError(error));
  }
}

function* getPostcodesWatcher() {
  yield takeLatest(POSTCODES_GETTING, getPostcodesFlow);
}

export default getPostcodesWatcher;
