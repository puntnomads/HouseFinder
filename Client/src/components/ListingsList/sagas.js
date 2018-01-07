import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { LISTINGS_GETTING } from "./constants";
import { listingsGetSuccess, listingsGetError } from "./actions";
import { API_ROOT } from "../../config";

const getListingsUrl = `${API_ROOT}/api/listings`;

function getListingsApi() {
  return axios
    .get(getListingsUrl)
    .then(function(response) {
      return response.data.listings;
    })
    .catch(function(error) {
      throw error;
    });
}

function* getListingsFlow(action) {
  try {
    const response = yield call(getListingsApi);
    yield put(listingsGetSuccess(response));
  } catch (error) {
    yield put(listingsGetError(error));
  }
}

function* getListingsWatcher() {
  yield takeLatest(LISTINGS_GETTING, getListingsFlow);
}

export default getListingsWatcher;
