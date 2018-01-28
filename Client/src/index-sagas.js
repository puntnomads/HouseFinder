import { all } from "redux-saga/effects";
import PostcodesListSaga from "./components/PostcodesList/sagas";
import PropertiesListSaga from "./components/PropertiesList/sagas";

export default function* IndexSaga() {
  yield all([PostcodesListSaga(), PropertiesListSaga()]);
}
