import React from "react";
import * as Yup from "yup";
import { Form as FormikForm, withFormik } from "formik";
import { Form } from "react-bootstrap";
import { makeStyles } from "@material-ui/styles";
import LoadingButton from "Components/UI/LoadingButton/LoadingButton";

const useStyles = makeStyles({
  root: {},
  formRow: {
    marginLeft: 0,
    marginRight: 0
  },
  field: {
    width: "100%"
  }
});

const LoginForm = props => {
  const classes = useStyles();
  const {
    handleSubmit,
    handleChange,
    isSubmitting,
    values,
    touched,
    errors
  } = props;
  return (
    <FormikForm noValidate onSubmit={handleSubmit}>
      <Form.Row className={classes.formRow}>
        <Form.Group className={classes.field} controlId="login-form__email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            name="email"
            value={values.email}
            onChange={handleChange}
            isInvalid={touched.email && !!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>
      </Form.Row>
      <Form.Row className={classes.formRow}>
        <Form.Group className={classes.field} controlId="login-form-password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            isInvalid={touched.email && !!errors.password}
          />

          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>
      </Form.Row>
      <Form.Group>
        <Form.Check
          required
          name="terms"
          label="Agree to terms and conditions"
          onChange={handleChange}
          isInvalid={!!errors.terms}
          feedback={errors.terms}
          id="login-form-terms"
        />
      </Form.Group>
      <LoadingButton isLoading={isSubmitting} type="submit">
        Login
      </LoadingButton>
    </FormikForm>
  );
};

export default withFormik({
  mapPropsToValues: () => ({ email: "", password: "" }),
  validationSchema: () =>
    Yup.object({
      email: Yup.string()
        .email("Invalid email")
        .required("Required"),
      password: Yup.string().required("Required")
    }),
  handleSubmit: (values, { setSubmitting }) => {
    // Simulating network request
    setTimeout(() => {
      setSubmitting(false);
    }, 2000);
  }
})(LoginForm);
