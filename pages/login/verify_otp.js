import {useState, useEffect} from "react";
import {useRouter} from 'next/router'
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import {connect} from "react-redux";

import Auth from "../../layouts/Auth";
import CustomInput from "../../components/common/Input/CustomInput";
import {validationInvalid} from "../../helper/validate/validation";
import CSS from '../../components/pages/login/CSSLogin.module.scss'
import {verifyOtpUser} from "../../redux/actions/authAction";
import {snackActions} from "../../helper/showSnackBar";

function VerifyOtp(props) {
    const router = useRouter()
    const {email} = props.userInfo
    console.log(email)

    useEffect(()=>{
        if(!email){
            router.push('/login')
        }
    }, [])

    const [dataOTP, setDataOTP] = useState({
        value: {
            otp: "",
        },
        error: {
            otp: false,
        }
    })

    const onClickVerifyOtp = async () => {
        if (dataOTP.error.otp) {
            snackActions.error('Xác nhận thất bại, OTP không được bỏ trống')
        } else {
            if (validationInvalid(dataOTP.value.otp)) {
                setDataOTP(state => ({
                    value: state.value,
                    error: {
                        otp: validationInvalid(dataOTP.value.otp),
                    }
                }))
                snackActions.error('Xác nhận thất bại, OTP không được bỏ trống')
            } else {
                let result = await props.verifyOtpUser(email, dataOTP.value.otp)
                if (result) {
                    snackActions.success('Xác nhận thành công, Đăng ký tài khoản thành công 🎉')
                    await router.push('/login')
                } else {
                    snackActions.error('Xác nhận thất bại, Hệ thống đang gặp vấn đề')
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
                                <div className="my-3 ml-2 uppercase text-lg font-bold"
                                     style={{color: "var(--primary-color)"}}>
                                    Vaccinations
                                </div>
                                <div className="my-2 ml-2 uppercase text-lg font-bold"
                                     style={{color: "var(--primary-color)"}}>
                                    XÁC NHẬN OTP
                                </div>
                            </div>
                            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                <div className="mb-5">
                                    Hãy kiểm tra email: <b>{email}</b> của bạn, hệ thống đã gửi mã OTP đến đó!
                                </div>
                                <div className="mb-2">
                                    <CustomInput
                                        onChange={(event) => {
                                            setDataOTP((state) => ({
                                                value: {otp: event.target.value},
                                                error: {otp: validationInvalid(event.target.value)},
                                            }))
                                        }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <VpnKeyIcon/>
                                                </InputAdornment>
                                            ),
                                        }}
                                        type="number"
                                        className="w-full"
                                        required
                                        label="Mã OTP"
                                    />
                                    <span
                                        className="text-red-500 text-sm">{dataOTP.error.otp ? "Không được bỏ trống" : ""}</span>
                                </div>
                                <div className="w-full">
                                    <Button variant="contained" className={CSS.loginButton} onClick={onClickVerifyOtp}>Xác nhận OTP</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Auth>
    );
}

const mapStateToProps = (state) => ({
    userInfo: state.authReducer.userInfo
});

const mapDispatchToProps = {
    verifyOtpUser
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyOtp);