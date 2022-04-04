import VCManagementCSS from "./VCMNCSS.module.scss";
import DataTableAccounts from "./DataTableAccounts";

export default function AccountManagement() {
    return (
        <>
            <div className={VCManagementCSS.wrapperButton}>
                <div className="my-5 ml-2 uppercase text-blueGray-600 text-lg font-bold">
                    Quản lý tài khoản
                </div>
            </div>
            <DataTableAccounts/>
        </>
    );
}