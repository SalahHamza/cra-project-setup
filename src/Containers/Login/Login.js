import React from "react";
import LoginForm from "./components/Form";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  root: {},
  formContainer: {
    marginTop: "15%",
    width: "100%",
    maxWidth: 450,
    margin: "0 auto"
  }
}));

const Login = props => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.formContainer}>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
