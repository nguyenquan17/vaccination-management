import {useEffect, useState} from "react";
import {useRouter} from 'next/router';
import {connect} from "react-redux";

import RegisterStyle from "./RegisterStyle.module.scss"
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import {getAllVaccinationPlace} from "../../../redux/actions/vaccinationPlaceAction";
import {validationInvalid} from "../../../helper/validate/validation";
import {snackActions} from "../../../helper/showSnackBar";
import {registrationVaccinationAction} from "../../../redux/actions/registrationVaccinationAction";

export const dataPriorities = [
    {
        "id_priority": 1,
        "name_priority": "Người làm việc trong cơ sở y tế"
    },
    {
        "id_priority": 2,
        "name_priority": "Người tham gia phòng chống dịch"
    },
    {
        "id_priority": 3,
        "name_priority": "Lực lượng quân đội"
    },
    {
        "id_priority": 4,
        "name_priority": "Lực lượng công an"
    },
    {
        "id_priority": 5,
        "name_priority": "Nhân viên cán bộ ngoại giao Việt Nam"
    },
    {
        "id_priority": 6,
        "name_priority": "Cán bộ hải quan làm công tác xuất nhập cảnh"
    },
    {
        "id_priority": 7,
        "name_priority": "Người cung cấp dịch vụ thiết yếu: hàng không, vận tải, ytees"
    },
    {
        "id_priority": 8,
        "name_priority": "Giáo viên, học sinh, sinh viên"
    },
    {
        "id_priority": 9,
        "name_priority": "Người mắc bệnh mãn tính, trên 65 tuổi"
    },
    {
        "id_priority": 10,
        "name_priority": "Người sống tại vùng có dịch"
    },
    {
        "id_priority": 11,
        "name_priority": "Người nghèo các đối tượng chính sách xã hội"
    },
    {
        "id_priority": 12,
        "name_priority": "Các đối tượng lao động tại các cơ sở doanh nghiệp"
    },
    {
        "id_priority": 13,
        "name_priority": "Các chức sắc chức việc tôn giáp"
    },
    {
        "id_priority": 14,
        "name_priority": "Người lao động tự do"
    },
    {
        "id_priority": 15,
        "name_priority": "Các đối tượng theo quyết định của bộ y tế"
    }
]

export const dataHealth = [
    {
        "is_sick": false,
        "name_health": "Bình thường"
    },
    {
        "is_sick": true,
        "name_health": "Ốm"
    }
]

function RegistrationVaccinationForm(props) {

    // dữ liệu người dùng và dữ liệu điểm tiêm
    const {userInfo} = props.userInfo;
    const {dataVaccinationPlace} = props.vaccinationPlaceInfo;

    // quay trở lại trang chủ
    const router = useRouter();
    const navigateHome = () => router.push("/");

    // Call api
    useEffect(() => {
        props.getAllVaccinationPlace();
    }, [])

    //dữ liệu khởi tạo
    const [dataRegisterPerson, setDataRegisterPerson] = useState({
        value: {
            idPriority: 15,
            sick: false,
            note: "",
            numberInject: 1,
            idPlace: 1,
            isAccept: false,
        },
        error: {
            note: false,
        }
    })

    //register submit
    const onClickRegisterPerson = async () => {
        if (dataRegisterPerson.error.note) {
            snackActions.error('Đăng ký thất bại, vui lòng kiểm tra lại');
        } else {
            const result = await props.registrationVaccinationAction(dataRegisterPerson.value)
            if (result) {
                snackActions.success('Đăng ký tiêm thành công 🎉')
                await router.push('/profile')
            } else {
                snackActions.error('Đăng ký thất bại, Yêu cầu chọn đúng mũi tiêm tiếp theo!')
            }
        }
    }

    const handleChangePriority = (event) => {
        setDataRegisterPerson(state => ({
            value: {...state.value, idPriority: event.target.value},
            error: {...state.error}
        }))
    }
    const handleChangeHealth = (event) => {
        setDataRegisterPerson(state => ({
            value: {...state.value, sick: event.target.value},
            error: {note: event.target.value ? true: false},
        }))
    }
    const handleChangeNote = (event) => {
        setDataRegisterPerson(state => ({
            value: {...state.value, note: event.target.value},
            error: {...state.error, note: validationInvalid(event.target.value)}
        }))
    }
    const handleChangeNumberInject = (event) => {
        setDataRegisterPerson(state => ({
            value: {...state.value, numberInject: event.target.value},
            error: {...state.error}
        }))
    }
    const handleChangePlace = (event) => {
        setDataRegisterPerson(state => ({
            value: {...state.value, idPlace: event.target.value},
            error: {...state.error}
        }))
    }
    const handleAcceptRegister = (event) => {
        setDataRegisterPerson(state => ({
            value: {...state.value, isAccept: event.target.checked},
            error: {...state.error}
        }))
    }


    return (
        <section className="sectionPage my-12">
            <div className="xl:container mx-auto px-4">
                <div className="row">
                    <div className="font-medium mb-2">1. Thông tin người đăng ký tiêm</div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-4 md:gap-6">
                        <div>
                            <p className="mb-2">Họ và tên</p>
                            <TextField
                                className="h-8 min-w-full xl:w-full mb-2 "
                                size="small" id="outlined-disabled"
                                color="warning" focused
                                variant="outlined"
                                disabled
                                defaultValue={userInfo.fullName}
                            />
                        </div>
                        <div>
                            <p className="mb-2">Ngày Sinh</p>
                            <TextField
                                className="h-8 min-w-full xl:w-full mb-2 "
                                size="small"
                                id="date"
                                label="Ngày Sinh"
                                type="date"
                                disabled
                                defaultValue={new Date(userInfo.dob * 1000).toISOString().substring(0, 10)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </div>
                        <div>
                            <p className="mb-2">Giới tính</p>
                            <TextField
                                size="small"
                                className="min-w-full xl:w-full"
                                id="outlined-select-currency"
                                placeholder="Giới tính"
                                disabled
                                defaultValue={userInfo.gender === "male" ? "Nam" : "Nữ"}
                            >
                            </TextField>
                        </div>
                        <div>
                            <p className="mb-2">Số điện thoại</p>
                            <TextField
                                className=" min-w-full xl:w-full"
                                size="small" id="outlined-basic"
                                variant="outlined"
                                placeholder="Số điện thoại"
                                disabled
                                defaultValue={userInfo.phoneNumber}
                            />
                        </div>
                        <div>
                            <p className="mb-2">Số CMND/CCCD/HC</p>
                            <TextField
                                className="min-w-full xl:w-full"
                                size="small" id="outlined-basic"
                                variant="outlined"
                                placeholder="Số CMND/CCCD/HC"
                                disabled
                                defaultValue={userInfo.identify}
                            />
                        </div>
                        <div>
                            <p className="mb-2">Số thẻ BHYT</p>
                            <TextField
                                className=" min-w-full xl:w-full"
                                size="small" id="outlined-basic"
                                variant="outlined"
                                placeholder="Số thẻ BHYT"
                                disabled
                                defaultValue={userInfo.insurance}
                            />

                        </div>
                        <div className="col-span-2">
                            <p className="mb-2">Địa chỉ hiện tại</p>
                            <TextField
                                className=" min-w-full xl:w-full"
                                size="small" id="outlined-basic"
                                variant="outlined"
                                placeholder="Địa chỉ hiện tại"
                                disabled
                                defaultValue={userInfo.address}
                            />
                        </div>
                        <div className="col-span-2">
                            <p className="mb-2">Nhóm ưu tiên (<span className={RegisterStyle.asterisk}>*</span>)</p>
                            <TextField
                                size="small"
                                className="min-w-full xl:w-full"
                                id="outlined-select-currency"
                                select
                                onChange={handleChangePriority}
                                value={dataRegisterPerson.value.idPriority}
                                label="Nhóm ưu tiên"
                            >
                                {dataPriorities.map((item, index) => (
                                    <MenuItem key={index} value={item.id_priority}>
                                        {item.name_priority}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>
                        <div className="col-span-2">
                            <p className="mb-2">Tình trạng sức khỏe (<span className={RegisterStyle.asterisk}>*</span>)
                            </p>
                            <TextField
                                size="small"
                                className="min-w-full xl:w-full"
                                id="outlined-select-currency"
                                select
                                onChange={handleChangeHealth}
                                value={dataRegisterPerson.value.sick}
                                label="Tình trạng sức khỏe"
                            >
                                {dataHealth.map((item, index) => (
                                    <MenuItem key={index} value={item.is_sick}>
                                        {item.name_health}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>
                        <div className="col-span-4">
                            <p className="mb-2">Ghi chú (<span className={RegisterStyle.asterisk}>*</span>)</p>
                            <TextField
                                className=" min-w-full xl:w-full"
                                disabled={!dataRegisterPerson.value.sick}
                                size="small" id="outlined-basic"
                                variant="outlined"
                                placeholder="Ghi chú"
                                onChange={handleChangeNote}/>
                            <span className="text-red-500 text-sm">{dataRegisterPerson.error.note ? "Không được bỏ trống" : ""}</span>
                        </div>
                    </div>
                </div>
                <div className="font-medium mt-2">2. Thông tin đăng ký tiêm chủng</div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-4 md:gap-6">
                    <div>
                        <p className="mb-2">Đăng ký mũi tiêm thứ (<span className={RegisterStyle.asterisk}>* chọn đúng mũi tiêm</span>)</p>
                        <TextField
                            size="small"
                            className="min-w-full xl:w-full"
                            id="outlined-select-currency"
                            type="number"
                            onChange={handleChangeNumberInject}
                            value={dataRegisterPerson.value.numberInject}
                            label="Đăng ký mũi tiêm"
                        >
                        </TextField>
                    </div>
                    <div>
                        <p className="mb-2">Chọn điểm tiêm (<span className={RegisterStyle.asterisk}>*</span>)</p>
                        <TextField
                            size="small"
                            className="min-w-full xl:w-full"
                            id="outlined-select-currency"
                            select
                            onChange={handleChangePlace}
                            value={dataRegisterPerson.value.idPlace}
                            label="Chọn điểm tiêm"
                        >
                            {dataVaccinationPlace.map((item, index) => (
                                <MenuItem key={index} value={item.id_vaccination_place}>
                                    {item.name_place}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                </div>
                <div className="mt-2">
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox onClick={handleAcceptRegister} checked={dataRegisterPerson.value.isAccept}/>}
                            label="Tôi đồng ý chịu trách nhiệm với các thông tin đã cung cấp"
                        />
                    </FormGroup>
                </div>
                <div className="mt-2 flex justify-between">
                    <Button className="mx-10" variant="outlined" onClick={navigateHome}>Hủy bỏ</Button>
                    <Button className="mx-10" variant="contained" disabled={!dataRegisterPerson.value.isAccept} onClick={() => {
                        onClickRegisterPerson()
                    }}>Xác nhận</Button>
                </div>
            </div>
        </section>

    );
}

const mapStateToProps = (state) => ({
    userInfo: state.authReducer,
    vaccinationPlaceInfo: state.vaccinationPlaceReducer,
});

const mapDispatchToProps = {
    getAllVaccinationPlace,
    registrationVaccinationAction
};
export default connect(mapStateToProps, mapDispatchToProps)(RegistrationVaccinationForm);