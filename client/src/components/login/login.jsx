import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import styles from "./login.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import LoginSchema from "../../utils/loginSchema";
import axios from "axios";
import SignUpSchema from "../../utils/signUpSchema";
import Swal from "sweetalert2";
import Navbar from "../navbar/navbar";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

function Login(props) {
  const [loginPassword, setLogin] = useState("password");
  const [signUpPassword, setSignUp] = useState("password");
  const checkLogin = () => {
    var token = localStorage.getItem("authToken");
    if (token == null) {
      localStorage.removeItem("userId");
    } else {
      var id = localStorage.getItem("userId");
      if (id == null) {
        localStorage.removeItem("authToken");
      }
      const details = jwt_decode(localStorage.getItem("authToken"));
      var exp = details.exp * 1000;
      if (new Date(exp) < new Date() || details.id != id) {
        localStorage.removeItem("userId");
        localStorage.removeItem("authToken");
      } else {
        window.location.href = "/dashboard";
      }
    }
  };
  const Toast = Swal.mixin({
    position: "top-end",
    toast: true,
    showCloseButton: true,
    showConfirmButton: false,
  });
  useEffect(() => {
    checkLogin();
  });
  return (
    <div>
      <Navbar />
      <div className={`row ${styles.login} align-items-center`}>
        <div className="col-lg-6">
          <div
            id="carouselExampleIndicators"
            class="carousel slide"
            data-bs-ride="carousel"
            data-bs-interval="2500"
          >
            <div class="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="0"
                class="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img
                  src="https://akm-img-a-in.tosshub.com/indiatoday/images/bodyeditor/201909/boy-330582_960_720-x640.jpg?LmD0LKbk6ek.kT8UFhoKiDkpTFtjPQBZ"
                  class="d-block w-100"
                  alt="..."
                />
              </div>
              <div class="carousel-item">
                <img
                  src="http://www.themetrognome.in/wp-content/uploads/2015/03/Lost-children-of-India.jpg"
                  class="d-block w-100"
                  alt="..."
                />
              </div>
              <div class="carousel-item">
                <img
                  src="https://mc.webpcache.epapr.in/pro.php?size=large&in=https://mcmscache.epapr.in/post_images/website_326/post_26593969/full.jpg"
                  class="d-block w-100"
                  alt="..."
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div
            id="carouselExampleControls"
            class="carousel slide"
            data-bs-ride="carousel"
            data-bs-touch="false"
            data-bs-interval="false"
          >
            <div class="carousel-inner">
              <div class={`${styles.cItem} active carousel-item`}>
                <h1>Login</h1>
                <Formik
                  initialValues={{
                    email: "",
                    password: "",
                  }}
                  validationSchema={LoginSchema}
                  onSubmit={async (values) => {
                    await axios
                      .post("/api/auth/login", values)
                      .then((data) => {
                        if (data.status == 200) {
                          localStorage.setItem("authToken", data.data.token);
                          localStorage.setItem("userId", data.data.id);
                          Toast.fire({
                            title: "Login Successfull",
                            icon: "success",
                            timer: 1500,
                            timerProgressBar: true,
                            didClose: () => {
                              window.location.href = "/dashboard";
                            },
                          });
                        }
                      })
                      .catch((err) => {
                        if (
                          err.message == "Request failed with status code 401"
                        ) {
                          Toast.fire({
                            title: "Invalid Credentials",
                            icon: "error",
                            timer: 3000,
                            timerProgressBar: true,
                            didClose: () => window.location.reload(),
                          });
                          localStorage.removeItem("authToken");
                          localStorage.removeItem("userId");
                        }
                      });
                    console.log(values);
                  }}
                >
                  {(formProps) => {
                    return (
                      <Form autoComplete="off">
                        <label htmlFor="email">Email Id</label>
                        <Field
                          type="email"
                          name="email"
                          placeholder="Enter your email"
                        />
                        <span className="error">
                          <ErrorMessage name="email"></ErrorMessage>
                        </span>
                        <label htmlFor="password">Password</label>
                        <div className={`row ${styles.passwordField}`}>
                          <div className="col-11">
                            <Field
                              type={loginPassword}
                              name="password"
                              placeholder="Enter your password"
                            />
                          </div>
                          <div className="col-1">
                            <span
                              type="button"
                              onClick={() =>
                                loginPassword == "password"
                                  ? setLogin("text")
                                  : setLogin("password")
                              }
                            >
                              {loginPassword == "password" ? (
                                <AiFillEye size={28} />
                              ) : (
                                <AiFillEyeInvisible size={28} />
                              )}
                            </span>
                          </div>
                        </div>
                        <span className="error">
                          <ErrorMessage name="password"></ErrorMessage>
                        </span>
                        <button type="submit">Login</button>
                      </Form>
                    );
                  }}
                </Formik>
                <span>
                  Don't have an account?&nbsp;
                  <button
                    className={styles.carBtn}
                    type="button"
                    data-bs-target="#carouselExampleControls"
                    data-bs-slide="next"
                  >
                    Sign Up
                    <span class="visually-hidden">Next</span>
                  </button>
                </span>
              </div>
              <div class={`${styles.cItem} carousel-item`}>
                <h1>Sign Up</h1>
                <Formik
                  initialValues={{
                    founder_name: "",
                    ngo_name: "",
                    email: "",
                    password: "",
                  }}
                  validationSchema={SignUpSchema}
                  onSubmit={async (values) => {
                    console.log(values);
                    await axios
                      .post("/api/auth/register", values)
                      .then((data) => {
                        console.log(data);
                        if (data.status == 200) {
                          localStorage.setItem("authToken", data.data.token);
                          localStorage.setItem("userId", data.data.id);
                          Toast.fire({
                            title: "Registration Successfull",
                            icon: "success",
                            timer: 1500,
                            timerProgressBar: true,
                            didClose: () => {
                              window.location.href = "/dashboard";
                            },
                          });
                        }
                      })
                      .catch((err) => console.log(err));
                  }}
                >
                  {(formProps) => {
                    return (
                      <Form autoComplete="off">
                        <label htmlFor="ngo_name">NGO Name</label>
                        <Field
                          name="ngo_name"
                          placeholder="Enter your NGO Name"
                        />
                        <span className="error">
                          <ErrorMessage name="ngo_name"></ErrorMessage>
                        </span>
                        <label htmlFor="founder_name">Founder's Name</label>
                        <Field
                          name="founder_name"
                          placeholder="Enter your Founder's Name"
                        />
                        <span className="error">
                          <ErrorMessage name="founder_name"></ErrorMessage>
                        </span>
                        <label htmlFor="email">NGO Email Id</label>
                        <Field
                          type="email"
                          name="email"
                          placeholder="Enter your email"
                        />
                        <span className="error">
                          <ErrorMessage name="email"></ErrorMessage>
                        </span>
                        <label htmlFor="password">Password</label>
                        <div className={`row ${styles.passwordField}`}>
                          <div className="col-11">
                            <Field
                              type={signUpPassword}
                              name="password"
                              placeholder="Enter your password"
                            />
                          </div>
                          <div className="col-1">
                            <span
                              type="button"
                              onClick={() =>
                                signUpPassword == "password"
                                  ? setSignUp("text")
                                  : setSignUp("password")
                              }
                            >
                              {signUpPassword == "password" ? (
                                <AiFillEye size={28} />
                              ) : (
                                <AiFillEyeInvisible size={28} />
                              )}
                            </span>
                          </div>
                        </div>
                        <span className="error">
                          <ErrorMessage name="password"></ErrorMessage>
                        </span>
                        <button type="submit">Sign Up</button>
                      </Form>
                    );
                  }}
                </Formik>
                <span>
                  Already have an account?&nbsp;
                  <button
                    className={styles.carBtn}
                    type="button"
                    data-bs-target="#carouselExampleControls"
                    data-bs-slide="prev"
                  >
                    Login
                    <span
                      class="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span class="visually-hidden">Previous</span>
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
