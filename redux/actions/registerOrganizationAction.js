import {accountOrganizationServices, registerServices} from '../../services/servicesAPI';
import {openLoadingAction, closeLoadingAction} from "./loaderAction";
import {HTTP_200} from "../../services/define_HTTP";
import * as TYPE from "../types/registerOrganizationType";

export const getAllVaccinationAction = (dataOrganization) => ({
    type: TYPE.GET_ALL_REGISTER_ORGANIZATION,
    dataOrganization
})

export const getAllVaccination = () => async dispatch =>{
    try{
        dispatch(openLoadingAction())
        const res = await accountOrganizationServices.getAllDataVaccineOrganization()
        if(res.status === HTTP_200 && res.data.status){
            dispatch(closeLoadingAction())
            let customData = res.data.data.map((item, index)=>{
                return {...item, id: index}
            })
            dispatch(getAllVaccinationAction(customData));
        }else{
            dispatch(closeLoadingAction())
        }
    }catch (e) {
        dispatch(closeLoadingAction())
    }
}

export const registrationVaccinationOrganization = (formData) => async dispatch =>{
    try{
        console.log("vao day roi")
        console.log(formData)
        dispatch(openLoadingAction())
        let formDataMultiPart = new FormData();
        formDataMultiPart.append("number_of_times", formData.numberInject,)
        formDataMultiPart.append("id_vaccination_place", formData.idPlace,)
        formDataMultiPart.append("file", formData.file,)
        console.log("form la ", formDataMultiPart);
        const res = await registerServices.registerInjectionOrganization(formDataMultiPart)
        console.log(res);
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