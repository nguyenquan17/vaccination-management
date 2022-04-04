import * as TYPE from '../types/acceptRecordType'
import {openLoadingAction, closeLoadingAction} from "./loaderAction";
import {HTTP_200} from "../../services/define_HTTP";
import {snackActions} from "../../helper/showSnackBar";
import {registrationVaccineServices, vaccinationRecordServices} from "../../services/servicesAPI";
import {getAllRegistrationAction} from "./scheduleInjectionsAction";

export const getAllScheduleInjectionsAction = (dataScheduleInjections) => ({
    type: TYPE.GET_ALL_SCHEDULE_INJECTIONS,
    dataScheduleInjections
})

export const getAllScheduleInjections = () => async dispatch =>{
    try{
        dispatch(openLoadingAction())
        const res = await vaccinationRecordServices.getAllScheduleInjectionsServices()
        if(res.status === HTTP_200 && res.data.status){
            dispatch(closeLoadingAction())
            let customData = res.data.data.map((item, index)=>{
                return {...item, id: index}
            })
            dispatch(getAllScheduleInjectionsAction(customData));
        }else{
            dispatch(closeLoadingAction())
            snackActions.error('Tải dữ liệu điểm tiêm thất bại')
        }
    }catch (e) {
        dispatch(closeLoadingAction())
        snackActions.error('Tải dữ liệu điểm tiêm thất bại')
    }
}

export const acceptScheduleInjections = (data) => async dispatch =>{
    try{
        dispatch(openLoadingAction())
        const res = await vaccinationRecordServices.createVaccinationRecordServices({
            "id_dangkytiem": data.listID,
        })
        if(res.status === HTTP_200 && res.data.status){
            const reloadData = await vaccinationRecordServices.getAllScheduleInjectionsServices()
            if(reloadData.status === HTTP_200 && reloadData.data.status){
                dispatch(closeLoadingAction())
                let customData = reloadData.data.data.map((item, index)=>{
                    return {...item, id: index}
                })
                dispatch(getAllScheduleInjectionsAction(customData));
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