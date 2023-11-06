import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { motion } from "framer-motion";
import { useFormControls } from "./contactFormValidation";

function FormContactMotion() {
  let divVariants = {
    start: { opacity: 0, stroke: "#F5F5F5" },
    finished: {
      opacity: 1,
      fill: "#F5F5F5",
      transition: {
        duration: 0.5,
        ease: "easeInOut",
        delay: 0.3,
      },
    },
  };

  const inputFieldValues = [
    {
      name: "firstName",
      label: "First Name",
      id: "first-name",
    },
    {
      name: "lastName",
      label: "Last Name",
      id: "last-name",
    },
    {
      name: "email",
      label: "Email",
      id: "my-email",
    },
    {
      name: "message",
      label: "Message",
      id: "my-message",
      multiline: true,
      rows: 2,
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
                multiline={inputFieldValue.multiline ?? false}
                rows={inputFieldValue.rows ?? 1}
                autoComplete="none"
                style={{
                  marginLeft: "15px",
                }}
                {...(errors[inputFieldValue.name] && {
                  error: true,
                  helperText: errors[inputFieldValue.name],
                })}
              />
            );
          })}
          <Button type="submit" disabled={!formIsValid()}>
            Send Message
          </Button>
        </form>
      </motion.div>
    </div>
  );
}

export default FormContactMotion;
