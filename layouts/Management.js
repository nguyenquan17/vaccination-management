import React from "react";

import Sidebar from '../components/common/Sidebar/Sidebar';
import Navbar from '../components/common/Navbar/Navbar';
import HeaderStats from '../components/common/Header/HeaderStats';
import Footer from '../components/common/Footer/Footer';

export default function Management({ children }) {
    return (
        <>
            <Sidebar />
            <div className="relative md:ml-64 bg-blueGray-100">
                <Navbar />
                <HeaderStats />
                <div className="px-4 md:px-10 mx-auto w-full -m-24">
                    {children}
                    <Footer />
                </div>
            </div>
        </>
    );
}
