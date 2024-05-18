import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const App = () => {
  const [pin, setPin] = useState("");
  const [resdata, setResdata] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocal();
    getData(pin);
  };

  const getData = async (p) => {
    try {
      const res = await axios.get(`https://api.postalpincode.in/pincode/${p}`);
      setResdata(res.data[0]);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    getData(); // Initial pin code to get data on load
  }, []);

  const setLocal = () => {
    localStorage.setItem("data", JSON.stringify(pin));
  };

  console.log(resdata);

  return (
    <div style={{ backgroundColor: "" }}>
      <h1>Enter Your Pin Code</h1>
      <form onSubmit={handleSubmit}>
        <input
          className=""
          type="number"
          placeholder="Enter Pin/Zip code"
          onChange={(e) => setPin(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div>
        {resdata &&
          resdata.PostOffice?.map((l, index) => (
            <ul key={index}>
              <li>{l.Name}</li>
            </ul>
          ))}
      </div>
    </div>
  );
};

export default App;
