import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { PROPERTY_GETTING, PROPERTY_UPDATE } from "./constants";
import {
  propertyGetSuccess,
  propertyGetError,
  propertyUpdateSuccess,
  propertyUpdateError
} from "./actions";

const getPropertyUrl = "/api/property";
const updatePropertyUrl = "/api/property";

function getPropertyApi(propertyId) {
  return axios
    .get(`${getPropertyUrl}/${propertyId}`)
    .then(function(response) {
      return response.data.property;
    })
    .catch(function(error) {
      throw error;
    });
}

function updatePropertyApi(propertyId, update) {
  console.log(update);
  return axios
    .put(`${updatePropertyUrl}/${propertyId}`, update)
    .then(function(response) {
      return response.data.property;
    })
    .catch(function(error) {
      throw error;
    });
}

function* getPropertyFlow(action) {
  try {
    const { propertyId, update } = action;
    const response = yield call(getPropertyApi, propertyId, update);
    yield put(propertyGetSuccess(response));
  } catch (error) {
    yield put(propertyGetError(error));
  }
}

function* updatePropertyFlow(action) {
  try {
    const { propertyId, update } = action;
    const response = yield call(updatePropertyApi, propertyId, update);
    yield put(propertyUpdateSuccess(response));
  } catch (error) {
    yield put(propertyUpdateError(error));
  }
}

function* getPropertyWatcher() {
  yield [
    takeLatest(PROPERTY_GETTING, getPropertyFlow),
    takeLatest(PROPERTY_UPDATE, updatePropertyFlow)
  ];
}

export default getPropertyWatcher;
