"use client";
import React, { useState, useEffect, useContext } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import axios from "axios";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";
import { UserContext } from "@/lib/UserContext";
import toast from "react-hot-toast";

const LoginwithPwd = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.get("ret");
  const [authenticated, setAuthenticated] = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const storedRememberedEmail = localStorage.getItem("rememberedEmail");
    // const storedRememberedPassword = localStorage.getItem("rememberedPassword");

    if (storedRememberedEmail) {
      setEmail(storedRememberedEmail);
      // setPassword(storedRememberedPassword);
      setRememberMe(true);
    }
  }, []);

  const validateEmail = (value) => {
    const lowercaseEmail = value.toLowerCase();

    if (!lowercaseEmail || !/^\S+@\S+\.\S+$/.test(lowercaseEmail)) {
      setEmailValid(false);
      return false;
    }

    setEmailValid(true);
    return true;
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRememberMeChange = (e) => {
    const isChecked = e.target.checked;
    setRememberMe(isChecked);
  };

  const handleLogin = async () => {
    setEmailError("");
    setPasswordError("");
    setLoginError("");

    if (!email) {
      setEmailError("Email is required");
      return;
    }

    if (!password) {
      setPasswordError("Password is required");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/login`,
        {
          email: email.toLowerCase(),
          password,
          userType: "customer",
        }
      );

      if (response?.data?.result?.Login !== "Successful") {
        setLoginError(response.data.error);
      } else {
        const userData = response.data;
        console.log(userData);

        setAuthenticated({
          user: userData?.result?.UserData,
          name: userData.result?.UserData?.name,
          token: userData?.token,
        });
        if (rememberMe) {
          localStorage.setItem("rememberedEmail", email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }

        Cookies.set("token", userData.token, { expires: 14 });
        if (pathname === "/account/login") {
          if (search) {
            router.push(search);
          } else {
            router.push("/");
          }
        } else {
          window.location.reload();
        }
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setLoginError("Error logging in. Please try again.");
      toast.error(error?.response?.data?.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex w-full flex-col mb-2">
        <p className="flex-wrap text-xl text-center items-center font-semibold my-2">
          Login
        </p>
        <p className="flex-wrap text-xs mb-2 text-center text-gray-500">
          Continue to Trialshopy
        </p>
      </div>
      <div className="flex w-full flex-col">
        <input
          type="email"
          placeholder="Email"
          className={`w-full h-[47px] px-2 py-1 border border-gray-400 rounded-md ${
            emailError ? "border-red-500" : ""
          }`}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            validateEmail(e.target.value);
          }}
          required
        />
        {!emailValid && (
          <p className="text-red-500 text-xs">Invalid email address</p>
        )}
        {emailError && <p className="text-red-500 text-xs">{emailError}</p>}
      </div>
      <div className="grid-flow-col max-md:gap-3 justify-between">
        <div className="relative flex">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className={`flex border w-full h-[47px] border-gray-400 py-1 px-2 rounded-md my-2 ${
              passwordError ? "border-red-500" : ""
            }`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            name="eye-fill"
            onClick={togglePasswordVisibility}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:cursor-pointer"
          >
            {showPassword ? <HiEyeOff /> : <HiEye />}
          </span>
        </div>
        {passwordError && (
          <p className="text-red-500 text-xs">{passwordError}</p>
        )}
        {loginError && <p className="text-red-500 text-xs">{loginError}</p>}

        <div className="flex justify-between">
          <Link
            href={"/account/forgotPwd"}
            className="text-xs mb-2 text-[14px] text-gray-900 cursor-pointer"
          >
            Forgot Password ?
          </Link>
          <div className="flex justify-center">
            <input
              type="checkbox"
              className="w-4 h-4 mr-2 accent-orange-400"
              checked={rememberMe}
              onChange={handleRememberMeChange}
            />
            <span className="text-xs mb-2 text-[14px] text-gray-900">
              Remember Me
            </span>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col my-1">
        <button
          onClick={handleLogin}
          disabled={loading}
          className={`${
            loading ? "opacity-30 !important" : "opacity-100"
          }w-full text-white my-2 bg-orange-400 rounded-md h-[48px] text-center flex items-center justify-center`}
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </div>
    </>
  );
};

export default LoginwithPwd;
