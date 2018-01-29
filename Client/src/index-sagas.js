import { all } from "redux-saga/effects";
import PostcodesListSaga from "./components/PostcodesList/sagas";
import PropertiesListSaga from "./components/PropertiesList/sagas";
import PropertySaga from "./components/Property/sagas";
import InterestingPropertiesListSaga from "./components/InterestingPropertiesList/sagas";

export default function* IndexSaga() {
  yield all([
    PostcodesListSaga(),
    PropertiesListSaga(),
    PropertySaga(),
    InterestingPropertiesListSaga()
  ]);
}
