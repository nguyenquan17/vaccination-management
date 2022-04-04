import React from 'react'
import DataTableVaccinationPlace from './DataTableVaccinationPlace'


export default function VaccinationPlaceManagement() {
    return (
        <>
            <div className="">
                <div className="my-5 ml-2 uppercase text-blueGray-600 text-lg font-bold ">
                    Đơn vị tiêm chủng
                </div>
            </div>
            <DataTableVaccinationPlace />
        </>
    )
}


