import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

import logo from "../../assets/svg/astrodash_full_outline_whitetrans_wordless.svg";

function SignupForm() {
  const {
    register,
    control,
    submissionId,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      fullname: "",
      birthday: "",
      phone: "",
      email: "",
      password: "",
    },
  });

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      e.preventDefault();
    }
  };
  const onSubmit = (data) => alert(JSON.stringify(data));

  if (submissionId) {
    return (
      <p>Thanks for signing up! Check your email to complete the process.</p>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="signupForm">
      <h1 className="formH1">sign up</h1>

      <div>
        <label>
          <span className="formSpan">
            To start with, what's your full name? *
          </span>
          <input
            {...register("fullname", { required: "This field is required." })}
            type="text"
          />
        </label>
      </div>

      <div>
        <label>
          <span className="formSpan">What's your date of birth?</span>
          <input {...register("birthday")} type="date" />
        </label>
      </div>

      <div>
        <label>
          <span className="formSpan">What's your phone number?</span>
          <input
            {...register("phone", { required: "This field is required." })}
            type="tel"
          />
        </label>
      </div>

      <div>
        <label>
          <span className="formSpan">What's your email address? *</span>
          <input
            {...register("email", {
              required: "This field is required.",
            })}
            aria-invalid={errors["email"] ? "true" : "false"}
            type="email"
          />
        </label>
        <label>
          <span className="formSpan">Choose a strong password: *</span>
          <input
            {...register("password", {
              required: "This field is required.",
            })}
            // aria-invalid={errors["email"] ? "true" : "false"}
            type="password"
          />
        </label>
        {errors["password"] && (
          <p role="alert">{errors["password"]?.message}</p>
        )}
        <label>
          <span className="formSpan">Re-type that strong password: *</span>
          <input
            {...register("password", {
              required: "This field is required.",
            })}
            // aria-invalid={errors["email"] ? "true" : "false"}
            type="password"
          />
        </label>
        {errors["password"] && (
          <p role="alert">{errors["password"]?.message}</p>
        )}
      </div>

      <button disabled={isSubmitting}>Submit</button>
    </form>
  );
}

export default SignupForm;
