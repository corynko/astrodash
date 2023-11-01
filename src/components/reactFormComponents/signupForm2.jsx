import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { motion } from "framer-motion";
import { useFormControls } from "./formValidation.tsx";

function FormContactMotion() {
  let divVariants = {
    start: { opacity: 0, stroke: "#F5F5F5" },
    finished: {
      opacity: 1,
      fill: "#F5F5F5",
      transition: {
        duration: 1,
        ease: "easeInOut",
        delay: 1.9,
      },
    },
  };

  const inputFieldValues = [
    {
      name: "fullName",
      label: "Full Name *",
      id: "full-name",
    },
    {
      name: "phoneNumber",
      label: "Phone Number",
      id: "phone-number",
      type: "tel",
    },
    {
      name: "email",
      label: "Email *",
      id: "my-email",
    },
    {
      name: "password",
      label: "Password *",
      id: "password",
      type: "password",
    },
    {
      name: "passwordCheck",
      label: "Re-type Password *",
      id: "passwordCheck",
      type: "password",
    },
  ];

  const { handleInputValue, handleFormSubmit, formIsValid, errors } =
    useFormControls();

  return (
    <div className="divWrapper">
      <motion.div
        variants={divVariants}
        initial="start"
        animate="finished"
        className="contactForm center"
      >
        <form
          onSubmit={handleFormSubmit}
          className="contactForm"
          id="contactForm"
        >
          {inputFieldValues.map((inputFieldValue, index) => {
            return (
              <TextField
                key={index}
                onBlur={handleInputValue}
                onChange={handleInputValue}
                name={inputFieldValue.name}
                label={inputFieldValue.label}
                type={inputFieldValue.type}
                autoComplete="none"
                className="contactFormItem"
                {...(errors[inputFieldValue.name] && {
                  error: true,
                  helperText: errors[inputFieldValue.name],
                })}
              />
            );
          })}
          <Button type="submit" disabled={!formIsValid()}>
            Sign Me Up!
          </Button>
        </form>
      </motion.div>
    </div>
  );
}

export default FormContactMotion;
