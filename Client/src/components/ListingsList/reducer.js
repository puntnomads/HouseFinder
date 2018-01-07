import {
  LISTINGS_GETTING,
  LISTINGS_GETTING_SUCCESS,
  LISTINGS_GETTING_ERROR
} from "./constants";

const initialState = {
  listings: [],
  requesting: false,
  successful: false,
  messages: [],
  errors: []
};

const reducer = function listingsReducer(state = initialState, action) {
  switch (action.type) {
    case LISTINGS_GETTING:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: [
          {
            body: "Listings are being requested from the back-end.",
            time: new Date()
          }
        ],
        errors: []
      };

    case LISTINGS_GETTING_SUCCESS:
      return {
        ...state,
        listings: action.listings,
        requesting: false,
        successful: true,
        messages: [
          {
            body: "Listings have successfully received from the back-end.",
            time: new Date()
          }
        ],
        errors: []
      };

    case LISTINGS_GETTING_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: [],
        errors: state.errors.concat([
          {
            body: action.error.toString(),
            time: new Date()
          }
        ])
      };

    default:
      return state;
  }
};

export default reducer;
