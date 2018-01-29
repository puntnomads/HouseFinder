import { combineReducers } from "redux";
import postcodesList from "./components/PostcodesList/reducer";
import propertiesList from "./components/PropertiesList/reducer";
import property from "./components/Property/reducer";
import interestingPropertiesList from "./components/InterestingPropertiesList/reducer";

const IndexReducer = combineReducers({
  postcodesList,
  propertiesList,
  property,
  interestingPropertiesList
});

export default IndexReducer;
