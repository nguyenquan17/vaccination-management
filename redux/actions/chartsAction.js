import {closeLoadingAction, openLoadingAction} from "./loaderAction";
import {chartServices} from "../../services/servicesAPI";
import {HTTP_200} from "../../services/define_HTTP";
import {GET_DATA_LINE_CHART, GET_DATA_BAR_CHART} from "../types/chartsType";
import {snackActions} from "../../helper/showSnackBar";

export const getDataLineChartAction = (dataLineChart) => ({
    type: GET_DATA_LINE_CHART,
    dataLineChart
});

export const getDataBarChartAction = (dataBarChart) => ({
    type: GET_DATA_BAR_CHART,
    dataBarChart
});

export const getAllDataLineChart = () => async dispatch =>{
    try {
        const res = await chartServices.getDataLineChart()
        if(res.status === HTTP_200 && res.data.status){
            dispatch(getDataLineChartAction(res.data.data))
            return true
        }else{
            snackActions.error('Tải dữ liệu báo cáo tiêm chủng thất bại')
            return false
        }

    }catch (e) {
        snackActions.error('Tải dữ liệu báo cáo tiêm chủng thất bại')
        return false
    }
}
export const getAllDataBarChart = () => async dispatch =>{
    try {
        const res = await chartServices.getDataBarChart()
        if(res.status === HTTP_200 && res.data.status){
            dispatch(getDataBarChartAction(res.data.data))
            return true
        }else{
            snackActions.error('Tải dữ liệu báo cáo tiêm chủng thất bại')
            return false
        }
    }catch (e) {
        snackActions.error('Tải dữ liệu báo cáo tiêm chủng thất bại')
        return false
    }
}