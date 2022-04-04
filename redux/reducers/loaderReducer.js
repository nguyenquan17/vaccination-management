import  {OPEN_LOADING, CLOSE_LOADING} from "../types/loading";

const initialState = {
    isLoading: false,
}

const loaderReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_LOADING:
            state.isLoading = true;
            return { ...state }

        case CLOSE_LOADING:
            state.isLoading = false;
            return { ...state }

        default:
            return { ...state }
    }
}

export default loaderReducer