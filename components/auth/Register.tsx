"use client";
import { useAuth } from "@/hook/useAuth";
import { registerUser } from "@/lib/axiosInstance";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Field from "../forms/Fields";
const image_hosting_key = process.env.NEXT_PUBLIC_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
export interface Tuser {
  email: string;
  password: string;
  role: "User" | "Admin";
  verified: boolean;
  profile: {
    name: string;
    bio?: string;
    profilePicture?: string;
    followers?: string;
    following?: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}
const RegistrationForm = () => {
  const { setAuth } = useAuth();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm<Tuser>();

  const submitForm: SubmitHandler<FieldValues> = async (formData) => {
    const profilePictureFile = watch("profile.profilePicture")?.[0];
    let profilePictureUrl = "";

    if (profilePictureFile) {
      const formDataForImageUpload = new FormData();
      formDataForImageUpload.append("image", profilePictureFile);
      try {
        const response = await axios.post(
          image_hosting_api,
          formDataForImageUpload,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        profilePictureUrl = response?.data?.data?.url;
        console.log(profilePictureUrl);
      } catch (error) {
        console.error("Image upload failed", error);
        setError("profile.profilePicture", {
          type: "manual",
          message: "Image upload failed",
        });
        return;
      }
    }
    const completeFormData = {
      ...formData,
      role: "User",
      verified: false,
      profile: {
        ...formData.profile,
        profilePicture: profilePictureUrl,
      },
    };
    try {
      const response = await registerUser(completeFormData);
      if (response.statusCode == 201) {
        const { token, user } = response.data;
        console.log(token);
        if (token) {
          setAuth({ user, token });
          router.push("/");
        }
      }
    } catch (error: unknown) {
      console.error(error);
      setError("root.random", {
        type: "random",
        message: "An unexpected error occurred",
      });
    }
  };

  return (
    <form
      className="border-b border-[#3F3F3F] pb-10 lg:pb-[30px]"
      onSubmit={handleSubmit(submitForm)}
    >
      <Field label="Name" error={errors.profile?.name}>
        <input
          {...register("profile.name", {
            required: "Name is Required",
          })}
          className={`auth-input ${
            !!errors.profile?.name ? "border-red-500" : "border-gray-200"
          }`}
          type="text"
          name="profile.name"
          id="profile.name"
        />
      </Field>
      <Field label="Bio" error={errors.profile?.bio}>
        <input
          {...register("profile.bio")}
          className={`auth-input ${
            !!errors.profile?.bio ? "border-red-500" : "border-gray-200"
          }`}
          type="text"
          name="profile.bio"
          id="profile.bio"
        />
      </Field>
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
      <Field label="Profile Picture" error={errors.profile?.profilePicture}>
        <input
          {...register("profile.profilePicture", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Your password must be at least 8 characters",
            },
          })}
          className={`auth-input ${
            !!errors.password ? "border-red-500" : "border-gray-200"
          }`}
          type="file"
          name="profile.profilePicture"
          id="password"
        />
      </Field>
      <p>{errors?.root?.random?.message}</p>
      <button
        className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
        type="submit"
      >
        Register
      </button>
    </form>
  );
};

export default RegistrationForm;
