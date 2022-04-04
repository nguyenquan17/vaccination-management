import Landing from "../layouts/Landing";
import React from "react";
import CardLineChart from "../components/common/Cards/CardLineChart";
import CardBarChart from "../components/common/Cards/CardBarChart";

export default function Home() {
    return (
        <Landing>
            <section className="pb-20 bg-blueGray-200 -mt-24">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap">
                        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
                            <CardLineChart />
                        </div>
                        <div className="w-full xl:w-4/12 px-4">
                            <CardBarChart />
                        </div>
                    </div>
                </div>
            </section>

            <section className="pt-20 pb-48">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap justify-center text-center mb-12">
                        <div className="w-full lg:w-6/12 px-4">
                            <h2 className="text-4xl font-semibold">Thông tin về chúng tôi</h2>
                            <p className="text-lg leading-relaxed m-4 text-blueGray-500">
                                Thành viên nhóm 6
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-wrap">
                        <div className="w-full md:w-6/12 lg:w-4/12 lg:mb-0 mb-12 px-4">
                            <div className="px-6">
                                <img
                                    alt="..."
                                    src="/member_1.png"
                                    className="shadow-lg rounded-full mx-auto w-48 h-48"
                                />
                                <div className="pt-6 text-center">
                                    <h5 className="text-xl font-bold">Nghê Quyết Tiến</h5>
                                    <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                                        Trưởng nhóm
                                    </p>
                                    <div className="mt-6">
                                        <button
                                            className="bg-blue-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                                            type="button"
                                        >
                                            <i className="fab fa-facebook-f"/>
                                        </button>
                                        <button
                                            className="bg-black text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                                            type="button"
                                        >
                                            <i className="fab fa-github"/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-6/12 lg:w-4/12 lg:mb-0 mb-12 px-4">
                            <div className="px-6">
                                <img
                                    alt="..."
                                    src="/member_2.png"
                                    className="shadow-lg rounded-full mx-auto w-48 h-48"
                                />
                                <div className="pt-6 text-center">
                                    <h5 className="text-xl font-bold">Phạm Tiến Đạt</h5>
                                    <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                                        Backend-Developer
                                    </p>
                                    <div className="mt-6">
                                        <button
                                            className="bg-blue-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                                            type="button"
                                        >
                                            <i className="fab fa-facebook-f"/>
                                        </button>
                                        <button
                                            className="bg-black text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                                            type="button"
                                        >
                                            <i className="fab fa-github"/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-6/12 lg:w-4/12 lg:mb-0 mb-12 px-4">
                            <div className="px-6">
                                <img
                                    alt="..."
                                    src="/member_3.png"
                                    className="shadow-lg rounded-full mx-auto w-48 h-48"
                                />
                                <div className="pt-6 text-center">
                                    <h5 className="text-xl font-bold">Vũ Minh Huy</h5>
                                    <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                                        Thư ký
                                    </p>
                                    <div className="mt-6">
                                        <button
                                            className="bg-blue-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                                            type="button"
                                        >
                                            <i className="fab fa-facebook-f"/>
                                        </button>
                                        <button
                                            className="bg-black text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                                            type="button"
                                        >
                                            <i className="fab fa-github"/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-6/12 lg:w-4/12 lg:mb-0 my-12 px-4">
                            <div className="px-6">
                                <img
                                    alt="..."
                                    src="/member_4.png"
                                    className="shadow-lg rounded-full mx-auto w-48 h-48"
                                />
                                <div className="pt-6 text-center">
                                    <h5 className="text-xl font-bold">Phương Thảo</h5>
                                    <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                                        Thiết kế
                                    </p>
                                    <div className="mt-6">
                                        <button
                                            className="bg-blue-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                                            type="button"
                                        >
                                            <i className="fab fa-facebook-f"/>
                                        </button>
                                        <button
                                            className="bg-black text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                                            type="button"
                                        >
                                            <i className="fab fa-github"/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-6/12 lg:w-4/12 lg:mb-0 my-12 px-4">
                            <div className="px-6">
                                <img
                                    alt="..."
                                    src="/member_5.png"
                                    className="shadow-lg rounded-full mx-auto w-48 h-48"
                                />
                                <div className="pt-6 text-center">
                                    <h5 className="text-xl font-bold">Nguyễn Tiến Du</h5>
                                    <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                                        Web Developer
                                    </p>
                                    <div className="mt-6">
                                        <button
                                            className="bg-blue-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                                            type="button"
                                        >
                                            <i className="fab fa-facebook-f"/>
                                        </button>
                                        <button
                                            className="bg-black text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                                            type="button"
                                        >
                                            <i className="fab fa-github"/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-6/12 lg:w-4/12 lg:mb-0 my-12 px-4">
                            <div className="px-6">
                                <img
                                    alt="..."
                                    src="/member_6.png"
                                    className="shadow-lg rounded-full mx-auto w-48 h-48"
                                />
                                <div className="pt-6 text-center">
                                    <h5 className="text-xl font-bold">Nguyễn Anh Quân</h5>
                                    <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                                        WEB DEVELOPER
                                    </p>
                                    <div className="mt-6">
                                        <button
                                            className="bg-blue-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                                            type="button"
                                        >
                                            <i className="fab fa-facebook-f"/>
                                        </button>
                                        <button
                                            className="bg-black text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                                            type="button"
                                        >
                                            <i className="fab fa-github"/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Landing>
    )
}

