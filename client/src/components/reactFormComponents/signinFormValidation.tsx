import { useState } from "react";
import Swal from "sweetalert2";
import emailjs from "emailjs-com";

const SERVICE_ID = "service_egqlubp";
const TEMPLATE_ID = "template_f9v1qnv";
const PUBLIC_KEY = "DXbcwxmNpk-mrWio8";

const initialFormValues = {
  email: "",
  password: "",
  formSubmitted: false,
  success: false,
};

export const useFormControls = () => {
  const [values, setValues] = useState(initialFormValues);
  const [errors, setErrors] = useState({} as any);

  const validate: any = (fieldValues = values) => {
    // console.log(fieldValues);
    let temp: any = { ...errors };

    if ("password" in fieldValues) {
      temp.password = fieldValues.password ? "" : "This field is required.";
    }

    if ("email" in fieldValues) {
      temp.email = fieldValues.email ? "" : "This field is required.";
      if (fieldValues.email)
        temp.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fieldValues.email)
          ? ""
          : "Please enter a valid email.";
    }

    setErrors({
      ...temp,
    });
  };

  const handleInputValue = (e: any) => {
    const { name, value } = e.target;
    setValues((prevValues) => {
      const newValues = { ...prevValues, [name]: value };
      validate({ ...newValues, [name]: value });
      return newValues;
    });
  };

  const formIsValid = (fieldValues = values) => {
    const isValid =
      fieldValues.email &&
      fieldValues.password &&
      Object.values(errors).every((x) => x === "");

    return isValid;
  };

  const handleFormSubmit = async (e: any) => {
    // console.log("Form is Being Submitted!");
    e.preventDefault();
    const isValid =
      formIsValid() && Object.values(errors).every((x) => x === "");
    if (isValid) {
      emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, "#signupForm", PUBLIC_KEY).then(
        (result) => {
          console.log(result.text);
          Swal.fire({
            icon: "success",
            title: "Signed In!",
          });
          setValues({
            ...initialFormValues,
            formSubmitted: true,
            success: true,
          });
        },
        (error) => {
          console.log(error.text);
          Swal.fire({
            icon: "error",
            title: "Oops, something went wrong. Please try again later.",
            text: error.text,
          });
          setValues({
            ...initialFormValues,
            formSubmitted: true,
            success: false,
          });
        }
      );
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops, something went wrong. Please try again later.",
        text: errors.text,
      });
      setValues({
        ...initialFormValues,
        formSubmitted: true,
        success: false,
      });
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
