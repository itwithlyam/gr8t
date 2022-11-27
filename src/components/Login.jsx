import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./styles.css";

function Login() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

    const check = async () => {
        const check = await fetch("http://localhost:8080/verify", {
        method: 'POST',
        credentials: 'include'
        })

        let checkjson = check.json()

        if (checkjson.pass) navigate('/blog')
    }
    check()


  const errors = {
    uname: "invalid username",
    pass: "invalid password"
  };

  const handleSubmit = async (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    // Find user login info
    const validate = await fetch("http://localhost:8080/login", {
      method: 'POST',
      body: JSON.stringify({
        uname: uname.value,
        pass: pass.value
      }),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include'
    })

    let content = await validate.json()

    if (content.type === "success") { 
        let date = new Date();
        date.setTime(date.getTime()+(1*60*60*1000));
        document.cookie = `SessionID = ${content.token}; expires = ${date.toGMTString()}`
        setIsSubmitted(true);
        navigate('/blog')
    } else if (content.content === "username")
        setErrorMessages({ name: "uname", message: errors.uname });
    else if (content.content === "password")
        setErrorMessages({ name: "pass", message: errors.pass });
    
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Sign In</div>
        {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
      </div>
    </div>
  );
}

export default Login;