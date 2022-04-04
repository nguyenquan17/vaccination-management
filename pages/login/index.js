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

import Auth from "../../layouts/Auth";
import CustomInput from "../../components/common/Input/CustomInput";
import {validationInvalid} from "../../helper/validate/validation";
import CSS from '../../components/pages/login/CSSLogin.module.scss'
import {loginUser} from "../../redux/actions/authAction";
import {snackActions} from "../../helper/showSnackBar";

function Login(props) {

    const router = useRouter()
    const [dataLogin, setDataLogin] = useState({
        value: {
            email: "",
            password: "",
        },
        error: {
            email: false,
            password: false,
        }
    })
    const [isShowPassword, setIsShowPassword] = useState(false)

    const onClickLogin = async () => {
        if (dataLogin.error.phoneNumber || dataLogin.error.password) {
            snackActions.error('Đăng nhập thất bại, Yêu cầu nhập đủ thông tin tài khoản')
        } else {
            if (validationInvalid(dataLogin.value.email) || validationInvalid(dataLogin.value.password)) {
                setDataLogin(state => ({
                    value: state.value,
                    error: {
                        email: validationInvalid(dataLogin.value.email),
                        password: validationInvalid(dataLogin.value.password),
                    }
                }))
                snackActions.error('Đăng nhập thất bại, Yêu cầu nhập đủ thông tin tài khoản')
            } else {
                let result = await props.loginUser(dataLogin.value)
                if (result && result === true) {
                    snackActions.success('Đăng nhập thành công 🎉')
                    await router.push('/')
                } else if(result === undefined){} else {
                    snackActions.error('Đăng nhập thất bại, Email hoặc mật khẩu không chính xác')
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
                                    ĐĂNG NHẬP
                                </div>
                            </div>
                            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                <div className="mb-8">
                                    <CustomInput
                                        onChange={(event) => {
                                            setDataLogin((state) => ({
                                                value: {...state.value, email: event.target.value},
                                                error: {
                                                    ...state.error,
                                                    email: validationInvalid(event.target.value)
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
                                        className="w-full"
                                        required
                                        type="email"
                                        label="Email"
                                    />
                                    <span
                                        className="text-red-500 text-sm">{dataLogin.error.email ? "Không được bỏ trống" : ""}</span>
                                </div>
                                <div className="mb-2">
                                    <CustomInput
                                        onChange={(event) => {
                                            setDataLogin((state) => ({
                                                value: {...state.value, password: event.target.value},
                                                error: {
                                                    ...state.error,
                                                    password: validationInvalid(event.target.value)
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
                                        className="text-red-500 text-sm">{dataLogin.error.password ? "Không được bỏ trống" : ""}</span>
                                </div>
                                <div className="w-full">
                                    <Button variant="contained" className={CSS.loginButton} onClick={onClickLogin}>Đăng nhập</Button>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap mt-6 relative">
                            <div className="w-1/2">
                                <Link href="/forgot_password">
                                    <a href="#" className="text-white">
                                        <small>Quên mật khẩu?</small>
                                    </a>
                                </Link>
                            </div>
                            <div className="w-1/2 text-right">
                                <Link href="/register">
                                    <a href="#" className="text-white">
                                        <small>Tạo tài khoản</small>
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
    loginUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);