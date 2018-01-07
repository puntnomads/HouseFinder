import {
  LISTINGS_GETTING,
  LISTINGS_GETTING_SUCCESS,
  LISTINGS_GETTING_ERROR
} from "./constants";

export const listingsGet = function listingsGet() {
  return {
    type: LISTINGS_GETTING
  };
};

export const listingsGetSuccess = function listingsGetSuccess(listings) {
  return {
    type: LISTINGS_GETTING_SUCCESS,
    listings
  };
};

export const listingsGetError = function listingsGetError(error) {
  return {
    type: LISTINGS_GETTING_ERROR,
    error
  };
};
