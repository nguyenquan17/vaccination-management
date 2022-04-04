import {useState, useEffect} from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookies from 'js-cookie'
import {connect} from "react-redux";
import {getInfoUser} from "../../../redux/actions/authAction";

function Sidebar(props) {
    const [collapseShow, setCollapseShow] = useState("hidden")
    const router = useRouter()
    const {idRole} = props.userInfo.userInfo

    const renderName = ()=>{
        if(idRole.toString() === "1"){
            return "ADMIN"
        }else if(idRole.toString() === "2"){
            return "QUẢN LÝ"
        }else if(idRole.toString() === "3"){
            return "QUẢN LÝ ĐIỂM TIÊM"
        }else{
            return "DOANH NGHIỆP"
        }
    }

    const renderMenu = ()=>{
        if(idRole.toString() === "1"){
            return (
                <>
                    <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                        <li className={["items-center", router.asPath === "..." ? "bg-gray-100" : ""].join(" ")}>
                            <Link href="/admin">
                                <a
                                    className="text-xs uppercase py-3 font-bold block"
                                >
                                    <i className="fas fa-hospital-user mx-2 text-sm"></i> Quản lý tài khoản
                                </a>
                            </Link>
                        </li>
                    </ul>
                </>
            );
        }else if(idRole.toString() === "2") {
            return (
                <>
                    <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                        <li className={["items-center", router.asPath === "/management/vaccine" ? "bg-gray-100" : ""].join(" ")}>
                            <Link href="/management/vaccine">
                                <a
                                    className="text-xs uppercase py-3 font-bold block"
                                >
                                    <i className="fas fa-syringe mx-2 text-sm"></i> Danh mục Vacxin
                                </a>
                            </Link>
                        </li>
                        <li className={["items-center", router.asPath === "/management/vaccination_place" ? "bg-gray-100" : ""].join(" ")}>
                            <Link href="/management/vaccination_place">
                                <a
                                    className="text-xs uppercase py-3 font-bold block"
                                >
                                    <i className="fas fa-hospital-user mx-2 text-sm"></i> Đơn vị tiêm chủng
                                </a>
                            </Link>
                        </li>
                        <li className={["items-center", router.asPath === "/management/account_organization" ? "bg-gray-100" : ""].join(" ")}>
                            <Link href="/management/account_organization">
                                <a
                                    className="text-xs uppercase py-3 font-bold block"
                                >
                                    <i className="fas fa-people-arrows mx-2 text-sm"></i> Tài khoản doanh nghiệp
                                </a>
                            </Link>
                        </li>
                        <li className={["items-center", router.asPath === "/management/reports_management" ? "bg-gray-100" : ""].join(" ")}>
                            <Link href="/management/reports_management">
                                <a
                                    className="text-xs uppercase py-3 font-bold block"
                                >
                                    <i className="fas fa-file mx-2 text-sm"></i> Báo cáo quản lý
                                </a>
                            </Link>
                        </li>
                    </ul>
                </>
            );
        }else if(idRole.toString() === "3"){
            return (
                <>
                    <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                        <li className={["items-center", router.asPath === "/vaccination_place/schedule_injections" ? "bg-gray-100" : ""].join(" ")}>
                            <Link href="/vaccination_place/schedule_injections">
                                <a
                                    href="#"
                                    className="text-xs uppercase py-3 font-bold block"
                                >
                                    <i className="fas fa-syringe mx-2 text-sm"></i> Đơn đăng ký tiêm
                                </a>
                            </Link>
                        </li>
                        <li className={["items-center", router.asPath === "/vaccination_place/accept_vaccination_record" ? "bg-gray-100" : ""].join(" ")}>
                            <Link href="/vaccination_place/accept_vaccination_record">
                                <a
                                    href="#pablo"
                                    className="text-xs uppercase py-3 font-bold block"
                                >
                                    <i className="fas fa-hospital-user mx-2 text-sm"></i> Xác nhận tiêm chủng
                                </a>
                            </Link>
                        </li>
                        <li className={["items-center", router.asPath === "/vaccination_place/vaccination_record" ? "bg-gray-100" : ""].join(" ")}>
                            <Link href="/vaccination_place/vaccination_record">
                                <a
                                    href="#pablo"
                                    className="text-xs uppercase py-3 font-bold block"
                                >
                                    <i className="fas fa-id-badge mx-2 text-sm"></i> Hồ sơ tiêm chủng
                                </a>
                            </Link>
                        </li>
                        <li className={["items-center", router.asPath === "/vaccination_place/reports_vaccination_place" ? "bg-gray-100" : ""].join(" ")}>
                            <Link href="/vaccination_place/reports_vaccination_place">
                                <a
                                    href="#pablo"
                                    className="text-xs uppercase py-3 font-bold block"
                                >
                                    <i className="fas fa-file mx-2 text-sm"></i> Báo cáo thống kê
                                </a>
                            </Link>
                        </li>
                        <li className={["items-center", router.asPath === "/vaccination_place/feedback_user" ? "bg-gray-100" : ""].join(" ")}>
                            <Link href="/vaccination_place/feedback_user">
                                <a
                                    href="#pablo"
                                    className="text-xs uppercase py-3 font-bold block"
                                >
                                    <i className="fas fa-comment-alt mx-2 text-sm"></i> Phản hồi sau tiêm
                                </a>
                            </Link>
                        </li>
                    </ul>
                </>
            );
        }else if(idRole.toString() === "4"){
            return (
                <>
                    <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                        <li className={["items-center", router.asPath === "..." ? "bg-gray-100" : ""].join(" ")}>
                            <Link href="/organization">
                                <a
                                    href="#pablo"
                                    className="text-xs uppercase py-3 font-bold block"
                                >
                                    <i className="fas fa-syringe mx-2 text-sm"></i> Đăng ký tiêm
                                </a>
                            </Link>
                        </li>
                    </ul>
                </>
            );
        }
        else{
            return (<></>);
        }
    }

    return (
        <>
            <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
                <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
                    <button
                        className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                        type="button"
                        onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
                    >
                        <i className="fas fa-bars"></i>
                    </button>
                    <Link href="/">
                        <a
                            href="#"
                            className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                        >
                            Vaccinations
                        </a>
                    </Link>
                    <div
                        className={
                            "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
                            collapseShow
                        }
                    >
                        <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
                            <div className="flex flex-wrap">
                                <div className="w-6/12">
                                    <Link href="/">
                                        <a
                                            href="#"
                                            className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                                        >
                                            Vaccinations
                                        </a>
                                    </Link>
                                </div>
                                <div className="w-6/12 flex justify-end">
                                    <button
                                        type="button"
                                        className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                                        onClick={() => setCollapseShow("hidden")}
                                    >
                                        <i className="fas fa-times"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
                            {renderName()}
                        </h6>
                        {renderMenu()}
                    </div>
                </div>
            </nav>
        </>
    );
}

const mapStateToProps = (state) => ({
    userInfo: state.authReducer
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
