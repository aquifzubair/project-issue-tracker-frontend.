import { GET_COMMENTS  } from '../actions/actionTypes';

const initialState = {
    comments: {
        allComments: [],
    }
}

const commentReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_COMMENTS:
            return {
                ...state,
                comments: {
                    allComments: action.data
                }
            }

        default:
            return {
                ...state
            }
    }
}

export default commentReducer;