import * as TYPE from "../types/vaccinesType";

const initialState = {
    dataVaccines: [],
}

const vaccinesReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPE.GET_ALL_VACCINES:
            state.dataVaccines = [...action.dataVaccines]
            return { ...state }

        case TYPE.EDIT_VACCINE:
            // Đợi có API thì load lại là xong
            return { ...state }

        case TYPE.DELETE_VACCINE:
            // Đợi có API thì load lại là xong
            return { ...state }

        default:
            return { ...state }
    }
}

export default vaccinesReducer