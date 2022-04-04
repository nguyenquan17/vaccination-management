import Axios from "axios";


import {DOMAIN_API} from "./domain";
import Cookies from 'js-cookie'
import {USER_TOKEN} from "../helper/define";
import qs from 'qs'

const queryString = require('qs')

export const registerServices = {
    getDataVaccinationPlace: () => {
        return Axios({
            url: `${DOMAIN_API}/vaccination_place/show_vaccination_place_`,
            method: "GET"
        })
    },
    registrationVaccinationServices: (data) => {
        return Axios({
            url: `${DOMAIN_API}/injections/registration_vaccination`,
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                "token": Cookies.get(USER_TOKEN)
            },
            data: data
        })
    },
    getAllDataRegisterPerson: () => {
        return Axios({
            url: `${DOMAIN_API}/injections/search_registration`,
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                "token": Cookies.get(USER_TOKEN)
            }
        })
    },
    registerInjectionOrganization: (formData) => {
        return Axios({
            url: `${DOMAIN_API}/injections_organization/uploadfile`,
            method: "POST",
            headers: {
                'content-type': 'multipart/form-data',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                "token": Cookies.get(USER_TOKEN)
            },
            data: formData
        })
    },
}

export const vaccinesServices = {
    getAllDataVaccinesServices: () => {
        return Axios({
            url: `${DOMAIN_API}/vaccine/show_all`,
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                "token": Cookies.get(USER_TOKEN)
            },
        },);
    },
    addNewVaccineServices: (dataVaccine) => {
        return Axios({
            url: `${DOMAIN_API}/vaccine/create`,
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                "token": Cookies.get(USER_TOKEN)
            },
            data: dataVaccine
        },);
    },
    editVaccineServices: (dataChangeVaccine) => {
        return Axios({
            url: `${DOMAIN_API}/vaccine/update`,
            method: "PUT",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                "token": Cookies.get(USER_TOKEN)
            },
            data: dataChangeVaccine,
            params: {
                id: dataChangeVaccine.id
            }
        },);
    },
    deleteVaccineServices: (id) => {
        return Axios({
            url: `${DOMAIN_API}/vaccine/delete`,
            method: "DELETE",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                "token": Cookies.get(USER_TOKEN)
            },
            params: {
                id: id
            }
        },);
    },
};

export const vaccinationPlaceServices = {
    getAllVaccinationPlaceServices: () => {
        return Axios({
            url: `${DOMAIN_API}/vaccination_place/show_vaccination_place_`,
            method: "GET",
        },);
    },
    addNewVaccinationPlace: (dataNewVaccinationPlace) => {
        return Axios({
            url: `${DOMAIN_API}/vaccination_place/create_vaccination_place`,
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                "token": Cookies.get(USER_TOKEN)
            },
            data: dataNewVaccinationPlace
        },);
    },
    editVaccineServices: (id, dataEdit) => {
        return Axios({
            url: `${DOMAIN_API}/vaccination_place/update_vaccination_place`,
            method: "PUT",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                "token": Cookies.get(USER_TOKEN)
            },
            data: dataEdit,
            params: {
                id: id
            }
        },);
    },
    deleteVaccinationPlaceServices: (id) => {
        return Axios({
            url: `${DOMAIN_API}/vaccination_place/detele_vaccination_place`,
            method: "DELETE",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                "token": Cookies.get(USER_TOKEN)
            },
            params: {
                id: id
            }
        },);
    },
};

export const authServices = {
    loginUserServices: (email, password) => {
        return Axios({
            url: `${DOMAIN_API}/login`,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
            },
            method: "POST",
            data: {
                "username": email,
                "password": password,
            }
        },);
    },
    registerAccountServices: (email, password) => {
        return Axios({
            url: `${DOMAIN_API}/sign_up_person`,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
            },
            method: "POST",
            data: {
                "email": email,
                "password": password,
            },
        },);
    },
    sendEmailOTPServices: (email) => {
        return Axios({
            url: `${DOMAIN_API}/send_otp`,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
            },
            method: "GET",
            params: {
                "email": email,
            }
        },);
    },
    verifyOTPServices: (email, otp) => {
        return Axios({
            url: `${DOMAIN_API}/verify_otp`,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
            },
            method: "POST",
            data: {
                "otp": otp,
                "email": email
            },
        },);
    },
    registerOrganizationServices: (dataOrganization) => {
        return Axios({
            url: `${DOMAIN_API}/sign_up_organization`,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
            },
            method: "POST",
            data: dataOrganization,
        },);
    },
    forgotPasswordServices: (email) => {
        return Axios({
            url: `${DOMAIN_API}/forget_pass`,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
            },
            method: "POST",
            data: {'email': email},
        },);
    },
    changePasswordServices: (oldPassword, newPassword) => {
        return Axios({
            url: `${DOMAIN_API}/users/change_pass`,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                "token": Cookies.get(USER_TOKEN),
            },
            method: "POST",
            data: {
                "old_pass": oldPassword,
                "new_pass": newPassword
            },
        },);
    }
}

export const userServices = {
    getInfoUserServices: () => {
        return Axios({
            url: `${DOMAIN_API}/users/show_myinfo`,
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                "token": Cookies.get(USER_TOKEN),
            },
        },);
    },
    changeProfileServices: (data) => {
        return Axios({
            url: `${DOMAIN_API}/users/create_myinfo`,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                "token": Cookies.get(USER_TOKEN)
            },
            method: "POST",
            data: data,
        },);
    },
    getRegistration: () => {
        return Axios({
            url: `${DOMAIN_API}/injections/search_registration`,
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                "token": Cookies.get(USER_TOKEN),
            },
        },);
    },
    getMyVaccinationPlaceServices: () => {
        return Axios({
            url: `${DOMAIN_API}/users/show_vaccination_place`,
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                "token": Cookies.get(USER_TOKEN),
            },
        },);
    },
    getMyScheduleInjectionServices: () => {
        return Axios({
            url: `${DOMAIN_API}/injections/search_schedule_injections`,
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                "token": Cookies.get(USER_TOKEN),
            },
        },);
    },
}

export const accountOrganizationServices = {
    getAllDataAccountOrganizationServices: () => {
        return Axios({
            url: `${DOMAIN_API}/organization/show_all_organization`,
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                "token": Cookies.get(USER_TOKEN),
            },
        })
    },
    confirmAccountOrganizationServices: (idAccount) => {
        return Axios({
            url: `${DOMAIN_API}/organization/approve_organization/${idAccount}`,
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                "token": Cookies.get(USER_TOKEN),
            },
        })
    },
    getAllDataVaccineOrganization: () => {
        return Axios({
            url: `${DOMAIN_API}/injections_organization/show_inject_organization`,
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                "token": Cookies.get(USER_TOKEN),
            },
        })
    }
}

export const accountsServices = {
    getAllDataAccountsServices: () => {
        return Axios({
            url: `${DOMAIN_API}/account/show_account`,
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                "token": Cookies.get(USER_TOKEN)
            },
        },);
    },
    addNewAccountServices: (dataAccount) => {
        return Axios({
            url: `${DOMAIN_API}/account/create_account`,
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                "token": Cookies.get(USER_TOKEN)
            },
            data: dataAccount
        },);
    },
    deleteAccountServices: (id) => {
        return Axios({
            url: `${DOMAIN_API}/account/delete_account`,
            method: "DELETE",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                "token": Cookies.get(USER_TOKEN)
            },
            params: {
                id: id
            }
        },);
    },
};

export const registrationVaccineServices = {
    getAllRegistrationServices: () => {
        return Axios({
            url: `${DOMAIN_API}/injections/show_registration_vaccination`,
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                "token": Cookies.get(USER_TOKEN),
            },
        },);
    },
    scheduleInjectionsServices: (data) => {
        return Axios({
            url: `${DOMAIN_API}/injections/schedule_injections`,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                "token": Cookies.get(USER_TOKEN)
            },
            method: "POST",
            data: data,
        },);
    },
}

export const vaccinationRecordServices = {
    getAllScheduleInjectionsServices: () => {
        return Axios({
            url: `${DOMAIN_API}/vaccination_records/show_all_schedule_injections`,
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                "token": Cookies.get(USER_TOKEN),
            },
        },);
    },
    createVaccinationRecordServices: (data) => {
        return Axios({
            url: `${DOMAIN_API}/vaccination_records/create_vaccination_records`,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                "token": Cookies.get(USER_TOKEN)
            },
            method: "POST",
            data: data,
        },);
    },
    getAllVaccinationRecordServices: () => {
        return Axios({
            url: `${DOMAIN_API}/vaccination_records/show_all_vaccination_records`,
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                "token": Cookies.get(USER_TOKEN),
            },
        },);
    },
    updateVaccinationRecordServices: (id, data) => {
        return Axios({
            url: `${DOMAIN_API}/vaccination_records/update_vaccination_records_detail_${id}`,
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                "token": Cookies.get(USER_TOKEN),
            },
            data: data,
        },);
    },
    getMyVaccinationRecordServices: () => {
        return Axios({
            url: `${DOMAIN_API}/users/my_vaccinations_record`,
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                "token": Cookies.get(USER_TOKEN),
            },
        },);
    },
}

export const chartServices = {
    getDataLineChart: () => {
        return Axios({
            url: `${DOMAIN_API}/reports/show_report_injection`,
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
            },
        })
    },
    getDataBarChart: () => {
        return Axios({
            url: `${DOMAIN_API}/reports/show_report_vaccine`,
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
            },
        })
    }
}

export const reportsServices = {
    reportsVaccinationPlaceServices: (data) => {
        return Axios({
            url: `${DOMAIN_API}/reports/show_reports`,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                "token": Cookies.get(USER_TOKEN)
            },
            method: "POST",
            data: data,
        },);
    },
}

export const feedbackUserServices = {
    feedbackUserVaccinationPlaceServices: (data) => {
        return Axios({
            url: `${DOMAIN_API}/feedbacks/show_feedback`,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                "token": Cookies.get(USER_TOKEN)
            },
            method: "POST",
            data: data,
        },);
    },
}

export const myFeedBackService = {
    createMyFeedBackServices: (data) => {
        return Axios({
            url: `${DOMAIN_API}/feedbacks/feed_back_user`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                "token": Cookies.get(USER_TOKEN)
            },
            method: "POST",
            data: queryString.stringify(data)
        })
    }
}
