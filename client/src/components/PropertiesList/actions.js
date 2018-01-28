import {
  PROPERTIES_GETTING,
  PROPERTIES_GETTING_SUCCESS,
  PROPERTIES_GETTING_ERROR
} from "./constants";

export const propertiesGet = function propertiesGet(postcode) {
  return {
    type: PROPERTIES_GETTING,
    postcode
  };
};

export const propertiesGetSuccess = function propertiesGetSuccess(properties) {
  return {
    type: PROPERTIES_GETTING_SUCCESS,
    properties
  };
};

export const propertiesGetError = function propertiesGetError(error) {
  return {
    type: PROPERTIES_GETTING_ERROR,
    error
  };
};
