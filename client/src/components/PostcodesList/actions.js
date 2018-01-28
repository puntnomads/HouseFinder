import {
  POSTCODES_GETTING,
  POSTCODES_GETTING_SUCCESS,
  POSTCODES_GETTING_ERROR
} from "./constants";

export const postcodesGet = function postcodesGet() {
  return {
    type: POSTCODES_GETTING
  };
};

export const postcodesGetSuccess = function postcodesGetSuccess(postcodes) {
  return {
    type: POSTCODES_GETTING_SUCCESS,
    postcodes
  };
};

export const postcodesGetError = function postcodesGetError(error) {
  return {
    type: POSTCODES_GETTING_ERROR,
    error
  };
};
