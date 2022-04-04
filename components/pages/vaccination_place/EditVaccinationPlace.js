import {useState} from "react";
import Button from "@mui/material/Button";
import VCManagementCSS from "../vaccine/VCMNCSS.module.scss";
import {connect} from "react-redux";
import CustomInput from "../../common/Input/CustomInput";
import {snackActions} from '../../../helper/showSnackBar';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';


import {editVaccinationPlace} from "../../../redux/actions/vaccinationPlaceAction";
import {validationInvalid} from "../../../helper/validate/validation";
import CustomButtonModal from "../../common/Modal/customButtonModal";
import SCSS from "../vaccine/VCMNCSS.module.scss";
import {number} from "prop-types";
import {dataAllCity, dataAllDistrict, dataAllSubDistrict} from "./AddVaccinationPlace";

function EditVaccinationPlace(props) {

    const [openModalEdit, setModalEdit] = useState(false);
    const handleOpenEdit = () => setModalEdit(true);
    const handleCloseEdit = () => setModalEdit(false);

    const [dataVaccinationPlace, setDataVaccinationPlace] = useState({
        value: {
            namePlace: props.namePlace,
            idSubDistrict: props.idSubDistrict,
            idDistrict: props.idDistrict,
            idCity: props.idCity,
            numberTable: props.numberTable,
            address: props.address,
            curator: props.curator,
        },
        error: {
            namePlace: false,
            numberTable: false,
            address: false,
            curator: false
        }
    })

    const onClickChangeVaccinationSite = async () => {
        if (dataVaccinationPlace.error.namePlace ||
            dataVaccinationPlace.error.numberTable ||
            dataVaccinationPlace.error.address ||
            dataVaccinationPlace.error.curator
            ) {
            snackActions.error('Sửa điểm tiêm thất bại, Yêu cầu nhập dầy đủ dữ liệu')
        } else {
            if (validationInvalid(dataVaccinationPlace.value.namePlace) ||
                validationInvalid(dataVaccinationPlace.value.numberTable) ||
                validationInvalid(dataVaccinationPlace.value.address) ||
                validationInvalid(dataVaccinationPlace.value.curator)) {
                setDataVaccinationPlace({
                    value: {...dataVaccinationPlace.value},
                    error: {
                        namePlace: validationInvalid(dataVaccinationPlace.value.namePlace),
                        numberTable: validationInvalid(dataVaccinationPlace.value.numberTable),
                        address: validationInvalid(dataVaccinationPlace.value.address),
                        curator: validationInvalid(dataVaccinationPlace.value.curator),
                    }
                })
                snackActions.error('Sửa điểm tiêm thất bại, Yêu cầu nhập dầy đủ dữ liệu')
            } else {
                const result = await props.editVaccinationPlace(props.idVaccinationPlace, dataVaccinationPlace.value)
                if (result) {
                    snackActions.success('Sửa thông tin điểm tiêm thành công 🎉')
                    handleCloseEdit()
                } else {
                    snackActions.error('Sửa thất bại, hệ thống đang gặp vấn đề')
                }
            }
        }
    }

    const handleChangeValue = (event) => {
        let idFocus = event.target.id
        setDataVaccinationPlace({
            value: {...dataVaccinationPlace.value, [idFocus]: event.target.value},
            error: {...dataVaccinationPlace.error, [idFocus]: validationInvalid(event.target.value)}
        })
    }

    const handleChangeCity = (datePicker) => {
        setDataVaccinationPlace({
            value: {...dataVaccinationPlace.value, idCity: datePicker.target.value},
            error: {...dataVaccinationPlace.error}
        })
    }

    const handleChangeDistrict = (datePicker) => {
        setDataVaccinationPlace({
            value: {...dataVaccinationPlace.value, idDistrict: datePicker.target.value},
            error: {...dataVaccinationPlace.error}
        })
    }

    const handleChangeSubDistrict = (datePicker) => {
        setDataVaccinationPlace({
            value: {...dataVaccinationPlace.value, idSubDistrict: datePicker.target.value},
            error: {...dataVaccinationPlace.error}
        })
    }

    return (
        <>
            <Button
                variant="contained"
                className={SCSS.buttonEdit}
                onClick={handleOpenEdit}
            >
                <i className="fas fa-edit"/>
            </Button>
            <CustomButtonModal isOpen={openModalEdit} closeModal={handleCloseEdit}>
                <div className="d-flex text-right">
                    <button
                        className="cursor-pointer text-black opacity-50 px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                        type="button"
                    >
                        <i
                            onClick={handleCloseEdit}
                            className="m-0 p-0 far fa-times-circle text-2xl font-bold text-blueGray-600"
                        />
                    </button>
                </div>
                <div className="block uppercase text-blueGray-600 text-lg font-bold mb-3 text-center">
                    Sửa đơn vị tiêm
                </div>
                
                <div>
                    <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-3"
                        htmlFor="grid-password"
                    >
                        ID điểm tiêm: <span className="text-xl">{props.idVaccinationPlace}</span>
                    </label>
                    <div className="mb-3">
                        <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-3"
                            htmlFor="grid-password"
                        >
                            Tên điểm tiêm
                        </label>
                        <CustomInput
                            className={VCManagementCSS.customInput}
                            required
                            defaultValue={dataVaccinationPlace.value.namePlace}
                            id="namePlace"
                            label="Tên"
                            onChange={handleChangeValue}
                        />
                        <span
                            className="text-red-500 text-sm">{dataVaccinationPlace.error.namePlace ? "Không được bỏ trống" : ""}</span>
                    </div>
                    <div className="mb-3">
                        <div className="grid grid-cols-1 gap-2 xl:grid-cols-3 mb-3">
                            <div className="">
                                <label
                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-3"
                                    htmlFor="grid-password"
                                >
                                    Tỉnh/Thành Phố
                                </label>
                                <TextField className="w-60 min-w-full w-full"
                                           id="idCity"
                                           select
                                           required
                                           label="Thành phố/Tỉnh"
                                           value={dataVaccinationPlace.value.idCity}
                                           onChange={handleChangeCity}
                                >
                                    {dataAllCity.map((item, index) => (
                                        <MenuItem key={index} value={item.id_city}>
                                            {item.name_city}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                            <div className="">
                                <label
                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-3"
                                    htmlFor="grid-password"
                                >
                                    Quận/Huyện
                                </label>
                                <TextField className="w-60 min-w-full w-full"
                                           id="idDistrict"
                                           select
                                           required
                                           label="Quận/Huyện"
                                           value={dataVaccinationPlace.value.idDistrict}
                                           onChange={handleChangeDistrict}
                                >
                                    {dataAllDistrict.map((item, index) => (
                                        <MenuItem key={index} value={item.id_district}>
                                            {item.name_district}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                            <div className="">
                                <label
                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-3"
                                    htmlFor="grid-password"
                                >
                                    Xã/Phường
                                </label>
                                <TextField className="w-60 min-w-full w-full"
                                           id="outlined-select-currency"
                                           select
                                           required
                                           label="Xã/Phường"
                                           value={dataVaccinationPlace.value.idSubDistrict}
                                           onChange={handleChangeSubDistrict}
                                >
                                    {dataAllSubDistrict[dataVaccinationPlace.value.idDistrict.length === 0 ? 1 : dataVaccinationPlace.value.idDistrict - 1].map((item, index) => (
                                        <MenuItem key={index} value={item.id_sub_district}>
                                            {item.name_sub_district}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-2 xl:grid-cols-2 mb-3">
                            <div className="mb-3">
                                <label
                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-3"
                                    htmlFor="grid-password"
                                >
                                    Số bàn tiêm
                                </label>
                                <CustomInput
                                    className={VCManagementCSS.customInput}
                                    required
                                    id="numberTable"
                                    defaultValue={dataVaccinationPlace.value.numberTable}
                                    type="number"
                                    label="Số bàn tiêm"
                                    onChange={handleChangeValue}
                                />
                                <span
                                    className="text-red-500 text-sm">{dataVaccinationPlace.error.numberTable ? "Không được bỏ trống" : ""}</span>
                            </div>
                            <div className="mb-3">
                                <label
                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-3"
                                    htmlFor="grid-password"
                                >
                                    Địa chỉ
                                </label>
                                <CustomInput
                                    className={VCManagementCSS.customInput}
                                    required
                                    defaultValue={dataVaccinationPlace.value.address}
                                    id="address"
                                    label="Địa chỉ"
                                    onChange={handleChangeValue}
                                />
                                <span
                                    className="text-red-500 text-sm">{dataVaccinationPlace.error.address ? "Không được bỏ trống" : ""}</span>
                            </div>

                        </div>
                        <div>
                            <div className="mb-3">
                                <label
                                    className="block uppercase text-blueGray-600 text-xs font-bold mb-3"
                                    htmlFor="grid-password"
                                >
                                    Người phụ trách
                                </label>
                                <CustomInput
                                    className={VCManagementCSS.customInput}
                                    required
                                    id="curator"
                                    label="Người phụ trách"
                                    onChange={handleChangeValue}
                                    defaultValue={dataVaccinationPlace.value.curator}
                                />
                            </div>
                            <span
                                className="text-red-500 text-sm">{dataVaccinationPlace.error.curator ? "Không được bỏ trống" : ""}</span>
                        </div>
                    </div>
                    <div className={VCManagementCSS.wrapperButtonModal}>
                        <Button
                            variant="contained"
                            className={[VCManagementCSS.customButton, VCManagementCSS.buttonClose].join(
                                " "
                            )}
                            onClick={handleCloseEdit}
                        >
                            Hủy
                        </Button>
                        <Button
                            variant="contained"
                            className={SCSS.buttonEdit}
                            onClick={() => {
                                onClickChangeVaccinationSite()
                            }}
                        >
                            Sửa
                        </Button>
                    </div>
                </div>

            </CustomButtonModal>
        </>
    )
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
    editVaccinationPlace
};

EditVaccinationPlace.prototype={
    idVaccinationPlace: number,
    namePlace: String,
    numberTable: number,
    curator: String,
    address: String,
    idCity: number,
    idDistrict: number,
    idSubDistrict: number,
}

export default connect(mapStateToProps, mapDispatchToProps)(EditVaccinationPlace);

