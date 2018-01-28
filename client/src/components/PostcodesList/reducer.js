import {
  POSTCODES_GETTING,
  POSTCODES_GETTING_SUCCESS,
  POSTCODES_GETTING_ERROR
} from "./constants";

const initialState = {
  postcodes: [],
  requesting: false,
  successful: false,
  messages: [],
  errors: []
};

const reducer = function postcodesReducer(state = initialState, action) {
  switch (action.type) {
    case POSTCODES_GETTING:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: [
          {
            body: "Postcodes are being requested from the back-end.",
            time: new Date()
          }
        ],
        errors: []
      };

    case POSTCODES_GETTING_SUCCESS:
      return {
        ...state,
        postcodes: action.postcodes,
        requesting: false,
        successful: true,
        messages: [
          {
            body: "Postcodes have successfully received from the back-end.",
            time: new Date()
          }
        ],
        errors: []
      };

    case POSTCODES_GETTING_ERROR:
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
