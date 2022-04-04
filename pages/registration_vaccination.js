import Landing from "../layouts/Landing";
import React, {useEffect} from "react";
import RegistrationVaccinationForm from "../components/pages/registration_vaccination/RegistrationVaccinationForm";
import {connect} from "react-redux";
import {useRouter} from "next/router";
import {snackActions} from "../helper/showSnackBar";

function RegistrationVaccination(props) {

    const {userInfo} = props.userInfo;

    const router = useRouter()

    useEffect(() => {
        if(userInfo.idUser.toString() === "0"){
            router.push('/profile').then(()=>{
                snackActions.info('Bạn cần phải nhập đầy đủ thông tin cá nhân trước khi đăng ký')
            })
        }
    }, [])

    return (
        <Landing>
            <div className="flex flex-wrap">
                <div className="w-full lg:w-12/12 px-4 my-24">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                        <RegistrationVaccinationForm />
                    </div>
                </div>
            </div>
        </Landing>
    )
}

const mapStateToProps = (state) => ({
    userInfo: state.authReducer,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationVaccination);