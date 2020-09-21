import { combineReducers } from "redux";
import projectReducer from "./projectReducer";
import issueReducer from "./issueReducer";
// import todos from "./todos";

export default combineReducers({
    projectReducer,
    issueReducer
});
