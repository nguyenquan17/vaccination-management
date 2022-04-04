import Landing from "../layouts/Landing";
import React, {useEffect} from "react";
import RegistrationVaccinationForm from "../components/pages/registration_vaccination/RegistrationVaccinationForm";
import {connect} from "react-redux";
import {useRouter} from "next/router";
import {snackActions} from "../helper/showSnackBar";
import FeedBackUserForm from "../components/pages/my_feedback/FeedBackUserForm";

function MyFeedBack(props) {


    return (
        <Landing>
            <div className="flex flex-wrap">
                <div className="w-full lg:w-12/12 px-4 my-24">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                        <FeedBackUserForm />
                    </div>
                </div>
            </div>
        </Landing>
    )
}


export default MyFeedBack;