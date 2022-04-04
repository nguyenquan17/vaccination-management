import * as TYPE from '../types/vaccinationRecordType'
import {openLoadingAction, closeLoadingAction} from "./loaderAction";
import {HTTP_200} from "../../services/define_HTTP";
import {snackActions} from "../../helper/showSnackBar";
import {vaccinationRecordServices} from "../../services/servicesAPI";

export const getAllVaccinationRecordAction = (dataRecord) => ({
    type: TYPE.GET_ALL_VACCINATION_RECORD,
    dataRecord
})

export const getAllVaccinationRecord = () => async dispatch =>{
    try{
        dispatch(openLoadingAction())
        const res = await vaccinationRecordServices.getAllVaccinationRecordServices()
        if(res.status === HTTP_200 && res.data.status){
            dispatch(closeLoadingAction())
            let customData = res.data.data.map((item, index)=>{
                return {...item, id: index}
            })
            dispatch(getAllVaccinationRecordAction(customData));
        }else{
            dispatch(closeLoadingAction())
            snackActions.error('Tải dữ liệu điểm tiêm thất bại')
        }
    }catch (e) {
        dispatch(closeLoadingAction())
        snackActions.error('Tải dữ liệu điểm tiêm thất bại')
    }
}

export const updateVaccinationRecord = (data) => async dispatch =>{
    try{
        dispatch(openLoadingAction())
        const res = await vaccinationRecordServices.updateVaccinationRecordServices(data.idRecord, {
            "blood_pressure": data.bloodPressure,
            "level_response": data.levelResponse,
            "heart_rate": data.heartRate,
            "note": data.note,
        })
        if(res.status === HTTP_200 && res.data.status){
            const reloadData = await vaccinationRecordServices.getAllVaccinationRecordServices()
            if(reloadData.status === HTTP_200 && reloadData.data.status){
                dispatch(closeLoadingAction())
                let customData = reloadData.data.data.map((item, index)=>{
                    return {...item, id: index}
                })
                dispatch(getAllVaccinationRecordAction(customData));
                return true
            }else{
                dispatch(closeLoadingAction())
                snackActions.error('Tải dữ liệu điểm tiêm thất bại')
                return false
            }
        }else{
            dispatch(closeLoadingAction())
            return false
        }
    }catch (e){
        dispatch(closeLoadingAction())
        return false
    }
}