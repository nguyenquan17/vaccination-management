import {closeLoadingAction, openLoadingAction} from "./loaderAction";
import {authServices} from "../../services/servicesAPI";
import {HTTP_200} from "../../services/define_HTTP";

export const changePassword = (dataPassword) => async dispatch => {
    dispatch(openLoadingAction())
    try {
        const res = await authServices.changePasswordServices(dataPassword.oldPassword, dataPassword.newPassword)
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