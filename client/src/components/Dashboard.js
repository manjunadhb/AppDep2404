import React from "react";
import TopNavigation from "./TopNavigation";
import { Form, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Dashboard() {
  let navigate = useNavigate();

  let storeObj = useSelector((store) => {
    console.log(store);
    return store.loginReducer;
  });

  let deleteProfile = async () => {
    let dataToSend = new FormData();
    dataToSend.append("email", storeObj.loginDetails.email);

    let reqOptions = {
      method: "DELETE",
      body: dataToSend,
    };

    let JSONData = await fetch("/deleteProfile", reqOptions);

    let JSOData = await JSONData.json();

    alert(JSOData.msg);

    if (JSOData.status == "success") {
      navigate("/");
    }
  };

  return (
    <div>
      <TopNavigation />
      <h1>Dashboard</h1>
      <h2>
        Welcome {storeObj.loginDetails.firstName}{" "}
        {storeObj.loginDetails.lastName}
      </h2>
      <button
        onClick={() => {
          deleteProfile();
        }}
      >
        Delete Profile
      </button>
      <br></br>
      <img src={`/${storeObj.loginDetails.profilePic}`}></img>
    </div>
  );
}

export default Dashboard;
