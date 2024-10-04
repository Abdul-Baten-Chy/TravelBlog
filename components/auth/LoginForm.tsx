"use client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import axios from "axios";

import { useAuth } from "@/hook/useAuth";
import { loginUser } from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";
import Field from "../forms/Fields";
interface FormData {
  email: string;
  password: string;
}
const LoginForm = () => {
  const router = useRouter();
  const { setAuth } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>();

  const submitForm: SubmitHandler<FieldValues> = async (formData) => {
    try {
      const response = await loginUser(formData);
      if (response?.statusCode == 200) {
        const { token, user } = response.data;

        if (token) {
          setAuth({ user, token });
          localStorage.setItem("auth", JSON.stringify({ user, token }));
          router.push("/");
        }
      }
    } catch (error: unknown) {
      console.error(error);

      if (axios.isAxiosError(error)) {
        setError("root.random", {
          type: "random",
          message: error.response?.data?.message || "An error occurred",
        });
      } else {
        setError("root.random", {
          type: "random",
          message: "An unexpected error occurred",
        });
      }
    }
  };

  return (
    <form
      className="border-b border-[#3F3F3F] pb-10 lg:pb-[60px]"
      onSubmit={handleSubmit(submitForm)}
    >
      <Field label="Email" error={errors.email}>
        <input
          {...register("email", { required: "Email ID is Required" })}
          className={`auth-input ${
            !!errors.email ? "border-red-500" : "border-gray-200"
          }`}
          type="email"
          name="email"
          id="email"
        />
      </Field>

      <Field label="Password" error={errors.password}>
        <input
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Your password must be at least 8 characters",
            },
          })}
          className={`auth-input ${
            !!errors.password ? "border-red-500" : "border-gray-200"
          }`}
          type="password"
          name="password"
          id="password"
        />
      </Field>
      <p>{errors?.root?.random?.message}</p>
      <Field>
        <button className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90">
          Login
        </button>
      </Field>
    </form>
  );
};

export default LoginForm;
