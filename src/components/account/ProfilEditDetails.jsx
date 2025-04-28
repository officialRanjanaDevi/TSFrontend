"use client";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "@/lib/UserContext";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Spin } from "antd";

import { MdOutlinePhotoCamera } from "react-icons/md";
import toast from "react-hot-toast";
const ProfileEditDetails = () => {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useContext(UserContext);
  const [imageInputHover, setImageInputHover] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(authenticated.user?.name || "");
  const [email, setEmail] = useState(authenticated.user?.email || "");
  const [mobileNumber, setMobileNumber] = useState(
    authenticated.user?.phone_number || ""
  );
  const [gender, setGender] = useState(authenticated.user?.gender || "");
  const [birthday, setBirthday] = useState(
    authenticated.user?.dateOfBirth || ""
  );
  const [password, setPassword] = useState("");

  const [imageUpload, setImageUpload] = useState(null);
  const [image, setImage] = useState(
    authenticated.user?.profilePic?.url || null
  );

  const serverURL = process.env.NEXT_PUBLIC_BASE_API_URL;
  const handleSubmit = async (e) => {
    const api = `${serverURL}/api/v1/user/${authenticated.user._id}`;
    const formattedMobileNumber = mobileNumber.startsWith("+91")
      ? mobileNumber
      : "+91" + mobileNumber;

    // Gather the updated fields
    const updatedFields = {};
    if (name !== authenticated.user?.name) updatedFields.name = name;
    if (email !== authenticated.user?.email) updatedFields.email = email;
    if (formattedMobileNumber !== authenticated.user?.phone_number)
      updatedFields.phone_number = formattedMobileNumber;
    if (gender !== authenticated.user?.gender) updatedFields.gender = gender;
    if (birthday !== authenticated.user?.dateOfBirth)
      updatedFields.dateOfBirth = birthday;

    try {
      // Call the API only if any fields have changed
      if (Object.keys(updatedFields).length > 0) {
        setLoading(true);
        const response = await axios.put(api, updatedFields);

        const updatedProfile = response.data;
        setAuthenticated((prev) => ({
          ...prev,
          user: { ...prev.user, ...updatedProfile },
        }));

        toast.success("Account Updated Successfully");
      }

      // Upload the image if it has been changed
      if (imageUpload) {
        const api2 = `${serverURL}/api/v1/users/${authenticated.user._id}/uploadProfilePic`;
        const formData = new FormData();
        formData.append("file", imageUpload);

        const response = await axios.post(api2, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        setAuthenticated((prev) => ({
          ...prev,
          user: response.data.data,
        }));

        toast.success("Profile Image Updated Successfully");
      }

      router.push("/account");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("An error occurred while updating your account.");
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = () => {
    const api = `${serverURL}/api/v1/user/${authenticated.user._id}`;

    axios
      .put(api, {
        password: password,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => console.error(err));
  };

  const [fileInfo, setFileInfo] = useState(null);
  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      console.log(file);
      setImageUpload(file);

      const reader = new FileReader();

      reader.onload = (e) => {
        setImage(e.target.result);
      };

      reader.readAsDataURL(file);

      setFileInfo({
        name: file.name,
        lastModified: file.lastModified,
        lastModifiedDate: file.lastModifiedDate,
        size: file.size,
        type: file.type,
      });
    }
  };


  useEffect(() => {
    if (authenticated && authenticated.user) {
      setName(authenticated.user?.name || "");
      setEmail(authenticated.user?.email || "");
      setMobileNumber(authenticated.user?.phone_number || "");
      setGender(authenticated.user?.gender || "");
      setBirthday(authenticated.user?.dateOfBirth || "");
      setImage(authenticated.user?.profilePic?.url || "/images/man.svg");
    }
  }, [authenticated]);

  return (
    <div className="w-full flex flex-col items-start gap-4 flex-none">
      <div
        className={`w-24 h-24 rounded-full overflow-hidden`}
        style={{ position: "relative" }}
        onMouseEnter={() => setImageInputHover(true)}
        onMouseLeave={() => setImageInputHover(false)}
      >
        <img
          key={image} // Add key here
          src={image || "/images/man.svg"}
          width={300}
          height={300}
          alt={authenticated.user.name}
          className={`${
            imageInputHover
              ? "opacity-50 w-full h-full"
              : "opacity-100 w-full h-full"
          }`}
        />

        <div
          className={`absolute top-0 left-0 h-full w-full flex justify-center items-center ${
            imageInputHover ? "bg-gray-300 bg-opacity-75" : "bg-opacity-0"
          }`}
        >
          <MdOutlinePhotoCamera size={25} />
          <input
            type="file"
            className="absolute inset-0 opacity-0"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
      </div>

      <div className="w-full font-medium flex items-center text-[#18181B] px-1 md:px-6">
        Edit Details
      </div>
      <div className="w-full px-1 md:px-6">
        <label>
          <input
            className="box-border flex flex-row items-start p-2 w-full border border-gray-500 mt-0"
            placeholder="Full Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />

        <label>
          <input
            className="box-border flex flex-row items-start p-2 gap-2 w-full border border-gray-500 "
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled
          />
        </label>
        <br />

        {/* <div className="w-full text-base leading-[150%] flex items-center text-gray-500 p-0">
							Mobile Number
						</div> */}
        <input
          className="box-border flex flex-row items-start p-2 gap-2 w-full border border-gray-500"
          placeholder="Mobile Number"
           minLength={10}
          maxLength={10}
          type="tel"
          value={mobileNumber}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, ""); 
            setMobileNumber(value);
          }}
          // disabled={mobileNumber !== "" ? true : false}
        />

        <br />
        <div className="w-full flex items-center justify-between">
        <label className="flex flex-row justify-start items-center gap-4">
  {/* Male */}
  <label className="flex items-center gap-2 p-2 border border-gray-400 rounded-md cursor-pointer">
    <input
      className="w-4 h-4 accent-orange-400 outline-none"
      type="radio"
      value="male"
      checked={gender === "male"}
      onChange={() => setGender("male")}
    />
    Male
  </label>

  {/* Female */}
  <label className="flex items-center gap-2 p-2 border border-gray-400 rounded-md cursor-pointer">
    <input
      className="w-4 h-4 accent-orange-400 outline-none"
      type="radio"
      value="female"
      checked={gender === "female"}
      onChange={() => setGender("female")}
    />
    Female
  </label>

  {/* Other */}
  <label className="flex items-center gap-2 p-2 border border-gray-400 rounded-md cursor-pointer">
    <input
      className="w-4 h-4 accent-orange-400 outline-none"
      type="radio"
      value="other"
      checked={gender === "other"}
      onChange={() => setGender("other")}
    />
    Other
  </label>
</label>

        </div>
        <br />
        <div className=" box-border flex flex-row items-start p-2 gap-2  border border-gray-400 ">
          <div className="flex items-center text-base font-normal leading-6 text-gray-700 w-168 h-21">
            Birthday
          </div>
          <label>
            <input
              placeholder="Birthday"
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              className="outline-none"
            />
          </label>
        </div>
        <br />

        {/* <label>
					<input
						className="box-border flex flex-row items-start p-2 gap-2 w-full border border-gray-400 "
						placeholder="Location"
						type="text"
						value={location}
						onChange={(e) => setLocation(e.target.value)}
					/>
				</label> */}

        {/* <br />
				<label>
					<input
						className="box-border flex flex-row items-start p-3 gap-2 w-full h-[48px] border border-gray-400"
						placeholder="Hint name"
						type="text"
						value={nickname}
						onChange={(e) => setNickname(e.target.value)}
					/>
				</label> */}
        <button
          className="w-fit rounded-lg shadow-md bg-gray-800 text-white my-4 mx-1 p-2"
          onClick={() => handleSubmit()}
        >
          {loading ? (
            <>
              <Spin /> <span>Updating Profile</span>
            </>
          ) : (
            "UPDATE ACCOUNT"
          )}
        </button>

        <Link href={"/account/forgotPwd"}>
          <button className="w-fit rounded-md border border-gray-800 text-gray-800 my-4 mx-1 p-2">
            CHANGE PASSWORD
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProfileEditDetails;
