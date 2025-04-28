"use client";
import Image from "next/image";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HiEye } from "react-icons/hi";
import toast from "react-hot-toast";
// import cookie from 'js-cookie';
const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passError, setPassError] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [nameValid, setNameValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validateForm = () => {
    let isValid = true;

    // Validate email
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setEmailValid(false);
      isValid = false;
    } else {
      setEmailValid(true);
    }

    // Validate name
    if (!name) {
      setNameValid(false);
      isValid = false;
    } else {
      setNameValid(true);
    }

    // Validate password
    if (!password) {
      setPasswordValid(false);
      setPassError("Please enter a password");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordValid(false);
      setPassError("Password must be at least 6 characters");
      isValid = false;
    } else {
      setPasswordValid(true);
      setPassError("");
    }

    // Validate confirm password
    if (!confirmPassword) {
      setPasswordsMatch(false);
      setError("Please enter a confirm password");
      isValid = false;
    } else if (password !== confirmPassword) {
      setPasswordsMatch(false);
      setError("Passwords do not match");
      isValid = false;
    } else {
      setPasswordsMatch(true);
      setError("");
    }

    // Validate checkbox
    if (!isChecked) {
      isValid = false;
      setError("Please tick checkbox");
    }

    return isValid;
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/userSignUp`,
        {
          name,
          email,
          password,
        }
      );
      setLoading(false);
      if (response.data.message === "Email already exist") {
        setError("Email already exists. Please use a different email.");
        toast.error(response?.data?.message);
      }
      const responseData = response.data;

      if (responseData && responseData.email === email) {
        router.push("/account/login");
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    if (newPassword.length < 6) {
      setPasswordValid(false);
      setPassError("Password must be at least 6 characters");
    } else {
      setPasswordValid(true);
      setPassError("");
    }

    // Also check if passwords match in case confirmPassword has already been entered
    if (confirmPassword && newPassword !== confirmPassword) {
      setPasswordsMatch(false);
      setError("Passwords do not match");
    } else {
      setPasswordsMatch(true);
      setError("");
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);

    if (password !== newConfirmPassword) {
      setPasswordsMatch(false);
      setError("Passwords do not match");
    } else {
      setPasswordsMatch(true);
      setError("");
    }
  };

  return (
    <div className="flex items-center justify-center sm:h-full h-[50vh] py-4 sm:justify-start sm:items-start">
      <div className="sm:pl-4 flex sm:w-[480px] h-fit sm:ml-20 w-[340px] bg-white flex-col mx-29 p-3 justify-center rounded-md">
        <div className="flex justify-center items-center sm:w-[440px]  mt-4 mb-3">
          <Image
            width={200}
            height={200}
            src={"/images/NameLogo.png"}
            className="ml-[-100px] sm:w-[260px] w-[210px] h-[47px] sm:ml-0 sm:h-[60px] sm:justify-center sm:items-center"
            alt="Logo"
          />
        </div>
        <div className="flex w-full flex-col sm:max-w-[450px]  justify-between">
          <div className="flex flex-col w-full mb-2">
            <p className="flex-wrap items-center my-2 mb-4 text-xl font-semibold text-center">
              Create Account
            </p>
            <p className="flex-wrap mb-2 text-xs text-center text-gray-500">
              One last step before starting your free trail
            </p>
          </div>
          <div className="flex flex-col w-full">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className={`w-full h-[47px] px-2 py-1 border border-gray-400 rounded-md ${
                !emailValid ? "border-red-500" : ""
              }`}
            />
            {!emailValid && (
              <p className="text-xs text-red-500">Invalid email address</p>
            )}
          </div>
          <div className="flex justify-between grid-flow-row gap-4 my-3">
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              className={`w-full border h-[47px] max-md:mr-3 border-gray-400 py-1 px-2 rounded-md ${
                !nameValid ? "border-red-500" : ""
              }`}
            />
          </div>
          {!nameValid && (
            <p className="text-xs text-red-500">First name is required</p>
          )}
          <div className="justify-between grid-flow-col max-md:gap-3">
            <div className="relative flex">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                className={`flex border w-full h-[47px] border-gray-400 py-1 px-2 rounded-md my-2 ${
                  !passwordValid ? "border-red-500" : ""
                }`}
              />
              <HiEye
                name="eye-fill"
                onClick={togglePasswordVisibility}
                className="absolute transform -translate-y-1/2 right-2 top-1/2 hover:cursor-pointer"
              />
            </div>
            {!passwordValid && (
              <p className="text-xs text-red-500">{passError}</p>
            )}
            <div className="relative flex">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className={`flex border w-full h-[47px] border-gray-400 py-1 px-2 rounded-md my-2 ${
                  !passwordsMatch ? "border-red-500" : ""
                }`}
              />
              <HiEye
                name="eye-fill"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute transform -translate-y-1/2 right-2 top-1/2 hover:cursor-pointer"
              />
            </div>
          </div>
          {!passwordsMatch && <p className="text-xs text-red-500">{error}</p>}

          <div className="flex">
            <input
              type="checkbox"
              className="w-4 h-4 mr-2 accent-orange-400"
              checked={isChecked}
              onChange={handleCheckboxChange}
              required={isChecked}
            />
            <p className="flex mb-2 text-xs text-gray-500 ">
              <span className="text-xs mb-2 text-[14px] text-gray-500">
                By proceeding, you agree to the{" "}
              </span>{" "}
              <button className="mx-1 mb-2 text-xs font-semibold text-orange-400 hover:drop-shadow-xl">
                {" "}
                Terms and Conditions{" "}
              </button>{" "}
              and{" "}
              <button className="mx-1 mb-2 text-xs font-semibold text-orange-400 hover:drop-shadow-xl">
                {" "}
                Privacy Policy
              </button>
            </p>
          </div>
          <p className="text-red-500 text-sm font-bold">{error}</p>
          <button
            className="flex flex-col w-full my-1"
            type="submit"
            onClick={handleRegister}
            disabled={loading}
          >
            <div
              className={`${
                loading ? "opacity-30" : "opacity-100"
              } w-full text-white my-2 bg-orange-400  rounded-md h-[48px] p-1 text-center flex items-center justify-center`}
            >
              {loading ? "Loading..." : "Create Account"}
            </div>
          </button>
        </div>

        <div className="w-full">
          <p className="mb-1 text-xs font-semibold text-center text-gray-400">
            Already have a Trialshopy ID?
            <Link
              href={"/account/login"}
              className="mb-2 text-sm font-semibold text-orange-400 hover:font-fontBold"
            >
              {" "}
              Log In{" "}
            </Link>
          </p>
        </div>
        <div className="flex flex-row justify-center mb-1">
          <button className="text-[14px] mb-1 text-gray-600 mx-2 hover:font-semibold">
            {" "}
            Help
          </button>
          <button className="text-[14px] mb-1 text-gray-600 mx-2 hover:font-semibold">
            Privacy
          </button>
          <button className="text-[14px] mb-1 text-gray-600 mx-2 hover:font-semibold">
            Terms
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
