import { toBeRequired } from "@testing-library/jest-dom/matchers";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

function Signup() {
  let firstNameInputRef = useRef();
  let lastNameInputRef = useRef();
  let stateSelectRef = useRef();
  let emailInputRef = useRef();
  let passwordInputRef = useRef();
  let mobInputRef = useRef();
  let profilePicInputRef = useRef();
  let msgLabelRef = useRef();
  let maleRBRef = useRef();
  let femaleRBRef = useRef();
  let ageInputRef = useRef();
  let selectedGender;
  let salutation;
  let maritalStatus;
  let languagesKnown = {
    eng: false,
    hindi: false,
    tel: false,
    kan: false,
    tam: false,
  };

  let [profilePic, setProfilePic] = useState("./images/noImage.png");

  let onCreateAccountClick = async () => {
    let dataToSend = {
      firstName: firstNameInputRef.current.value,
      lastName: lastNameInputRef.current.value,
      age: ageInputRef.current.value,
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value,
      mobNo: mobInputRef.current.value,
      profilePic: profilePicInputRef.current.value,
    };

    let JSONDataToSend = JSON.stringify(dataToSend);
    console.log(dataToSend);
    console.log(JSONDataToSend);

    let myHeader = new Headers();
    myHeader.append("content-type", "application/json");

    let reqOptions = {
      method: "POST",
      body: JSONDataToSend,
      headers: myHeader,
    };

    let JSONData = await fetch("http://localhost:4567/signup", reqOptions);

    let JSOData = await JSONData.json();

    alert(JSOData.msg);

    console.log(JSOData);
  };

  let onCreateAccountURLE = async () => {
    let myHeader = new Headers();
    myHeader.append("content-type", "application/x-www-form-urlencoded");

    let dataToSend = new URLSearchParams();
    dataToSend.append("firstName", firstNameInputRef.current.value);
    dataToSend.append("lastName", lastNameInputRef.current.value);
    dataToSend.append("age", ageInputRef.current.value);
    dataToSend.append("email", emailInputRef.current.value);
    dataToSend.append("password", passwordInputRef.current.value);
    dataToSend.append("mobileNo", mobInputRef.current.value);
    dataToSend.append("profilePic", profilePicInputRef.current.value);

    let reqOptions = {
      method: "POST",
      headers: myHeader,
      body: dataToSend,
    };

    let JSONData = await fetch("http://localhost:4567/signup", reqOptions);

    let JSOData = await JSONData.json();

    alert(JSOData.msg);

    console.log(JSOData);
  };

  let onCreateAccountFD = async () => {
    let dataToSend = new FormData();
    dataToSend.append("firstName", firstNameInputRef.current.value);
    dataToSend.append("lastName", lastNameInputRef.current.value);
    dataToSend.append("age", ageInputRef.current.value);
    dataToSend.append("email", emailInputRef.current.value);
    dataToSend.append("password", passwordInputRef.current.value);
    dataToSend.append("mobileNo", mobInputRef.current.value);
    for (let i = 0; i < profilePicInputRef.current.files.length; i++) {
      dataToSend.append("profilePic", profilePicInputRef.current.files[i]);
    }

    let reqOptions = {
      method: "POST",
      body: dataToSend,
    };

    let JSONData = await fetch("http://localhost:4567/signup", reqOptions);

    let JSOData = await JSONData.json();

    alert(JSOData.msg);

    console.log(JSOData);
  };

  return (
    <div className="App">
      <form>
        <h2>Signup</h2>
        <div>
          <label>First Name</label>
          <input ref={firstNameInputRef}></input>
        </div>
        <div>
          <label>Last Name</label>
          <input ref={lastNameInputRef}></input>
        </div>
        <div>
          <label>Age</label>
          <input
            ref={ageInputRef}
            onChange={() => {
              let age = Number(ageInputRef.current.value);

              if (age < 5) {
                console.log(`Infant`);
              } else if (age >= 5 && age <= 10) {
                console.log(`Kid`);
              } else if (age > 10 && age <= 15) {
                console.log(`Teen`);
              } else if (age > 15 && age < 30) {
                console.log(`Youth`);
              } else if (age > 30 && age < 50) {
                console.log(`Middle Aged`);
              } else if (age > 50 && age < 70) {
                console.log(`Old Aged`);
              } else {
                console.log(`Not a valid age`);
              }
            }}
          ></input>
        </div>
        <div>
          <label>Email</label>
          <input ref={emailInputRef}></input>
        </div>
        <div>
          <label>Password</label>
          <input ref={passwordInputRef}></input>
        </div>
        <div>
          <label>Mobile No. </label>
          <input ref={mobInputRef}></input>
        </div>
        <div>
          <label>Profile Pic</label>
          <input
            ref={profilePicInputRef}
            type="file"
            accept="image/*"
            onChange={(eo) => {
              console.log(eo.target.files);

              let selectedImagePath = URL.createObjectURL(eo.target.files[0]);
              setProfilePic(selectedImagePath);
              console.log(selectedImagePath);
            }}
          ></input>
          <br></br>
          <img src={profilePic} className="profilePreview"></img>
        </div>

        <div>
          <button
            type="button"
            onClick={() => {
              onCreateAccountClick();
            }}
          >
            Signup
          </button>
          <button
            type="button"
            onClick={() => {
              onCreateAccountURLE();
            }}
          >
            Signup(URLE)
          </button>
          <button
            type="button"
            onClick={() => {
              onCreateAccountFD();
            }}
          >
            Signup(FD)
          </button>
        </div>
        <div>
          <label ref={msgLabelRef} style={{ width: "500px" }}></label>
        </div>
      </form>
      <br></br>
      <Link to="/">Signin</Link>
    </div>
  );
}

export default Signup;
