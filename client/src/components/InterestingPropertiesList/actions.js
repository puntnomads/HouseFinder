import {
  INTERESTING_PROPERTIES_GETTING,
  INTERESTING_PROPERTIES_GETTING_SUCCESS,
  INTERESTING_PROPERTIES_GETTING_ERROR
} from "./constants";

export const propertiesGet = function propertiesGet() {
  return {
    type: INTERESTING_PROPERTIES_GETTING
  };
};

export const propertiesGetSuccess = function propertiesGetSuccess(properties) {
  return {
    type: INTERESTING_PROPERTIES_GETTING_SUCCESS,
    properties
  };
};

export const propertiesGetError = function propertiesGetError(error) {
  return {
    type: INTERESTING_PROPERTIES_GETTING_ERROR,
    error
  };
};
