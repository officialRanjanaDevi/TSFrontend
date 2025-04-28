"use client";
import React, { useState,useEffect } from "react";
import FeedbackCard from "./FaqCard";
import { useSearchParams } from "next/navigation";
import dataSet from "./Data";
function FAQBody() {
  const [opened, setOpened] = useState(1);
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  const [data, setData] = useState(
     [
      {
        id: 1,
        title: "Q: How can I track my order?",
        content:
          "You can track your order in real-time through the 'Track Order' section on our website or app. Simply enter your order ID to get live updates.",
      },
      {
        id: 2,
        title: "Q: What is the estimated delivery time for my order?",
        content:
          "We offer ultra-fast delivery within 1 hour for all eligible products. The exact delivery time may vary based on your location and order volume.",
      },
      {
        id: 3,
        title: "Q: Can I cancel or modify my order after placing it?",
        content:
          "Yes, you can cancel or modify your order within 5 minutes of placing it. After this window, cancellations may not be possible due to our rapid dispatch process.",
      },
      {
        id: 4,
        title: "Q: What payment methods do you accept?",
        content:
          "We accept all major credit and debit cards, UPI, PhonePe Wallet, Paytm, Google Pay, and cash on delivery for select orders.",
      },
      {
        id: 5,
        title: "Q: How do I apply a coupon or discount code?",
        content:
          "You can apply your coupon code at checkout under the 'Apply Coupon' section. Discounts will be automatically adjusted before payment.",
      },
      {
        id: 6,
        title: "Q: What is your return policy?",
        content:
          "We offer hassle-free returns within 7 days of delivery for eligible items. Please check the return policy on the product page before purchasing.",
      },
      {
        id: 7,
        title: "Q: Do you provide gift wrapping services?",
        content:
          "Yes, we offer gift wrapping services for a nominal charge. You can select this option at checkout before placing your order.",
      },
      {
        id: 8,
        title: "Q: What should I do if I receive a damaged product?",
        content:
          "If you receive a damaged or incorrect product, you can request a return or replacement through the 'My Orders' section. Our support team will assist you.",
      },
      {
        id: 9,
        title: "Q: How can I contact customer support?",
        content:
          "You can reach our customer support via chat, email, or phone. Visit the 'Contact Us' page for details and response times.",
      },
      {
        id: 10,
        title: "Q: What should I do if my order is delayed?",
        content:
          "While we strive to deliver within 1 hour, there may be occasional delays due to traffic or high demand. If your order is late, please check the tracking page for real-time updates. You can also contact our customer support for assistance.",
      },
    ],
  );

  useEffect(() => {
    if (query) {
      const matchedData = dataSet.find((item) => item.topic === query);
      setData(matchedData ? matchedData.content : []);
    }
  }, [query]);


  return (
    <div className="w-full md:w-[50vw]">
      {data.map((item, ind) => (
        <FeedbackCard
          opened={opened}
          setOpened={setOpened}
          title={item.title}
          key={ind}
          id={item.id}
          content={item.content}
        />
      ))}
    </div>
  );
}

export default FAQBody;
