import React from "react";
import ReactDOM from "react-dom";

import Card from "../../UI/Card";

import close from "../../assets/close.png";
import classes from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { SIGN_UP } from "../../constants/path";

const Backdrop = ({ onClose }) => {
  return <div className={classes.backDrop} onClick={onClose} />;
};

const LoginModal = ({ onCancel }) => {
  const navigate = useNavigate();
  const handleSignUpClick = () => navigate(SIGN_UP);

  return (
    <Card modal="modal">
      <div className={classes.container}>
        <div className={classes.topSide}>
          <p>Log Into Commentify</p>
          <button onClick={onCancel}>
            <img src={close} alt="close" />
          </button>
        </div>

        <div className={classes.formSide}>
          <form>
            <div>
              <label htmlFor="username">Username</label>
              <input id="username" type="text" />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input type="password" id="password" />
            </div>

            <button type="submit">Log In</button>
          </form>
        </div>
        <div className={classes.registerSide}>
          <div className={classes.question}>
            <span>Don't have an account yet?</span>
          </div>
          <button onClick={handleSignUpClick}>Sign up</button>
        </div>
      </div>
    </Card>
  );
};

function Login({ onClose }) {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={onClose} />,
        document.getElementById("back-drop")
      )}
      {ReactDOM.createPortal(
        <LoginModal onCancel={onClose} />,
        document.getElementById("modal")
      )}
    </>
  );
}

export default Login;
