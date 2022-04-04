import * as TYPE from "../types/vaccinationRecordType";

const initialState = {
    dataVaccinationRecord: []
}

const vaccinationRecordReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPE.GET_ALL_VACCINATION_RECORD:
            state.dataVaccinationRecord = [...action.dataRecord];
            return {...state};

        default:
            return {...state};
    }
}

export default vaccinationRecordReducer;