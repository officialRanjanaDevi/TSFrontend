"use client";
import React, { useState } from "react";
import axios from "axios";

const CreateMeetingForm = () => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("scheduled");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [zoomMeetingId, setZoomMeetingId] = useState("");
  const [zoomMeetingPassword, setZoomMeetingPassword] = useState("");
  const [sellerId, setSellerId] = useState("");
  const [storeId, setStoreId] = useState("");
  const [users, setUsers] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const meetingData = {
      title,
      status,
      date,
      time,
      zoom_meeting_id: zoomMeetingId,
      zoom_meeting_password: zoomMeetingPassword,
      sellerId,
      storeId,
      users,
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API_URL_SELLER}/api/v1/meeting`,
        meetingData
      );
      // console.log("Meeting created:", response.data);
    } catch (error) {
      console.error("Error creating meeting:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Status:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="scheduled">Scheduled</option>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
      <div>
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Time:</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Zoom Meeting ID:</label>
        <input
          type="text"
          value={zoomMeetingId}
          onChange={(e) => setZoomMeetingId(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Zoom Meeting Password:</label>
        <input
          type="text"
          value={zoomMeetingPassword}
          onChange={(e) => setZoomMeetingPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Seller ID:</label>
        <input
          type="text"
          value={sellerId}
          onChange={(e) => setSellerId(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Store ID:</label>
        <input
          type="text"
          value={storeId}
          onChange={(e) => setStoreId(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Users (comma separated):</label>
        <input
          type="text"
          value={users.join(",")}
          onChange={(e) => setUsers(e.target.value.split(","))}
          required
        />
      </div>
      <button type="submit">Create Meeting</button>
    </form>
  );
};

export default CreateMeetingForm;
