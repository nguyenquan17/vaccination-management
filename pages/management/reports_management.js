import Management from "../../layouts/Management";
import ReportsManagementTable from "../../components/pages/reports_management/ReportsManagementTable";
import BarChartManagement from "../../components/pages/reports_management/BarChartManagement";

export default function ReportsManagement(props) {
    return (
        <Management>
            <div className="flex flex-wrap mt-4">
                <div className="w-full mb-12 px-4">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
                        <div className="my-5 ml-2 uppercase text-blueGray-600 text-lg font-bold ">
                            Báo cáo quản lý
                        </div>
                        <div className="flex flex-wrap">
                            <div className="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
                                <BarChartManagement/>
                            </div>
                        </div>
                        <ReportsManagementTable />
                    </div>
                </div>
            </div>
        </Management>
    );
}