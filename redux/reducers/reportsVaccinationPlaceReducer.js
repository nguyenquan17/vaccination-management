import * as TYPE from "../types/reportsVaccintationType";

const initialState = {
    dataReportsVaccinationPlace: [],
}

const reportsVaccinationPlaceReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPE.GET_DATA_REPORT_VACCINATION_PLACE:
            state.dataReportsVaccinationPlace = [...action.dataReports];
            return {...state};
        default:
            return {...state};
    }
}

export default reportsVaccinationPlaceReducer;