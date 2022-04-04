import * as TYPE from "../types/provincesType";

const initialState = {
    count: 5,
    dataCities: [],
    dataDistricts: [],
    dataTowns: [],
}

const provincesReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPE.GET_ALL_PROVINCES:
            state.dataCities = [...action.dataCities]
            state.dataDistricts = [...action.dataDistricts]
            state.dataTowns = [...action.dataTowns]
            return { ...state }

        default:
            return { ...state }
    }
}

export default provincesReducer