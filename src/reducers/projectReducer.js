import {GET_PROJECTS} from '../actions/actionTypes'
import { SET_PROJECT_FORM } from '../actions/actionTypes'

const initialState = {
    projects:{
        allProjects:[],
        projectForm:false
    },
}

const projectReducer =  (state = initialState, action) => {
    
    switch(action.type){

        case GET_PROJECTS:
            return {
                ...state,
                projects: {
                    allProjects:action.data
                }
            }
        case SET_PROJECT_FORM:
            return {
                ...state,
                projects: {
                    projectForm:!state.projects.projectForm
                }
            }
        
        default:
            return {
                ...state
            }
    }
}

export default projectReducer;
