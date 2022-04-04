import * as TYPE from "../types/accontOrganizationType";

const initialState = {
    dataAccountOrganization: [],
}

const accountOrganizationReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPE.GET_ALL_ACCOUNT_ORGANIZATION:
            state.dataAccountOrganization = [...action.dataAccountOrganization];
            return {...state};
        
        default:
            return {...state};
    }
}

export default accountOrganizationReducer;