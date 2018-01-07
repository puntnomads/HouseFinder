import { all } from "redux-saga/effects";
import ListingsListSaga from "./components/ListingsList/sagas";

export default function* IndexSaga() {
  yield all([ListingsListSaga()]);
}
