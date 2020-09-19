import { createStore } from 'redux';
import  rootReducers from './reducers'

// const initialState = {
//     projects:[]
// }

// const projectReducer =  (state = initialState, action) => {
//     console.log(action)

//     switch(action.type){

//         case 'GET_PROJECTS':
//             return {
//                 ...state,
//                 projects:action.data
//             }
        
//         default:
//             return {
//                 ...state
//             }
//     }
// }

export default createStore(rootReducers);