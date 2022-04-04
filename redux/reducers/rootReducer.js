import { combineReducers } from 'redux'
import vaccinesReducer from './vaccinesReducer'
import loaderReducer from "./loaderReducer";
import vaccinationPlaceReducer from './vaccinationPlaceReducer'
import authReducer from "./authReducer";
import provincesReducer from './provincesReducer'
import accountOrganizationReducer from './accountOrganizationReducer'
import profileReducer from './profileReducer'
import adminReducer from './adminReducer'
import scheduleInjectionsReducer from "./scheduleInjectionsReducer";
import acceptRecordReducer from "./acceptRecordReducer";
import vaccinationRecordReducer from "./vaccinationRecordReducer";
import myVaccinationRecordReducer from "./myVaccinationRecordReducer";
import reportsVaccinationPlaceReducer from "./reportsVaccinationPlaceReducer";
import chartsReducer from "./chartsReducer";
import registerOrganizationReducer from "./registerOrganizationReducer";
import feedbackUserReducer from "./feedbackUserReducer";

const rootReducer = combineReducers({
    loaderReducer,
    authReducer,
    vaccinesReducer,
    vaccinationPlaceReducer,
    provincesReducer,
    accountOrganizationReducer,
    profileReducer,
    adminReducer,
    scheduleInjectionsReducer,
    acceptRecordReducer,
    vaccinationRecordReducer,
    myVaccinationRecordReducer,
    reportsVaccinationPlaceReducer,
    chartsReducer,
    registerOrganizationReducer,
    feedbackUserReducer,
})

export default rootReducer