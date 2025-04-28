import React, { useState ,useEffect} from "react";
import { StoreData_q_ans, Category_data } from "../store/StoreData";
import Image from "next/image";
import ProductCard from "./../categories/ProductCard";
import axios from "axios";
import assets from "../pages/homepage/images/assets";
const img_fashion = "/images/img_fashion.jpeg";


const StoreOverview = ({ storeData }) => {
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const serverURL = process.env.NEXT_PUBLIC_BASE_API_URL;
  const [categories,setCategories]=useState([]);
  const [storeId,setStoreId]=useState(storeData._id)
  const [sponseredProducts,setSponseredProducts]=useState([])
  const showInMapClicked = () => {
    window.open(
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d16511.109430683427!2d85.11972766913765!3d25.598091669844326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed58688297a6f3%3A0x7b2558c82fd5ff4b!2sPatna%20Junction%20railway%20station!5e0!3m2!1sen!2sin!4v1687505895431!5m2!1sen!2sin"
    );
  };
  const handleAskQuestionClick = () => {
    setShowQuestionForm(true);
  };

  const handleCloseQuestionForm = () => {
    setShowQuestionForm(false);
  };

  const handleQuestionSubmit = () => {
    setShowQuestionForm(false);
  };
  useEffect(() => {
    axios
      .post(`${serverURL}/api/v1/getStoreProduct/${storeId}`)
      .then((res) => {
          setCategories(res.data.uniqueCategories)

      })
      .catch((err) => console.error(err));
  }, [storeId, serverURL]);
  useEffect(() => {
    // console.log("hii")
    axios
      .get(`${serverURL}/api/v1/sponsoredProducts`)
      .then((res) => {
          setSponseredProducts(res.data)
          // console.log(res.data,"here it is")
      })
      .catch((err) => console.error(err));
  }, []);
 
  // console.log(storeData)
  return (
    <>
      <div className="flex flex-col items-start gap-4 lg:gap-8  w-full">
        <div className="w-full md:min-w-[800px] min-w-[310px] border-[1px] border-[#E6E6E6]"></div>

        <div className="md:w-2/3 my-4 md:mb-6 md:min-w-[816px] min-w-[320px]">
          <div className="md:text-[20px] text-[16px] mb-4 text-[#2D2E2F] font-semibold">
            About the Business
          </div>
         
          <div className="md:text-[16px] text-[14px] text-[#424242] mb-4">
            {storeData?.storeDescription??
              `Additional information about the store goes here`}
          </div>
          <div className="md:text-[16px] text-[14px] text-[#424242] mb-4">
            {storeData?.aboutStore ??
              `Additional information about the store goes here`}
          </div>
          <div className="px-4 py-2 w-fit bg-gradient-to-b from-[#FAAC06] to-[#EB8105] text-[#FFFFFF]">
            <button>Read More</button>
          </div>
        </div>

        <div className="w-full  flex flex-row items-center justify-evenly  min-w-[310px] border-[1px] border-[#E6E6E6]"></div>

        <div className=" h-fit my-4 md:mb-6 w-full lg:w-[80%] flex md:flex-row flex-col items-center justify-between">
          <div className="md:max-w-[320px] md:mb-0 mb-4 ">
            <div className="md:text-[20px] text-[16px] mb-4 text-[#2D2E2F] font-semibold">
              Location & Hours
            </div>
            <div className="md:w-[300px] w-full mb-4">
              <iframe
                title="GoogleMap"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d16511.109430683427!2d85.11972766913765!3d25.598091669844326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed58688297a6f3%3A0x7b2558c82fd5ff4b!2sPatna%20Junction%20railway%20station!5e0!3m2!1sen!2sin!4v1687505895431!5m2!1sen!2sin"
                style={{ border: "0" }}
                height={200}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
            <div className="md:text-[16px] text-[14px] text-[#424242] mb-4">
             {storeData.addressLine} {storeData.city}  {storeData.state}, {storeData.country}
            </div>
            <div className="px-5 py-2 w-fit bg-[#FFF] text-[#5B5B5B] md:text-[16px] text-[14px] border-[1px] border-[#CCC] rounded-[3px]">
              <button onClick={showInMapClicked}>Get directions</button>
            </div>
          </div>

          <div className="w-full md:w-2/3 flex flex-col gap-y-4  md:flex-row justify-between ">

          <div className=" md:ml-20 ml-6 h-fit min-w-60 ">
            <div className="text-black md:text-[18px] font-medium text-[14px] mb-4">
              Open now
            </div>
            <div className="flex">
              <div className="text-[#000] md:text-[18px]  text-[14px]">
                {storeData.openingHours &&
                  storeData.openingHours.map((ele) => (
                    <div key={ele._id} className="capitalize mt-2 font-medium">{ele.dayOfWeek}</div>
                  ))}
              </div>
              <div className="text-[#000] md:text-[18px]  text-[14px] ml-6">
                {storeData.openingHours &&
                  storeData.openingHours.map((ele) => (
                    <div key={ele._id} className=" mt-2">
                      {ele.openTime} - {ele.closeTime}
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="md:ml-20 ml-6">
          <div className="text-black md:text-[18px] font-medium  text-[14px] mb-4">
              Contact us
            </div>
            <div className="text-[14px] md:text-[18px]">
              <p>{storeData?.sellerId?.phoneNumber||"+91 8888888888"}</p>
              <p>{storeData.addressLine}, {storeData.state}</p>
              <p>{storeData?.sellerId?.email ||"store.email@gmail.com"}</p>
              </div>
          </div>
          </div>
        </div>

        <div className="w-full md:min-w-[800px] border-[1px] border-[#E6E6E6]"></div>

        <div className="md:w-2/3 my-4 md:mb-6 md:min-w-[816px] min-w-[320px]">
          <div className="md:text-[20px] text-[16px] text-[#2D2E2F] font-semibold">
            Business Category
           {/* <img src={assets.newBanner}></img> */}

          </div>
          <div className="grid md:grid-cols-3 grid-cols-2 mb-4">
            {categories &&
              categories.map((item, index) => {
                return (
                  <div key={index} className="flex flex-col  items-center mb-4 mt-6">
                    <div>
                      <img
                        className=" w-32 h-32  rounded-full"
                        src={
                          item?.image?.url
                            ? `${item?.image?.url}`
                            : `${assets.mensFashion}`
                        }
                        alt={item.name}
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="md:text-[16px] text-[14px] text-[#333] font-semibold ml-2">
                      {item.name}
                    </div>
                  </div>
                );
              })}
          </div>

          {/* <div className="px-4 py-2 w-fit bg-[#FFF] text-[#5B5B5B] md:text-[16px] text-[14px] border-[1px] border-[#CCC] rounded-[3px]">
						<button>8 More Categories</button>
					</div> */}
        </div>

        <div className="w-full md:min-w-[800px] min-w-[310px] border-[1px] border-[#E6E6E6]"></div>

        <div className="md:w-2/3 my-4 md:mb-6 md:min-w-[816px] min-w-[320px]">
          <div className="md:flex justify-between items-center mb-4">
            <div className="md:text-[20px] md:mb-0 mb-4 text-[16px] text-[#2D2E2F] font-semibold">
              Questions & Answers
            </div>
            <div className="px-4 py-2 w-fit bg-[#FFF] text-[#5B5B5B] md:text-[16px] md:mr-4 text-[14px] border-[1px] border-[#CCC] rounded-[3px]">
              <button onClick={handleAskQuestionClick}>
                Ask a question{" "}
                <span className="text-[16px] ml-2 font-bold">+</span>
              </button>
            </div>
          </div>

          {StoreData_q_ans.map((item, index) => (
            <div key={index} className="md:flex justify-between mb-4">
              <div className="max-w-[500px] mr-6">
                <div className="md:text-[16px] text-[14px] mb-3 text-[#2D2E2F] font-semibold">
                  {item.question}
                </div>
                <div className="md:text-[16px] text-[14px] mb-3 text-[#2D2E2F]">
                  {item.answer}
                </div>
              </div>
              <div className="md:mr-4 flex justify-end md:text-[13px] text-[12px] text-[#2D2E2F]">
                <div className="font-semibold">{item.name}</div>
                <div className="ml-1">{item.time}</div>
              </div>
            </div>
          ))}
          {/* Modal for asking a question */}
          {showQuestionForm && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-8 rounded-md shadow-md max-w-screen-md">
                <div className="mb-4 py-5 text-center mx-auto ">
                  <label htmlFor="question">Your Question:</label>
                  <textarea
                    className="mx-3 border-2 border-black "
                    id="question"
                    rows="4"
                    cols="50"
                  ></textarea>
                </div>
                <button
                  onClick={handleCloseQuestionForm}
                  className="  rounded-lg h-12 mx-5 px-5 bg-gradient-to-t from-[#FAAC06] to-[#EB8105] border"
                >
                  Cancel
                </button>
                <button
                  onClick={handleQuestionSubmit}
                  className=" rounded-lg h-12 mx-5 px-5  bg-gradient-to-t from-[#FAAC06] to-[#EB8105] border"
                >
                  Submit Question
                </button>
              </div>
            </div>
          )}

          <div className="px-4 py-2 w-fit bg-[#FFF] text-[#5B5B5B] md:text-[16px] text-[14px] border-[1px] border-[#CCC] rounded-[3px]">
            <button>2 More Qs & As </button>
          </div>
        </div>
        <div className="flex flex-col items-start gap-4 w-full">
          <div className="flex items-center gap-2 ">
            <h2 className="text-base font-semibold">Sponsered Results</h2>
            <Image
              src={"/icons/ic_outline-info.svg"}
              width={16}
              height={16}
              alt=""
            />
          </div>
          <div className="flex  w-full overflow-auto gap-4">
            {sponseredProducts.map((product, key) => (
              <ProductCard key={key} productDetails={product.productId} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default StoreOverview;
