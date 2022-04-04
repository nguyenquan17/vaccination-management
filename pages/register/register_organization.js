import {useState} from "react";
import {useRouter} from 'next/router'
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PasswordIcon from '@mui/icons-material/Password';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import {connect} from "react-redux";
import Link from 'next/link'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import Auth from "../../layouts/Auth";
import CustomInput from "../../components/common/Input/CustomInput";
import {validationInvalid, validationEmail} from "../../helper/validate/validation";
import CSS from '../../components/pages/login/CSSLogin.module.scss'
import {registerOrganization} from "../../redux/actions/authAction";
import {snackActions} from "../../helper/showSnackBar";
import CustomSelectBox from "../../components/common/SelectBox/CustomSelectBox";

const categoryOrganization = [
    {
        "id_catgory_organization": 1,
        "name_category_organization": "Doanh nghiệp"
    },
    {
        "id_catgory_organization": 2,
        "name_category_organization": "Thành ủy"
    },
    {
        "id_catgory_organization": 3,
        "name_category_organization": "Khu công nghiệp"
    },
    {
        "id_catgory_organization": 4,
        "name_category_organization": "Các sở ban ngành"
    },
    {
        "id_catgory_organization": 5,
        "name_category_organization": "Mặt trận tổ quốc"
    },
    {
        "id_catgory_organization": 6,
        "name_category_organization": "Tổ covid cộng đồng"
    },
    {
        "id_catgory_organization": 7,
        "name_category_organization": "Đoàn thể"
    },
    {
        "id_catgory_organization": 8,
        "name_category_organization": "Các cơ sở y tế"
    },
    {
        "id_catgory_organization": 9,
        "name_category_organization": "Tổ chức thuộc doanh nghiệp"
    },
    {
        "id_catgory_organization": 10,
        "name_category_organization": "Khác"
    }
];

function RegisterOrganization(props) {
    const router = useRouter()
    const [dataOrganization, setDataOrganization] = useState({
        value: {
            idCategoryOrganization: 1,
            nameOrganization: "",
            taxNumber: "",
            address: "",
            representativeName: "",
            regency: "",
            dob: Date.now(),
            phoneNumber: "",
            email: "",
            password: "",
        },
        error: {
            nameOrganization: false,
            taxNumber: false,
            phoneNumber: false,
            email: false,
            password: false,
        }
    })
    const [isShowPassword, setIsShowPassword] = useState(false)

    const onClickRegisterOrganization = async () => {
        if (dataOrganization.error.nameOrganization
            || dataOrganization.error.taxNumber
            || dataOrganization.error.phoneNumber
            || dataOrganization.error.email
            || dataOrganization.error.password
        ) {
            snackActions.error('Đăng nhập thất bại, Yêu cầu nhập đủ thông tin tài khoản')
        } else {
            if (validationInvalid(dataOrganization.value.nameOrganization)
                || validationInvalid(dataOrganization.value.taxNumber)
                || validationInvalid(dataOrganization.value.phoneNumber)
                || validationEmail(dataOrganization.value.email)
                || validationInvalid(dataOrganization.value.password)
            ) {
                setDataOrganization(state => ({
                    value: state.value,
                    error: {
                        nameOrganization: validationInvalid(dataOrganization.value.nameOrganization),
                        taxNumber: validationInvalid(dataOrganization.value.taxNumber),
                        dob: validationInvalid(dataOrganization.value.dob),
                        phoneNumber: validationInvalid(dataOrganization.value.phoneNumber),
                        email: validationEmail(dataOrganization.value.email),
                        password: validationInvalid(dataOrganization.value.password),
                    }
                }))
                snackActions.error('Đăng nhập thất bại, Yêu cầu nhập đủ thông tin tài khoản')
            } else {
                let result = await props.registerOrganization(dataOrganization.value)
                if (result && result === true) {
                    snackActions.success('Đăng nhập thành công 🎉, hãy đợi phản hồi từ phía quản lý')
                    await router.push('/login')
                } else if (result === undefined) {
                } else {
                    snackActions.error('Đăng nhập thất bại, Email đã tồn tại')
                }
            }
        }
    }

    const handleChangeSelectCategory = (event) => {
        setDataOrganization({
            value: {...dataOrganization.value, idCategoryOrganization: event.target.value},
            error: {...dataOrganization.error}
        })
    }

    const handleChangeEmail = (event) => {
        setDataOrganization({
            value: {...dataOrganization.value, email: event.target.value},
            error: {...dataOrganization.error, email: validationEmail(event.target.value)}
        })
    }

    const handleChangeDOB = (datePicker) => {
        setDataOrganization({
            value: {...dataOrganization.value, dob: datePicker},
            error: {...dataOrganization.error}
        })
    }

    const handleChangeInputWithOutValidate = (event) => {
        let idFocus = event.target.id
        setDataOrganization({
            value: {...dataOrganization.value, [idFocus]: event.target.value},
            error: {...dataOrganization.error}
        })
    }

    const handleChangeInputWithValidate = (event) => {
        let idFocus = event.target.id
        setDataOrganization({
            value: {...dataOrganization.value, [idFocus]: event.target.value},
            error: {...dataOrganization.error, [idFocus]: validationInvalid(event.target.value)}
        })
    }

    return (
        <Auth>
            <div className="container mx-auto px-4 h-full">
                <div className="flex content-center items-center justify-center h-full">
                    <div className="w-full lg:w-5/12 px-4">
                        <div
                            className="relative min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
                            <div className="rounded-t mb-0 px-6 py-6 flex flex-col items-center">
                                <div style={{
                                    height: 200,
                                    width: 200,
                                    textAlign: "center",
                                }}>
                                    <img src="/covid19.png" alt=""/>
                                </div>
                                <div className="my-5 ml-2 uppercase text-lg font-bold"
                                     style={{color: "var(--primary-color)"}}>
                                    Vaccinations
                                </div>
                                <div className="my-5 ml-2 uppercase text-lg font-bold"
                                     style={{color: "var(--primary-color)"}}>
                                    ĐĂNG KÝ TÀI KHOẢN TỔ CHỨC
                                </div>
                            </div>
                            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">

                                {/*Form*/}
                                <div className="mb-8">
                                    <FormControl fullWidth>
                                        <InputLabel id="idCategoryOrganizationLabel">Loại tổ chức</InputLabel>
                                        <CustomSelectBox
                                            labelId="idCategoryOrganizationLabel"
                                            id="idCategoryOrganization"
                                            value={dataOrganization.value.idCategoryOrganization}
                                            label="Loại tổ chức"
                                            onChange={handleChangeSelectCategory}
                                        >
                                            {categoryOrganization.map((item, index) => (
                                                <MenuItem
                                                    id={index}
                                                    key={index}
                                                    value={item.id_catgory_organization}
                                                >
                                                    {item.name_category_organization}
                                                </MenuItem>
                                            ))}
                                        </CustomSelectBox>
                                    </FormControl>
                                </div>
                                <div className="mb-8">
                                    <CustomInput
                                        id="nameOrganization"
                                        onChange={handleChangeInputWithValidate}
                                        className="w-full"
                                        required
                                        type='text'
                                        label="Tên tổ chức"
                                    />
                                    <span className="text-red-500 text-sm">{dataOrganization.error.nameOrganization ? "Không được bỏ trống" : ""}</span>
                                </div>
                                <div className="mb-8">
                                    <CustomInput
                                        id="taxNumber"
                                        onChange={handleChangeInputWithValidate}
                                        className="w-full"
                                        required
                                        type='text'
                                        label="Mã số thuế"
                                    />
                                    <span className="text-red-500 text-sm">{dataOrganization.error.taxNumber ? "Không được bỏ trống" : ""}</span>
                                </div>
                                <div className="mb-8">
                                    <CustomInput
                                        id="address"
                                        onChange={handleChangeInputWithOutValidate}
                                        className="w-full"
                                        required
                                        type='text'
                                        label="Địa chỉ"
                                    />
                                </div>
                                <div className="mb-8">
                                    <CustomInput
                                        id="representativeName"
                                        onChange={handleChangeInputWithOutValidate}
                                        className="w-full"
                                        required
                                        type='text'
                                        label="Người đại diện"
                                    />
                                </div>
                                <div className="mb-8">
                                    <CustomInput
                                        id="regency"
                                        onChange={handleChangeInputWithOutValidate}
                                        className="w-full"
                                        required
                                        type='text'
                                        label="Chức vụ"
                                    />
                                </div>
                                <div className="mb-8 flex justify-between">
                                    <LocalizationProvider dateAdapter={AdapterDateFns} className="w-full">
                                        <DesktopDatePicker
                                            className="w-full"
                                            label="Ngày sinh"
                                            inputFormat="MM/dd/yyyy"
                                            value={dataOrganization.value.dob}
                                            onChange={handleChangeDOB}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                    <div className="w-1/2">
                                        <CustomInput
                                            className="w-full"
                                            id="phoneNumber"
                                            onChange={handleChangeInputWithValidate}
                                            required
                                            type='number'
                                            label="Số điện thoại"
                                        />
                                        <span className="text-red-500 text-sm">{dataOrganization.error.phoneNumber ? "Không được bỏ trống" : ""}</span>
                                    </div>
                                </div>
                                <div className="mb-8">
                                    <CustomInput
                                        id="email"
                                        onChange={handleChangeEmail}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <AlternateEmailIcon/>
                                                </InputAdornment>
                                            ),
                                        }}
                                        type="email"
                                        className="w-full"
                                        required
                                        label="Email"
                                    />
                                    <span
                                        className="text-red-500 text-sm">{dataOrganization.error.email ? "Phải nhập đầy đủ thôn tin Email đăng ký" : ""}</span>
                                </div>
                                <div className="mb-2">
                                    <CustomInput
                                        id="password"
                                        onChange={handleChangeInputWithValidate}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <PasswordIcon/>
                                                </InputAdornment>
                                            ),
                                            endAdornment: (
                                                <InputAdornment position="end" className="mr-1">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={() => {
                                                            setIsShowPassword(!isShowPassword)
                                                        }}
                                                        edge="end"
                                                    >
                                                        {isShowPassword ? <Visibility/> : <VisibilityOff/>}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                        className="w-full"
                                        required
                                        type={isShowPassword ? 'text' : 'password'}
                                        label="Mật khẩu"
                                    />
                                    <span className="text-red-500 text-sm">{dataOrganization.error.password ? "Không được bỏ trống" : ""}</span>
                                </div>
                                <div className="w-full">
                                    <Button variant="contained" className={CSS.loginButton}
                                            onClick={onClickRegisterOrganization}>
                                        Đăng ký tài khoản tổ chức
                                    </Button>
                                </div>
                                {/*End-form*/}

                            </div>
                        </div>

                        {/*Điều hướng*/}
                        <div className="flex flex-wrap mt-6 relative">
                            <div className="w-1/2">
                                <Link href="/register">
                                    <a href="#" className="text-white">
                                        <small>Tạo tài khoản cá nhân</small>
                                    </a>
                                </Link>
                            </div>
                            <div className="w-1/2 text-right">
                                <Link href="/login">
                                    <a href="#" className="text-white">
                                        <small>Đăng nhập</small>
                                    </a>
                                </Link>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Auth>
    );
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
    registerOrganization
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterOrganization);