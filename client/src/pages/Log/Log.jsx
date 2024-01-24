import React, { useState, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Login, SignUp } from "./_components";
import axiosAPI from "../../apis/axios";
import Context from "../../utilities/contextProvider/Context";
import ErrorHandler from "../ErrorHandler/ErrorHandler";

const Log = () => {
  const [formData, setFormData] = useState({});
  const [validated, setValidated] = useState(false);
  const { userData, dispatchUser, messagingBox, navigate } =
    useContext(Context);
  const { setToastMsg } = messagingBox;

  const logBox = {
    lookups: {
      stateAbreviations: [
        "AL",
        "AL",
        "AZ",
        "AR",
        "CA",
        "CO",
        "CT",
        "DE",
        "FL",
        "GA",
        "HI",
        "ID",
        "IL",
        "IN",
        "IA",
        "KS",
        "KY",
        "LA",
        "ME",
        "MD",
        "MA",
        "MI",
        "MN",
        "MS",
        "MO",
        "MT",
        "NE",
        "NV",
        "NH",
        "NJ",
        "NM",
        "NY",
        "NC",
        "ND",
        "OH",
        "OK",
        "OR",
        "PA",
        "RI",
        "SC",
        "SD",
        "TN",
        "TX",
        "UT",
        "VT",
        "VA",
        "WA",
        "WV",
        "WI",
        "WY",
      ],
    },
    state: {
      formData,
      validated,
      navigate,
    },
    hooks: {
      setFormData,
      setValidated,
    },
    handles: {
      handleOnChange(e) {
        const { name, value } = e.target;
        const locationName = e.target.name.split("-").at(1);

        setFormData(
          name.includes("loc")
            ? {
                ...formData,
                location: {
                  ...formData.location,
                  [locationName]: value,
                },
              }
            : { ...formData, [name]: value }
        );
      },
      handleCreateAcc: async (e) => {
        e.preventDefault();

        // form validation
        setValidated(true);
        const form = e.currentTarget;
        if (!form.checkValidity()) return;

        try {
          const createdUserResult = await axiosAPI.createUser(formData);
          const createdUserData = createdUserResult.data;

          if (createdUserData.success) {
            const verifyUserResult = await axiosAPI.verifyLogin(formData);
            const verifyUserData = verifyUserResult.data;
            setToastMsg(verifyUserData.message);

            if (verifyUserData.success) {
              setTimeout(() => {
                dispatchUser({
                  type: "overwrite",
                  payload: verifyUserData.user,
                });
                navigate("/");
              }, 2400);
              sessionStorage.setItem(
                "loggedInUser",
                JSON.stringify(verifyUserData.user)
              );
            }
          } else {
            // for unsuccessful messages when creating a user
            setToastMsg(createdUserData.message);
          }
        } catch (error) {
          setToastMsg(
            `${error.message}. Please contact us at rescue_help_desk@gmail.com if the error continues.`
          );
        }
      },

      handleLoginAcc: async (e) => {
        e.preventDefault();

        // form validation
        setValidated(true);
        const form = e.currentTarget;
        if (!form.checkValidity()) return;

        try {
          const result = await axiosAPI.verifyLogin(formData);
          const { success, message, user } = result.data;
          setToastMsg(message);
          if (success) {
            setTimeout(() => {
              dispatchUser({
                type: "overwrite",
                payload: user,
              });
              navigate("/");
            }, 2400);
            sessionStorage.setItem("loggedInUser", JSON.stringify(user));
          }
        } catch (error) {
          setToastMsg(
            `${error.message}. Please contact us at rescue_help_desk@gmail.com if the error continues.`
          );
        }
      },
    },
  };

  return (
    <Routes>
      <Route path="/create" element={<SignUp logBox={logBox} />} />
      <Route path="/login" element={<Login logBox={logBox} />} />
      <Route path="/*" element={<ErrorHandler />} />
    </Routes>
  );
};

export default Log;

/*
handleCreateAcc: once a new account is created, FN immediately verifies the
account with the same data in order to generate a JWT and set it to the
browsers as a cookie.
*/
