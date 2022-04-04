import * as TYPE from "../types/scheduleInjectionsType";

const initialState = {
    dataRegistration: []
}

const scheduleInjectionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPE.GET_ALL_REGISTRATION:
            state.dataRegistration = [...action.dataAllRegistration];
            return {...state};

        default:
            return {...state};
    }
}

export default scheduleInjectionsReducer;