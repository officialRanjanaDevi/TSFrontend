"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

function ContactUs() {
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [emailValid, setEmailValid] = useState(true);
  const [phoneNumberValid, setPhoneNumberValid] = useState(true);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const setContact = async () => {
    if(!formData.firstName ||!formData.email ||!formData.phone||!  formData.message){
      toast.error("Missing Fields");
      return;
    }
    await axios
      .post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/portfolio/contactform`, {
        firstname: formData.firstName,
        lastname: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      })
      .then((res) => {
        console.log("Response:", res.data);
        toast.success("Your message has been sent successfully!");

        // setTimeout(() => {
        // 	window.location.href = '/';
        // }, 2000);
      })
      .catch((err) => {
        toast.error("Something went wrong!");
      });
  };

  const notify = () => {
    toast.success("Your message has been sent successfully!");
    // setTimeout(() => {
    // 	window.location.href = '/';
    // }, 2000);
  };
  const validateEmail = (value) => {
    const isValid = /^\S+@\S+\.\S+$/.test(value);
    setEmailValid(isValid);
    return isValid;
  };
  const validatePhoneNumber = (value) => {
    const isValidPhoneNumber = /^\d{10}$/g.test(value);

    setPhoneNumberValid(isValidPhoneNumber);

    return isValidPhoneNumber;
  };

  return (
    <div className="flex flex-col items-center min-h-screen my-10 md:flex-row justify-evenly sm:items-start md:gap-2 lg:gap-20">
      <div className="mt-11 flex flex-col md:flex-row">
        <div className="w-full md:w-[350px] lg:w-[431px] h-[590px] gap-[30px]  lg:mt-[10px] lg:ml-[15px]">
          <div className="w-full md:w-[350px] h-[520px] gap-[30px]">
            <div className="w-full md:w-[350px] h-[191px] gap-[35px]">
              <div className="w-full md:w-[350px] h-[78px] gap-[10px]">
                <label
                  className="text-base text-[#27272A] font-medium font-poppins h-[24px] "
                  style={{ whiteSpace: "nowrap" }}
                >
                  First Name
                </label>
                <br />
                <div className="border-b-[1px] border-gray-500 pt-[10px] pb-[10px] w-full gap-[10px]">
                  <input
                    value={formData.firstName}
                    name="firstName"
                    type="text"
                    placeholder="Enter first name"
                    className="text-base inline font-normal font-poppins h-[24px] w-full focus-visible:outline-none"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="w-full md:w-[350px] h-[78px] gap-[10px] mt-[15px]">
                <label
                  className="text-base text-[#27272A] font-medium font-poppins h-[24px]"
                  style={{ whiteSpace: "nowrap" }}
                >
                  Last Name
                </label>
                <br />
                <div className="border-b-[1px] border-gray-500 pt-[10px] pb-[10px] w-full gap-[10px]">
                  <input
                    value={formData.lastName}
                    name="lastName"
                    type="text"
                    placeholder="Enter last name"
                    className="text-base font-normal font-poppins h-[24px] w-full focus-visible:outline-none"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="w-full md:w-[350px] h-[191px] gap-[35px] md:mt-0 md:ml-0">
              <div className="w-full md:w-[350px] h-[78px] gap-[10px] mb-[5px]">
                <label
                  className="text-base text-[#27272A] gap-[10px] font-medium font-poppins h-[24px]"
                  style={{ whiteSpace: "nowrap" }}
                >
                  Email Address
                </label>
                <br />
                <div className="border-b-[1px] border-gray-500 pt-[10px] pb-[10px] w-full gap-[10px]">
                  <input
                    value={formData.email}
                    name="email"
                    type="text"
                    placeholder="Enter email address"
                    className="text-base font-normal font-poppins h-[24px] w-full focus-visible:outline-none"
                    onChange={(e) => {
                      handleChange(e);
                      setEmailValid(validateEmail(e.target.value));
                    }}
                  />
                  {!emailValid && (
                    <p className="text-red-500 text-xs">
                      Invalid email address
                    </p>
                  )}
                </div>
              </div>

              <div className="w-full md:w-[350px] h-[50px] gap-[78px] mt-[15px]">
                <label
                  className="text-base text-[#27272A] gap-[10px] font-medium font-poppins h-[24px]"
                  style={{ whiteSpace: "nowrap" }}
                >
                  Phone Number
                </label>
                <br />
                <div className="border-b-[1px] border-gray-500 pt-[10px] pb-[10px] w-full gap-[10px]">
                  <input
                    value={formData.phone}
                    type="text"
                    name="phone"
                    placeholder="Enter phone number"
                    className="text-base font-normal font-poppins h-[24px] w-full focus-visible:outline-none"
                    onChange={(e) => {
                      handleChange(e);
                      validatePhoneNumber(e.target.value);
                    }}
                  />
                  {!phoneNumberValid && (
                    <p className="text-red-500 text-xs">Invalid phone number</p>
                  )}
                </div>
              </div>
            </div>

            <div className="w-full md:w-[350px] h-[78px] gap-[10px]">
              <label
                className="text-base text-[#27272A] gap-[10px] font-medium font-poppins h-[24px]"
                style={{ whiteSpace: "nowrap" }}
              >
                Enter your message
              </label>
              <br />
              <div className="border-b-[1px] border-gray-500 pt-[10px] pb-[10px] w-full gap-[10px]">
                <input
                  value={formData.message}
                  type="text"
                  name="message"
                  placeholder="Enter your message"
                  className="text-base font-normal font-poppins h-[24px] w-full focus-visible:outline-none"
                  onChange={handleChange}
                />
              </div>
            </div>

            <button
              className=" rounded-xl h-[40px] w-[206px] bg-[#EB8105] font-poppins justify-center text-base font-normal "
              style={{ whiteSpace: "nowrap" }}
              onClick={() => {
                setContact();
              }}
            >
              Submit
            </button>
            <ToastContainer autoClose={1000} />
          </div>
        </div>
      </div>
      <div>
        <div className="md:w-[693px] w-full h-[250px] my-10 ">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3597.5238689987764!2d85.17031087485125!3d25.620733214416795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed59f905b8145f%3A0xe6a3e08803d0a1a1!2sTrialshopy%20Marketplace%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1706387392577!5m2!1sen!2sin"
            width="100%"
            height="250"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="border-[1px] border-[#gray2] sm:w-[400px] rounded-2xl ">
          <div className="p-5">
            <div className="text-3xl font-bold">Contact Info</div>
            <div className="py-5">
              <p className="text-xl font-bold">EMAIL US</p>
              <p className="pt-3">customercare@trialshoppy.com</p>
            </div>
            <div>
              <p className="pb-4 text-xl font-bold">KEEP IN TOUCH</p>

              <div className="flex gap-2">
                <Image
                  width={500}
                  height={500}
                  className="w-[32px] h-[32px] hover:scale-110 transition duration-300 ease-in-out hover:cursor-pointer"
                  src={"/images/Instagram.svg"}
                  alt="Instagram"
                  onClick={() => {
                    window.location.href =
                      "https://instagram.com/trialshopy?igshid=MzRlODBiNWFlZA==";
                  }}
                />
                <Image
                  width={500}
                  height={500}
                  className="w-[32px] h-[32px] hover:scale-110 transition duration-300 ease-in-out hover:cursor-pointer"
                  src={"/images/Facebook.svg"}
                  alt="Facebook"
                  onClick={() => {
                    window.location.href = "https://www.facebook.com/";
                  }}
                />
                <Image
                  width={500}
                  height={500}
                  className="w-[32px] h-[32px] hover:scale-110 transition duration-300 ease-in-out hover:cursor-pointer"
                  src={"/images/Twitter.svg"}
                  alt="Twitter"
                  onClick={() => {
                    window.location.href = "https://twitter.com/";
                  }}
                />
                <Image
                  width={500}
                  height={500}
                  className="w-[32px] h-[32px] hover:scale-110 transition duration-300 ease-in-out hover:cursor-pointer"
                  src={"/images/Youtube.svg"}
                  alt="YouTube"
                  onClick={() => {
                    window.location.href =
                      "https://youtube.com/@TrialshopyOfficial";
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
