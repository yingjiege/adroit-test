import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import * as Realm from "realm-web";

import "../../App.css";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const app = new Realm.App({ id: "application-0-hxfdv" });

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    axios
      .post(
        "https://us-east-1.aws.data.mongodb-api.com/app/application-0-hxfdv/endpoint/login",
        data
      )
      .then((response) => {
        console.log(response.data);
        window.location.href = '/'+response.data[0]['_id'];
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const google = (response) => {
// The redirect URL should be on the same domain as this app and
      // specified in the auth provider configuration.
      const redirectUrl = "https://codesandbox.io/s/blue-sun-ngrm77?file=/src/App.js";
      const credentials = Realm.Credentials.google({ redirectUrl });
      // Calling logIn() opens a Google authentication screen in a new window.
      app
        .logIn(credentials)
        .then((user) => {
          // The logIn() promise will not resolve until you call `handleAuthRedirect()`
          // from the new window after the user has successfully authenticated.
          console.log(`Logged in with id: ${user.id}`);
        })
        .catch((err) => console.error(err));
  };

  return (
    <Fragment>
      <div
        className="modal modal-sheet position-static d-block p-4 py-md-5"
        tabindex="-1"
        role="dialog"
        id="modalSignin"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content rounded-4 shadow">
            <div className="modal-header p-5 pb-4 border-bottom-0">
              <h1 className="fw-bold mb-0 fs-2">Sign in to us</h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body p-5 pt-0">
              <form className="">
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control rounded-3"
                    id="floatingInput"
                    placeholder="name@example.com"
                    value={email}
              onChange={onChangeEmail}
                  />
                  <label for="floatingInput">Username or email address</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control rounded-3"
                    id="floatingPassword"
                    placeholder="Password"
                    value={password}
              onChange={onChangePassword}
                  />
                  <label for="floatingPassword">Password</label>
                  <Link to="/forget-password">
                    <label classNameName="right-label">Forget password?</label>
                  </Link>
                </div>
                <button
                  className="w-100 mb-2 btn btn-lg rounded-3 btn-primary"
                  type="submit"
                  onClick={onSubmit}
                >
                  Sign in
                </button>
                <small className="text-body-secondary">
                  By clicking Sign up, you agree to the terms of use.
                </small>
                <hr className="my-4" />
                <h2 className="fs-5 fw-bold mb-3">Or use a third-party</h2>
                <button
                  className="w-100 py-2 mb-2 btn btn-outline-secondary rounded-3"
                  type="submit"
                  onClick={google}
                >
                  Sign in with Google
                  <i classNameName="bi bi-google-fill btn"></i>
                </button>
                <button
                  className="w-100 py-2 mb-2 btn btn-outline-primary rounded-3"
                  type="submit"
                >
                  Sign in with Facebook
                </button>
              </form>
              <footer>
                <p>
                  First time? <Link to={"/register"}>Create an account</Link>.
                </p>
                <p>
                  <Link to="/">Back to Homepage</Link>.
                </p>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
