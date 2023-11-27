import {combineReducers} from "redux";
import userReducer from "./userReducers";
import alertReducer from "./alertReducers";

const myReducers = combineReducers({
    user:userReducer,
    alert:alertReducer
})

export default myReducers;