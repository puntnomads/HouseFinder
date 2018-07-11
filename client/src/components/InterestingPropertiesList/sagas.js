import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { INTERESTING_PROPERTIES_GETTING } from "./constants";
import { propertiesGetSuccess, propertiesGetError } from "./actions";

const getPropertiesUrl = "/api/interesting_properties";

function getPropertiesApi() {
  return axios
    .get(getPropertiesUrl)
    .then(function(response) {
      return response.data.properties;
    })
    .catch(function(error) {
      throw error;
    });
}

function* getPropertiesFlow(action) {
  try {
    const response = yield call(getPropertiesApi);
    yield put(propertiesGetSuccess(response));
  } catch (error) {
    yield put(propertiesGetError(error));
  }
}

function* getPropertiesWatcher() {
  yield takeLatest(INTERESTING_PROPERTIES_GETTING, getPropertiesFlow);
}

export default getPropertiesWatcher;
