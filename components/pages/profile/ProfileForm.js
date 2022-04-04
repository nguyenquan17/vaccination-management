import {useState} from "react";
import {snackActions} from "../../../helper/showSnackBar";
import {validationInvalid} from "../../../helper/validate/validation";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import {connect} from "react-redux";
import {dataAllCity, dataAllDistrict, dataAllSubDistrict} from "../vaccination_place/AddVaccinationPlace";
import {changeProfileAction} from "../../../redux/actions/profileAction";
import {useRouter} from "next/router";

export const dataGender = [
    {
        "id_gender": "female",
        "name": "Nữ"
    },
    {
        "id_gender": "male",
        "name": "Nam"
    },
    {
        "id_gender": "other",
        "name": "Khác"
    }
]

function ProfileForm(props) {
    const router = useRouter();

    const {userInfo} = props.userInfo;

    //dữ liệu khởi tạo
    const [dataProfile, setDataProfile] = useState({
        value: {
            phoneNumber: userInfo.phoneNumber,
            nameUser: userInfo.fullName,
            address: userInfo.address,
            identify: userInfo.identify,
            insurance: userInfo.insurance,
            gender: userInfo.gender.length === 0 ? "male" : userInfo.gender,
            dob: userInfo.dob || new Date().getTime() / 1000,
            idDistrict: userInfo.idDistrict.toString() === "0" ? 1 : userInfo.idDistrict,
            idCity: userInfo.idCity.toString() === "0" ? 1 : userInfo.idCity,
            idSubDistrict: userInfo.idSubDistrict.toString() === "0" ? 1 : userInfo.idSubDistrict,
        },
        error: {
            phoneNumber: false,
            nameUser: false,
            address: false,
            identify: false,
            insurance: false,
            gender: false,
        }
    })

    //register submit
    const onClickChangeProfile = async () => {
        if (dataProfile.error.phoneNumber ||
            dataProfile.error.nameUser ||
            dataProfile.error.address ||
            dataProfile.error.identify ||
            dataProfile.error.insurance ||
            dataProfile.error.gender
        ) {
            snackActions.error('Thay đổi thông tin thất bại, yêu cầu nhập đầy đủ thông tin')
        } else {
            if (validationInvalid(dataProfile.value.phoneNumber) ||
                validationInvalid(dataProfile.value.nameUser) ||
                validationInvalid(dataProfile.value.address) ||
                validationInvalid(dataProfile.value.identify) ||
                validationInvalid(dataProfile.value.insurance) ||
                validationInvalid(dataProfile.value.gender)
            ) {
                setDataProfile({
                    value: {...dataProfile.value},
                    error: {
                        phoneNumber: validationInvalid(dataProfile.value.phoneNumber),
                        nameUser: validationInvalid(dataProfile.value.nameUser),
                        address: validationInvalid(dataProfile.value.address),
                        identify: validationInvalid(dataProfile.value.identify),
                        insurance: validationInvalid(dataProfile.value.insurance),
                        gender: validationInvalid(dataProfile.value.gender),
                    }
                })
                snackActions.error('Thay đổi thông tin thất bại, yêu cầu nhập đầy đủ thông tin')
            } else {
                const result = await props.changeProfileAction(dataProfile.value)
                if (result) {
                    snackActions.success('Thay đổi thông tin cá nhân thành công 🎉')
                } else {
                    snackActions.error('Thay đổi thông tin cá nhân thất bại, hệ thống đang bảo trì hoặc sảy ra sự cố')
                }
            }
        }
    }

    const handleChangeValue = (event) => {
        let name = event.target.name
        setDataProfile({
            value: {...dataProfile.value, [name]: event.target.value},
            error: {...dataProfile.error, [name]: validationInvalid(event.target.value)}
        })
    }

    const handleChangeDOB = (event) => {
        let myDate = event.target.value.split('-')
        let newDate = new Date(myDate[0], myDate[1], myDate[2])
        setDataProfile({
            value: {...dataProfile.value, dob: newDate.getTime() / 1000},
            error: {...dataProfile.error}
        })
    }

    const handleChangeCity = (datePicker) => {
        setDataProfile({
            value: {...dataProfile.value, idCity: datePicker.target.value},
            error: {...dataProfile.error}
        })
    }

    const handleChangeDistrict = (datePicker) => {
        setDataProfile({
            value: {...dataProfile.value, idDistrict: datePicker.target.value},
            error: {...dataProfile.error}
        })
    }

    const handleChangeSubDistrict = (datePicker) => {
        setDataProfile({
            value: {...dataProfile.value, idSubDistrict: datePicker.target.value},
            error: {...dataProfile.error}
        })
    }

    return (
        <section className="sectionPage my-12">
            <div className="xl:container mx-auto px-4">
                <div className="row">
                    <div className="font-medium mb-2">Thông tin cá nhân</div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-4 md:gap-6">
                        <div className="col-span-4">
                            <p className="mb-2">Email</p>
                            <TextField
                                className="h-8 min-w-full xl:w-full mb-2 "
                                size="small" id="outlined-disabled"
                                color="warning" focused
                                variant="outlined"
                                disabled
                                defaultValue={userInfo.email}
                            />
                        </div>
                        <div>
                            <p className="mb-2">Họ và tên</p>
                            <TextField
                                className="min-w-full xl:w-full"
                                size="small"
                                name="nameUser"
                                variant="outlined"
                                placeholder="Họ và tên"
                                defaultValue={dataProfile.value.nameUser}
                                onChange={handleChangeValue}
                            />
                            <span className="text-red-500 text-sm">{dataProfile.error.nameUser ? "Không được bỏ trống" : ""}</span>
                        </div>
                        <div>
                            <p className="mb-2">Ngày Sinh</p>
                            <TextField
                                className="h-8 min-w-full xl:w-full mb-2 "
                                size="small"
                                name="dob"
                                label="Ngày Sinh"
                                type="date"
                                defaultValue={new Date(dataProfile.value.dob * 1000).toISOString().substring(0, 10)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={handleChangeDOB}
                            />
                        </div>
                        <div>
                            <p className="mb-2">Giới tính</p>
                            <TextField
                                name="gender"
                                size="small"
                                className="min-w-full xl:w-full"
                                select
                                required
                                placeholder="Giới tính"
                                defaultValue={dataProfile.value.gender}
                                onChange={handleChangeValue}
                            >
                                {dataGender.map((item, index) => (
                                    <MenuItem key={index} value={item.id_gender}>
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>
                        <div>
                            <p className="mb-2">Số điện thoại</p>
                            <TextField
                                className="min-w-full xl:w-full"
                                size="small"
                                name="phoneNumber"
                                variant="outlined"
                                placeholder="Số điện thoại"
                                defaultValue={dataProfile.value.phoneNumber}
                                onChange={handleChangeValue}
                            />
                            <span className="text-red-500 text-sm">{dataProfile.error.phoneNumber ? "Không được bỏ trống" : ""}</span>
                        </div>
                        <div className="col-span-2">
                            <p className="mb-2">Số CMND/CCCD/HC</p>
                            <TextField
                                className="min-w-full xl:w-full"
                                size="small"
                                name="identify"
                                variant="outlined"
                                placeholder="Số CMND/CCCD/HC"
                                defaultValue={dataProfile.value.identify}
                                onChange={handleChangeValue}
                            />
                            <span className="text-red-500 text-sm">{dataProfile.error.identify ? "Không được bỏ trống" : ""}</span>
                        </div>
                        <div className="col-span-2">
                            <p className="mb-2">Số thẻ BHYT</p>
                            <TextField
                                className=" min-w-full xl:w-full"
                                size="small"
                                name="insurance"
                                variant="outlined"
                                placeholder="Số thẻ BHYT"
                                defaultValue={dataProfile.value.insurance}
                                onChange={handleChangeValue}
                            />
                            <span className="text-red-500 text-sm">{dataProfile.error.insurance ? "Không được bỏ trống" : ""}</span>
                        </div>
                        <div className="col-span-4">
                            <p className="mb-2">Địa chỉ hiện tại</p>
                            <TextField
                                className=" min-w-full xl:w-full"
                                size="small"
                                name="address"
                                variant="outlined"
                                placeholder="Địa chỉ hiện tại"
                                defaultValue={dataProfile.value.address}
                                onChange={handleChangeValue}
                            />
                            <span className="text-red-500 text-sm">{dataProfile.error.address ? "Không được bỏ trống" : ""}</span>
                        </div>
                        <div className="">
                            <p className="mb-2">Tỉnh/Thành Phố</p>
                            <TextField className="w-60 min-w-full w-full"
                                       id="idCity"
                                       select
                                       required
                                       size="small"
                                       value={dataProfile.value.idCity}
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
                            <p className="mb-2">Quận/Huyện</p>
                            <TextField className="w-60 min-w-full w-full"
                                       id="idDistrict"
                                       select
                                       required
                                       size="small"
                                       value={dataProfile.value.idDistrict}
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
                            <p className="mb-2">Xã/ Phường</p>
                            <TextField className="w-60 min-w-full w-full"
                                       id="outlined-select-currency"
                                       select
                                       required
                                       size="small"
                                       value={dataProfile.value.idSubDistrict}
                                       onChange={handleChangeSubDistrict}
                            >
                                {dataAllSubDistrict[dataProfile.value.idDistrict.length === 0 ? 1 : dataProfile.value.idDistrict - 1].map((item, index) => (
                                    <MenuItem key={index} value={item.id_sub_district}>
                                        {item.name_sub_district}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row justify-between">
                    <div className="mt-12 flex justify-between">
                        <Button className="mx-10" variant="contained" onClick={onClickChangeProfile}>Xác nhận</Button>
                    </div>
                    <div className="mt-12 flex justify-between">
                        <Button className="mx-10" variant="contained" color="warning" onClick={()=>{router.push("/change_password")}}>Đổi mật khẩu</Button>
                    </div>
                </div>
            </div>
        </section>

    );
}

const mapStateToProps = (state) => ({
    userInfo: state.authReducer,
});

const mapDispatchToProps = {
    changeProfileAction
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm);