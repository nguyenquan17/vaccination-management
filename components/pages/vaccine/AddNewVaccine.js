import {useState} from "react";
import Button from "@mui/material/Button";
import VCManagementCSS from "./VCMNCSS.module.scss";
import {connect} from "react-redux";

import CustomInput from "../../common/Input/CustomInput";
import {snackActions} from '../../../helper/showSnackBar';
import {addVaccine} from "../../../redux/actions/vaccinesAction";
import {validationInvalid} from "../../../helper/validate/validation";
import CustomButtonModal from "../../common/Modal/customButtonModal";

function AddNewVaccine(props) {

    // Bật tắt modal thêm mới
    const [openModalCreate, setModalCreate] = useState(false);
    const handleOpenCreate = () => setModalCreate(true);
    const handleCloseCreate = () => setModalCreate(false);

    // Dữ liệu khởi tạo
    const [dataNewVaccine, setDataNewVaccine] = useState({
        value: {
            name: "",
            nameProduct: "",
            numberVaccine: 2,
            timeSpace: 30,
        },
        error: {
            name: false,
            nameProduct: false,
            numberVaccine: false,
            timeSpace: false,
        }
    })

    // Thiết lập hàm onClick thêm mới vacxin
    const onClickAddNewVaccine = async () => {
        if (dataNewVaccine.error.name ||
            dataNewVaccine.error.nameProduct ||
            dataNewVaccine.error.numberVaccine ||
            dataNewVaccine.error.timeSpace) {
            snackActions.error('Tạo mới thất bại, dữ liệu không hợp lệ')
        } else {
            if (dataNewVaccine.value.name.length === 0 ||
                dataNewVaccine.value.nameProduct.length === 0 ||
                dataNewVaccine.value.numberVaccine.length === 0 ||
                dataNewVaccine.value.timeSpace.length === 0) {
                setDataNewVaccine(state => ({
                    value: state.value,
                    error: {
                        name: validationInvalid(state.value.name),
                        nameProduct: validationInvalid(state.value.nameProduct),
                        numberVaccine: validationInvalid(state.value.numberVaccine),
                        timeSpace: validationInvalid(state.value.timeSpace),
                    }
                }))
                snackActions.error('Tạo mới thất bại, dữ liệu không hợp lệ')
            } else {
                const result = await props.addVaccine(dataNewVaccine.value)
                if (result) {
                    snackActions.success('Thêm mới vacxin thành công 🎉')
                    setDataNewVaccine(state => ({
                        value: {
                            name: "",
                            nameProduct: "",
                            numberVaccine: 2,
                            timeSpace: 30,
                        },
                        error: {
                            name: false,
                            nameProduct: false,
                            numberVaccine: false,
                            timeSpace: false,
                        }
                    }))
                    setModalCreate(false)
                } else {
                    snackActions.error('Tạo mới thất bại, hệ thống đang gặp vấn đề')
                }
            }
        }
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
                    Thêm mới vacxin
                </div>
                <div>
                    <div className={VCManagementCSS.wrapperInput}>
                        <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-3"
                            htmlFor="grid-password"
                        >
                            Hãng sản xuất
                        </label>
                        <CustomInput
                            className={VCManagementCSS.customInput}
                            required
                            id="outlined-required"
                            label="Hãng"
                            onChange={(event) => {
                                setDataNewVaccine(state => ({
                                    value: {...state.value, nameProduct: event.target.value},
                                    error: {...state.error, nameProduct: validationInvalid(event.target.value)}
                                }))
                            }}
                        />
                        <span
                            className="text-red-500 text-sm">{dataNewVaccine.error.nameProduct ? "Không được bỏ trống" : ""}</span>
                    </div>
                    <div className={VCManagementCSS.wrapperInput}>
                        <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-3"
                            htmlFor="grid-password"
                        >
                            Tên Vaccine
                        </label>
                        <CustomInput
                            className={VCManagementCSS.customInput}
                            required
                            id="outlined-required"
                            label="Vaccine"
                            onChange={(event) => {
                                setDataNewVaccine(state => ({
                                    value: {...state.value, name: event.target.value},
                                    error: {...state.error, name: validationInvalid(event.target.value)}
                                }))
                            }}
                        />
                        <span
                            className="text-red-500 text-sm">{dataNewVaccine.error.name ? "Không được bỏ trống" : ""}</span>
                    </div>
                    <div className={VCManagementCSS.wrapperDateTime}>
                        <div className={VCManagementCSS.wrapperInput}>
                            <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-3"
                                htmlFor="grid-password"
                            >
                                Liều tiêm (liều)
                            </label>
                            <CustomInput
                                defaultValue={dataNewVaccine.value.numberVaccine}
                                className={VCManagementCSS.customInput}
                                type="number"
                                required
                                id="outlined-required"
                                label="Liều"
                                onChange={(event) => {
                                    setDataNewVaccine(state => ({
                                        value: {...state.value, numberVaccine: event.target.value},
                                        error: {
                                            ...state.error,
                                            numberVaccine: validationInvalid(event.target.value)
                                        }
                                    }))
                                }}
                            />
                            <span
                                className="text-red-500 text-sm">{dataNewVaccine.error.numberVaccine ? "Không được bỏ trống" : ""}</span>
                        </div>
                        <div className={VCManagementCSS.wrapperInput}>
                            <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-3"
                                htmlFor="grid-password"
                            >
                                Khoảng cách 2 mũi (ngày)
                            </label>
                            <CustomInput
                                defaultValue={dataNewVaccine.value.timeSpace}
                                className={VCManagementCSS.customInput}
                                type="number"
                                required
                                id="outlined-required"
                                label="Ngày"
                                onChange={(event) => {
                                    setDataNewVaccine(state => ({
                                        value: {...state.value, timeSpace: event.target.value},
                                        error: {...state.error, timeSpace: validationInvalid(event.target.value)}
                                    }))
                                }}
                            />
                            <span
                                className="text-red-500 text-sm">{dataNewVaccine.error.timeSpace ? "Không được bỏ trống" : ""}</span>
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
                                onClickAddNewVaccine()
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
    addVaccine
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNewVaccine);