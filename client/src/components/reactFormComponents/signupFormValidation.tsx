import { useState } from "react";
import Swal from "sweetalert2";
import emailjs from "emailjs-com";
// import http from "../../utils/http-common";
// import Cookie from "js-cookie";
import axios from "axios";

const SERVICE_ID = "service_egqlubp";
const TEMPLATE_ID = "template_f9v1qnv";
const PUBLIC_KEY = "DXbcwxmNpk-mrWio8";

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
  const [values, setValues] = useState(initialFormValues);
  const [errors, setErrors] = useState({} as any);
   

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
// This is the original handleFormSubmit function for reference. 
  // const handleFormSubmit = async (e: any) => {
  //   // console.log("Form is Being Submitted!");
  //   e.preventDefault();
  //   const isValid =
  //     formIsValid() && Object.values(errors).every((x) => x === "");
  //   if (isValid) {
  //     emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, "#signupForm", PUBLIC_KEY).then(
  //       (result) => {
  //         console.log(result.text);
  //         Swal.fire({
  //           icon: "success",
  //           title:
  //             "Thanks for signing up! Check your email to finish the process.",
  //         });
  //         setValues({
  //           ...initialFormValues,
  //           formSubmitted: true,
  //           success: true,
  //         });
  //       },
  //       (error) => {
  //         console.log(error.text);
  //         Swal.fire({
  //           icon: "error",
  //           title: "Oops, something went wrong. Please try again later.",
  //           text: error.text,
  //         });
  //         setValues({
  //           ...initialFormValues,
  //           formSubmitted: true,
  //           success: false,
  //         });
  //       }
  //     );
  //   } else {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Oops, something went wrong. Please try again later.",
  //       text: errors.text,
  //     });
  //     setValues({
  //       ...initialFormValues,
  //       formSubmitted: true,
  //       success: false,
  //     });
  //   }
  // };

//This is a refactored version of the original handleFormSubmit function refactored with a try/catch block.
// const handleFormSubmit = async (e: any) => {
//   e.preventDefault();
//   try {
//     const isValid = formIsValid() && Object.values(errors).every((x) => x === "");
//     if (isValid) {
//       const result = await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, "#signupForm", PUBLIC_KEY);
//       console.log(result.text);

//       Swal.fire({
//         icon: "success",
//         title: "Thanks for signing up! Check your email to finish the process.",
//       });

//       setValues({
//         ...initialFormValues,
//         formSubmitted: true,
//         success: true,
//       });
//     } else {
//       Swal.fire({
//         icon: "error",
//         title: "Oops, something went wrong. Please fix the form errors and try again later.",
//         text: errors.text,
//       });

//       setValues({
//         ...initialFormValues,
//         formSubmitted: true,
//         success: false,
//       });
//     }
//   } catch (error) {
//     console.error('Error submitting form:', error);

//     Swal.fire({
//       icon: "error",
//       title: "Oops, something went wrong. Please try again later.",
//       text: errors.text || "Unknown error occurred",
//     });

//     setValues({
//       ...initialFormValues,
//       formSubmitted: true,
//       success: false,
//     });
//   }
// };

// This is the second handleFormSubmit function for reference.
  // const handleFormSubmit = async (e: any) => {
  //   e.preventDefault();
  //   const isValid =
  //     formIsValid() && Object.values(errors).every((x) => x === "");
  //   if (isValid) {
  //     try {
  //       // Make a POST request to your server endpoint using axios
  //       const response = await axios.post("/api/signup", values);
  
  //       // Handle the response as needed
  //       console.log(response.data);
  
  //       // Continue with your emailjs logic
  //       emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, "#signupForm", PUBLIC_KEY).then(
  //         (result) => {
  //           console.log(result.text);
  //           Swal.fire({
  //             icon: "success",
  //             title:
  //               "Thanks for signing up! Check your email to finish the process.",
  //           });
  //           setValues({
  //             ...initialFormValues,
  //             formSubmitted: true,
  //             success: true,
  //           });
  //         },
  //         (error) => {
  //           console.log(error.text);
  //           Swal.fire({
  //             icon: "error",
  //             title: "Oops, something went wrong. Please try again later.",
  //             text: error.text,
  //           });
  //           setValues({
  //             ...initialFormValues,
  //             formSubmitted: true,
  //             success: false,
  //           });
  //         }
  //       );
  //     } catch (error) {
  //       // Handle errors from the server
  //       console.error('Error submitting form:', error);
  //       Swal.fire({
  //         icon: "error",
  //         title: "Oops, something went wrong. Please try again later.",
  //         text: errors.message,
  //       });
  //       setValues({
  //         ...initialFormValues,
  //         formSubmitted: true,
  //         success: false,
  //       });
  //     }
  //   } else {
  //     // Handle form validation errors
  //     Swal.fire({
  //       icon: "error",
  //       title: "Oops, something went wrong. Please try again later.",
  //       text: errors.text,
  //     });
  //     setValues({
  //       ...initialFormValues,
  //       formSubmitted: true,
  //       success: false,
  //     });
  //   }
  // };

// This is the third handleFormSubmit function for reference.
// const handleFormSubmit = async (e: any) => {
//   e.preventDefault();
//   const isValid =
//     formIsValid() && Object.values(errors).every((x) => x === "");

//   if (isValid) {
//     const TOKEN = Cookie.get('token');
//     const { fullName, email, phone, password } = values;
//     http.defaults.headers.common['Authorization'] = `Bearer ${TOKEN}`;

//     try {
//       // Make a POST request to your server endpoint using axios
//       const response = await http.post("/users/signup", {
//         name: fullName,
//         phone: phone,
//         email: email,
//         password: password,
//       }, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       // Handle the response as needed
//       console.log(response.data);

//       // Continue with your emailjs logic
//       await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, "#signupForm", PUBLIC_KEY);

//       // Display success message to the user
//       Swal.fire({
//         icon: "success",
//         title: "Thanks for signing up! Check your email to finish the process.",
//       });

//       // Reset form values on successful submission
//       setValues({
//         ...initialFormValues,
//         formSubmitted: true,
//         success: true,
//       });
//     } catch (error) {
//       // Handle errors from the server
//       console.error('Error submitting form:', error);
//       Swal.fire({
//         icon: "error",
//         title: "Oops, something went wrong. Please try again later.",
//         text: errors.response.data || "Unknown error occurred."
//       });

//       // Reset form values on error
//       setValues({
//         ...initialFormValues,
//         formSubmitted: true,
//         success: false,
//       });
//     }
//   } else {
//     // Handle form validation errors
//     Swal.fire({
//       icon: "error",
//       title: "Oops, something went wrong. Please fix the form errors and try again.",
//       text: errors.text,
//     });

//     // Reset form values on error
//     setValues({
//       ...initialFormValues,
//       formSubmitted: true,
//       success: false,
//     });
//   }
// };





// Handle the emailjs logic
// const handleEmailJsForm = async () => {
//   try {
//     // Continue with your emailjs logic
//     await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, "#signupForm", PUBLIC_KEY);

//     // Display success message to the user
//     Swal.fire({
//       icon: "success",
//       title: "Thanks for signing up! Check your email to finish the process.",
//     });

//     // Reset form values on successful submission
//     setValues({
//       ...initialFormValues,
//       formSubmitted: true,
//       success: true,
//     });
//   } catch (error) {
//     // Handle errors from the emailjs logic
//     console.error('Error submitting emailjs form:', error);

//     // Display an error message to the user
//     Swal.fire({
//       icon: "error",
//       title: "Oops, something went wrong with the emailjs form. Please try again later.",
//       text: "Emailjs form submission failed",
//     });

//     // Reset form values on error
//     setValues({
//       ...initialFormValues,
//       formSubmitted: true,
//       success: false,
//     });
//   }
// };

// This is the fourth handleFormSubmit function for reference. This includes seperate functions for Axios POST and emailjs.
// const handleFormSubmit = async (e: any) => {
//   e.preventDefault();
//   const isValid =
//     formIsValid() && Object.values(errors).every((x) => x === "");

//   if (isValid) {
//     try {
//       // Handle the Axios POST request
//       const axiosResponse = await handleAxiosPost();

//       // Continue with emailjs logic only if the Axios request is successful
//       if (axiosResponse) {
//         await handleEmailJsForm();
//       }
//     } catch (error) {
//       // Handle errors from either Axios or emailjs
//       console.error('Error submitting form:', error);
//     }
//   } else {
//     // Handle form validation errors
//     Swal.fire({
//       icon: "error",
//       title: "Oops, something went wrong. Please fix the form errors and try again.",
//       text: errors.text,
//     });

//     // Reset form values on error
//     setValues({
//       ...initialFormValues,
//       formSubmitted: true,
//       success: false,
//     });
//   }
// };

//debugging handleFormSubmit function
// const handleFormSubmit = async (e: any) => {
//   e.preventDefault();
//   if (!formIsValid()) {
//     Swal.fire("Please fill all the fields correctly.");
//     return;
//   }

//   try {
//     // Assuming handleAxiosPost will throw an error if the request fails
//     const axiosResponse = await handleAxiosPost();
//     console.log("Axios POST response:", axiosResponse);

//     // If the response is successful, attempt to send the email
//     await handleEmailJsForm();
//     console.log("EmailJS form sent successfully");
//   } catch (error: any) {
//     // Handle errors for both Axios POST and emailjs here
//     console.error('Error occurred:', error.response ||  error.message ||  error);

//     if (error.response) {
//       Swal.fire("Error occurred:", error.response.data || "Unknown error occurred");
//     } else if (error.message) {
//       Swal.fire("Error occurred:", error.message);
//     } else {
//       Swal.fire("Unknown error occurred");
//     }
//   }
// };

//This is a handleFormSubmit function refactored with with the handleAxiosPost function. The emailjs functions is defined within. 
// const handleFormSubmit = async (e: any) => {
//   e.preventDefault();
//   try {
//     const isValid = formIsValid() && Object.values(errors).every((x) => x === "");
//     if (isValid) {
//       const axiosResponse = await handleAxiosPost();
//       console.log("Axios POST response:", axiosResponse);

//       const emailjsResponse = await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, "#signupForm", PUBLIC_KEY);
//       console.log(emailjsResponse.text);

//       Swal.fire({
//         icon: "success",
//         title: "Thanks for signing up! Check your email to finish the process.",
//       });

//       setValues({
//         ...initialFormValues,
//         formSubmitted: true,
//         success: true,
//       });
//     } else {
//       Swal.fire({
//         icon: "error",
//         title: "Oops, something went wrong. Please fix the form errors and try again later.",
//         text: errors.text,
//       });

//       setValues({
//         ...initialFormValues,
//         formSubmitted: true,
//         success: false,
//       });
//     }
//   } catch (error) {
//     console.error('Error submitting form:', error);

//     Swal.fire({
//       icon: "error",
//       title: "Oops, something went wrong. Please try again later.",
//       text: errors.response?.data || errors.message || "Unknown error occurred",
//     });

//     setValues({
//       ...initialFormValues,
//       formSubmitted: true,
//       success: false,
//     });
//   }
// };

//This is a handleFormSubmit function like the one just above, but it gets rid of repeated code: 

const handleFormSubmit = async (e: any) => {
  e.preventDefault();
  try {
    const isValid = formIsValid() && Object.values(errors).every((x) => x === "");
    if (isValid) {

      console.log("Form is valid!!!");
      // Handle the Axios POST request
      await handleAxiosPost();

      // Continue with emailjs logic only if the Axios request is successful
      const emailjsResponse = await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, "#signupForm", PUBLIC_KEY);
      console.log(emailjsResponse.text);

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

// Handle the Axios POST request
const handleAxiosPost = async () => {
  console.log("Axios POST request is being made");
  console.log(values);
  // const TOKEN = Cookie.get('token');
  // console.log("TOKEN:", TOKEN)
  const { fullName, email, phone, password } = values;

  try {
    console.log("entered try block")
    // Make a POST request to your server endpoint using axios
    const response = await axios.post("http://localhost:9000/api/users/signup",
    { 
      data: {
        name: fullName,
        phone: phone,
        email: email,
        password: password,
      }
    },
    );

    // Handle the response as needed
    console.log("User Created", response.data);
  } catch (error) {
    // Handle errors from the server
    console.error('Error submitting form HAPF:', errors.response || errors.message || "Unknown error occurred");

    throw error; // Rethrow the error to be caught by the calling function
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


