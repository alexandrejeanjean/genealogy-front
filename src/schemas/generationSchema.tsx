import * as Yup from "yup";

const GenerationSchema = Yup.object().shape({
  position: Yup.number()
    .positive()
    .required("*Generation position is required"),
});

export default GenerationSchema;
