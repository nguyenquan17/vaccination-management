import React from "react";

import Management from "../../../layouts/Management";
import AccountOrganization from "../../../components/pages/account_organization/AccountOrganization";

export default function Account() {
  return (
    <Management>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
            <AccountOrganization/>
          </div>
        </div>
      </div>
    </Management>
  );
}