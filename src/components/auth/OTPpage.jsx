"use client";
import Link from "next/link";
import React, { useRef, useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { UserContext } from "@/lib/UserContext";
import Cookies from "js-cookie";

const OTPpage = ({ setIsOtp, mobileNumber }) => {
  const inputRefs = useRef(Array.from({ length: 4 }, () => React.createRef()));
  const [authenticated, setAuthenticated] = useContext(UserContext);
  const [otp, setOTP] = useState("");
  const [verificationMessage, setVerificationMessage] = useState("");
  const router = useRouter();

  const serverURL = process.env.NEXT_PUBLIC_BASE_API_URL;

  const handleInputChange = (index, event) => {
    const newOTP = [...otp];
    newOTP[index] = event.target.value;
    setOTP(newOTP.join(""));

    if (event.target.value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].current.focus();
    }
  };

  const handleInputKeyPress = (index, event) => {
    if (event.key === "Backspace" && index > 0 && !otp[index]) {
      inputRefs.current[index - 1].current.focus();
    }
  };

  const handleOTPVerification = async () => {
    if (otp.length !== 4) {
      setVerificationMessage("Invalid OTP length. Please enter a 4-digit OTP.");
      return;
    }
    try {
      const response = await axios.post(`${serverURL}/api/v1/verify-otp`, {
        mobileNumber,
        otp,
      });
      if (response.data.message === "OTP verified successfully") {
        const userData = response.data;
        console.log(userData);

        setAuthenticated({
          user: userData?.result?.UserData,
          name: userData.result?.UserData?.name,
          token: userData?.token,
        });
        Cookies.set("token", userData.token);
        router.push("/account/");
      } else {
        setVerificationMessage("Invalid OTP");
      }
    } catch (error) {
      setVerificationMessage(error?.response?.data?.message);
    }
  };

  const [timeInSeconds, setTimeInSeconds] = useState(120);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeInSeconds <= 0) {
        clearInterval(interval);
        setIsOtp(false);
      } else {
        setTimeInSeconds((prevTime) => prevTime - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeInSeconds, router, setIsOtp]);

  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  return (
    <div className="">
      <div className="flex flex-col justify-center rounded-md">
        <div className="flex w-full flex-col sm:max-w-[450px]  justify-between">
          <div className="flex w-full flex-col mb-2">
            <p className="flex-wrap text-[20px] text-center items-center font-semibold mb-4 my-2">
              An OTP has been
            </p>
            <p className="flex-wrap text-xs mb-2 text-center text-gray-500">
              {/* Sent to +917373047323 */}
              Sent to {mobileNumber}
            </p>
          </div>

          <div className="flex w-full justify-center gap-5">
            {inputRefs.current.map((ref, index) => (
              <input
                key={index}
                ref={ref}
                type="text"
                maxLength={1}
                className="w-12 h-12 py-1 border border-gray-400 rounded-md text-center"
                onChange={(event) => handleInputChange(index, event)}
                onKeyDown={(event) => handleInputKeyPress(index, event)}
              />
            ))}
          </div>
        </div>
        {verificationMessage && (
          <p className="text-red-500 text-sm mt-2 m-auto">
            {verificationMessage}
          </p>
        )}
        <div className="w-full flex flex-col my-2">
          <button
            onClick={handleOTPVerification}
            className="w-full text-white my-2 bg-orange-400 rounded-md h-[48px] text-center flex items-center justify-center"
          >
            Submit
          </button>
        </div>

        <div className="w-full mt-5">
          <p className="text-[14px] mb-1 text-center text-gray-400 font-normal">
            Resend OTP in
            <button className="font-semibold hover:font-fontBold text-[16px] mb-2 ml-1 text-black">
              {formattedTime}
            </button>
          </p>
        </div>
        <div className="w-full mt-2">
          <p className="text-[16px] mb-1 text-center text-gray-400 font-normal">
            Having trouble logging in?
            <button className="font-semibold hover:font-fontBold text-[16px] mb-2 text-orange-400">
              Get help
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OTPpage;
