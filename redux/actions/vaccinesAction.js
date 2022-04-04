import { GET_ALL_VACCINES, CREATE_VACCINE, EDIT_VACCINE } from "../types/vaccinesType";
import {openLoadingAction, closeLoadingAction} from "./loaderAction";
import {vaccinesServices} from "../../services/servicesAPI";
import {HTTP_200} from "../../services/define_HTTP";
import {snackActions} from "../../helper/showSnackBar";

// Định nghĩa Type và dữ liệu đẩy lên

// Lấy data vacxin
export const getAllVaccinesActions = (dataVaccines) => ({
    type: GET_ALL_VACCINES,
    dataVaccines,
});

// Thiết lập action call api trong này

// Call API dữ liệu vacxin
export const getDataVaccines = () => async dispatch => {
    try{
        dispatch(openLoadingAction())
        const res = await vaccinesServices.getAllDataVaccinesServices()
        if(res.status === HTTP_200 && res.data.status){
            dispatch(closeLoadingAction())
            dispatch(getAllVaccinesActions(res.data.data));
        }else{
            snackActions.error('Tải dữ liệu vaccine thất bại')
            dispatch(closeLoadingAction())
        }
    }catch (e) {
        dispatch(closeLoadingAction())
        snackActions.error('Tải dữ liệu vaccine thất bại')
    }
};

// Call API thêm mới vacxin
export const addVaccine = (dataNewVaccine) => async dispatch => {
    try{
        dispatch(openLoadingAction())
        const res = await vaccinesServices.addNewVaccineServices({
            "Name": dataNewVaccine.name,
            "Production_by": dataNewVaccine.nameProduct,
            "Quantity": dataNewVaccine.numberVaccine,
            "Time": dataNewVaccine.timeSpace,
        })
        if(res.status === HTTP_200 && res.data.status){
            const reloadData = await vaccinesServices.getAllDataVaccinesServices()
            if(reloadData.status === HTTP_200 && reloadData.data.status){
                dispatch(getAllVaccinesActions(reloadData.data.data));
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

// Call API sửa vacxin
export const editVaccine = (dataChangeVaccine) => async dispatch => {
    try{
        dispatch(openLoadingAction())
        const res = await vaccinesServices.editVaccineServices({
            "id": dataChangeVaccine.id,
            "Name": dataChangeVaccine.name,
            "Production_by": dataChangeVaccine.nameProduct,
            "Quantity": dataChangeVaccine.numberVaccine,
            "Time": dataChangeVaccine.timeSpace,
        })
        if(res.status === HTTP_200 && res.data.status){
            const reloadData = await vaccinesServices.getAllDataVaccinesServices()
            if(reloadData.status === HTTP_200 && reloadData.data.status){
                dispatch(getAllVaccinesActions(reloadData.data.data));
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

// Call API xóa vacxin
export const deleteVaccine = (idVaccine) => async dispatch => {
    try{
        dispatch(openLoadingAction())
        const res = await vaccinesServices.deleteVaccineServices(idVaccine)
        if(res.status === HTTP_200 && res.data.status){
            snackActions.success('Xóa vacxin thành công 🎉')
            const reloadData = await vaccinesServices.getAllDataVaccinesServices()
            if(reloadData.status === HTTP_200 && reloadData.data.status){
                dispatch(getAllVaccinesActions(reloadData.data.data));
            }
            dispatch(closeLoadingAction())
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