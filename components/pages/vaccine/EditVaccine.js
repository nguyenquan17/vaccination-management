import {useState} from "react";
import Button from "@mui/material/Button";
import VCManagementCSS from "./VCMNCSS.module.scss";
import {connect} from "react-redux";

import CustomInput from "../../common/Input/CustomInput";
import {snackActions} from '../../../helper/showSnackBar';
import {editVaccine} from "../../../redux/actions/vaccinesAction";
import {validationInvalid} from "../../../helper/validate/validation";
import CustomButtonModal from "../../common/Modal/customButtonModal";
import {number, string} from "prop-types";
import SCSS from "./VCMNCSS.module.scss";

function EditVaccine(props) {

    // Bật tắt modal thêm mới
    const [openModal, setModal] = useState(false);
    const handleOpenCreate = () => setModal(true);
    const handleCloseCreate = () => setModal(false);

    // Dữ liệu khởi tạo
    const [dataChangeVaccine, setDataChangeVaccine] = useState({
        value: {
            name: props.name,
            nameProduct: props.nameProduct,
            numberVaccine: props.numberVaccine,
            timeSpace: props.timeSpace,
        },
        error: {
            name: false,
            nameProduct: false,
            numberVaccine: false,
            timeSpace: false,
        }
    })

    // Thiết lập hàm onClick thêm mới vacxin
    const onClickChangeVaccine = async () => {
        if (dataChangeVaccine.error.name ||
            dataChangeVaccine.error.nameProduct ||
            dataChangeVaccine.error.numberVaccine ||
            dataChangeVaccine.error.timeSpace) {
            snackActions.error('Tạo mới thất bại, dữ liệu không hợp lệ')
        } else {
            if (dataChangeVaccine.value.name.length === 0 ||
                dataChangeVaccine.value.nameProduct.length === 0 ||
                dataChangeVaccine.value.numberVaccine.length === 0 ||
                dataChangeVaccine.value.timeSpace.length === 0) {
                setDataChangeVaccine(state => ({
                    value: state.value,
                    error: {
                        name: validationInvalid(state.value.name),
                        nameProduct: validationInvalid(state.value.nameProduct),
                        numberVaccine: validationInvalid(state.value.numberVaccine),
                        timeSpace: validationInvalid(state.value.timeSpace),
                    }
                }))
                snackActions.error('Sửa thất bại, dữ liệu không hợp lệ')
            } else {
                const result = await props.editVaccine({...dataChangeVaccine.value, id: props.id})
                if (result) {
                    snackActions.success('Sửa thông tin vacxin thành công 🎉')
                    setModal(false)
                } else {
                    snackActions.error('Sửa thất bại, hệ thống đang gặp vấn đề')
                }
            }
        }
    }

    return (
        <>
            <Button
                variant="contained"
                className={SCSS.buttonEdit}
                onClick={handleOpenCreate}
            >
                <i className="fas fa-edit"/>
            </Button>
            <CustomButtonModal isOpen={openModal} closeModal={handleCloseCreate}>
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
                    <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-3"
                        htmlFor="grid-password"
                    >
                        ID: <span className="text-xl">{props.id}</span>
                    </label>
                    <div className={VCManagementCSS.wrapperInput}>
                        <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-3"
                            htmlFor="grid-password"
                        >
                            Hãng sản xuất
                        </label>
                        <CustomInput
                            defaultValue={dataChangeVaccine.value.nameProduct}
                            className={VCManagementCSS.customInput}
                            required
                            id="outlined-required"
                            label="Hãng"
                            onChange={(event) => {
                                setDataChangeVaccine(state => ({
                                    value: {...state.value, nameProduct: event.target.value},
                                    error: {...state.error, nameProduct: validationInvalid(event.target.value)}
                                }))
                            }}
                        />
                        <span
                            className="text-red-500 text-sm">{dataChangeVaccine.error.nameProduct ? "Không được bỏ trống" : ""}</span>
                    </div>
                    <div className={VCManagementCSS.wrapperInput}>
                        <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-3"
                            htmlFor="grid-password"
                        >
                            Tên Vaccine
                        </label>
                        <CustomInput
                            defaultValue={dataChangeVaccine.value.name}
                            className={VCManagementCSS.customInput}
                            required
                            id="outlined-required"
                            label="Vaccine"
                            onChange={(event) => {
                                setDataChangeVaccine(state => ({
                                    value: {...state.value, name: event.target.value},
                                    error: {...state.error, name: validationInvalid(event.target.value)}
                                }))
                            }}
                        />
                        <span
                            className="text-red-500 text-sm">{dataChangeVaccine.error.name ? "Không được bỏ trống" : ""}</span>
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
                                defaultValue={dataChangeVaccine.value.numberVaccine}
                                className={VCManagementCSS.customInput}
                                type="number"
                                required
                                id="outlined-required"
                                label="Liều"
                                onChange={(event) => {
                                    setDataChangeVaccine(state => ({
                                        value: {...state.value, numberVaccine: event.target.value},
                                        error: {
                                            ...state.error,
                                            numberVaccine: validationInvalid(event.target.value)
                                        }
                                    }))
                                }}
                            />
                            <span
                                className="text-red-500 text-sm">{dataChangeVaccine.error.numberVaccine ? "Không được bỏ trống" : ""}</span>
                        </div>
                        <div className={VCManagementCSS.wrapperInput}>
                            <label
                                className="block uppercase text-blueGray-600 text-xs font-bold mb-3"
                                htmlFor="grid-password"
                            >
                                Khoảng cách 2 mũi (ngày)
                            </label>
                            <CustomInput
                                defaultValue={dataChangeVaccine.value.timeSpace}
                                className={VCManagementCSS.customInput}
                                type="number"
                                required
                                id="outlined-required"
                                label="Ngày"
                                onChange={(event) => {
                                    setDataChangeVaccine(state => ({
                                        value: {...state.value, timeSpace: event.target.value},
                                        error: {...state.error, timeSpace: validationInvalid(event.target.value)}
                                    }))
                                }}
                            />
                            <span
                                className="text-red-500 text-sm">{dataChangeVaccine.error.timeSpace ? "Không được bỏ trống" : ""}</span>
                        </div>
                    </div>
                    <div className={VCManagementCSS.wrapperButtonModal}>
                        <Button
                            variant="contained"
                            className={[VCManagementCSS.customButton, VCManagementCSS.buttonClose].join(
                                " "
                            )}
                            onClick={handleCloseCreate}
                        >
                            Hủy
                        </Button>
                        <Button
                            variant="contained"
                            className={SCSS.buttonEdit}
                            onClick={() => {
                                onClickChangeVaccine()
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
    editVaccine
};

EditVaccine.prototype={
    id: number,
    name: string,
    nameProduct: string,
    numberVaccine: number,
    timeSpace: number,
}

export default connect(mapStateToProps, mapDispatchToProps)(EditVaccine);