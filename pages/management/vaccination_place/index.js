import React from "react";

import Management from "../../../layouts/Management";
import VaccinationPlaceManagement from "../../../components/pages/vaccination_place/VaccinationPlaceManagement";

export default function VaccinationSite() {
  return (
    <Management>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
            <VaccinationPlaceManagement />
          </div>
        </div>
      </div>
    </Management>
  );
}