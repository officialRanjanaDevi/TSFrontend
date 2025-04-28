"use client";
import React, { useContext, useEffect } from "react";
import { AccountData_top } from "./AccountData";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { UserContext } from "@/lib/UserContext";
import Cookies from "js-cookie";

const Account = () => {
  const [authenticated, setAuthenticated] = useContext(UserContext);
  const router = useRouter();

  const signInClick = () => {
    router.push("/account/login");
  };

  const signOutClick = async () => {
    try {
      localStorage.clear();
      Cookies.remove("token");
      setAuthenticated({ user: {}, name: "", token: "" });

    
    } catch (err) {
      console.error("Error logging out", err);
    }
  };

  return (
    <>
      <div className="w-fit md:flex">
        <div className="h-full ">
          {authenticated?.name ? (
            <>
              <div className="w-full grid grid-cols-2 md:grid-cols-3">
                {AccountData_top.map((item, index) => (
                  <Link
                    href={item.link}
                    key={index}
                    className="p-1 md:p-5 mx-2 md:mx-4 mb-4 border-[0.3px] border-[#a5a4a4] hover:border-primary rounded-[3px]"
                  >
                    <div className="flex justify-center">
                      <Image
                        width={20}
                        height={20}
                        className="w-7 h-7 md:w-10 md:h-10"
                        src={`/images/account/${item.img}.svg`}
                        alt={item.heading}
                      />
                    </div>
                    <div className="flex justify-center text-center md:text-[16px] text-[14px] font-semibold mt-2">
                      {item.heading}
                    </div>
                    <div className="flex justify-center text-center mt-2 md:text-[14px] text-[12px] text-[#7C7C7C]">
                      {item.details}
                    </div>
                  </Link>
                ))}
              </div>
              <button
                onClick={signOutClick}
                className="ml-4 mb-6 px-6 py-3 w-fit bg-[#EB8105] text-[#FFFFFF]"
              >
                LOG OUT
              </button>
            </>
          ) : (
            <button
              onClick={signInClick}
              className="ml-4 mb-6 px-6 py-3 w-fit bg-[#EB8105] text-[#FFFFFF]"
            >
              LOG IN
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Account;
