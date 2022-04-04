import { registerServices } from '../../services/servicesAPI';
import {openLoadingAction, closeLoadingAction} from "./loaderAction";
import {HTTP_200} from "../../services/define_HTTP";

//Create register person
export const registrationVaccinationAction = (dataRegisterPerson) => async dispatch =>{
    try{
        dispatch(openLoadingAction())
        const res = await registerServices.registrationVaccinationServices({
            "id_vaccine_place": dataRegisterPerson.idPlace,
            "id_priority": dataRegisterPerson.idPriority,
            "is_sick": dataRegisterPerson.sick,
            "note": dataRegisterPerson.note,
            "number_of_times": dataRegisterPerson.numberInject
        })
        if(res.status === HTTP_200 && res.data.status){
            dispatch(closeLoadingAction())
            return true
        }else{
            dispatch(closeLoadingAction())
            return false
        }
    }catch(e){
        dispatch(closeLoadingAction())
        return false;
    }
}