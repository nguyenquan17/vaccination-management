import {useState, useEffect} from "react";
import Button from "@mui/material/Button";
import VCManagementCSS from "./VCMNCSS.module.scss";
import {connect} from "react-redux";

import CustomInput from "../../common/Input/CustomInput";
import {snackActions} from '../../../helper/showSnackBar';
import {addAccount} from "../../../redux/actions/adminAction";
import {validationInvalid} from "../../../helper/validate/validation";
import CustomButtonModal from "../../common/Modal/customButtonModal";
import RegisterStyle from "../../pages/registration_vaccination/RegisterStyle.module.scss"
import {getAllVaccinationPlace} from "../../../redux/actions/vaccinationPlaceAction";
import MenuItem from '@mui/material/MenuItem';

function AddNewAccount(props) {

    // Bật tắt modal thêm mới
    const [openModalCreate, setModalCreate] = useState(false);
    const handleOpenCreate = () => setModalCreate(true);
    const handleCloseCreate = () => setModalCreate(false);
    const {dataVaccinationPlace} = props.vaccinationPlaceInfo;

    useEffect(() => {
        props.getAllVaccinationPlace();
    }, [])

    // Dữ liệu khởi tạo
    const [dataNewAccount, setDataNewAccount] = useState({
        value: {
            username: "",
            password: "",
            id_role: 5,
            id_place: 0,
        },
        error: {
            username: false,
            password: false,
            id_role: false,
            id_place: false,
        }
    })

    // Thiết lập hàm onClick thêm mới vacxin
    const onClickAddNewAccount = async () => {
        if (dataNewAccount.error.username ||
            dataNewAccount.error.password ||
            dataNewAccount.error.id_role ||
            dataNewAccount.error.id_place) {
            snackActions.error('Tạo mới thất bại, dữ liệu không hợp lệ')
        } else {
            if (dataNewAccount.value.username.length === 0 ||
                dataNewAccount.value.password.length === 0 ||
                dataNewAccount.value.id_role === 0 ||
                dataNewAccount.value.id_place === -1) {
                setDataNewAccount(state => ({
                    value: state.value,
                    error: {
                        username: validationInvalid(state.value.username),
                        password: validationInvalid(state.value.password),
                        id_role: validationInvalid(state.value.id_role),
                        id_place: validationInvalid(state.value.id_place),
                    }
                }))
                snackActions.error('Tạo mới thất bại, dữ liệu không hợp lệ')
            } else {
                const result = await props.addAccount(dataNewAccount.value)
                if (result) {
                    snackActions.success('Thêm mới account thành công 🎉')
                    setDataNewAccount(state => ({
                        value: {
                            username: "",
                            password: "",
                            id_role: 5,
                            id_place: 0,
                        },
                        error: {
                            username: false,
                            password: false,
                            id_role: false,
                            id_place: false,
                        }
                    }))
                    setModalCreate(false)
                } else {
                    snackActions.error('Tạo mới thất bại, hệ thống đang gặp vấn đề')
                }
            }
        }
    }

    const handleChangePlace = (event) => {
        setDataNewAccount(state => ({
            value: {...state.value, id_place: event.target.value},
            error: {...state.error}
        }))
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
                    Thêm mới tài khoản
                </div>
                <div>
                    <div className={VCManagementCSS.wrapperInput}>
                        <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-3"
                            htmlFor="grid-password"
                        >
                            Username
                        </label>
                        <CustomInput
                            className={VCManagementCSS.customInput}
                            required
                            id="outlined-required"
                            label="username"
                            onChange={(event) => {
                                setDataNewAccount(state => ({
                                    value: {...state.value, username: event.target.value},
                                    error: {...state.error, username: validationInvalid(event.target.value)}
                                }))
                            }}
                        />
                        <span
                            className="text-red-500 text-sm">{dataNewAccount.error.username ? "Không được bỏ trống" : ""}</span>
                    </div>
                    <div className={VCManagementCSS.wrapperInput}>
                        <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-3"
                            htmlFor="grid-password"
                        >
                            Password
                        </label>
                        <CustomInput
                            className={VCManagementCSS.customInput}
                            required
                            id="outlined-required"
                            label="password"
                            onChange={(event) => {
                                setDataNewAccount(state => ({
                                    value: {...state.value, password: event.target.value},
                                    error: {...state.error, password: validationInvalid(event.target.value)}
                                }))
                            }}
                        />
                        <span
                            className="text-red-500 text-sm">{dataNewAccount.error.password ? "Không được bỏ trống" : ""}</span>
                    </div>
                    <div className={VCManagementCSS.wrapperDateTime}>
                        <div className={VCManagementCSS.wrapperInput}>
                            <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-3"
                                htmlFor="grid-password"
                            >
                                Mã quyền
                            </label>
                            <CustomInput
                                defaultValue={dataNewAccount.value.id_role}
                                className={VCManagementCSS.customInput}
                                type="number"
                                required
                                id="outlined-required"
                                label="Mã"
                                onChange={(event) => {
                                    setDataNewAccount(state => ({
                                        value: {...state.value, id_role: event.target.value},
                                        error: {
                                            ...state.error,
                                            id_role: validationInvalid(event.target.value)
                                        }
                                    }))
                                }}
                            />
                            <span
                                className="text-red-500 text-sm">{dataNewAccount.error.id_role ? "Không được bỏ trống" : ""}</span>
                        </div>
                        <div>
                            {
                                dataNewAccount.value.id_role!=="3" ? "" : 
                                <div className={VCManagementCSS.wrapperInput}>
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-3"
                                        htmlFor="grid-password"
                                    >
                                        Điểm tiêm
                                    </label>
                                    <CustomInput
                                        className="min-w-full xl:w-full"
                                        required
                                        id="outlined-required"
                                        label="Tên điểm tiêm"
                                        select
                                        onChange={handleChangePlace}
                                        value={dataNewAccount.value.id_place}
                                    >
                                        {dataVaccinationPlace.map((item, index) => (
                                            <MenuItem key={index} value={item.id_vaccination_place}>
                                                {item.name_place}
                                            </MenuItem>
                                        ))}
                                    </CustomInput>
                                </div>
                            }
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
                                onClickAddNewAccount()
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

const mapStateToProps = (state) => ({
    vaccinationPlaceInfo: state.vaccinationPlaceReducer
});

const mapDispatchToProps = {
    getAllVaccinationPlace,
    addAccount
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNewAccount);