import * as TYPE from "../types/acceptRecordType";

const initialState = {
    dataScheduleInjection: []
}

const acceptRecordReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPE.GET_ALL_SCHEDULE_INJECTIONS:
            state.dataScheduleInjection = [...action.dataScheduleInjections];
            return {...state};

        default:
            return {...state};
    }
}

export default acceptRecordReducer;