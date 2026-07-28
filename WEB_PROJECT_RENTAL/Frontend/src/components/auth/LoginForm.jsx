
import { useState } from "react";
import AuthLayout from "./AuthLayout";
import { Link, useNavigate } from "react-router-dom";

import { FaEnvelope, FaLock, FaGoogle } from "react-icons/fa";
import { IoEye, IoEyeOff } from "react-icons/io5";

import { loginUser } from "../../services/api";

import { toast } from "react-toastify";

import { GoogleLogin } from "@react-oauth/google";
import { googleLogin } from "../../services/api";

import { useProperty } from "../../context/PropertyContext";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const { fetchData } = useProperty();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser(loginData);

      console.log("Login Successful:", response.data);

      // Save JWT token
      localStorage.setItem("token", response.data.access_token);

      localStorage.setItem("user", JSON.stringify(response.data.user));

      await fetchData();

      toast.success("Login successful!");

      navigate("/home");
    } catch (error) {
      console.error(error);

      const detail = error.response?.data?.detail;

      if (Array.isArray(detail)) {
        toast.error(detail.map((err) => err.msg).join(", "));
      } else {
        toast.error(
          detail || error.response?.data?.message || "Wrong email or password",
        );
      }
    }
  };

  return (
    <AuthLayout title="Welcome Back!!" subtitle="Sign in to continue.">
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="mb-2 block font-medium">Email</label>

          <div className="flex items-center rounded-xl border px-4">
            <FaEnvelope className="text-gray-400" />

            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              placeholder="example@gmail.com"
              className="w-full p-4 outline-none"
              required
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block font-medium">Password</label>

          <div className="flex items-center rounded-xl border px-4">
            <FaLock className="text-gray-400" />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={loginData.password}
              onChange={handleChange}
              placeholder="********"
              className="w-full p-4 outline-none"
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <IoEyeOff /> : <IoEye />}
            </button>
          </div>
        </div>

        <div className="flex justify-between text-sm">
          <label>
            <input type="checkbox" />

            <span className="ml-2">Remember me</span>
          </label>

          <a href="/" className="text-blue-600">
            Forgot Password?
          </a>
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-blue-600 p-4 text-white transition hover:bg-blue-700"
        >
          Sign In
        </button>

        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              try {
                const response = await googleLogin(
                  credentialResponse.credential,
                );

                localStorage.setItem("token", response.data.access_token);

                localStorage.setItem(
                  "user",
                  JSON.stringify(response.data.user),
                );

                await fetchData();

                toast.success("Google login successful!");

                navigate("/home");
              } catch (error) {
                if (error.response?.status === 404) {
                  toast.info("Account not found. Please register first.");

                  navigate("/register");
                } else {
                  toast.error("Google login failed");
                }
              }
            }}
            onError={() => {
              toast.error("Google login failed");
            }}
          />
        </div>

        <p className="text-center">
          Don't have an account?
          <Link className="ml-2 font-semibold text-blue-600" to="/register">
            Register
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default LoginForm;

