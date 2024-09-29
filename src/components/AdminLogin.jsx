import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function AdminLogin() {
  const navigate = useNavigate();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/");
      }
    });
  }, [navigate]);
  
  const [errorMsg, setErrorMsg] = useState("");

  const handleDirectLogin = () => {
    const email = "your-email@example.com"; // Replace with your email
    const password = "your-password"; // Replace with your password
    setErrorMsg("");

    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        const user = response.user;
        if (user) {
          navigate("/");
        }
      })
      .catch((err) => {
        setErrorMsg(err.message);
      });
  };

  return (
    <>
      <div className="d-flex h-100">
        <div className="card container col-10 col-sm-10 col-md-9 col-lg-8 mt-5 p-0 align-self-center border-primary">
          <div className="card-header border-darks">
            <div className="mt-2 text-center">
              <h3>DrugTrack</h3>
              <h4>Welcome Back!</h4>
            </div>
          </div>
          <div className="card-body">
            <div className="container align-self-center">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Email Address"
                  value="your-email@example.com" // Show the email if desired
                  readOnly // Prevent user input
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  value="your-password" // Show the password if desired
                  readOnly // Prevent user input
                />
              </div>
              <div className="text-center text-danger">{errorMsg}</div>
              <div className="form-group mt-4">
                <button
                  id="submit"
                  type="button"
                  className="btn btn-primary btn-block"
                  onClick={handleDirectLogin}>
                  Direct Login
                </button>
              </div>
              <div className="form-group text-center">
                Don't have an account? <Link to="/register">Register here!</Link> <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
