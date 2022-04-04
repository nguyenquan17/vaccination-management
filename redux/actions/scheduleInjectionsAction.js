import * as TYPE from '../types/scheduleInjectionsType'
import {openLoadingAction, closeLoadingAction} from "./loaderAction";
import {HTTP_200} from "../../services/define_HTTP";
import {snackActions} from "../../helper/showSnackBar";
import {registrationVaccineServices} from "../../services/servicesAPI";

export const getAllRegistrationAction = (dataAllRegistration) => ({
    type: TYPE.GET_ALL_REGISTRATION,
    dataAllRegistration
})

export const getAllRegistration = () => async dispatch =>{
    try{
        dispatch(openLoadingAction())
        const res = await registrationVaccineServices.getAllRegistrationServices()
        if(res.status === HTTP_200 && res.data.status){
            dispatch(closeLoadingAction())
            let customData = res.data.data.map((item, index)=>{
                return {...item, id: index}
            })
            dispatch(getAllRegistrationAction(customData));
        }else{
            dispatch(closeLoadingAction())
            snackActions.error('Tải dữ liệu điểm tiêm thất bại')
        }
    }catch (e) {
        dispatch(closeLoadingAction())
        snackActions.error('Tải dữ liệu điểm tiêm thất bại')
    }
}

export const acceptRegistrationVaccine = (data) => async dispatch =>{
    try{
        dispatch(openLoadingAction())
        const res = await registrationVaccineServices.scheduleInjectionsServices({
            "id_dangkytiem": data.listIDRegistration,
            "date": data.dateSchedule.getTime() / 1000,
            "id_vaccine": data.idVaccine,
        })
        if(res.status === HTTP_200 && res.data.status){
            const reloadData = await registrationVaccineServices.getAllRegistrationServices()
            if(reloadData.status === HTTP_200 && reloadData.data.status){
                dispatch(closeLoadingAction())
                let customData = reloadData.data.data.map((item, index)=>{
                    return {...item, id: index}
                })
                dispatch(getAllRegistrationAction(customData));
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