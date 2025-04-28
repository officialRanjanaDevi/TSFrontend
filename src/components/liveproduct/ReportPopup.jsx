import React, { useState } from "react";
import toast from "react-hot-toast";

const ReportUserPopup = ({
  storeDp,
  userId,
  storeId,
  chatId,
  storeName,
  onClose,
}) => {
  const [reason, setReason] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reason) {
      toast.error("Please enter reason");
      return;
    }
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL_SELLER}/api/v1/report`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            reporter: userId,
            reportedUser: storeId,
            reason,
            forWhat: { name: "Chat", id: chatId },
          }),
        }
      );

      if (response.ok) {
        toast.success("Report Submitted Successfully!");
        console.log("Report reason:", reason);
        console.log("Report:", response.json());
        onClose();
      } else {
        console.error("Report submission failed");
      }
    } catch (error) {
      console.error("Report submission error:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <div className="flex items-center gap-4 mb-4">
          <img
            src={storeDp}
            alt={storeName}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <p className="font-semibold">{storeName}</p>
            <p className="text-sm text-gray-500">Report this store</p>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Why are you reporting this user?"
            value={reason}
            required
            onChange={(e) => setReason(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mb-4"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={handleSubmit}
              className="bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Submit
            </button>
            <button
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportUserPopup;
