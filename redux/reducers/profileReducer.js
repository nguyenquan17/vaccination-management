import * as TYPE from "../types/profileType";

const initialState = {
    dataRegistration: {},
    dataScheduleInjection: {},
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPE.GET_INFO_REGISTRATION_VACCINATION:
            if(Object.keys(action.dataRegistrationVaccination).length === 0){
                state.dataRegistration = {}
            } else {
                state.dataRegistration = {
                    nameVaccinePlace : action.dataRegistrationVaccination.name_vaccine_place,
                    idPriority : action.dataRegistrationVaccination.id_priority,
                    idDangkytiem : action.dataRegistrationVaccination.id_dangkytiem,
                    isSick : action.dataRegistrationVaccination.is_sick,
                    status : action.dataRegistrationVaccination.status,
                    idUser : action.dataRegistrationVaccination.id_user,
                    idVaccinePlace : action.dataRegistrationVaccination.id_vaccine_place,
                    date : action.dataRegistrationVaccination.date,
                    note : action.dataRegistrationVaccination.note,
                    numberOfTimes : action.dataRegistrationVaccination.number_of_times,
                }
            }
            return { ...state }

        case TYPE.GET_MY_SCHEDULE_INJECTION:
            if(Object.keys(action.myScheduleInjection).length === 0){
                state.dataScheduleInjection = {}
            } else {
                state.dataScheduleInjection = {
                    date : action.myScheduleInjection.Date,
                    idVaccine : action.myScheduleInjection.id_vaccine,
                    vaccine : action.myScheduleInjection.Vaccine,
                    idVaccinePlace : action.myScheduleInjection.id_vaccine_place,
                    nameVaccinePlace: action.myScheduleInjection.name_vaccine_place
                }
            }
            return { ...state }

        default:
            return { ...state }
    }
}

export default profileReducer