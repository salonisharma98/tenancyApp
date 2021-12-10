import axios from "axios";

export const ON_LOGIN = "ON_LOGIN";
export const ON_SIGNUP = "ON_SIGNUP";

export const onLogin = (email, password) => {
  return (dispatch) => {
    axios
      .post(
        "http://localhost:5000/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      .then((res) => {
        const users = res.data;
        dispatch({ type: ON_LOGIN, payload: users });
        localStorage.setItem("token", users.token);
      })
      .catch((error) => {
        console.log(error, "error occured");
      });
  };
};

export const onSignup = (fullName, email, password, mobile) => {
  return (dispatch) => {
    axios
      .post(
        "http://localhost:5000/signup",
        { fullName, email, password, mobile },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      .then((res) => {
        const onsignup = res.data;
        dispatch({ type: ON_SIGNUP, payload: onsignup });
      })
      .catch((error) => {
        console.log(error, "error occured");
      });
  };
};
