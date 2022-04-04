import { GET_ALL_PROVINCES } from "../types/provincesType";
// import {openLoadingAction, closeLoadingAction} from "./loaderAction";

// Lấy data vacxin
export const getAllProvincesActions = (dataProvinces) => ({
    type: GET_ALL_PROVINCES,
    dataCities: dataProvinces.dataCities,
    dataDistricts: dataProvinces.dataDistricts,
    dataTowns: dataProvinces.dataTowns,
});

// Thiết lập action call api trong này

// Call API dữ liệu povince
export const getDataProvinces = () => async dispatch => {
    let dataProvinces = {
        dataCities: [],
        dataDistricts: [],
        dataTowns: []
    }
    dataProvinces.dataCities = [
        {
            id: 1,
            name: "Hà Nội",
        },
        {
            id: 2,
            name: "TP Hồ Chí Minh",
        },
        {
            id: 3,
            name: "Hải Phòng",
        },
        {
            id: 4,
            name: "Đà Nẵng",
        },
        {
            id: 5,
            name: "Hà Giang",
        },
    ]

    dataProvinces.dataDistricts = [
        {
            id: 1,
            name: "Hà Nội",
        },
        {
            id: 2,
            name: "TP Hồ Chí Minh",
        },
        {
            id: 3,
            name: "Hải Phòng",
        },
        {
            id: 4,
            name: "Đà Nẵng",
        },
        {
            id: 5,
            name: "Hà Giang",
        },
    ]

    dataProvinces.dataTowns = [
        {
            id: 1,
            name: "Hà Nội",
        },
        {
            id: 2,
            name: "TP Hồ Chí Minh",
        },
        {
            id: 3,
            name: "Hải Phòng",
        },
        {
            id: 4,
            name: "Đà Nẵng",
        },
        {
            id: 5,
            name: "Hà Giang",
        },
    ]

    dispatch(getAllProvincesActions(dataProvinces));
};