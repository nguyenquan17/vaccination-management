import Landing from "../layouts/Landing";
import React from "react";
import ProfileForm from "../components/pages/profile/ProfileForm";
import ProfileCard from "../components/pages/profile/ProfileCard";
import ScheduleInjectionCard from "../components/pages/profile/ScheduleInjectionCard";

export default function Profile() {
    return (
        <Landing>
            <div className="flex flex-wrap">
                <div className="w-full lg:w-8/12 px-4 my-24">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                        <ProfileForm />
                    </div>
                </div>
                <div className="w-full lg:w-4/12 px-4 my-24">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg">
                       <ProfileCard />
                    </div>
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg">
                        <ScheduleInjectionCard />
                    </div>
                </div>
            </div>
        </Landing>
    )
}
