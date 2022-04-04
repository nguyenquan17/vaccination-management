import {GET_ALL_ACCOUNT_ORGANIZATION} from '../types/accontOrganizationType'
import {openLoadingAction, closeLoadingAction} from "./loaderAction";
import {accountOrganizationServices} from "../../services/servicesAPI";
import {HTTP_200} from "../../services/define_HTTP";
import {snackActions} from "../../helper/showSnackBar";

export const getAllAccountOrganizationAction = (dataAccountOrganization) => ({
    type: GET_ALL_ACCOUNT_ORGANIZATION,
    dataAccountOrganization,
})

export const getDataAccountOrganization = () => async dispatch =>{
    dispatch(openLoadingAction())
    try {
        const res = await accountOrganizationServices.getAllDataAccountOrganizationServices()
        if(res.status === HTTP_200 && res.data.status) {
            dispatch(closeLoadingAction())
            let dataOrganization = res.data.data
            dataOrganization = dataOrganization.map((item, index)=>{
                return {...item, id: index}
            })
            dispatch(getAllAccountOrganizationAction(dataOrganization));
        }
        else {
            dispatch(closeLoadingAction())
            snackActions.error('Tải dữ liệu điểm tiêm thất bại')
        }
    }catch (e){
        dispatch(closeLoadingAction())
        snackActions.error('Tải dữ liệu điểm tiêm thất bại')
    }
}

export const confirmAccountOrganization = (idAccount) => async dispatch => {
    dispatch(openLoadingAction())
    try{
        const res = await accountOrganizationServices.confirmAccountOrganizationServices(idAccount)
        if(res.status === HTTP_200 && res.data.status) {
            snackActions.success('Đã duyệt thành công 🎉')
            const reloadData = await accountOrganizationServices.getAllDataAccountOrganizationServices()
            if(reloadData.status === HTTP_200 && reloadData.data.status) {
                let dataOrganization = reloadData.data.data
                dataOrganization = dataOrganization.map((item, index)=>{
                    return {...item, id: index}
                })
                dispatch(getAllAccountOrganizationAction(dataOrganization));
                dispatch(closeLoadingAction())
                return true
            } else {
                dispatch(closeLoadingAction())
                snackActions.error('Tải dữ liệu điểm tiêm thất bại')
                return false;
            }
        }else{
            dispatch(closeLoadingAction())
            snackActions.error('Duyệt thất bại, hệ thống đang gặp vấn đề')
            snackActions.error('Tải dữ liệu điểm tiêm thất bại')
            return false;
        }
    }catch (e) {
        dispatch(closeLoadingAction())
        snackActions.error('Duyệt thất bại, hệ thống đang gặp vấn đề')
        snackActions.error('Tải dữ liệu điểm tiêm thất bại')
        return false;
    }
}