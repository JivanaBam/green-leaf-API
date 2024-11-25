import yup from "yup";

export const registerAdminValidationSchema = yup.object({
  name: yup
    .string()
    .trim()
    .max(50, "Name must be at max 50 characters.")
    .required("Name is required."),
  password: yup
    .string()
    .min(6, "Password must be atleast 6 characters.")
    .max(20, "Password must be at max 20 characters.")
    .trim()
    .required("Password is required."),
});
