import {
  PROPERTY_GETTING,
  PROPERTY_GETTING_SUCCESS,
  PROPERTY_GETTING_ERROR,
  PROPERTY_UPDATE,
  PROPERTY_UPDATE_SUCCESS,
  PROPERTY_UPDATE_ERROR
} from "./constants";

export const propertyGet = function propertyGet(propertyId) {
  return {
    type: PROPERTY_GETTING,
    propertyId
  };
};

export const propertyGetSuccess = function propertyGetSuccess(property) {
  return {
    type: PROPERTY_GETTING_SUCCESS,
    property
  };
};

export const propertyGetError = function propertyGetError(error) {
  return {
    type: PROPERTY_GETTING_ERROR,
    error
  };
};

export const propertyUpdate = function propertyUpdate(propertyId, update) {
  return {
    type: PROPERTY_UPDATE,
    propertyId,
    update
  };
};

export const propertyUpdateSuccess = function propertyUpdateSuccess(update) {
  return {
    type: PROPERTY_UPDATE_SUCCESS,
    update
  };
};

export const propertyUpdateError = function propertyUpdateError(error) {
  return {
    type: PROPERTY_UPDATE_ERROR,
    error
  };
};
