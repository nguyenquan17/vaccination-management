import React from "react";

import Management from "../../../layouts/Management";
import VaccineManagement from "../../../components/pages/vaccine/VaccineManagement";

export default function Vaccine(props) {
  return (
    <Management>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
            <VaccineManagement />
          </div>
        </div>
      </div>
    </Management>
  );
}