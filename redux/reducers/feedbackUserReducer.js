import * as TYPE from "../types/feedbackUserType";

const initialState = {
    dataFeedbackUser: [],
}

const feedbackUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPE.GET_DATA_FEEDBACK_USER:
            state.dataFeedbackUser = [...action.dataFeedback];
            return {...state};
        default:
            return {...state};
    }
}

export default feedbackUserReducer;