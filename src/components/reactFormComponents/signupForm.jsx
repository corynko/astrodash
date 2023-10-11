import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";

function SignupForm() {
  const {
    register,
    control,
    submissionId,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
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
    // <form onSubmit={handleSubmit(onSubmit)} className="signupForm">
    //   <h1>astroDash signup</h1>

    //   <div>
    //     <label>
    //       <span>To start with, what's your full name?</span>
    //       <input
    //         {...register("fullname", { required: "This field is required." })}
    //         type="text"
    //       />
    //     </label>
    //   </div>

    //   <div>
    //     <label>
    //       <span>What's your date of birth?</span>
    //       <input {...register("birthday")} type="date" />
    //     </label>
    //   </div>

    //   <div>
    //     <label>
    //       <span>What's your phone number?</span>
    //       <input
    //         {...register("phone", { required: "This field is required." })}
    //         type="tel"
    //       />
    //     </label>
    //   </div>

    //   <div>
    //     <label>
    //       <span>What's your email address?</span>
    //       <input
    //         {...register("email", {
    //           required: "This field is required.",
    //         })}
    //         aria-invalid={errors["email"] ? "true" : "false"}
    //         type="email"
    //       />
    //     </label>
    //     <label>
    //       <span>Choose a strong password:</span>
    //       <input
    //         {...register("password", {
    //           required: "This field is required.",
    //         })}
    //         // aria-invalid={errors["email"] ? "true" : "false"}
    //         type="password"
    //       />
    //     </label>
    //     {errors["password"] && (
    //       <p role="alert">{errors["password"]?.message}</p>
    //     )}
    //     <label>
    //       <span>Re-type your password:</span>
    //       <input
    //         {...register("password", {
    //           required: "This field is required.",
    //         })}
    //         // aria-invalid={errors["email"] ? "true" : "false"}
    //         type="password"
    //       />
    //     </label>
    //     {errors["password"] && (
    //       <p role="alert">{errors["password"]?.message}</p>
    //     )}
    //   </div>

    //   <button disabled={isSubmitting}>Submit</button>
    // </form>
    <iframe
      width="100%"
      height="800"
      src="https://www.beekai.com/view/form/d598bd09-d7f6-4396-9eb0-6128072ad703"
      title="BEEKAI Form"
      frameborder="0"
      allowfullscreen
    ></iframe>
  );
}

export default SignupForm;
