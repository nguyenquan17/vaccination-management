import {
    VERIFY_OTP,
    REGISTER,
    LOGIN,
    SEND_EMAIL_OTP,
    GET_USER_INFO
} from "../types/authType"

const initialState = {
    userInfo: {},
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            state.userInfo = {
                idUser: action.dataInfoUser.id_user,
                fullName: action.dataInfoUser.name_user,
                idRole: action.dataInfoUser.role,
                email: action.dataInfoUser.email,
                phoneNumber: action.dataInfoUser.phone_number,
                identify: action.dataInfoUser.indentify,
                gender: action.dataInfoUser.gender,
                insurance: action.dataInfoUser.insurance,
                dob: action.dataInfoUser.dob,
                address: action.dataInfoUser.address,
                idCity: action.dataInfoUser.id_city,
                idDistrict: action.dataInfoUser.id_district,
                idSubDistrict: action.dataInfoUser.id_sub_district,
            }
            return { ...state }

        case GET_USER_INFO:
            state.userInfo = {
                idUser: action.dataInfoUser.id_user,
                fullName: action.dataInfoUser.name_user,
                idRole: action.dataInfoUser.role,
                email: action.dataInfoUser.email,
                phoneNumber: action.dataInfoUser.phone_number,
                identify: action.dataInfoUser.indentify,
                gender: action.dataInfoUser.gender,
                insurance: action.dataInfoUser.insurance,
                dob: action.dataInfoUser.dob,
                address: action.dataInfoUser.address,
                idCity: action.dataInfoUser.id_city,
                idDistrict: action.dataInfoUser.id_district,
                idSubDistrict: action.dataInfoUser.id_sub_district,
            }
            return { ...state }

        case REGISTER:
            return { ...state }

        case SEND_EMAIL_OTP:
            state.userInfo = {...state.userInfo, email: action.email}
            return { ...state }

        case VERIFY_OTP:
            state.dataRegister = {
                phoneNumber: action.phoneNumber,
                password: action.password
            };
            return { ...state }

        default:
            return { ...state }
    }
}

export default authReducer