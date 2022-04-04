import {useState} from "react";
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import Link from 'next/link'

import Auth from "../../layouts/Auth";
import CustomInput from "../../components/common/Input/CustomInput";
import CSS from '../../components/pages/login/CSSLogin.module.scss'
import {snackActions} from "../../helper/showSnackBar";
import {authServices} from "../../services/servicesAPI";
import {HTTP_200} from "../../services/define_HTTP";

export default function ForgotPassword(props) {

    const [email, setEmail] = useState("")

    const handleChangeForgotPassword = (event) => {
        setEmail(event.target.value)
    }

    const onClickForgotEmail = async () => {
        if (email.length === 0) {
            snackActions.error('Yêu cầu nhập đầy đủ email muốn lấy lại mật khẩu')
        } else {
            console.log(email);
            try{
                let result = await authServices.forgotPasswordServices(email)
                if (result.status === HTTP_200 && result.data.status) {
                    snackActions.success('Thành công 🎉, Mật khẩu mới được gửi về email của bạn')
                } else {
                    snackActions.error('Email không tồn tại')
                }
            }catch (e){
                snackActions.error('Email không tồn tại')
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
                                    QUÊN MẬT KHẨU
                                </div>
                            </div>
                            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                <div className="mb-8">
                                    <CustomInput
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <AlternateEmailIcon/>
                                                </InputAdornment>
                                            ),
                                        }}
                                        onChange={handleChangeForgotPassword}
                                        className="w-full"
                                        required
                                        type="email"
                                        label="Email"
                                    />
                                    <span
                                        className="text-red-500 text-sm">{email.length === 0 ? "Không được bỏ trống" : ""}</span>
                                </div>
                                <div className="w-full">
                                    <Button variant="contained" className={CSS.loginButton} onClick={onClickForgotEmail}>Lấy lại mật khẩu</Button>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap mt-6 relative">
                            <div className="w-1/2">
                                <Link href="/register">
                                    <a href="#" className="text-white">
                                        <small>Tạo tài khoản</small>
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