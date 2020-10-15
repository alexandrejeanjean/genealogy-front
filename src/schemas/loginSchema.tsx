import * as Yup from "yup";

const emailRegExp = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/;
const passwordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .email("*Must be a valid email address")
    .max(100, "*Email must be less than 100 characters")
    .matches(emailRegExp, "*Email is not valid")
    .required("*Email is required"),
  password: Yup.string()
    .max(100, "*Password must contains at least 8 characters")
    .matches(passwordRegExp, "*8 characters, 1 lowercase & 1 uppercase")
    .required("*Password is required"),
});

export default LoginSchema;
