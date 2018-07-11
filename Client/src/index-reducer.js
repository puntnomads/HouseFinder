import { combineReducers } from "redux";
import { reducer as form } from "redux-form";
import propertiesList from "./components/PropertiesList/reducer";
import property from "./components/Property/reducer";
import interestingPropertiesList from "./components/InterestingPropertiesList/reducer";

const IndexReducer = combineReducers({
  form,
  propertiesList,
  property,
  interestingPropertiesList
});

export default IndexReducer;
