import VCManagementCSS from "./VCMNCSS.module.scss";
import DataTableVaccines from "./DataTableVaccines";

export default function VaccineManagement() {
    return (
        <>
            <div className={VCManagementCSS.wrapperButton}>
                <div className="my-5 ml-2 uppercase text-blueGray-600 text-lg font-bold">
                    Danh mục Vaccine
                </div>
            </div>
            <DataTableVaccines/>
        </>
    );
}