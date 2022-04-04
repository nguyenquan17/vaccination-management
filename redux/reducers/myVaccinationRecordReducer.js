import * as TYPE from "../types/myVaccinationRecordType";

const initialState = {
    myVaccinationRecord: []
}

const myVaccinationRecordReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPE.GET_MY_VACCINATION_RECORD:
            state.myVaccinationRecord = [...action.myVaccinationRecord];
            return {...state};

        default:
            return {...state};
    }
}

export default myVaccinationRecordReducer;