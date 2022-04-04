import React from 'react'
import VaccinationOrganizationTable from "./VaccinationOrganizationTable";


export default function RegisterVaccinationOrganization() {
    return (
        <>
            <div className="">
                <div className="my-5 ml-2 uppercase text-blueGray-600 text-lg font-bold ">
                    Đăng ký tiêm cho tổ chức
                </div>
            </div>
            <VaccinationOrganizationTable/>
        </>
    )
}

