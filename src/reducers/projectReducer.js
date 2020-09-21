import { GET_PROJECTS } from '../actions/actionTypes'

const initialState = {
    projects: {
        allProjects: [],
    },
}

const projectReducer = (state = initialState, action) => {

    switch (action.type) {

        case GET_PROJECTS:
            return {
                ...state,
                projects: {
                    allProjects: action.data
                }
            }

        default:
            return {
                ...state
            }
    }
}

export default projectReducer;
