import * as TYPE from "../types/chartsType";

const initialState = {
    dataLineChart: {},
    dataBarChart: {}
}
const chartsReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPE.GET_DATA_LINE_CHART:
            state.dataLineChart = {...action.dataLineChart}
            return {...state};
        case TYPE.GET_DATA_BAR_CHART:
            state.dataBarChart = {...action.dataBarChart}
            return {...state};
        default:
            return {...state}
    }
}
export default chartsReducer;