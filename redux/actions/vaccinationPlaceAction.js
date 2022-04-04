import {GET_ALL_VACCINATION_PLACE, CURRENT_PlACE} from '../types/vaccinationPlaceType'
import {openLoadingAction, closeLoadingAction} from "./loaderAction";
import {HTTP_200} from "../../services/define_HTTP";
import {snackActions} from "../../helper/showSnackBar";
import {userServices, vaccinationPlaceServices} from '../../services/servicesAPI';

export const getAllVaccinationPlaceActions = (dataVaccinationPlace) => ({
    type: GET_ALL_VACCINATION_PLACE,
    dataVaccinationPlace
})

export const getCurrentPlaceActions = (currentPlace) => ({
    type: CURRENT_PlACE,
    currentPlace
})

export const getCurrentPlace = () => async dispatch =>{
    try{
        const res = await userServices.getMyVaccinationPlaceServices()
        if(res.status === HTTP_200 && res.data.status){
            dispatch(getCurrentPlaceActions(res.data.data))
            return true
        }else{
            snackActions.error('Tải dữ liệu điểm tiêm thất bại')
            return false
        }
    }catch (e){
        snackActions.error('Tải dữ liệu điểm tiêm thất bại')
        return false
    }
}

export const getAllVaccinationPlace = () => async dispatch =>{
    try{
        dispatch(openLoadingAction())
        const res = await vaccinationPlaceServices.getAllVaccinationPlaceServices()
        if(res.status === HTTP_200 && res.data.status){
            dispatch(closeLoadingAction())
            let customData = res.data.data.map((item, index)=>{
                return {...item, id: index}
            })
            dispatch(getAllVaccinationPlaceActions(customData));
        }else{
            dispatch(closeLoadingAction())
            snackActions.error('Tải dữ liệu điểm tiêm thất bại')
        }
    }catch (e) {
        dispatch(closeLoadingAction())
        snackActions.error('Tải dữ liệu điểm tiêm thất bại')
    }
}


export const addVaccinationPlace = (dataNewVaccinationPlace) => async dispatch =>{
    try{
        dispatch(openLoadingAction())
        const res = await vaccinationPlaceServices.addNewVaccinationPlace({
            "name_place": dataNewVaccinationPlace.namePlace,
            "id_sub_district": dataNewVaccinationPlace.idSubDistrict,
            "id_district": dataNewVaccinationPlace.idDistrict,
            "id_city": dataNewVaccinationPlace.idCity,
            "number_table": dataNewVaccinationPlace.numberTable,
            "address": dataNewVaccinationPlace.address,
            "curator": dataNewVaccinationPlace.curator,
        })
        if(res.status === HTTP_200 && res.data.status){
            const reloadData = await vaccinationPlaceServices.getAllVaccinationPlaceServices()
            if(reloadData.status === HTTP_200 && reloadData.data.status){
                let customData = reloadData.data.data.map((item, index)=>{
                    return {...item, id: index}
                })
                dispatch(getAllVaccinationPlaceActions(customData));
            }
            dispatch(closeLoadingAction())
            return true
        }else{
            dispatch(closeLoadingAction())
            return false
        }
    }catch (e){
        dispatch(closeLoadingAction())
        return false
    }
}


export const editVaccinationPlace = (idVaccinationPlace, dataEditVaccinationPlace) => async dispatch =>{
    try{
        dispatch(openLoadingAction())
        const res = await vaccinationPlaceServices.editVaccineServices(idVaccinationPlace, {
            "name_place": dataEditVaccinationPlace.namePlace,
            "id_sub_district": dataEditVaccinationPlace.idSubDistrict,
            "id_district": dataEditVaccinationPlace.idDistrict,
            "id_city": dataEditVaccinationPlace.idCity,
            "number_table": dataEditVaccinationPlace.numberTable,
            "address": dataEditVaccinationPlace.address,
            "curator": dataEditVaccinationPlace.curator,
        })
        if(res.status === HTTP_200 && res.data.status){
            const reloadData = await vaccinationPlaceServices.getAllVaccinationPlaceServices()
            if(reloadData.status === HTTP_200 && reloadData.data.status){
                let customData = reloadData.data.data.map((item, index)=>{
                    return {...item, id: index}
                })
                dispatch(getAllVaccinationPlaceActions(customData));
            }
            dispatch(closeLoadingAction())
            return true
        }else{
            dispatch(closeLoadingAction())
            return false
        }
    }catch (e){
        dispatch(closeLoadingAction())
        return false
    }
}

export const deleteVaccinationPlace = (idVaccinationPlace) => async dispatch => {
    try{
        dispatch(openLoadingAction())
        const res = await vaccinationPlaceServices.deleteVaccinationPlaceServices(idVaccinationPlace)
        if(res.status === HTTP_200 && res.data.status){
            snackActions.success('Xóa điểm tiêm thành công 🎉')
            const reloadData = await vaccinationPlaceServices.getAllVaccinationPlaceServices()
            if(reloadData.status === HTTP_200 && reloadData.data.status){
                let customData = reloadData.data.data.map((item, index)=>{
                    return {...item, id: index}
                })
                dispatch(getAllVaccinationPlaceActions(customData));
            }
            dispatch(closeLoadingAction())
            return true
        }else{
            snackActions.error('Xóa điểm tiêm thất bại, hệ thống đang gặp vấn đề')
            dispatch(closeLoadingAction())
            return false
        }
    }catch (e) {
        snackActions.error('Xóa điểm tiêm thất bại, hệ thống đang gặp vấn đề')
        dispatch(closeLoadingAction())
        return false
    }
}