import {useState} from "react";
import {useRouter} from 'next/router'
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import {connect} from "react-redux";
import Link from 'next/link'

import Auth from "../../layouts/Auth";
import CustomInput from "../../components/common/Input/CustomInput";
import {validationEmail, validationInvalid} from "../../helper/validate/validation";
import CSS from '../../components/pages/login/CSSLogin.module.scss'
import {registerAccount} from "../../redux/actions/authAction";
import {snackActions} from "../../helper/showSnackBar";
import {USER_TOKEN} from "../../helper/define";
import PasswordIcon from "@mui/icons-material/Password";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function Register(props) {

    const router = useRouter()
    const [dataRegister, setDataRegister] = useState({
        value: {
            email: "",
            password: "",
            confirmPassword: "",
        },
        error: {
            email: false,
            password: false,
            confirmPassword: false,
        }
    })
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false)

    const onClickRegister = async () => {
        if (dataRegister.error.email || dataRegister.error.password || dataRegister.error.confirmPassword) {
            snackActions.error('Đăng ký thất bại, Yêu cầu nhập đầy đủ thông tin đăng ký')
        } else {
            if (validationEmail(dataRegister.value.email)
                || validationInvalid(dataRegister.value.password)
                || dataRegister.value.confirmPassword !== dataRegister.value.password) {
                setDataRegister(state => ({
                    value: state.value,
                    error: {
                        email: validationInvalid(dataRegister.value.email),
                        password: validationInvalid(dataRegister.value.password),
                        confirmPassword: dataRegister.value.confirmPassword === dataRegister.value.password,
                    }
                }))
                snackActions.error('Đăng ký thất bại, Yêu cầu nhập đầy đủ thông tin đăng ký')
            } else {
                let result = await props.registerAccount(dataRegister.value)
                if (result) {
                    snackActions.success('Đăng ký thành công 🎉')
                    await router.push('/login')
                } else {
                    snackActions.error('Đăng ký thất bại, Email đã tồn tại')
                }
            }
        }
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
                                    ĐĂNG KÝ TÀI KHOẢN CÁ NHÂN
                                </div>
                            </div>
                            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                <div className="mb-8">
                                    <CustomInput
                                        onChange={(event) => {
                                            setDataRegister((state) => ({
                                                value: {...state.value, email: event.target.value},
                                                error: {
                                                    ...state.error,
                                                    email: validationEmail(event.target.value)
                                                },
                                            }))
                                        }}
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
                                        className="text-red-500 text-sm">{dataRegister.error.email ? "Phải nhập đầy đủ thôn tin Email đăng ký" : ""}</span>
                                </div>
                                <div className="mb-8">
                                    <CustomInput
                                        onChange={(event) => {
                                            setDataRegister((state) => ({
                                                value: {...state.value, password: event.target.value},
                                                error: {
                                                    ...state.error,
                                                    password: validationInvalid(event.target.value),
                                                    confirmPassword: event.target.value !== state.value.confirmPassword,
                                                },
                                            }))
                                        }}
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
                                    <span
                                        className="text-red-500 text-sm">{dataRegister.error.password ? "Không được bỏ trống" : ""}</span>
                                </div>
                                <div className="mb-2">
                                    <CustomInput
                                        onChange={(event) => {
                                            setDataRegister((state) => ({
                                                value: {...state.value, confirmPassword: event.target.value},
                                                error: {
                                                    ...state.error,
                                                    confirmPassword: event.target.value !== state.value.password
                                                },
                                            }))
                                        }}
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
                                                            setIsShowConfirmPassword(!isShowConfirmPassword)
                                                        }}
                                                        edge="end"
                                                    >
                                                        {isShowConfirmPassword ? <Visibility/> : <VisibilityOff/>}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                        className="w-full"
                                        required
                                        type={isShowConfirmPassword ? 'text' : 'password'}
                                        label="Xác nhận mật khẩu"
                                    />
                                    <span
                                        className="text-red-500 text-sm">{dataRegister.error.confirmPassword ? "Hai mật khẩu không trùng nhau" : ""}</span>
                                </div>
                                <div className="w-full">
                                    <Button variant="contained" className={CSS.loginButton} onClick={onClickRegister}>Đăng
                                        ký</Button>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap mt-6 relative">
                            <div className="w-1/2">
                                <Link href="/register/register_organization">
                                    <a href="#" className="text-white">
                                        <small>Đăng ký tài khoản tổ chức</small>
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
    registerAccount
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);