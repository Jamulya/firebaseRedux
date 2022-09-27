import { combineReducers } from "redux";
import tasks from "./tasks";



const rootReducers = () => combineReducers({

    tasks: tasks

})

export default rootReducers