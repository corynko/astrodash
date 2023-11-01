import { useState } from "react";
import Swal from "sweetalert2";
import emailjs from "emailjs-com";

const SERVICE_ID = "service_egqlubp";
const TEMPLATE_ID = "template_f9v1qnv";
const PUBLIC_KEY = "DXbcwxmNpk-mrWio8";

const PostContactForm = async (
  values: any,
  successCallback: any,
  errorCallback: any
) => {
  if (true) successCallback();
  else errorCallback();
};

const initialFormValues = {
  fullName: "",
  email: "",
  phoneNumber: "",
  password: "",
  passwordCheck: "",
  formSubmitted: false,
  success: false,
};

export const useFormControls = () => {
  const [values, setValues] = useState(initialFormValues);
  const [errors, setErrors] = useState({} as any);

  const validate: any = (fieldValues = values) => {
    let temp: any = { ...errors };

    if ("fullName" in fieldValues)
      temp.firstName = fieldValues.firstName ? "" : "This field is required.";

    if ("password" in fieldValues)
      temp.lastName = fieldValues.lastName ? "" : "This field is required.";

    if ("email" in fieldValues) {
      temp.email = fieldValues.email ? "" : "This field is required.";
      if (fieldValues.email)
        temp.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fieldValues.email)
          ? ""
          : "Email is not valid.";
    }

    if ("message" in fieldValues)
      temp.message =
        fieldValues.message.length !== 0 ? "" : "This field is required.";

    setErrors({
      ...temp,
    });
  };

  const handleInputValue = (e: any) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    validate({ [name]: value });
  };

  const handleSuccess = () => {
    setValues({
      ...initialFormValues,
      formSubmitted: true,
      success: true,
    });
  };

  const handleError = () => {
    setValues({
      ...initialFormValues,
      formSubmitted: true,
      success: false,
    });
  };

  const formIsValid = (fieldValues = values) => {
    const isValid =
      fieldValues.fullName &&
      fieldValues.phoneNumber &&
      fieldValues.email &&
      fieldValues.password &&
      fieldValues.passwordCheck;
    Object.values(errors).every((x) => x === "");

    return isValid;
  };

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    const isValid =
      Object.values(errors).every((x) => x === "") && formIsValid();
    if (isValid) {
      emailjs
        .sendForm(SERVICE_ID, TEMPLATE_ID, "#contactForm", PUBLIC_KEY)
        .then(
          (result) => {
            console.log(result.text);
            Swal.fire({
              icon: "success",
              title:
                "Thanks for signing up! Check your email to finish the process.",
            });
          },
          (error) => {
            console.log(error.text);
            Swal.fire({
              icon: "error",
              title: "Oops, something went wrong. Please try again later.",
              text: error.text,
            });
          }
        );
      e.target.reset();
      await PostContactForm(values, handleSuccess, handleError);
    }
  };

  return {
    values,
    errors,
    handleInputValue,
    handleFormSubmit,
    formIsValid,
  };
};
