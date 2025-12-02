// src/pages/home.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function HomePage() {
  const [message, setMessage] = useState("");

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    if (!token) return setMessage("No token found");

    try {
      const res = await axios.get("http://localhost:5000/api/forms", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage(JSON.stringify(res.data, null, 2));
    } catch (err: any) {
      setMessage(err.response?.data?.error || "Error fetching data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Home Page</h2>
      <pre>{message}</pre>
    </div>
  );
}
