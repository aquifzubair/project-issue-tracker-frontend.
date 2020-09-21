import { combineReducers } from "redux";
import projectReducer from "./projectReducer";
import issueReducer from "./issueReducer";
import commentReducer from './commentReducer'

export default combineReducers({
    projectReducer,
    issueReducer,
    commentReducer
});
