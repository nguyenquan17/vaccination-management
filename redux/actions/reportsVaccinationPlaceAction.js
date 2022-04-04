import {openLoadingAction, closeLoadingAction} from "./loaderAction";
import {HTTP_200} from "../../services/define_HTTP";
import {reportsServices} from "../../services/servicesAPI";
import {GET_DATA_REPORT_VACCINATION_PLACE} from "../types/reportsVaccintationType";
import {snackActions} from "../../helper/showSnackBar";


export const getDataReportVaccinationPlace = (dataReports) => ({
    type: GET_DATA_REPORT_VACCINATION_PLACE,
    dataReports
})

//Create register person
export const reportsDataVaccinationPlaceAction = (dataFilter) => async dispatch => {
    try {
        dispatch(openLoadingAction())
        const res = await reportsServices.reportsVaccinationPlaceServices({
            id_sub_district: dataFilter.idSubDistrict === undefined ? 0 : dataFilter.idSubDistrict,
            id_district: dataFilter.idDistrict === undefined ? 0 : dataFilter.idDistrict,
            id_vaccination_place: dataFilter.idVaccinationPlace === undefined ? 0 : dataFilter.idVaccinationPlace,
            date_from: dataFilter.dateFrom.getTime() / 1000,
            date_to: dataFilter.dateTo.getTime() / 1000,
            status: dataFilter.status,
            number_of_time: dataFilter.numberOfTime ? dataFilter.numberOfTime : 0,
            id_vaccine: dataFilter.idVaccine,
            age_from: dataFilter.ageFrom ? dataFilter.ageFrom : 0,
            age_to: dataFilter.ageTo ? dataFilter.ageTo : 0,
        })
        if (res.status === HTTP_200 && res.data.status) {
            dispatch(closeLoadingAction())
            let customData = res.data.data.map((item, index) => {
                return {...item, id: index}
            })
            dispatch(getDataReportVaccinationPlace(customData));
        } else {
            dispatch(closeLoadingAction())
            snackActions.error('Tải dữ liệu điểm tiêm thất bại')
        }
    } catch (e) {
        console.log(e)
        dispatch(closeLoadingAction())
        snackActions.error('Tải dữ liệu điểm tiêm thất bại')
    }
}