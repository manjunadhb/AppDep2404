import { toBeRequired } from "@testing-library/jest-dom/matchers";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import TopNavigation from "./TopNavigation";
import { useSelector } from "react-redux";

function EditProfile() {
  let firstNameInputRef = useRef();
  let lastNameInputRef = useRef();
  let stateSelectRef = useRef();
  let emailInputRef = useRef();
  let passwordInputRef = useRef();
  let mobileNoInputRef = useRef();
  let profilePicInputRef = useRef();
  let msgLabelRef = useRef();
  let ageInputRef = useRef();

  let [profilePic, setProfilePic] = useState("./images/noImage.png");

  let storeObj = useSelector((store) => {
    return store;
  });

  let populateDataFromStoreObj = () => {
    firstNameInputRef.current.value = storeObj.loginDetails.firstName;
    lastNameInputRef.current.value = storeObj.loginDetails.lastName;
    ageInputRef.current.value = storeObj.loginDetails.age;
    emailInputRef.current.value = storeObj.loginDetails.email;
    mobileNoInputRef.current.value = storeObj.loginDetails.mobileNo;
    setProfilePic(`/${storeObj.loginDetails.profilePic}`);
  };

  useEffect(() => {
    populateDataFromStoreObj();
  }, []);

  let updateProfile = async () => {
    let dataToSend = new FormData();
    dataToSend.append("firstName", firstNameInputRef.current.value);
    dataToSend.append("lastName", lastNameInputRef.current.value);
    dataToSend.append("age", ageInputRef.current.value);
    dataToSend.append("email", emailInputRef.current.value);
    dataToSend.append("password", passwordInputRef.current.value);
    dataToSend.append("mobileNo", mobileNoInputRef.current.value);
    for (let i = 0; i < profilePicInputRef.current.files.length; i++) {
      dataToSend.append("profilePic", profilePicInputRef.current.files[i]);
    }

    let reqOptions = {
      method: "PUT",
      body: dataToSend,
    };

    let JSONData = await fetch("/updateProfile", reqOptions);

    let JSOData = await JSONData.json();

    alert(JSOData.msg);

    console.log(JSOData);
  };

  return (
    <div>
      <TopNavigation />
      <div className="App">
        <form>
          <h2>Edit Profile</h2>
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
            <input ref={emailInputRef} readOnly></input>
          </div>
          <div>
            <label>Password</label>
            <input ref={passwordInputRef}></input>
          </div>
          <div>
            <label>Mobile No. </label>
            <input ref={mobileNoInputRef}></input>
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
                updateProfile();
              }}
            >
              Update Profile
            </button>
          </div>
          <div>
            <label ref={msgLabelRef} style={{ width: "500px" }}></label>
          </div>
        </form>
      </div>
      <br></br>
      <Link to="/">Signin</Link>
    </div>
  );
}

export default EditProfile;
