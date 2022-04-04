import * as TYPE from '../types/myVaccinationRecordType'
import {openLoadingAction, closeLoadingAction} from "./loaderAction";
import {HTTP_200} from "../../services/define_HTTP";
import {snackActions} from "../../helper/showSnackBar";
import {registrationVaccineServices, vaccinationRecordServices} from "../../services/servicesAPI";
import {getAllRegistrationAction} from "./scheduleInjectionsAction";
import {GET_MY_VACCINATION_RECORD} from "../types/myVaccinationRecordType";

export const getMyVaccinationRecordAction = (myVaccinationRecord) => ({
    type: TYPE.GET_MY_VACCINATION_RECORD,
    myVaccinationRecord
})

export const getMyVaccinationRecord = () => async dispatch =>{
    try{
        dispatch(openLoadingAction())
        const res = await vaccinationRecordServices.getMyVaccinationRecordServices()
        if(res.status === HTTP_200 && res.data.status){
            dispatch(closeLoadingAction())
            let customData = res.data.data.map((item, index)=>{
                return {...item, id: index}
            })
            dispatch(getMyVaccinationRecordAction(customData));
        }else{
            dispatch(closeLoadingAction())
        }
    }catch (e) {
        dispatch(closeLoadingAction())
    }
}