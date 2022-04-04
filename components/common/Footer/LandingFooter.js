import React from "react";

export default function LandingFooter() {
    return (
        <>
            <footer className="relative pt-8 pb-6"
                    style={{
                        backgroundColor: "var(--primary-color)",
                    }}
            >
                <div
                    className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
                    style={{transform: "translateZ(0)"}}
                >
                    <svg
                        className="absolute bottom-0 overflow-hidden"
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="none"
                        version="1.1"
                        viewBox="0 0 2560 100"
                        x="0"
                        y="0"
                    >
                        <polygon
                            className="fill-current"
                            points="2560 0 2560 100 0 100"
                            style={{
                                color: "var(--primary-color)",
                            }}
                        />
                    </svg>
                </div>
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap text-center lg:text-left">
                        <div className="w-full lg:w-6/12 px-4">
                            <h4 className="text-3xl font-semibold text-white">Vacxin tốt nhất!</h4>
                            <h5 className="text-lg mt-0 mb-2 text-white">
                                Vacxin tốt nhất là vacxin được tiêm sớm nhất.
                            </h5>
                            <div className="mt-6 lg:mb-0 mb-6">
                                <button
                                    className="bg-white shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                                    style={{
                                        color: "var(--primary-color)",
                                    }}
                                    type="button"
                                >
                                    <i className="fab fa-facebook-square"></i>
                                </button>
                                <button
                                    className="bg-white shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                                    style={{
                                        color: "var(--primary-color)",
                                    }}
                                    type="button"
                                >
                                    <i className="fab fa-github"></i>
                                </button>
                            </div>
                        </div>
                        <div className="w-full lg:w-6/12 px-4">
                            <div className="flex flex-wrap items-top mb-6">
                                <div className="w-full lg:w-4/12 px-4 ml-auto">
                                  <span className="block uppercase text-white text-sm font-semibold mb-2">
                                    Thông tin về chúng tôi
                                  </span>
                                    <ul className="list-unstyled">
                                        <li>
                                            <a
                                                className="text-white hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                                                href="https://github.com/creativetimofficial/notus-nextjs/blob/main/LICENSE.md?ref=nnjs-footer"
                                            >
                                                Liên hệ với chúng tôi
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="my-6 border-blueGray-300"/>
                    <div className="flex flex-wrap items-center md:justify-between justify-center">
                        <div className="w-full md:w-4/12 px-4 mx-auto text-center">
                            <div className="text-sm text-white font-semibold py-1">
                                Bản quyền © {new Date().getFullYear()} {" "}
                                <a
                                    href="https://www.creative-tim.com?ref=nnjs-footer"
                                    className="text-blueGray-500 hover:text-blueGray-800"
                                >
                                    Nhóm 6 Project
                                </a>
                                .
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
