import { useState } from "react";
import Swal from "sweetalert2";
import emailjs from "emailjs-com";
// import http from "../../utils/http-common";
// import Cookie from "js-cookie";
import axios, { AxiosResponse } from "axios";

const SERVICE_ID = "service_egqlubp";
const TEMPLATE_ID = "template_f9v1qnv";
const PUBLIC_KEY = "DXbcwxmNpk-mrWio8";

interface FormValues {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  passwordCheck: string;
  formSubmitted: boolean;
  success: boolean;
}

const initialFormValues = {
  fullName: "",
  email: "",
  phone: "",
  password: "",
  passwordCheck: "",
  formSubmitted: false,
  success: false,
};

export const useFormControls = () => {
  const [values, setValues] = useState<FormValues>(initialFormValues);
  const [errors, setErrors] = useState<any>({});
   

  const validate: any = (fieldValues = values) => {
    // console.log(fieldValues);
    let temp: any = { ...errors };

    if ("fullName" in fieldValues)
      temp.fullName = fieldValues.fullName ? "" : "This field is required.";

    if ("password" in fieldValues) {
      temp.password = fieldValues.password ? "" : "This field is required.";
      if (fieldValues.password) {
        if (!/[a-z]/.test(fieldValues.password))
          temp.password +=
            "Password must contain at least one lowercase letter. ";
        if (!/[A-Z]/.test(fieldValues.password))
          temp.password +=
            "Password must contain at least one uppercase letter. ";
        if (!/\d/.test(fieldValues.password))
          temp.password += "Password must contain at least one number. ";
        if (!/[^\w\d\s]/.test(fieldValues.password))
          temp.password +=
            "Password must contain at least one special character. ";
        if (fieldValues.password.length < 8)
          temp.password += "Password must be at least 8 characters long. ";
      }
    }

    if ("passwordCheck" in fieldValues) {
      temp.passwordCheck = fieldValues.passwordCheck
        ? ""
        : "This field is required.";
      //   console.log(
      //     `password: ${fieldValues.password}, passwordCheck: ${fieldValues.passwordCheck}`
      //   );
      if (fieldValues.passwordCheck !== fieldValues.password) {
        temp.passwordCheck = "Passwords do not match!";
      }
    }

    if ("email" in fieldValues) {
      temp.email = fieldValues.email ? "" : "This field is required.";
      if (fieldValues.email)
        temp.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fieldValues.email)
          ? ""
          : "Please enter a valid email.";
    }

    if ("phone" in fieldValues) {
      if (fieldValues.phone)
        temp.phone = /^[0-9]+$/.test(fieldValues.phone)
          ? ""
          : "Please enter only numbers.";
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
      fieldValues.fullName &&
      fieldValues.email &&
      fieldValues.password &&
      fieldValues.passwordCheck &&
      Object.values(errors).every((x) => x === "");

    return isValid;
  };

// Handle the Axios POST request
const handleAxiosPost = async (): Promise<AxiosResponse> => {
  console.log("Axios POST request is being made");
  console.log(values);
  // const TOKEN = Cookie.get('token');
  // console.log("TOKEN:", TOKEN)
  const { fullName, email, phone, password } = values;

  try {
    console.log("entered try block in handleAxiosPost")
    // Make a POST request to your server endpoint using axios
    const response: AxiosResponse = await axios.post('http://localhost:5000/api/users/signup',
    { 
        name: fullName,
        phone: phone,
        email: email,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Handle the response as needed
    console.log("User Created", response.data);
    return response;
  } catch (error) {
    // Handle errors from the server
    console.error('Error submitting form HAPF:', errors.response || errors.message || "Unknown error occurred");

    throw error; // Rethrow the error to be caught by the calling function
  }
};

//This is a handleFormSubmit function like the one just above, but it gets rid of repeated code: 

const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  try {

    const isValid = formIsValid() && Object.values(errors).every((x) => x === "");
    if (isValid) {

      console.log("Form is valid!!!");
      // Handle the Axios POST request
      const axiosResponse = await handleAxiosPost();
      console.log("Axios POST response:", axiosResponse);

      // Continue with emailjs logic only if the Axios request is successful
      const emailjsResponse = await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, "#signupForm", PUBLIC_KEY);
      console.log(emailjsResponse.text);

      // Display success message to the user
      Swal.fire({
        icon: "success",
        title: "Thanks for signing up! Check your email to finish the process.",
      });

      // Update state on successful submission
      setValues({
        ...initialFormValues,
        formSubmitted: true,
        success: true,
      });
    } else {
      throw new Error("Form validation failed");
    }
  } catch (error) {
    console.error('Error submitting form HFSF:', errors.message || error);

    // Display an error message to the user
    Swal.fire({
      icon: "error",
      title: "Oops, something went wrong. Please try again later.",
      text: errors.response?.data || errors.message || "Unknown error occurred",
    });

    // Reset form values on error
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


