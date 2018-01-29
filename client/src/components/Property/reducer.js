import {
  PROPERTY_GETTING,
  PROPERTY_GETTING_SUCCESS,
  PROPERTY_GETTING_ERROR,
  PROPERTY_UPDATE,
  PROPERTY_UPDATE_SUCCESS,
  PROPERTY_UPDATE_ERROR
} from "./constants";

const initialState = {
  property: {},
  update: {},
  requesting: false,
  successful: false,
  messages: [],
  errors: []
};

const reducer = function propertyReducer(state = initialState, action) {
  switch (action.type) {
    case PROPERTY_GETTING:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: [
          {
            body: "A property are being requested from the back-end.",
            time: new Date()
          }
        ],
        errors: []
      };

    case PROPERTY_GETTING_SUCCESS:
      return {
        ...state,
        property: action.property,
        requesting: false,
        successful: true,
        messages: [
          {
            body: "A property have successfully received from the back-end.",
            time: new Date()
          }
        ],
        errors: []
      };

    case PROPERTY_GETTING_ERROR:
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

    case PROPERTY_UPDATE:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: [
          {
            body: "A property is being updated on the back-end.",
            time: new Date()
          }
        ],
        errors: []
      };

    case PROPERTY_UPDATE_SUCCESS:
      return {
        ...state,
        update: action.update,
        requesting: false,
        successful: true,
        messages: [
          {
            body: "A property has successfully been updated on the back-end.",
            time: new Date()
          }
        ],
        errors: []
      };

    case PROPERTY_UPDATE_ERROR:
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
