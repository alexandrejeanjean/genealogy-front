import * as Yup from "yup";

const PersonSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(1, "Person firstname should contain at least 1 character.")
    .max(100, "*Person firstname should not contain more than 100 characters.")
    .required("*Person firstname is required"),
  lastname: Yup.string()
    .min(1, "Person lastname should contain at least 1 character.")
    .max(100, "*Person lastname should not contain more than 100 characters.")
    .required("*Person lastname is required"),
  role: Yup.string().required("*Person role's is required"),
});

export default PersonSchema;
