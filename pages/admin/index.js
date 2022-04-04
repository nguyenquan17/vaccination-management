import React from "react";

import Management from "../../layouts/Management";
import AccountManagement from "../../components/pages/admin/AccountManagement";

export default function Account(props) {
  return (
    <Management>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
            <AccountManagement />
          </div>
        </div>
      </div>
    </Management>
  );
}