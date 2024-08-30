import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function Signin() {
  let emailInputRef = useRef();
  let passwordInputRef = useRef();
  let quoteInputRef = useRef();

  let navigate = useNavigate();
  let dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      //validateToken();
    }
  }, []);

  let validateCredentials = async () => {
    let dataToSend = new FormData();
    dataToSend.append("email", emailInputRef.current.value);
    dataToSend.append("password", passwordInputRef.current.value);

    let reqOptions = {
      method: "POST",
      body: dataToSend,
    };

    let JSONData = await fetch("/login", reqOptions);

    let JSOData = await JSONData.json();

    if (JSOData.status == "success") {
      localStorage.setItem("token", JSOData.data.token);

      dispatch({ type: "login", data: JSOData.data });
      navigate("/dashboard");
    } else {
      alert(JSOData.msg);
    }
    console.log(JSOData);
  };

  let validateCredentials2 = () => {
    return async () => {
      let dataToSend = new FormData();
      dataToSend.append("email", emailInputRef.current.value);
      dataToSend.append("password", passwordInputRef.current.value);

      let reqOptions = {
        method: "POST",
        body: dataToSend,
      };

      let JSONData = await fetch("/login", reqOptions);

      let JSOData = await JSONData.json();

      if (JSOData.status == "success") {
        localStorage.setItem("token", JSOData.data.token);

        dispatch({ type: "login", data: JSOData.data });
        navigate("/dashboard");
      } else {
        alert(JSOData.msg);
      }
      console.log(JSOData);
    };
  };

  let validateToken = async () => {
    let dataToSend = new FormData();
    dataToSend.append("token", localStorage.token);

    let reqOptions = {
      method: "POST",
      body: dataToSend,
    };

    let JSONData = await fetch("/validateToken", reqOptions);

    let JSOData = await JSONData.json();

    console.log(JSOData);

    if (JSOData.status == "success") {
      dispatch({ type: "login", data: JSOData.data });
      navigate("/dashboard");
    } else {
      alert(JSOData.msg);
    }
    console.log(JSOData);
  };

  return (
    <div className="App">
      <form>
        <h2
          style={{
            backgroundColor: "red",
            borderRadius: "25px",
            color: "white",
            boxShadow: "10px 10px 10px black",
          }}
        >
          Login 3
        </h2>
        <div>
          <label>Email</label>
          <input ref={emailInputRef}></input>
        </div>
        <div>
          <label>Password</label>
          <input ref={passwordInputRef}></input>
        </div>
        {/* <div>
          <label>Quote</label>
          <input ref={quoteInputRef}></input>
        </div> */}
        <div>
          <button
            type="button"
            onClick={() => {
              //validateCredentials();
              dispatch(validateCredentials2());
            }}
          >
            Login
          </button>
        </div>
      </form>
      <br></br>
      <Link to="/signup">Create Account</Link>
    </div>
  );
}

export default Signin;
