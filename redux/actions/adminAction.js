import { GET_ALL_ACCOUNT, CREATE_ACCOUNT, DELETE_ACCOUNT } from "../types/adminType";
import {openLoadingAction, closeLoadingAction} from "./loaderAction";
import {accountsServices} from "../../services/servicesAPI";
import {HTTP_200} from "../../services/define_HTTP";
import {snackActions} from "../../helper/showSnackBar";

// Định nghĩa Type và dữ liệu đẩy lên

// Lấy data account
export const getAllAccountsActions = (dataAccounts) => ({
    type: GET_ALL_ACCOUNT,
    dataAccounts,
});

// Thiết lập action call api trong này

// Call API dữ liệu account
export const getDataAccounts = () => async dispatch => {
    try{
        dispatch(openLoadingAction())
        const res = await accountsServices.getAllDataAccountsServices()
        if(res.status === HTTP_200 && res.data.status){
            dispatch(closeLoadingAction())
            let dataAccount = res.data.data
            dataAccount = dataAccount.map((item, index) => {
                return {...item, id: index}
            })
            dispatch(getAllAccountsActions(dataAccount));
        }else{
            snackActions.error('Tải dữ liệu account thất bại')
            dispatch(closeLoadingAction())
        }
    }catch (e) {
        dispatch(closeLoadingAction())
        snackActions.error('Tải dữ liệu account thất bại')
    }
};

// Call API thêm mới account
export const addAccount = (dataNewAccount) => async dispatch => {
    try{
        dispatch(openLoadingAction())
        const res = await accountsServices.addNewAccountServices({
            "username": dataNewAccount.username,
            "password": dataNewAccount.password,
            "role": dataNewAccount.id_role,
            "id_place": dataNewAccount.id_place,
            "active_acc": false
        })
        if(res.status === HTTP_200 && res.data.status){
            const reloadData = await accountsServices.getAllDataAccountsServices()
            console.log(reloadData)
            if(reloadData.status === HTTP_200 && reloadData.data.status){
                dispatch(closeLoadingAction())
                let dataAccount = reloadData.data.data
                dataAccount = dataAccount.map((item, index) => {
                return {...item, id: index}
                })
                dispatch(getAllAccountsActions(dataAccount));
            }
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

// Call API xóa account
export const deleteAccount = (idAccount) => async dispatch => {
    try{
        dispatch(openLoadingAction())
        const res = await accountsServices.deleteAccountServices(idAccount)
        if(res.status === HTTP_200 && res.data.status){
            snackActions.success('Xóa account thành công 🎉')
            const reloadData = await accountsServices.getAllDataAccountsServices()
            if(reloadData.status === HTTP_200 && reloadData.data.status){
                dispatch(closeLoadingAction())
                let dataAccount = reloadData.data.data
                dataAccount = dataAccount.map((item, index) => {
                return {...item, id: index}
                })
                dispatch(getAllAccountsActions(dataAccount));
            }
            return true
        }else{
            snackActions.error('Xóa thất bại, hệ thống đang gặp vấn đề')
            dispatch(closeLoadingAction())
            return false
        }
    }catch (e) {
        snackActions.error('Xóa thất bại, hệ thống đang gặp vấn đề')
        dispatch(closeLoadingAction())
        return false
    }
}