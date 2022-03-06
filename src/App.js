import React, { useState, useEffect } from "react";
import Introduction from "./Components/Introduction";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "./App.css";

const baseURL = "http://localhost:3001/api/cardiac-services";

const App = () => {
  const [cardiacpost, setCardiacPost] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(baseURL);
        setCardiacPost(result.data);
        setCardiacPost(cardiacpost);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [cardiacpost]);

  const dataArray = [];

  for (const key in cardiacpost.data) {
    dataArray.push(cardiacpost.data[key]);
  }

  function handleDataList(e) {
    e.preventDefault();
    setIsClicked(true);
  }

  if (!isClicked) {
    return (
      <div className="App">
        <br />
        <Introduction />
        <br />
        <button className="btn btn-success" onClick={(e) => handleDataList(e)}>
          View Services
        </button>

        <br />
        <br />
      </div>
    );
  }

  return (
    <div className="App">
      <br />
      <Introduction />
      <br />
      <button className="btn btn-success" onClick={(e) => handleDataList(e)}>
        View Services
      </button>

      <br />
      <br />

      <p>Total Number of Records: {dataArray.length}</p>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Serial No.</th>
            <th>Name</th>
            <th>Address</th>
            <th>Contact</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {dataArray.map((item, index) => {
            return (
              <tr key={item._id}>
                <td>{index+1}</td>
                <td>{item.name}</td>
                <td>{item.address}</td>
                <td>{item.phone}</td>
                <td>{item.email}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default App;
