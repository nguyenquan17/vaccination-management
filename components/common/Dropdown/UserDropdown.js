import React from "react";
import { createPopper } from "@popperjs/core";

const UserDropdown = () => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  return (
    <>
      <a
        className="text-blueGray-500 block"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="items-center flex">
          <span className="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
            <img
              alt="..."
              className="w-full rounded-full align-middle border-none shadow-lg"
              src="https://lh3.googleusercontent.com/fife/AAWUweUPibbxKlvdOZIboQh-4Duyt0ssMxbnPvtmW-ciCGbKNM4j9z9jvfjKkQmCyru6k-RTm-ua0G_9rjnGE00L4BgQ1uCjcB_6aTspxa5CQFzcac2BMbUVOSTVr7zN7YWJ3xkNGYSGqNVP8SGkixWvFTIETgIbjXeWPzyWW0zW6T6WIWwe_FYnDCMIuAgH5cO8VT6SZffvVqMdcrh_bnxfaWjrF9DXM85zcClgLzhuRnjn-hQizAqKG6NzqoE5Ir6vyVHmLJAPcFnaMcftygnygVWrmA4bytlZfI4Gt6L3Lji7vKxfYRVrd-ZdJ7vQHH3-ipDjXYMjqhTCMjstmgDYO_owr5pa0WDu-QJn1XVLrvdf65OsEqwKnGrOwj2KZhjd1Aa5AKT7AO4_bnSbWccWqNzCmCs0BrQHNyC9GgzzPdd2Jdpp1XNefoSFtYIx87F6lWh2Fvupop-ZXXqTuKL4--VcOOWZe5o0RfxRhQXv1UXiCi7J9hnOnyD2vufArnn3QA_34Zsa2yq9-g_dhTHvDA5fjARXYZ3sxbxlpyR7bfDuboMBgPcMXX2xyoqD1qzAjJCi4ubHLi6hHL0yaquzuc_-jIJItBNQir176aaGsqf5NAbvGfQaMimSs5OiKftHpyYfdzsXbb0gszncVVwxtCov0y4Y2WK9znv5V1e2yJFW875VVE3FOLOZ5GrVOVq3FG7JRL4hKVAOnnUg0wrP090gjBN0dDFCS8t0i8ICc0R5kA=s83-c"
            />
          </span>
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={(e) => e.preventDefault()}
        >
          Action
        </a>
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={(e) => e.preventDefault()}
        >
          Another action
        </a>
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={(e) => e.preventDefault()}
        >
          Something else here
        </a>
        <div className="h-0 my-2 border border-solid border-blueGray-100" />
        <a
          href="#pablo"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={(e) => e.preventDefault()}
        >
          Seprated link
        </a>
      </div>
    </>
  );
};

export default UserDropdown;
