import { createStore, applyMiddleware } from "redux";
import Reducers from "./Reducers";
import Thunk from "redux-thunk";

const middlewaresToApply = [Thunk];

const Store = createStore(Reducers, applyMiddleware(...middlewaresToApply));

export default Store;
