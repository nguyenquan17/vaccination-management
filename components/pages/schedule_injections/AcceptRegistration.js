import {useState, useEffect} from "react";
import Button from "@mui/material/Button";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker'
import TextField from '@mui/material/TextField';

import VCManagementCSS from "../vaccine/VCMNCSS.module.scss";
import CustomButtonModal from "../../common/Modal/customButtonModal";
import {getDataVaccines} from "../../../redux/actions/vaccinesAction";
import RegisterStyle from "../registration_vaccination/RegisterStyle.module.scss";
import MenuItem from "@mui/material/MenuItem";
import {acceptRegistrationVaccine} from "../../../redux/actions/scheduleInjectionsAction";
import {snackActions} from "../../../helper/showSnackBar";

function AcceptRegistration(props) {

    const {dataVaccines} = props.dataVaccines

    const [openModal, setModal] = useState(false);
    const handleOpen = () => setModal(true);
    const handleClose = () => setModal(false);
    const [dataSchedule, setDataSchedule] = useState({
        dateSchedule: new Date(),
        idVaccine: 1,
    });

    useEffect(() => {
        props.getDataVaccines()
    }, [])

    const onClickMakeSchedule = async () => {
        let result = await props.acceptRegistrationVaccine(
            {
                ...dataSchedule,
                listIDRegistration: props.listIDRegistration
            }
        )
        if(result){
            snackActions.success('Lên lịch tiêm thành công 🎉')
            setDataSchedule({
                dateSchedule: new Date(),
                idVaccine: 1,
            })
            handleClose()
        }else{
            snackActions.error('Lên lịch tiêm thất bại, máy chủ đang bảo trì')
        }
    }

    const showItem = () => {
        if (props.listIDRegistration.length === 0) {
            return (
                <>
                    <div className="block uppercase text-red-600 text-lg font-bold mb-3 text-center">
                        Phải chọn đơn đăng ký tiêm
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <div className="block uppercase text-lg font-bold mb-3 text-center">
                        Lên lịch tiêm
                    </div>
                    <div className="flex mr-4">
                        <div className="w-full">
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <p className="mb-2">Ngày tiêm (<span className={RegisterStyle.asterisk}>*</span>)</p>
                                <DesktopDatePicker
                                    value={dataSchedule.dateSchedule}
                                    minDate={new Date('2019-01-01')}
                                    onChange={(newValue) => {
                                        setDataSchedule(state => ({
                                            dateSchedule: newValue,
                                            idVaccine: state.idVaccine,
                                        }));
                                    }}
                                    renderInput={(params) => <TextField className="w-full" {...params} />}
                                />
                            </LocalizationProvider>
                        </div>
                        <div className="w-full ml-4">
                            <p className="mb-2">Chọn vaccine (<span className={RegisterStyle.asterisk}>*</span>)</p>
                            <TextField
                                className="min-w-full xl:w-full"
                                id="outlined-select-currency"
                                select
                                onChange={(event)=>{
                                    setDataSchedule(state => ({
                                        dateSchedule: state.dateSchedule,
                                        idVaccine: event.target.value,
                                    }));
                                }}
                                value={dataSchedule.idVaccine}
                            >
                                {dataVaccines.map((item, index) => (
                                    <MenuItem key={index} value={item.id}>
                                        {item.Name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>
                    </div>
                    <div className={VCManagementCSS.wrapperButtonModal}>
                        <Button
                            variant="contained"
                            className={[VCManagementCSS.customButton, VCManagementCSS.buttonClose, "text-left"].join(
                                " "
                            )}
                            onClick={handleClose}

                        >
                            Hủy
                        </Button>
                        <Button
                            variant="contained"
                            className={[VCManagementCSS.customButton, "text-right"].join(
                                " "
                            )}
                            onClick={onClickMakeSchedule}
                        >
                            Lên lịch tiêm
                        </Button>
                    </div>
                </>
            )
        }
    }

    return (
        <>
            <Button
                variant="contained" color="primary"
                className={VCManagementCSS.customButton}
                onClick={handleOpen}
            >
                <i className="fas fa-plus mr-2"/>Lên lịch tiêm
            </Button>
            <CustomButtonModal isOpen={openModal} closeModal={handleClose}>
                <div className="d-flex text-right">
                    <button
                        className="cursor-pointer text-black opacity-50 px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                        type="button"
                    >
                        <i
                            onClick={handleClose}
                            className="m-0 p-0 far fa-times-circle text-2xl font-bold text-blueGray-600"
                        />
                    </button>
                </div>
                {showItem()}
            </CustomButtonModal>
        </>
    )
}

const mapStateToProps = (state) => ({
    dataVaccines: state.vaccinesReducer
});

const mapDispatchToProps = {
    getDataVaccines,
    acceptRegistrationVaccine
};

AcceptRegistration.prototype = {
    listIDRegistration: PropTypes.array,
}

export default connect(mapStateToProps, mapDispatchToProps)(AcceptRegistration);
