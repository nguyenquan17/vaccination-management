import React from 'react'
import DataTableAccountOrganization from './DataTableAccountOrganization'


export default function AccountOrganization() {
    return (
        <>
            <div className="">
                <div className="my-5 ml-2 uppercase text-blueGray-600 text-lg font-bold ">
                    Duyệt tài khoản tổ chức/doanh nghiệp
                </div>
            </div>
            <DataTableAccountOrganization/>
        </>
    )
}


