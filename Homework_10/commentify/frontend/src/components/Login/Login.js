import React from "react";
import ReactDOM from "react-dom";

import Card from "../../UI/Card";

import close from "../../assets/close.png";
import classes from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { SIGN_UP } from "../../constants/path";
import { useDispatch } from "react-redux";
import { changeLoginModalStatus } from "../../features/loginModalSlice";
import InButton from "../../UI/InButton";
import { Backdrop } from "../../UI/Backdrop";

const LoginModal = (props) => {
  const navigate = useNavigate();
  const handleSignUpClick = () => navigate(SIGN_UP);

  const dispatch = useDispatch();

  return (
    <Card modal="modal">
      <div className={classes.container}>
        <div className={classes.topSide}>
          <p>Log Into Commentify</p>
          <InButton onClick={() => dispatch(changeLoginModalStatus(false))}>
            <img src={close} alt="close" />
          </InButton>
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

function Login(props) {
  const dispatch = useDispatch();
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop
          onClose={() => {
            dispatch(changeLoginModalStatus(false));
          }}
        />,
        document.getElementById("back-drop")
      )}
      {ReactDOM.createPortal(<LoginModal />, document.getElementById("modal"))}
    </>
  );
}

export default Login;
