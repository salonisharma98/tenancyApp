import { React, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, TextField } from "@material-ui/core";
import { onLogin, onSignup } from "../../redux/actions/LoginSignupAction";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import bowtie from "../../assets/bowtie.png";
import img1 from "../../assets/penguin.png";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  field: {
    width: "85%",
    backgroundColor: "#FFFF",
    margin: "6px"
  },
  root: {
    backgroundColor: theme.palette.primary.main,
    textAlign: "center",
    paddingBottom: "70px"
  },
  formImage: {
    width: "277px",
    height: "40vh",
    borderRadius: "50%",
    paddingTop: "70px"
  }
}));

const Form = ({ urlState }) => {
  const location = useLocation();
  const navigate = useNavigate();
  let dispatch = useDispatch();
  const classes = useStyles();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState();

  const onSubmit = () => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      if (location.pathname === "/login") {
        dispatch(onLogin(email, password));
        const token = localStorage.getItem("token");
        if (token) {
          navigate("/home");
        }
      } else if (location.pathname === "/signup") {
        dispatch(onSignup(fullName, email, password, mobile));
        setEmail("");
        setPassword("");
        navigate("/login");
      }
    } else {
      alert("You have entered an invalid email address!");
    }
  };
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={6} className={classes.gridStyle}>
          <img className={classes.formImage} src={urlState ? img1 : bowtie} />
        </Grid>
        <Grid item xs={6} className={classes.gridStyle}>
          <h1>Form</h1>
          {location.pathname === "/login" ? (
            <>
              <Grid item xs={12} className={classes.gridStyle}>
                <TextField
                  value={email}
                  label="Email"
                  variant="outlined"
                  type="email"
                  className={classes.field}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} className={classes.gridStyle}>
                <TextField
                  value={password}
                  label="Password"
                  variant="outlined"
                  type="password"
                  className={classes.field}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={12} className={classes.gridStyle}>
                <TextField
                  value={fullName}
                  label="FullName"
                  variant="outlined"
                  type="text"
                  className={classes.field}
                  onChange={(e) => {
                    setFullName(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} className={classes.gridStyle}>
                <TextField
                  value={email}
                  label="Email"
                  variant="outlined"
                  type="email"
                  className={classes.field}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} className={classes.gridStyle}>
                <TextField
                  value={password}
                  label="Password"
                  variant="outlined"
                  type="password"
                  className={classes.field}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} className={classes.gridStyle}>
                <TextField
                  value={mobile}
                  label="Mobile no."
                  variant="outlined"
                  type="phone"
                  className={classes.field}
                  onChange={(e) => {
                    setMobile(e.target.value);
                  }}
                />
              </Grid>
            </>
          )}
          <Grid item xs={12} className={classes.gridStyle}>
            <button
              //ariant="contained"
              className={classes.field}
              onClick={() => onSubmit()}
            >
              {location.pathname === "/login" ? "Login" : "Signup"}
            </button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
export default Form;
