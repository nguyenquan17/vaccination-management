import * as TYPE from "../types/registerOrganizationType";

const initialState = {
    dataRegisterOrganization: [],
}

const registerOrganizationReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPE.GET_ALL_REGISTER_ORGANIZATION:
            state.dataRegisterOrganization = [...action.dataOrganization];
            return {...state};

        default:
            return {...state};
    }
}

export default registerOrganizationReducer;