import {useState} from "react";
import Button from "@mui/material/Button";
import VCManagementCSS from "../vaccine/VCMNCSS.module.scss";
import {connect} from "react-redux";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

import CustomInput from "../../common/Input/CustomInput";
import {snackActions} from '../../../helper/showSnackBar';
import {addVaccinationPlace} from "../../../redux/actions/vaccinationPlaceAction";
import {validationInvalid} from "../../../helper/validate/validation";
import CustomButtonModal from "../../common/Modal/customButtonModal";

export const dataAllCity = [
    {
        "id_city": 1,
        "name_city": "Hà Nội"
    },
    {
        "id_city": 2,
        "name_city": "TP Hồ Chí Minh"
    },
    {
        "id_city": 3,
        "name_city": "Hải Phòng"
    },
    {
        "id_city": 4,
        "name_city": "Đà Nẵng"
    },
    {
        "id_city": 5,
        "name_city": "Hà Giang"
    },
    {
        "id_city": 6,
        "name_city": "Cao Bằng"
    },
    {
        "id_city": 7,
        "name_city": "Lai Châu"
    },
    {
        "id_city": 8,
        "name_city": "Lào Cai"
    },
    {
        "id_city": 9,
        "name_city": "Tuyên Quang"
    },
    {
        "id_city": 10,
        "name_city": "Lạng Sơn"
    },
    {
        "id_city": 11,
        "name_city": "Bắc Kạn"
    },
    {
        "id_city": 12,
        "name_city": "Thái Nguyên"
    },
    {
        "id_city": 13,
        "name_city": "Yên Bái"
    },
    {
        "id_city": 14,
        "name_city": "Sơn La"
    }
]

export const dataAllDistrict = [
    {
        "id_city": 1,
        "id_district": 1,
        "name_district": "Ba Đình"
    },
    {
        "id_city": 1,
        "id_district": 2,
        "name_district": "Hoàn Kiếm"
    },
    {
        "id_city": 1,
        "id_district": 3,
        "name_district": "Đống Đa"
    },
    {
        "id_city": 1,
        "id_district": 4,
        "name_district": "Thanh Xuân"
    },
    {
        "id_city": 1,
        "id_district": 5,
        "name_district": "Cầu Giấy"
    },
    {
        "id_city": 1,
        "id_district": 6,
        "name_district": "Hoàng Mai"
    },
    {
        "id_city": 1,
        "id_district": 7,
        "name_district": "Hai Bà Trưng"
    },
    {
        "id_city": 1,
        "id_district": 8,
        "name_district": "Tây Hồ"
    },
    {
        "id_city": 1,
        "id_district": 9,
        "name_district": "Long Biên"
    },
    {
        "id_city": 1,
        "id_district": 10,
        "name_district": "Từ Liêm"
    },
    {
        "id_city": 1,
        "id_district": 11,
        "name_district": "Hà Đông"
    },
    {
        "id_city": 1,
        "id_district": 12,
        "name_district": "Thanh Trì"
    },
    {
        "id_city": 1,
        "id_district": 13,
        "name_district": "Gia Lâm"
    }
]

export const dataAllSubDistrict = [
    [
        {
            "name_sub_district": "Phúc Xá",
            "id_sub_district": 1,
            "id_district": 1
        },
        {
            "name_sub_district": "Trúc Bạch",
            "id_sub_district": 2,
            "id_district": 1
        },
        {
            "name_sub_district": "Vĩnh Phúc",
            "id_sub_district": 3,
            "id_district": 1
        },
        {
            "name_sub_district": "Cống Vị",
            "id_sub_district": 4,
            "id_district": 1
        },
        {
            "name_sub_district": "Liễu Giai",
            "id_sub_district": 5,
            "id_district": 1
        },
        {
            "name_sub_district": "Nguyễn Trung Trực",
            "id_sub_district": 6,
            "id_district": 1
        },
        {
            "name_sub_district": "Quán Thánh",
            "id_sub_district": 7,
            "id_district": 1
        },
        {
            "name_sub_district": "Điện Biên",
            "id_sub_district": 8,
            "id_district": 1
        },
        {
            "name_sub_district": "Đội Cấn",
            "id_sub_district": 9,
            "id_district": 1
        },
        {
            "name_sub_district": "Ngọc Khánh",
            "id_sub_district": 10,
            "id_district": 1
        },
        {
            "name_sub_district": "Giảng Võ",
            "id_sub_district": 11,
            "id_district": 1
        },
        {
            "name_sub_district": "Thành Công",
            "id_sub_district": 12,
            "id_district": 1
        },
    ],
    [
        {
            "id_district": 2,
            "id_sub_district": 13,
            "name_sub_district": "Phúc Tân"
        },
        {
            "id_district": 2,
            "id_sub_district": 14,
            "name_sub_district": "Đồng Xuân"
        },
        {
            "id_district": 2,
            "id_sub_district": 15,
            "name_sub_district": "Hàng Mã"
        },
        {
            "id_district": 2,
            "id_sub_district": 16,
            "name_sub_district": "Hàng Buồm"
        },
        {
            "id_district": 2,
            "id_sub_district": 17,
            "name_sub_district": "Hàng Đào"
        },
        {
            "id_district": 2,
            "id_sub_district": 18,
            "name_sub_district": "Cửa Đông"
        },
        {
            "id_district": 2,
            "id_sub_district": 19,
            "name_sub_district": "Lý Thái Tổ"
        },
        {
            "id_district": 2,
            "id_sub_district": 20,
            "name_sub_district": "Hàng Bạc"
        },
        {
            "id_district": 2,
            "id_sub_district": 21,
            "name_sub_district": "Hàng Gai"
        },
        {
            "id_district": 2,
            "id_sub_district": 22,
            "name_sub_district": "Chương Dương"
        },
        {
            "id_district": 2,
            "id_sub_district": 23,
            "name_sub_district": "Trần Hưng Đạo"
        }
    ],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
]

function AddVaccinationPlace(props) {

    const [openModalCreate, setModalCreate] = useState(false);
    const handleOpenCreate = () => setModalCreate(true);
    const handleCloseCreate = () => setModalCreate(false);

    // Dữ liệu khởi tạo
    const [dataNewVaccinationPlace, setDataNewVaccinationPlace] = useState({
        value: {
            namePlace: "",
            idSubDistrict: 1,
            idDistrict: 1,
            idCity: 1,
            numberTable: 5,
            address: "",
            curator: ""
        },
        error: {
            namePlace: false,
            numberTable: false,
            address: false,
            curator: false
        }
    })

    // Thiết lập hàm onClick thêm mới điểm tiêm
    const onClickAddNewVaccinationPlace = async () => {
        if (dataNewVaccinationPlace.error.namePlace ||
            dataNewVaccinationPlace.error.numberTable ||
            dataNewVaccinationPlace.error.address ||
            dataNewVaccinationPlace.error.curator
        ) {
            snackActions.error('Thêm mới điểm tiêm thất bại, Yêu cầu nhập đầy đủ thông tin')
        } else {
            if (validationInvalid(dataNewVaccinationPlace.value.namePlace) ||
                validationInvalid(dataNewVaccinationPlace.value.numberTable) ||
                validationInvalid(dataNewVaccinationPlace.value.address) ||
                validationInvalid(dataNewVaccinationPlace.value.curator)
            ) {
                setDataNewVaccinationPlace({
                    value: {...dataNewVaccinationPlace.value},
                    error: {
                        namePlace: validationInvalid(dataNewVaccinationPlace.value.namePlace),
                        numberTable: validationInvalid(dataNewVaccinationPlace.value.numberTable),
                        address: validationInvalid(dataNewVaccinationPlace.value.address),
                        curator: validationInvalid(dataNewVaccinationPlace.value.curator),
                    }
                })
                snackActions.error('Tạo mới thất bại, dữ liệu không hợp lệ')
            } else {
                const result = await props.addVaccinationPlace(dataNewVaccinationPlace.value)
                if (result) {
                    snackActions.success('Thêm mới điểm tiêm thành công 🎉')
                    setDataNewVaccinationPlace(state => ({
                        value: {
                            namePlace: "",
                            idSubDistrict: 1,
                            idDistrict: 1,
                            idCity: 1,
                            numberTable: 5,
                            address: "",
                            curator: ""
                        },
                        error: {
                            namePlace: false,
                            numberTable: false,
                            address: false,
                            curator: false
                        }
                    }))
                    handleCloseCreate()
                } else {
                    snackActions.error('Thêm mới điểm tiêm thất bại, hệ thống đang bảo trì hoặc sảy ra sự cố')
                }
            }
        }
    }

    const handleChangeValue = (event) => {
        let idFocus = event.target.id
        setDataNewVaccinationPlace({
            value: {...dataNewVaccinationPlace.value, [idFocus]: event.target.value},
            error: {...dataNewVaccinationPlace.error, [idFocus]: validationInvalid(event.target.value)}
        })
    }

    const handleChangeCity = (datePicker) => {
        setDataNewVaccinationPlace({
            value: {...dataNewVaccinationPlace.value, idCity: datePicker.target.value},
            error: {...dataNewVaccinationPlace.error}
        })
    }

    const handleChangeDistrict = (datePicker) => {
        setDataNewVaccinationPlace({
            value: {...dataNewVaccinationPlace.value, idDistrict: datePicker.target.value},
            error: {...dataNewVaccinationPlace.error}
        })
    }

    const handleChangeSubDistrict = (datePicker) => {
        setDataNewVaccinationPlace({
            value: {...dataNewVaccinationPlace.value, idSubDistrict: datePicker.target.value},
            error: {...dataNewVaccinationPlace.error}
        })
    }

    return (
        <>
            <Button
                variant="contained" color="primary"
                className={VCManagementCSS.customButton}
                onClick={handleOpenCreate}
            >
                <i className="fas fa-plus mr-2"/>Thêm mới
            </Button>
            <CustomButtonModal isOpen={openModalCreate} closeModal={handleCloseCreate}>
                <div className="d-flex text-right">
                    <button
                        className="cursor-pointer text-black opacity-50 px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                        type="button"
                    >
                        <i
                            onClick={handleCloseCreate}
                            className="m-0 p-0 far fa-times-circle text-2xl font-bold text-blueGray-600"
                        />
                    </button>
                </div>
                <div className="block uppercase text-blueGray-600 text-lg font-bold mb-3 text-center">
                    Thêm mới điểm tiêm
                </div>
                <div>
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
                            id="namePlace"
                            label="Tên"
                            onChange={handleChangeValue}
                        />
                        <span
                            className="text-red-500 text-sm">{dataNewVaccinationPlace.error.namePlace ? "Không được bỏ trống" : ""}</span>
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
                                           value={dataNewVaccinationPlace.value.idCity}
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
                                           value={dataNewVaccinationPlace.value.idDistrict}
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
                                           value={dataNewVaccinationPlace.value.idSubDistrict}
                                           onChange={handleChangeSubDistrict}
                                >
                                    {dataAllSubDistrict[dataNewVaccinationPlace.value.idDistrict.length === 0 ? 1 : dataNewVaccinationPlace.value.idDistrict - 1].map((item, index) => (
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
                                    defaultValue={dataNewVaccinationPlace.value.numberTable}
                                    type="number"
                                    label="Số bàn tiêm"
                                    onChange={handleChangeValue}
                                />
                                <span
                                    className="text-red-500 text-sm">{dataNewVaccinationPlace.error.numberTable ? "Không được bỏ trống" : ""}</span>
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
                                    id="address"
                                    label="Địa chỉ"
                                    onChange={handleChangeValue}
                                />
                                <span
                                    className="text-red-500 text-sm">{dataNewVaccinationPlace.error.address ? "Không được bỏ trống" : ""}</span>
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
                                />
                            </div>
                            <span
                                className="text-red-500 text-sm">{dataNewVaccinationPlace.error.curator ? "Không được bỏ trống" : ""}</span>
                        </div>
                    </div>

                    <div className={VCManagementCSS.wrapperButtonModal}>
                        <Button
                            variant="contained"
                            className={[VCManagementCSS.customButton, VCManagementCSS.buttonClose, "text-left"].join(
                                " "
                            )}
                            onClick={handleCloseCreate}

                        >
                            Hủy
                        </Button>
                        <Button
                            variant="contained"
                            className={[VCManagementCSS.customButton, "text-right"].join(
                                " "
                            )}
                            onClick={() => {
                                onClickAddNewVaccinationPlace()
                            }}
                        >
                            Thêm mới
                        </Button>
                    </div>
                </div>
            </CustomButtonModal>
        </>
    )
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
    addVaccinationPlace
};

export default connect(mapStateToProps, mapDispatchToProps)(AddVaccinationPlace);