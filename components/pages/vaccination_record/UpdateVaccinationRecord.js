import {useState} from "react";
import Button from "@mui/material/Button";
import {connect} from "react-redux";
import CustomButtonModal from "../../common/Modal/customButtonModal";
import {number, string} from "prop-types";
import SCSS from "../vaccine/VCMNCSS.module.scss";
import TextField from "@mui/material/TextField";
import moment from "moment";
import VCManagementCSS from "../vaccine/VCMNCSS.module.scss";
import {updateVaccinationRecord} from "../../../redux/actions/vaccinationRecordAction";
import {snackActions} from "../../../helper/showSnackBar";


function UpdateVaccinationRecord(props) {

    // Bật tắt modal thêm mới
    const [openModal, setModal] = useState(false);
    const handleOpenCreate = () => setModal(true);
    const handleCloseCreate = () => setModal(false);

    // Dữ liệu khởi tạo
    const [dataRecord, setDataRecord] = useState({
        bloodPressure: props.bloodPressure,
        levelResponse: props.levelResponse,
        heartRate: props.heartRate,
        note: props.note,
    })

    const handleChangeValue = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        setDataRecord({...dataRecord, [name]: value});
    }

    const onClickUpdateRecord = async () => {
        const result = await props.updateVaccinationRecord({...dataRecord, idRecord: props.idVaccinationRecordsDetail})
        if (result) {
            snackActions.success('Cập nhật hồ sơ thành công 🎉')
            setModal(false)
        } else {
            snackActions.error('Cập nhật thất bại thất bại, hệ thống đang gặp vấn đề')
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
                    Cập nhật hồ sơ
                </div>
                <div>
                    <label
                        className="block uppercase text-blueGray-600 text-xs font-bold"
                        htmlFor="grid-password"
                    >
                        ID User: <span className="text-xl">{props.idUser}</span>
                    </label>
                    <div className="flex my-4">
                        <div className="mr-4 w-full" >
                            <p>Họ và tên</p>
                            <TextField
                                className="h-8 min-w-full xl:w-full mb-2 "
                                size="small" id="outlined-disabled"
                                color="warning" focused
                                variant="outlined"
                                disabled
                                defaultValue={props.fullNameUser}
                            />
                        </div>
                        <div className="ml-4 w-full" >
                            <p>Email</p>
                            <TextField
                                className="h-8 min-w-full xl:w-full mb-2 "
                                size="small" id="outlined-disabled"
                                color="warning" focused
                                variant="outlined"
                                disabled
                                defaultValue={props.email}
                            />
                        </div>
                    </div>
                    <div className="flex my-4">
                        <div className="mr-4 w-full" >
                            <p>CMND</p>
                            <TextField
                                className="h-8 min-w-full xl:w-full mb-2 "
                                size="small" id="outlined-disabled"
                                color="warning" focused
                                variant="outlined"
                                disabled
                                defaultValue={props.indentify}
                            />
                        </div>
                        <div className="ml-4 w-full" >
                            <p>Vaccine đã tiêm</p>
                            <TextField
                                className="h-8 min-w-full xl:w-full mb-2 "
                                size="small" id="outlined-disabled"
                                color="warning" focused
                                variant="outlined"
                                disabled
                                defaultValue={props.nameVaccine}
                            />
                        </div>
                    </div>
                    <div className="flex my-4">
                        <div className="mr-4 w-full" >
                            <p>Mũi tiêm</p>
                            <TextField
                                className="h-8 min-w-full xl:w-full mb-2 "
                                size="small" id="outlined-disabled"
                                color="warning" focused
                                variant="outlined"
                                disabled
                                defaultValue={props.numberOfTimes}
                            />
                        </div>
                        <div className="ml-4 w-full" >
                            <p>Ngày tiêm</p>
                            <TextField
                                className="h-8 min-w-full xl:w-full mb-2 "
                                size="small" id="outlined-disabled"
                                color="warning" focused
                                variant="outlined"
                                disabled
                                defaultValue={moment.unix(props.date).format("[Ngày] DD [tháng] MM [năm] YYYY")}
                            />
                        </div>
                    </div>
                    <div className="my-4">
                        <p className="my-2">Huyết áp</p>
                        <TextField
                            name="bloodPressure"
                            className="h-8 min-w-full xl:w-full mb-2 "
                            size="small" id="outlined-disabled"
                            type="number"
                            variant="outlined"
                            defaultValue={props.bloodPressure}
                            onChange={handleChangeValue}
                        />
                    </div>
                    <div className="my-4">
                        <p className="my-2">Mức độ phản hồi</p>
                        <TextField
                            name="levelResponse"
                            className="h-8 min-w-full xl:w-full mb-2 "
                            size="small" id="outlined-disabled"
                            type="number"
                            variant="outlined"
                            defaultValue={props.levelResponse}
                            onChange={handleChangeValue}
                        />
                    </div>
                    <div className="my-4">
                        <p className="my-2">Nhịp tim</p>
                        <TextField
                            name="heartRate"
                            className="h-8 min-w-full xl:w-full mb-2 "
                            size="small" id="outlined-disabled"
                            type="number"
                            variant="outlined"
                            defaultValue={props.heartRate}
                            onChange={handleChangeValue}
                        />
                    </div>
                    <div className="my-4">
                        <p className="my-2">Ghi chú</p>
                        <TextField
                            name="note"
                            className="h-8 min-w-full xl:w-full mb-2 "
                            size="small" id="outlined-disabled"
                            variant="outlined"
                            defaultValue={props.note}
                            onChange={handleChangeValue}
                        />
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
                            onClick={onClickUpdateRecord}
                        >
                            Cập nhật
                        </Button>
                    </div>
                </div>
            </CustomButtonModal>
        </>
    )
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
    updateVaccinationRecord
};

UpdateVaccinationRecord.prototype={
    idUser: number,
    fullNameUser: string,
    email: string,
    indentify: string,
    idVaccine: number,
    nameVaccine: string,
    date: number,
    numberOfTimes: number,
    idVaccinationRecordsDetail: number,
    bloodPressure: number,
    levelResponse: number,
    heartRate: number,
    note: string,
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateVaccinationRecord);