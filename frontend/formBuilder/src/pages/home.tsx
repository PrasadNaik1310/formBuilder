// src/pages/home.tsx
import React, { useState } from "react";

const Home: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, email });
    alert(`Submitted: Name=${name}, Email=${email}`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Home Page</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <label>Email: </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button style={{ marginTop: "15px" }} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Home;
