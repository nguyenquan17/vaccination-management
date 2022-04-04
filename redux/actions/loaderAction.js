import {OPEN_LOADING, CLOSE_LOADING} from "../types/loading";

export const openLoadingAction = () => {
    return {
        type: OPEN_LOADING,
    }
}

export const closeLoadingAction = () => {
    return {
        type: CLOSE_LOADING,
    }
}