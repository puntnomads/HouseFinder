import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { PROPERTIES_GETTING } from "./constants";
import { propertiesGetSuccess, propertiesGetError } from "./actions";

const getPropertiesUrl = "/api/properties";

function getPropertiesApi(postcode) {
  return axios
    .get(`${getPropertiesUrl}/${postcode}`)
    .then(function(response) {
      return response.data.properties;
    })
    .catch(function(error) {
      throw error;
    });
}

function* getPropertiesFlow(action) {
  try {
    const { postcode } = action;
    const response = yield call(getPropertiesApi, postcode);
    yield put(propertiesGetSuccess(response));
  } catch (error) {
    yield put(propertiesGetError(error));
  }
}

function* getPropertiesWatcher() {
  yield takeLatest(PROPERTIES_GETTING, getPropertiesFlow);
}

export default getPropertiesWatcher;
