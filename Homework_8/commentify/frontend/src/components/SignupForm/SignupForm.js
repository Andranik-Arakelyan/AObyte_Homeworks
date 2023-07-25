import React, { useState } from "react";
import classes from "./SignupForm.module.css";
import logo from "../../assets/Commentify.png";
import { useNavigate } from "react-router-dom";
import { HOME_PAGE } from "../../constants/path";
import InButton from "../../UI/InButton";

function SignupForm(props) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [birthDay, setBirthDay] = useState("");

  const handleNameChange = (value) => {
    setName(value);
  };

  const handleSurnameChange = (value) => {
    setSurname(value);
  };

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handleDateChange = (value) => {
    setBirthDay(value);
  };

  const navigateToHome = () => {
    navigate(HOME_PAGE);
  };

  const navigate = useNavigate();
  return (
    <div className={classes.container}>
      <InButton onClick={navigateToHome}>
        <img src={logo} alt="logo" style={{ width: "350px" }} />
      </InButton>

      <div className={classes.formPart}>
        <h2>It's easy to join us</h2>
        <form>
          <div className={classes.singleInput}>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              value={name}
              onChange={(e) => handleNameChange(e.target.valeu)}
            />
          </div>
          <div className={classes.singleInput}>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              value={surname}
              onChange={(e) => handleSurnameChange(e.target.value)}
            />
          </div>
          <div className={classes.singleInput}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              id="dob"
              name="dob"
              required
              value={birthDay}
              onChange={(e) => handleDateChange(e.target.value)}
            />
          </div>
          <button type="button">Sign up</button>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;
