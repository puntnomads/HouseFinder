import { combineReducers } from "redux";
import listingsList from "./components/ListingsList/reducer";

const IndexReducer = combineReducers({
  listingsList
});

export default IndexReducer;
