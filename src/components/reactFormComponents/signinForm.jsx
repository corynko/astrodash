import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormControls } from "./signinFormValidation";

function SignInForm({ handleClose }) {
  const inputFieldValues = [
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
        <h2 className="formH2">welcome back!</h2>
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

export default SignInForm;
