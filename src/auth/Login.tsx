import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
// import "../assets/import.css";
import logo from "../assets/images/logo.svg";

const Login:React.FC = () => {
  let navigate = useNavigate();
  const [loginCard, setLoginCard] = useState(true);
  const [data, setData] = useState<Data>({});

  // const [username, setUsername] = useState<String>("");
  // const [password, setPassword] = useState<String>("");
  // const [otp, setOtp] = useState<Number>();

  interface Data {
    [key: string]: string;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoginCard(false)
  };

  const otphandleSubmit = async () => {
    navigate("/");
  };

  return (
    <div className="login">
        <div className="row">
          <div className="col-lg-4"></div>
          <div className="col-lg-4 col-12 text-center ">
            <div className="login-card">
              <img src={logo} alt="binance" className="login-logo" />
              <h2 className="text-white my-3">Admin Login </h2>

              {loginCard === true ? (
                <span>
                  <Form.Control
                    className="form-control-dark"
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={handleChange}
                  />
                  <Form.Control
                    type="text"
                    className="form-control-dark mt-2"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                  <div className="text-center mt-3">
                    <button
                      className="btn btn-brand btn-block"
                      onClick={handleSubmit}
                    >
                      Login
                    </button>
                  </div>
                </span>
              ) : (
                <span>
                  <p className="">Enter OTP sent to your registered mobile number</p>
                  <Form.Control
                    className="form-control-dark"
                    type="number"
                    name="otp"
                    placeholder="OTP"
                    onChange={handleChange}
                  />
                  <div className="text-center mt-3">
                    <button
                      className="btn btn-brand btn-block"
                      onClick={otphandleSubmit}
                    >
                      Verify OTP
                    </button>
                  </div>
                </span>
              )}
            </div>
          </div>
          <div className="col-4"></div>
        </div>
      </div>
  );
};

export default Login;
