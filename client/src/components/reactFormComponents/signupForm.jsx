import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormControls } from "./signupFormValidation";

function SignUpForm({ handleClose }) {
  const inputFieldValues = [
    {
      name: "fullName",
      label: "Full Name *",
      id: "full-name",
    },
    {
      name: "phone",
      label: "Phone Number",
      id: "phone",
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

  const handleSubmit = async (e) => {
    await handleFormSubmit(e);
    if (formIsValid()) {
      handleClose();
    }
  };

  return (
    <div className="divWrapper">
      <div className="center">
        <h2 className="formH2">sign up for astroDash</h2>
        <form className="signupForm" id="signupForm">
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
                className="signupFormItem"
                style={{ marginTop: "15px", marginBottom: "15px" }}
                {...(errors[inputFieldValue.name] && {
                  error: true,
                  helperText: errors[inputFieldValue.name],
                })}
              />
            );
          })}
          <Button
            type="submit"
            name="submit"
            value="Submit"
            disabled={!formIsValid()}
            onClick={handleSubmit}
          >
            Sign Me Up!
          </Button>
        </form>
      </div>
    </div>
  );
}

export default SignUpForm;
