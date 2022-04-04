import {closeLoadingAction, openLoadingAction} from "./loaderAction";
import {userServices} from "../../services/servicesAPI";
import {HTTP_200} from "../../services/define_HTTP";
import {getInfoUserAction} from "./authAction";
import {GET_INFO_REGISTRATION_VACCINATION, GET_MY_SCHEDULE_INJECTION} from "../types/profileType";
import {snackActions} from "../../helper/showSnackBar";

export const getRegistrationVaccinationAction = (dataRegistrationVaccination) => ({
    type: GET_INFO_REGISTRATION_VACCINATION,
    dataRegistrationVaccination,
});

export const getMyScheduleInjectionAction = (myScheduleInjection) => ({
    type: GET_MY_SCHEDULE_INJECTION,
    myScheduleInjection,
});

export const getRegistrationVaccination = () => async dispatch => {
    try {
        dispatch(openLoadingAction())
        const res = await userServices.getRegistration()
        if (res.status === HTTP_200 && res.data.status) {
            dispatch(getRegistrationVaccinationAction(res.data.data))
            dispatch(closeLoadingAction())
            return true
        } else {
            dispatch(getRegistrationVaccinationAction({}))
            dispatch(closeLoadingAction())
            return false
        }
    } catch (e) {
        dispatch(getRegistrationVaccinationAction({}))
        dispatch(closeLoadingAction())
        return false
    }
}

export const getMyScheduleInjection = () => async dispatch => {
    try {
        dispatch(openLoadingAction())
        const res = await userServices.getMyScheduleInjectionServices()
        if (res.status === HTTP_200 && res.data.status) {
            dispatch(getMyScheduleInjectionAction(res.data.data))
            dispatch(closeLoadingAction())
            return true
        } else {
            dispatch(getMyScheduleInjectionAction({}))
            dispatch(closeLoadingAction())
            return false
        }
    } catch (e) {
        dispatch(getMyScheduleInjectionAction({}))
        dispatch(closeLoadingAction())
        return false
    }
}

export const changeProfileAction = (dataProfile) => async dispatch => {
    dispatch(openLoadingAction())
    try {
        const res = await userServices.changeProfileServices({
            phone_number: dataProfile.phoneNumber,
            name_user: dataProfile.nameUser,
            address: dataProfile.address,
            indentify: dataProfile.identify,
            insurance: dataProfile.insurance,
            gender: dataProfile.gender,
            dob: dataProfile.dob,
            id_district: dataProfile.idDistrict,
            id_city: dataProfile.idCity,
            id_sub_district: dataProfile.idSubDistrict,
        })
        if (res.status === HTTP_200 && res.data.status) {
            dispatch(closeLoadingAction())
            const res = await userServices.getInfoUserServices()
            if (res.status === HTTP_200 && res.data.status) {
                dispatch(getInfoUserAction(res.data.data))
                return true
            } else {
                return false
            }
        } else {
            dispatch(closeLoadingAction())
            return false
        }
    } catch (e) {
        dispatch(closeLoadingAction())
        return false
    }
}