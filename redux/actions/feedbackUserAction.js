import {openLoadingAction, closeLoadingAction} from "./loaderAction";
import {HTTP_200} from "../../services/define_HTTP";
import {feedbackUserServices} from "../../services/servicesAPI";
import {GET_DATA_FEEDBACK_USER} from "../types/feedbackUserType";
import {snackActions} from "../../helper/showSnackBar";


export const getDataFeedbackUser = (dataFeedback) => ({
    type: GET_DATA_FEEDBACK_USER,
    dataFeedback
})

//Create register person
export const feedbackUserAction = (dataFilter) => async dispatch => {
    try {
        dispatch(openLoadingAction())
        const res = await feedbackUserServices.feedbackUserVaccinationPlaceServices({
            inject_date: dataFilter.injectionDate === 0 ? 0 : dataFilter.injectionDate.getTime() / 1000,
            id_vaccine: dataFilter.idVaccine,
        })

        console.log(res)

        if (res.status === HTTP_200 && res.data.status) {
            dispatch(closeLoadingAction())
            let customData = res.data.data.map((item, index) => {
                return {...item, id: index}
            })
            dispatch(getDataFeedbackUser(customData));
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