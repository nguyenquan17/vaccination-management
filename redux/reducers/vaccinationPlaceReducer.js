import * as TYPE from "../types/vaccinationPlaceType";
import {CURRENT_PlACE, GET_ALL_VACCINATION_PLACE} from "../types/vaccinationPlaceType";

const initialState = {
    dataVaccinationPlace: [],
    currentPlace: {},
}

const vaccinationPlaceReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPE.GET_ALL_VACCINATION_PLACE:
            state.dataVaccinationPlace = [...action.dataVaccinationPlace];
            return {...state};

        case TYPE.CURRENT_PlACE:
            state.currentPlace = {
                idVaccinationPlace: action.currentPlace.id_vaccination_place,
                idSubDistrict: action.currentPlace.id_sub_district,
                idCity: action.currentPlace.id_city,
                address:  action.currentPlace.address,
                namePlace: action.currentPlace.name_place,
                idDistrict: action.currentPlace.id_district,
                numberTable: action.currentPlace.number_table,
                curator: action.currentPlace.curator,
            }
            return {...state};

        default:
            return {...state};
    }
}

export default vaccinationPlaceReducer;