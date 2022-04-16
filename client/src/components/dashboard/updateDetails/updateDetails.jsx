import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Swal from "sweetalert2";
import axios from "axios";
import { MdAdd, MdOutlineCancel } from "react-icons/md";
import styles from "./updateDetails.module.css";
function UpdateDetails({ ngo }) {
  const [selectTags, setTags] = useState([]);
  const [branches, setBranches] = useState([]);
  const [img, setImg] = useState([]);
  const [logo, setLogo] = useState([]);
  const [imgError, setImgError] = useState([]);
  const [branchError, setBranchError] = useState([]);
  const [tagError, setTagError] = useState([]);
  const Toast = Swal.mixin({
    position: "top-end",
    toast: true,
    showCloseButton: true,
    showConfirmButton: false,
  });
  const addLogo = (data) => {
    setLogo(data);
  };
  const removeLogo = () => {
    setLogo();
  };
  const addImg = (data) => {
    const currImg = [data];
    if (img.indexOf(data) == -1 && data != "" && data != undefined) {
      currImg.push(...img);
      setImg(currImg);
    } else {
      setImgError("Duplicate Image Entered");
      return;
    }
    setImgError("");
  };
  const removeImg = (data) => {
    const currImg = [];
    currImg.push(...img);
    currImg.splice(currImg.indexOf(data), 1);
    setImg(currImg);
    if (img.length == 0) setImgError("Required");
  };
  const removeTag = (data) => {
    const currTag = [];
    currTag.push(...selectTags);
    currTag.splice(currTag.indexOf(data), 1);
    setTags(currTag);
    if (selectTags.length == 0) {
      setTagError("Required");
    } else if (tagError != "") {
      setTagError("");
    }
  };
  const addTag = (data) => {
    if (selectTags.length == 10) {
      setTagError("Max Limit Reached");
      return;
    }
    const currTag = [data.toLowerCase()];
    if (
      selectTags.indexOf(data.toLowerCase()) == -1 &&
      data != "" &&
      data != undefined
    ) {
      currTag.push(...selectTags);
      setTags(currTag);
    } else {
      setTagError("Duplicate Tag Entered");
      return;
    }
    setTagError("");
  };
  const removeBranch = (data) => {
    const currBranch = [];
    currBranch.push(...branches);
    currBranch.splice(currBranch.indexOf(data), 1);
    setBranches(currBranch);
    if (branches.length == 0) {
      setBranchError("Required");
    } else if (branchError != "") {
      setBranchError("");
    }
  };
  const addBranch = (data) => {
    const currBranch = [data.toLowerCase()];
    if (
      branches.indexOf(data.toLowerCase()) == -1 &&
      data != "" &&
      data != undefined
    ) {
      currBranch.push(...branches);
      setBranches(currBranch);
    } else {
      setBranchError("Duplicate Tag Entered");
      return;
    }
    setBranchError("");
  };
  return (
    <div className={styles.update}>
      <Formik
        initialValues={{
          logo: logo,
          ngo_description: "",
          website_link: "",
          ceo_statemaent: "",
          gallery: img,
          donation_type: selectTags,
          branches: branches,
          funds: "",
          phone: "",
          email: "",
          instagram: "",
          linkdin: "",
          testimonial: [],
        }}
        // validationSchema={LoginSchema}
        onSubmit={async (values) => {
            console.log(values);
          await axios
            .post(`/api/details/updateDetails/${localStorage.getItem('userId')}`, values)
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
              if (err.message == "Request failed with status code 401") {
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
              <div>
                <label htmlFor="logo">Logo</label>
                <div className="row align-items-center">
                  <div className="col-10 col-md-11">
                    <input type="url" placeholder="Enter Image URL" id="logo" />
                  </div>
                  <div className="col-2 col-md-1">
                    <button
                      type="button"
                      className=" rounded-circle"
                      onClick={(e) => {
                        addLogo(document.getElementById("logo").value);
                        document.getElementById("logo").value = "";
                      }}
                    >
                      <MdAdd size={28} />
                    </button>
                  </div>
                </div>
                {imgError != "" ? (
                  <span className="error">{imgError}</span>
                ) : (
                  ""
                )}
                {logo != "" && logo != undefined  ? (
                  <p>
                    <p>Logo:</p>
                    <span>
                      <img src={logo} alt="" />
                      <button type="button" onClick={() => removeLogo()}>
                        <MdOutlineCancel size={26} />
                      </button>
                    </span>
                  </p>
                ) : (
                  ""
                )}
              </div>
              <div>
                <label htmlFor="ngo_description">NGO Description</label>
                <Field
                  as="textarea"
                  type="text"
                  name="ngo_description"
                  placeholder="Enter your NGO Description"
                />
                <span className="error">
                  <ErrorMessage name="ngo_description"></ErrorMessage>
                </span>
              </div>
              <div>
                <label htmlFor="email">Email Id</label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter your NGO's Email Id"
                />
                <span className="error">
                  <ErrorMessage name="email"></ErrorMessage>
                </span>
              </div>
              <div>
                <label htmlFor="website_link">NGO's Website</label>
                <Field
                  type="url"
                  name="website_link"
                  placeholder="Enter your NGO's Website"
                />
                <span className="error">
                  <ErrorMessage name="website_link"></ErrorMessage>
                </span>
              </div>
              <div>
                <label htmlFor="ceo_statemaent">Founder Statement</label>
                <Field
                  as="textarea"
                  type="text"
                  name="ceo_statemaent"
                  placeholder="Enter your NGO Description"
                />
                <span className="error">
                  <ErrorMessage name="ceo_statemaent"></ErrorMessage>
                </span>
              </div>
              <div>
                <label htmlFor="funds">Funds</label>
                <Field
                  type="number"
                  name="funds"
                  placeholder="Enter your NGO's Funds"
                />
                <span className="error">
                  <ErrorMessage name="funds"></ErrorMessage>
                </span>
              </div>
              <div>
                <label htmlFor="phone">Phone Number</label>
                <Field
                  type="number"
                  name="phone"
                  placeholder="Enter your NGO's Phone Number"
                />
                <span className="error">
                  <ErrorMessage name="phone"></ErrorMessage>
                </span>
              </div>
              <div>
                <label htmlFor="instagram">Instagram Link</label>
                <Field
                  type="url"
                  name="instagram"
                  placeholder="Enter your NGO's Website"
                />
                <span className="error">
                  <ErrorMessage name="instagram"></ErrorMessage>
                </span>
              </div>
              <div>
                <label htmlFor="linkdin">LinkedIn Link</label>
                <Field
                  type="url"
                  name="linkdin"
                  placeholder="Enter your NGO's Website"
                />
                <span className="error">
                  <ErrorMessage name="linkdin"></ErrorMessage>
                </span>
              </div>
              <div>
                <label htmlFor="linkdin">Gallery</label>
                <div className="row align-items-center">
                  <div className="col-10 col-md-11">
                    <input
                      type="url"
                      placeholder="Enter Image URL"
                      id="currImg"
                    />
                  </div>
                  <div className="col-2 col-md-1">
                    <button
                      type="button"
                      className=" rounded-circle"
                      onClick={(e) => {
                        addImg(document.getElementById("currImg").value);
                        document.getElementById("currImg").value = "";
                      }}
                    >
                      <MdAdd size={28} />
                    </button>
                  </div>
                </div>
                {imgError != "" ? (
                  <span className="error">{imgError}</span>
                ) : (
                  ""
                )}
                {img.length > 0 ? (
                  <p>
                    <p>Images:</p>
                    {img.map((image) => {
                      return (
                        <span>
                          <img src={image} alt="" />
                          <button
                            type="button"
                            onClick={() => removeImg(image)}
                          >
                            <MdOutlineCancel size={26} />
                          </button>
                        </span>
                      );
                    })}
                  </p>
                ) : (
                  ""
                )}
              </div>
              <div>
                <label htmlFor="tags">Donation Type</label>
                <div className="row">
                  <div className="col-10 col-md-11">
                    <select id="donationType">
                        <option value="">--SELECT--</option>
                        <option value="money">Money</option>
                        <option value="clothes">Clothes</option>
                        <option value="food">Food</option>
                        <option value="education">Education</option>
                    </select>
                  </div>
                  <div className="col-2 col-md-1">
                    <button
                      type="button"
                      className=" rounded-circle"
                      onClick={(e) => {
                        addTag(document.getElementById("donationType").value);
                        document.getElementById("donationType").value = "";
                      }}
                    >
                      <MdAdd size={28} />
                    </button>
                  </div>
                </div>
                {tagError != "" ? (
                  <span className="error">{tagError}</span>
                ) : (
                  ""
                )}
                {selectTags.length > 0 ? (
                  <p>
                    Selected:
                    {selectTags.map((tag) => {
                      return (
                        <p className="rounded-pill">
                          {tag}
                          <button
                            type="button"
                            className="rounded-circle"
                            onClick={() => removeTag(tag.toLowerCase())}
                          >
                            <MdOutlineCancel size={26} />
                          </button>
                        </p>
                      );
                    })}
                  </p>
                ) : (
                  ""
                )}
              </div>
              <div>
                <label htmlFor="Branches">Branches</label>
                <div className="row">
                  <div className="col-10 col-md-11">
                    <input
                      type="text"
                      id="currBranches"
                      placeholder="Donation Type"
                    />
                  </div>
                  <div className="col-2 col-md-1">
                    <button
                      type="button"
                      className=" rounded-circle"
                      onClick={(e) => {
                        addBranch(
                          document.getElementById("currBranches").value
                        );
                        document.getElementById("currBranches").value = "";
                      }}
                    >
                      <MdAdd size={28} />
                    </button>
                  </div>
                </div>
                {branchError != "" ? (
                  <span className="error">{branchError}</span>
                ) : (
                  ""
                )}
                {branches.length > 0 ? (
                  <p>
                    Selected:
                    {branches.map((branch) => {
                      return (
                        <p className="rounded-pill">
                          {branch}
                          <button
                            type="button"
                            className="rounded-circle"
                            onClick={() => removeBranch(branch.toLowerCase())}
                          >
                            <MdOutlineCancel size={26} />
                          </button>
                        </p>
                      );
                    })}
                  </p>
                ) : (
                  ""
                )}
              </div>
              <button type="submit">Update</button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default UpdateDetails;
