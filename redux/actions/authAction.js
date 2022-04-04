import Cookies from 'js-cookie'
import Router from 'next/router'

import {SEND_EMAIL_OTP, LOGIN, GET_USER_INFO} from "../types/authType";
import {openLoadingAction, closeLoadingAction} from "./loaderAction";
import {authServices, userServices} from '../../services/servicesAPI'
import {HTTP_200} from '../../services/define_HTTP'
import {USER_TOKEN} from "../../helper/define";

export const sendEmailOTPAction = (email) => ({
    type: SEND_EMAIL_OTP,
    email,
});
export const loginAction = (dataInfoUser) => ({
    type: LOGIN,
    dataInfoUser,
});
export const getInfoUserAction = (dataInfoUser) => ({
    type: GET_USER_INFO,
    dataInfoUser,
})

export const getInfoUser = () => async dispatch => {
    try {
        const res = await userServices.getInfoUserServices()
        if (res.status === HTTP_200 && res.data.status) {
            let dataInfoUser = res.data.data
            dispatch(getInfoUserAction(res.data.data))
            return {
                idUser: dataInfoUser.id_user,
                fullName: dataInfoUser.name_user,
                idRole: dataInfoUser.role,
                email: dataInfoUser.email,
                phoneNumber: dataInfoUser.phone_number,
                identify: dataInfoUser.indentify,
                gender: dataInfoUser.gender,
                insurance: dataInfoUser.insurance,
                dob: dataInfoUser.dob,
                address: dataInfoUser.address,
                idCity: dataInfoUser.id_city,
                idDistrict: dataInfoUser.id_district,
                idSubDistrict: dataInfoUser.id_sub_district,
            }
        } else {
            return {}
        }
    } catch (e) {
        return {}
    }
}

export const loginUser = (dataLogin) => async dispatch => {
    dispatch(openLoadingAction())
    try {
        const res = await authServices.loginUserServices(dataLogin.email, dataLogin.password)
        if (res.status === HTTP_200) {
            if (res.data.status) {
                Cookies.remove(USER_TOKEN)
                Cookies.set(USER_TOKEN, res.data.data)
                const infoUser = await userServices.getInfoUserServices()
                if (infoUser.status === HTTP_200 && infoUser.data.status) {
                    dispatch(loginAction(infoUser.data.data))
                }
                dispatch(closeLoadingAction())
                return true
            } else {
                if (res.data.data && res.data.data.is_active === false) {
                    dispatch(closeLoadingAction())
                    await Router.push({pathname: '/login/send_email', query: {email: dataLogin.email}})
                } else {
                    dispatch(closeLoadingAction())
                    return false
                }
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

export const registerAccount = (dataCreateAccount) => async dispatch => {
    dispatch(openLoadingAction())
    try {
        const res = await authServices.registerAccountServices(dataCreateAccount.email, dataCreateAccount.password)
        if (res.status === HTTP_200 && res.data.status) {
            dispatch(closeLoadingAction())
            return true
        } else {
            dispatch(closeLoadingAction())
            return false
        }
    } catch (e) {
        dispatch(closeLoadingAction())
        return false
    }
}

export const sendEmail = (email) => async dispatch => {
    dispatch(openLoadingAction())
    try {
        const res = await authServices.sendEmailOTPServices(email)
        if (res.status === HTTP_200 && res.data.status) {
            dispatch(sendEmailOTPAction(email))
            dispatch(closeLoadingAction())
            return true
        } else {
            dispatch(closeLoadingAction())
            return false
        }
    } catch (e) {
        dispatch(closeLoadingAction())
        return false
    }
}

export const verifyOtpUser = (email, otp) => async dispatch => {
    dispatch(openLoadingAction())
    try {
        const res = await authServices.verifyOTPServices(email, otp)
        if (res.status === HTTP_200 && res.data.status) {
            dispatch(closeLoadingAction())
            return true
        } else {
            dispatch(closeLoadingAction())
            return false
        }
    } catch (e) {
        dispatch(closeLoadingAction())
        return false
    }
}

export const registerOrganization = (dataOrganization) => async dispatch => {
    dispatch(openLoadingAction())
    try{
        console.log(dataOrganization)
        const res = await authServices.registerOrganizationServices({
            "id_category_organization": dataOrganization.idCategoryOrganization,
            "name_organization": dataOrganization.nameOrganization,
            "tax_number": dataOrganization.taxNumber,
            "address": dataOrganization.address,
            "representative_name": dataOrganization.representativeName,
            "regency": dataOrganization.regency,
            "dob": dataOrganization.dob,
            "phone_number": dataOrganization.phoneNumber,
            "email": dataOrganization.email,
            "password": dataOrganization.password,
        })
        if (res.status === HTTP_200 && res.data.status) {
            dispatch(closeLoadingAction())
            return true
        } else {
            dispatch(closeLoadingAction())
            return false
        }
    } catch (e){
        dispatch(closeLoadingAction())
        return false
    }
}
