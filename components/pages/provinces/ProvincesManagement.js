import ProvincesManagementCSS from "./CSSProvinces.module.scss";
import DataTableProvinces from "./DataTableProvinces";

export default function ProvincesManagement() {

    return (
        <>
            <div className={ProvincesManagementCSS.wrapperButton}>
                <div className="my-5 ml-2 uppercase text-blueGray-600 text-lg font-bold">
                    Danh mục Thành phố
                </div>
            </div>
            <DataTableProvinces/>
        </>
    );
}