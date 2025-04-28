import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { SlGlobe } from "react-icons/sl";
import { IoArrowBack } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { UserContext } from "@/lib/UserContext";
import { toast } from "react-toastify";
import { Carousel, Checkbox, Image } from "antd";
import { SampleNextArrow, SamplePrevArrow } from "../pages/homepage/NearBy";

const ScheduleVideoCall = ({
  handleConfirmation,
  handleBack,
  handleScheduleVideo,
  setSelectedFinalTime,
}) => {
  const [selectedDuration, setSelectedDuration] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");

  const durations = [
    { value: "15", label: "15 min" },
    { value: "30", label: "30 min" },
    { value: "60", label: "60 min" },
  ];

  const generateTimeSlots = (duration) => {
    const slots = [];
    const currentTime = new Date();

    const interval = duration === "15" ? 15 : duration === "30" ? 30 : 60;

    for (let i = 0; i < 4; i++) {
      const time = new Date(currentTime.getTime() + i * interval * 60000);
      const formattedTime = time.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
      });
      slots.push({ value: formattedTime, label: `${formattedTime} (Today)` });
    }

    return slots;
  };

  const handleDurationChange = (e) => {
    setSelectedDuration(e.target.value);
    setSelectedTimeSlot("");
  };

  const handleTimeSlotChange = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
  };

  const handleConfirm = () => {
    if (!selectedTimeSlot) {
      setConfirmationMessage("Please choose a time slot first.");
      return;
    }

    handleConfirmation(selectedTimeSlot);
    setSelectedFinalTime(selectedTimeSlot);
    setConfirmationMessage(`Confirmed for ${selectedTimeSlot}, Today`);
  };

  return (
    <div className="container mx-auto p-4 relative">
      <div className="flex items-center justify-between mb-4 absolute top-0 left-0 right-0">
        <IoArrowBack className="text-2xl cursor-pointer" onClick={handleBack} />
        <RxCross2
          className="text-2xl cursor-pointer"
          onClick={() => handleConfirmation()}
        />
      </div>
      <h1 className="text-3xl font-bold mb-4">Schedule a video call</h1>
      <p className="text-gray-700 mb-4">
        Get connected by scheduling a call with one of our agents.
      </p>
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Meeting duration</h2>
        <p className="text-gray-700 mb-2">
          Please select the preferred meeting duration.
        </p>
        <div className="flex flex-wrap gap-4">
          {durations.map((duration) => (
            <button
              key={duration.value}
              className={`rounded-lg px-4 py-2 text-gray-700 border border-gray-300 ${
                selectedDuration === duration.value
                  ? "hover:bg-gradient-to-t from-[#EB8105] to-[#FAAC06] text-black"
                  : "hover:bg-gray-100"
              }`}
              value={duration.value}
              onClick={handleDurationChange}
            >
              {duration.label}
            </button>
          ))}
        </div>
      </div>
      {selectedDuration && (
        <div className="mb-4">
          <h2 className="font-poppins text-xl font-bold mb-2">
            Available time slot
          </h2>
          <p className="font-poppins text-gray-700 mb-2">
            What time would you prefer?
          </p>
          <div className="flex flex-wrap gap-4">
            {generateTimeSlots(selectedDuration).map((slot) => (
              <button
                key={slot.value}
                className={`rounded-lg px-4 py-2 text-gray-700 border border-gray-300 ${
                  selectedTimeSlot === slot.value
                    ? "hover:bg-gradient-to-t from-[#EB8105] to-[#FAAC06] text-black"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => handleTimeSlotChange(slot.value)}
              >
                {slot.label}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="flex items-center justify-center">
        <button
          className="font-poppins bg-gradient-to-t from-[#EB8105] to-[#FAAC06] rounded-lg bg-blue-500 text-black px-4 py-2 disabled:opacity-50"
          disabled={!selectedDuration || !selectedTimeSlot}
          onClick={handleConfirm}
        >
          Confirm for {selectedTimeSlot}, Today
        </button>
      </div>
      {confirmationMessage && (
        <p className="text-red-500 mt-4">{confirmationMessage}</p>
      )}
      <p className="text-sm text-gray-500 flex items-center justify-center bg-gray-100 rounded-full py-1 px-2 mt-4">
        <SlGlobe className="h-5 w-5 mr-2 text-gray-500" />
        (GMT+05:30) Asia/Kolkata
      </p>
    </div>
  );
};

const ScheduleVideo = ({ storeId, setShowScheduleVideo }) => {
  const [title, setTitle] = useState("");
  const [currentPage, setCurrentPage] = useState("main");
  const [error, setError] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [authenticated, setAuthenticated] = useContext(UserContext);
  const [selectedFinalTime, setSelectedFinalTime] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/livedemo/${authenticated.user._id}/${storeId}`
        );
        setProducts(response.data.items);
        console.log(response.data, "response");
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    if (authenticated.user && authenticated.user._id) {
      fetchProducts();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("selectedProducts", selectedProducts);

    if (!title || !selectedFinalTime || selectedProducts.length < 1) {
      setError(
        `Please ${!title && "enter your video title"} ${
          !selectedFinalTime && "set the start time before scheduling"
        } ${selectedProducts.length < 1 && "select atleast one product"}.`
      );
      setSuccessMessage("");
      return;
    }

    try {
      setError(false);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/schedule`,
        {
          purpose: title,
          userId: authenticated.user?._id,
          storeId: storeId,
          products: selectedProducts,
          date: new Date(),
          time: selectedFinalTime,
        }
      );
      setCurrentPage("hidden");
      setSuccessMessage(
        `Scheduled successfully for ${selectedFinalTime || title}`
      );
      console.log(response.data, "lets check together");
      toast.success(`Scheduled successfully for ${title}`);
    } catch (error) {
      console.error("Error scheduling appointment:", error);
      setError("Error scheduling appointment");
      toast("Error scheduling appointment");
    }
  };

  const handleArrowClick = () => {
    setCurrentPage("new-page");
  };

  const handleConfirmationAndRemove = () => {
    console.log("Appointment confirmed");
    setCurrentPage("main");
    setError(false);

    setTimeout(() => {
      setCurrentPage("main");
    }, 1000);
  };

  const handleBack = () => {
    setCurrentPage("main");
  };

  const handleScheduleVideo = () => {
    if (!title) {
      setError("Please set the start time before scheduling.");
      setSuccessMessage("");
    } else {
      setError(false);
      setCurrentPage("hidden");
    }
  };

  const handleProductChange = (productId) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(productId)
        ? prevSelected.filter((id) => id !== productId)
        : [...prevSelected, productId]
    );
  };

  const settings = {
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    draggable: true,
    // autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
        breakpoint: 400,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ${
        currentPage === "hidden" ? "hidden" : ""
      }`}
    >
      <div className="bg-white p-8 rounded-md shadow-md max-w-screen-xl max-h-screen-md flex flex-col">
        {currentPage === "main" && (
          <>
            <div className="flex items-center mb-4">
              <div className="flex flex-col w-full">
                <div className="flex justify-between items-center relative">
                  <h1 className="font-poppins text-2xl font-semibold leading-8 mb-2 py-3">
                    Schedule Video
                  </h1>
                  <div className="flex mb-4 absolute top-0 right-0">
                    <RxCross2
                      className="text-2xl cursor-pointer"
                      onClick={() => {
                        setCurrentPage("hidden");
                        setShowScheduleVideo(false);
                      }}
                    />
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Add Title..."
                    required
                    className="font-poppins shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder-my-2 placeholder-py-10 placeholder-px-5"
                  />
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h2 className="font-bold mb-2">Choose Products</h2>
              <Carousel
                {...settings}
                className="flex flex-wrap gap-4 mb-4 max-w-[600px]"
              >
                {products.map((product) => {
                  return (
                    <div key={product._id} className="p-1 relative">
                      <div className="border relative rounded-lg p-2 flex bg-blue-50 flex-col">
                        <Image
                          src={product?.productImage}
                          alt={product.productName}
                          className="object-cover mb-2"
                          width={100}
                          height={100}
                        />
                        <Checkbox
                          checked={selectedProducts.includes(product._id)}
                          onChange={() => handleProductChange(product._id)}
                          className="absolute top-2 text-xs bg-blue-50 px-3 py-2 rounded-br-lg"
                        >
                          Select
                        </Checkbox>
                        <div className="whitespace-nowrap w-[100px] overflow-x-auto">
                          {product.productName}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Carousel>
            </div>
            <div className="flex items-center gap-4 py-3">
              <label
                htmlFor="start-time"
                className="font-poppins text-lg leading-8 tracking-normal text-left font-bold"
              >
                {selectedFinalTime ? selectedFinalTime : "Start Time"}
              </label>

              <button
                onClick={handleArrowClick}
                className="ml-auto focus:outline-none"
              >
                <MdOutlineArrowForwardIos className="text-xl" />
              </button>
            </div>
            {error && (
              <p className="font-poppins text-red-500 text-sm mb-2">{error}</p>
            )}
            <p className="font-poppins text-gray-600 mb-4 py-4 text-sm font-bold">
              Your scheduled live video will appear on your profile.
            </p>
            <form onSubmit={handleSubmit}>
              <button
                type="submit"
                onClick={() => setShowScheduleVideo(true)}
                className="font-poppins rounded bg-gradient-to-t from-[#EB8105] to-[#FAAC06] py-3 px-4 mx-auto mt-auto block cursor-pointer"
              >
                Schedule live video
              </button>
            </form>
          </>
        )}

        {currentPage === "new-page" && (
          <ScheduleVideoCall
            handleConfirmation={handleConfirmationAndRemove}
            handleBack={handleBack}
            handleScheduleVideo={handleScheduleVideo}
            setSelectedFinalTime={setSelectedFinalTime}
          />
        )}

        {currentPage === "success" && (
          <div>
            {successMessage && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-8 rounded-md shadow-md max-w-screen-md">
                  <h2>{successMessage}</h2>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleVideo;
