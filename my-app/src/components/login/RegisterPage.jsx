import React, { useState,Fragment } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "../../App.css";

export default function SignUpPage() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e) =>{
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    }
    axios.post('https://us-east-1.aws.data.mongodb-api.com/app/application-0-hxfdv/endpoint/register', data)
  .then(response=>{
    console.log(response.data);
  })
  .catch(e=>{
    console.log(e);
  });
  setEmail('');
  }

  return (
    <Fragment>
      <div className="col-md-10 mx-auto col-lg-5">
        <h2>Join us</h2>
        <h5>Create your personal account</h5>
        <form className="p-4 p-md-5 border rounded-3 bg-body-tertiary">
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              value={email}
              onChange={onChangeEmail}
            />
            <label for="floatingInput">Email address</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              value={password}
              onChange={onChangePassword}
            />
            <label for="floatingPassword">Password</label>
          </div>
          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
          </div>
          <button className="w-100 btn btn-lg btn-primary" type="submit" onClick={onSubmit}>
            Sign up
          </button>
          <hr className="my-4" />
          <small className="text-body-secondary">
            By clicking Sign up, you agree to the terms of use.
          </small>
        </form>
        <footer>
          <p>
            <Link to="/">Back to Homepage</Link>.
          </p>
        </footer>
      </div>
    </Fragment>
  );
}
