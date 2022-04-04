import {useEffect, useState} from "react";
import {snackActions} from "../../../helper/showSnackBar";
import {validationInvalid} from "../../../helper/validate/validation";
import Button from "@mui/material/Button";
import VCManagementCSS from "../vaccine/VCMNCSS.module.scss";
import CustomButtonModal from "../../common/Modal/customButtonModal";
import CustomInput from "../../common/Input/CustomInput";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import {connect} from "react-redux";
import { styled } from '@mui/material/styles';
import {getAllVaccinationPlace} from "../../../redux/actions/vaccinationPlaceAction";
import RegisterStyle from "../registration_vaccination/RegisterStyle.module.scss";
import {registrationVaccinationOrganization} from "../../../redux/actions/registerOrganizationAction";
const Input = styled('input')({
    display: 'none',
});

function UploadExcelBtn(props) {

    const [openModalCreate, setModalCreate] = useState(false);
    const handleOpenCreate = () => setModalCreate(true);
    const handleCloseCreate = () => setModalCreate(false);

    const [createObjectURL, setCreateObjectURL] = useState(null);

    const [dataRegister, setDataRegister] = useState({
        file: null,
        numberInject: 1,
        idPlace: 1,
    })



    const handleChangeNumberInject = (event) => {
        setDataRegister({...dataRegister, numberInject: event.target.value})
    }
    const handleChangePlace = (event) => {
        setDataRegister({...dataRegister, idPlace: event.target.value})
    }

    const uploadToClient = (event) => {
        if (event.target.files && event.target.files[0]) {
            const i = event.target.files[0];
            setDataRegister({...dataRegister, file: i});
            setCreateObjectURL(i.name);
        }
    };

    const {dataVaccinationPlace} = props.vaccinationPlaceInfo;
    useEffect(() => {
        props.getAllVaccinationPlace();
    }, [])

    const registerVaccine = async () => {
        if(dataRegister.file == null){
            snackActions.error('Đăng ký thất bại, bạn chưa tải file lên');
        }else{
            console.log("vao day chua", dataRegister)
            await props.registrationVaccinationOrganization(dataRegister);
        }
    }

    return (
        <>
            <Button
                variant="contained" color="primary"
                className={VCManagementCSS.customButton}
                onClick={handleOpenCreate}
            >
                <i className="fas fa-upload mr-2"/>Tải lên file Excel
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
                    Tải lên danh sách tổ chức
                </div>
                <div className="text-center">
                    <label htmlFor="contained-button-file">
                        <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={uploadToClient}/>
                        <Button variant="outlined" component="span">
                            Tải lên file Excel
                        </Button>
                    </label>
                    <p className="mt-2">Tên file: {createObjectURL}</p>
                </div>
                <div className="flex flex-row">
                    <div className="mr-2 w-full">
                        <p className="mb-2">Chọn điểm tiêm (<span className={RegisterStyle.asterisk}>*</span>)</p>
                        <TextField
                            size="small"
                            className="min-w-full xl:w-full"
                            id="outlined-select-currency"
                            select
                            onChange={handleChangePlace}
                            value={dataRegister.idPlace}
                            label="Chọn điểm tiêm"
                        >
                            {dataVaccinationPlace.map((item, index) => (
                                <MenuItem key={index} value={item.id_vaccination_place}>
                                    {item.name_place}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <div className="ml-2 w-full">
                        <p className="mb-2">Đăng ký mũi tiêm thứ (<span className={RegisterStyle.asterisk}>*</span>)</p>
                        <TextField
                            size="small"
                            className="min-w-full xl:w-full"
                            id="outlined-select-currency"
                            type="number"
                            onChange={handleChangeNumberInject}
                            value={dataRegister.numberInject}
                            label="Đăng ký mũi tiêm"
                        >
                        </TextField>
                    </div>
                </div>
                <div>
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
                            onClick={registerVaccine}
                        >
                            Upload
                        </Button>
                    </div>
                </div>
            </CustomButtonModal>
        </>
    )
}

const mapStateToProps = (state) => ({
    vaccinationPlaceInfo: state.vaccinationPlaceReducer,
});

const mapDispatchToProps = {
    getAllVaccinationPlace,
    registrationVaccinationOrganization,
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadExcelBtn);