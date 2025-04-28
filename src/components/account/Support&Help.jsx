"use client";
import { useState, useRef } from "react";

const SupportHelp = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [subject, setSubject] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [description, setDescription] = useState("");

  const handleAccordion = (index) => {
    if (activeAccordion === index) {
      setActiveAccordion(null);
    } else {
      setActiveAccordion(index);
    }
  };

  // Upload an attachment
  const fileInputRef = useRef(null);

  const handFileButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = () => {
    const file = fileInputRef.current.files[0];
    const fileName = file ? file.name : "No file chosen, yet.";
    document.getElementById("custom-text").textContent = fileName;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    // You can access the form values: subject, attachment, description

    // Reset form values
    setSubject("");
    setAttachment(null);
    setDescription("");
  };

  return (
    <div className="h-full">
      <header className="md:hidden flex items-center p-4 border-b border-gray-200">
        <a href="./" className="rounded p-2 pr-4 text-gray-600">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 7H3.83L9.42 1.41L8 0L0 8L8 16L9.41 14.59L3.83 9H16V7Z"
              fill="#323232"
            />
          </svg>
        </a>
        <div className="text-xl font-semibold">Customer Support</div>
      </header>
      <main className="mx-2">
        <div className="flex items-start my-2">
          <div className="w-full sm:w-10/12 my-1">
            <ul className="flex flex-col">
              {faqData.map((faq, index) => (
                <li
                  key={index}
                  className="bg-white my-2 border rounded-md"
                  x-data={`accordion(${index + 1})`}
                >
                  <h2
                    onClick={() => handleAccordion(index)}
                    className="flex flex-row justify-between items-center font-semibold p-3 cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <svg
                      className="fill-current h-6 w-6 transition-transform duration-500"
                      viewBox="0 0 16 11"
                      style={{
                        width: "10",
                        transform:
                          activeAccordion === index
                            ? "rotate(180deg)"
                            : "rotate(0)",
                      }}
                    >
                      {activeAccordion === index ? (
                        <path
                          d="M14.12 10.4546L8 4.34793L1.88 10.4546L0 8.57459L8 0.574585L16 8.57459L14.12 10.4546Z"
                          fill="#323232"
                        />
                      ) : (
                        <path
                          d="M0 8.66666L1.88 10.5467L8 4.43999L14.12 10.5467L16 8.66666L8 0.666661L0 8.66666Z"
                          fill="#323232"
                        />
                      )}
                    </svg>
                  </h2>
                  <div
                    x-ref="tab"
                    style={{
                      maxHeight: activeAccordion === index ? "none" : 0,
                      transition: "max-height 0.5s ease",
                      overflow: "hidden",
                    }}
                  >
                    <div className="p-5 text-sm">{faq.answer}</div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="my-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    className="block text-gray-800 font-semibold mb-2"
                    htmlFor="subject"
                  >
                    Subject
                  </label>
                  <div className="flex items-center border-b border-gray-500 pl-1">
                    <svg
                      width="14"
                      height="20"
                      viewBox="0 0 14 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7 0C3.14 0 0 3.14 0 7C0 12.25 7 20 7 20C7 20 14 12.25 14 7C14 3.14 10.86 0 7 0ZM11 8H8V11H6V8H3V6H6V3H8V6H11V8Z"
                        fill="#27272A"
                      />
                    </svg>
                    <input
                      className="appearance-none  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="subject"
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Enter subject"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-800 font-semibold mb-2"
                    htmlFor="attachment"
                  >
                    Attachment
                  </label>
                  <div
                    className="flex items-center border-b border-gray-500 pl-1 py-2 cursor-pointer"
                    onClick={handFileButtonClick}
                  >
                    <input
                      type="file"
                      id="real-file"
                      className="hidden"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                    />
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.02422 12.3813L12.3898 6.02506C12.6055 5.84553 12.8805 5.75309 13.1609 5.76588C13.4412 5.77868 13.7066 5.89578 13.9051 6.09422C14.1035 6.29265 14.2206 6.55808 14.2334 6.83842C14.2462 7.11875 14.1538 7.39375 13.9742 7.60943L7.6086 13.9751C7.39789 14.184 7.11316 14.3013 6.81641 14.3013C6.51966 14.3013 6.23493 14.184 6.02422 13.9751C5.91934 13.8705 5.83613 13.7463 5.77934 13.6096C5.72256 13.4729 5.69333 13.3262 5.69333 13.1782C5.69333 13.0301 5.72256 12.8835 5.77934 12.7468C5.83613 12.61 5.91934 12.4858 6.02422 12.3813ZM10.7961 13.9751L8.14297 16.6282C7.50566 17.2387 6.65454 17.5754 5.77201 17.5659C4.88948 17.5565 4.04576 17.2017 3.42168 16.5776C2.7976 15.9535 2.44282 15.1098 2.43336 14.2273C2.42391 13.3447 2.76053 12.4936 3.3711 11.8563L6.02422 9.20318C6.1291 9.09867 6.21232 8.97447 6.2691 8.83773C6.32588 8.70098 6.35511 8.55437 6.35511 8.40631C6.35511 8.25824 6.32588 8.11163 6.2691 7.97489C6.21232 7.83814 6.1291 7.71395 6.02422 7.60943C5.81076 7.40211 5.52491 7.28614 5.22735 7.28614C4.92978 7.28614 4.64393 7.40211 4.43047 7.60943L1.77735 10.2626C0.721868 11.318 0.128906 12.7496 0.128906 14.2422C0.128906 15.7349 0.721868 17.1665 1.77735 18.2219C2.83283 19.2774 4.26436 19.8704 5.75703 19.8704C7.24971 19.8704 8.68124 19.2774 9.73672 18.2219L12.3805 15.5688C12.4854 15.4643 12.5686 15.3401 12.6253 15.2034C12.6821 15.0666 12.7114 14.92 12.7114 14.7719C12.7114 14.6239 12.6821 14.4773 12.6253 14.3405C12.5686 14.2038 12.4854 14.0796 12.3805 13.9751C12.2768 13.8705 12.1534 13.7874 12.0174 13.7308C11.8814 13.6741 11.7356 13.645 11.5883 13.645C11.441 13.645 11.2951 13.6741 11.1592 13.7308C11.0232 13.7874 10.8998 13.8705 10.7961 13.9751ZM18.2211 1.77818C17.1648 0.724231 15.7336 0.132324 14.2414 0.132324C12.7492 0.132324 11.318 0.724231 10.2617 1.77818L7.6086 4.43131C7.40128 4.64476 7.28531 4.93062 7.28531 5.22818C7.28531 5.52575 7.40128 5.8116 7.6086 6.02506C7.71311 6.12994 7.83731 6.21315 7.97405 6.26994C8.1108 6.32672 8.25741 6.35594 8.40547 6.35594C8.55354 6.35594 8.70015 6.32672 8.83689 6.26994C8.97364 6.21315 9.09783 6.12994 9.20235 6.02506L11.8555 3.37193C12.1663 3.0475 12.5388 2.78839 12.951 2.6098C13.3633 2.43121 13.8071 2.33674 14.2564 2.33193C14.7057 2.32712 15.1514 2.41205 15.5674 2.58177C15.9834 2.75148 16.3613 3.00255 16.679 3.32025C16.9967 3.63795 17.2478 4.01589 17.4175 4.4319C17.5872 4.84791 17.6722 5.29362 17.6674 5.7429C17.6625 6.19217 17.5681 6.63595 17.3895 7.04823C17.2109 7.46052 16.9518 7.83299 16.6273 8.14381L13.9742 10.7969C13.8208 10.956 13.7171 11.1563 13.676 11.3734C13.6349 11.5906 13.658 11.815 13.7427 12.0191C13.8273 12.2232 13.9697 12.3982 14.1524 12.5225C14.3351 12.6468 14.5502 12.715 14.7711 12.7188C14.9199 12.7195 15.0672 12.69 15.2042 12.632C15.3412 12.5739 15.465 12.4887 15.568 12.3813L18.2211 9.73756C18.7441 9.21515 19.159 8.59477 19.4421 7.91191C19.7251 7.22904 19.8708 6.49708 19.8708 5.75787C19.8708 5.01866 19.7251 4.28669 19.4421 3.60383C19.159 2.92097 18.7441 2.30059 18.2211 1.77818Z"
                        fill="black"
                      />
                    </svg>
                    <span id="custom-text" className="ml-4 text-gray-400">
                      Attach any file
                    </span>
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-800 font-semibold mb-2"
                    htmlFor="description"
                  >
                    Description
                  </label>
                  <textarea
                    className="h-32 resize-none appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter about file"
                  ></textarea>
                </div>
                <div className="flex items-center">
                  <button
                    className="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 px-4 focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    SUBMIT
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const faqData = [
  {
    question: "Q: How can I track my order?",
    answer:
      "You can track your order by logging into your account and navigating to the 'Order History' section. You will find tracking details for each order there.",
  },
  {
    question: "Q: What should I do if I receive a damaged product?",
    answer:
      "If you receive a damaged product, please contact our support team within 48 hours of delivery. Provide photos of the damaged item, and we will assist you with a replacement or refund.",
  },
  {
    question: "Q: How do I return or exchange an item?",
    answer:
      "To return or exchange an item, go to the 'Returns & Exchanges' section in your account. Follow the steps to initiate a return request. Please check our return policy for eligibility.",
  },
  {
    question: "Q: What payment methods do you accept?",
    answer:
      "We accept various payment methods, including credit/debit cards, PayPal, and digital wallets like Google Pay and Apple Pay. Some locations may also support Cash on Delivery (COD).",
  },
  {
    question: "Q: How can I contact customer support?",
    answer:
      "You can contact our customer support via email at support@example.com or through our live chat available on the website. We are available 24/7 to assist you.",
  },
  {
    question: "Q: What should I do if I forget my account password?",
    answer:
      "Click on the 'Forgot Password' link on the login page. Enter your registered email, and we will send you a password reset link.",
  },
  {
    question: "Q: How do I apply a discount or promo code?",
    answer:
      "At checkout, enter your promo code in the 'Discount Code' field and click 'Apply.' The discount will be reflected in your total order amount.",
  },

];

export default SupportHelp;
