import {useRouter} from 'next/router'
import Button from '@mui/material/Button';
import {connect} from "react-redux";
import Auth from "../../layouts/Auth";
import CSS from '../../components/pages/login/CSSLogin.module.scss'
import {sendEmail} from "../../redux/actions/authAction";
import {snackActions} from "../../helper/showSnackBar";

function SendEmail(props) {

    const router = useRouter()

    const onClickSendEmail = async () => {
        let result = await props.sendEmail(router.query.email)
        if (result && result === true) {
            await router.push('/login/verify_otp')
            snackActions.success('Gửi mã OTP thành cồn 🎉, hãy kiểm tra Email của bạn')
        }else {
            snackActions.error('Gửi mã OTP thất bại vui lòng thử lại')
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
                                    Một mã OTP sẽ được gửi về email: <b>{router.query.email}</b> của bạn để hoàn tất đăng ký tài khoản!
                                </div>
                                <div className="mb-2">
                                    <div className="w-full">
                                        <Button variant="contained" className={CSS.loginButton}
                                                onClick={onClickSendEmail}>Gửi OTP về email</Button>
                                    </div>
                                </div>
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
    sendEmail
};

export default connect(mapStateToProps, mapDispatchToProps)(SendEmail);