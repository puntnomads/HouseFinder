import { combineReducers } from "redux";
import postcodesList from "./components/PostcodesList/reducer";
import propertiesList from "./components/PropertiesList/reducer";

const IndexReducer = combineReducers({
  postcodesList,
  propertiesList
});

export default IndexReducer;
