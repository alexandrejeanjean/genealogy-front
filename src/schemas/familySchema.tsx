import * as Yup from "yup";

const FamilySchema = Yup.object().shape({
  name: Yup.string()
    .min(1, "Family name should contain at least 1 character.")
    .max(100, "*Family name should not contain more than 100 characters.")
    .required("*Family name is required"),
});

export default FamilySchema;
