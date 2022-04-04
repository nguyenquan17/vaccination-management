import React from "react";

import LandingNavbar from "../components/common/Navbar/LandingNavbar.js";
import LandingFooter from "../components/common/Footer/LandingFooter.js";
import SCSS from "../components/common/Navbar/SCSSNavbar.module.scss";
import Button from "@mui/material/Button";
import { useRouter } from 'next/router';
import {changeProfileAction} from "../redux/actions/profileAction";
import {connect} from "react-redux";
import {snackActions} from "../helper/showSnackBar";

function Landing(props) {

    const {userInfo} = props.userInfo;

    const router = useRouter()
    const navigateInjection = () => {
        if(userInfo.idUser !== undefined && userInfo.idUser.toString() === "0"){
            snackActions.info('Bạn cần phải nhập đầy đủ thông tin cá nhân trước khi đăng ký')
            router.push("/profile")
        }else{
            router.push("/registration_vaccination")
        }
    }

    const showRegisterInjection = () => {
        if(userInfo.idRole !== undefined && userInfo.idRole.toString() === "5"){
            return (
                <>
                    <div className="container relative mx-auto my-24">
                        <div className="items-center flex flex-wrap">
                            <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                                <Button variant="contained" className={SCSS.btnMain} onClick={navigateInjection}>
                                    <p>Đăng ký tiêm ngay </p>
                                    <i className="fas fa-chevron-right mb-0.5"/>
                                </Button>
                            </div>
                        </div>
                    </div>
                </>
            )
        }else{
            return (
                <>
                    <div className="container relative mx-auto my-24">
                        <div className="items-center flex flex-wrap">
                            <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                            </div>
                        </div>
                    </div>
                </>
            )
        }
    }

    return (
        <>
            <LandingNavbar transparent/>
            <main>
                <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
                    <div
                        className="absolute top-0 w-full h-full bg-center bg-cover"
                        style={{
                            backgroundImage:
                                "url('http://baochinhphu.vn/Uploaded/tranducmanh/2021_07_21/Tiem.jpg')",
                        }}
                    >
                    </div>
                    {showRegisterInjection()}
                </div>
            </main>
            {props.children}
            <LandingFooter/>
        </>
    );
}

const mapStateToProps = (state) => ({
    userInfo: state.authReducer,
});

const mapDispatchToProps = {
    changeProfileAction
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);