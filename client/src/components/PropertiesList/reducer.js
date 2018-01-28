import {
  PROPERTIES_GETTING,
  PROPERTIES_GETTING_SUCCESS,
  PROPERTIES_GETTING_ERROR
} from "./constants";

const initialState = {
  properties: [],
  requesting: false,
  successful: false,
  messages: [],
  errors: []
};

const reducer = function propertiesReducer(state = initialState, action) {
  switch (action.type) {
    case PROPERTIES_GETTING:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: [
          {
            body: "Properties are being requested from the back-end.",
            time: new Date()
          }
        ],
        errors: []
      };

    case PROPERTIES_GETTING_SUCCESS:
      return {
        ...state,
        properties: action.properties,
        requesting: false,
        successful: true,
        messages: [
          {
            body: "Properties have successfully received from the back-end.",
            time: new Date()
          }
        ],
        errors: []
      };

    case PROPERTIES_GETTING_ERROR:
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
