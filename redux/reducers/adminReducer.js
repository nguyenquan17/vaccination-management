import * as TYPE from "../types/adminType";

const initialState = {
    dataAccounts: [],
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPE.GET_ALL_ACCOUNT:
            state.dataAccounts = [...action.dataAccounts]
            return { ...state }

        case TYPE.DELETE_ACCOUNT:
            // Đợi có API thì load lại là xong
            return { ...state }

        default:
            return { ...state }
    }
}

export default adminReducer