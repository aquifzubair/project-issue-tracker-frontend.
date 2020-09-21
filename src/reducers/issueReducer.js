import { GET_ISSUES } from '../actions/actionTypes';

const initialState = {
    issues: {
        allIssues: [],
    }
}

const issueReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_ISSUES:
            return {
                ...state,
                issues: {
                    allIssues: action.data
                }
            }

        default:
            return {
                ...state
            }
    }
}

export default issueReducer;