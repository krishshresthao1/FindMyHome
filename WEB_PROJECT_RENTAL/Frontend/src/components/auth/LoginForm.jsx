
import { useState } from "react";
import AuthLayout from "./AuthLayout";
import { Link, useNavigate } from "react-router-dom";

import { FaEnvelope, FaLock, FaGoogle } from "react-icons/fa";
import { IoEye, IoEyeOff } from "react-icons/io5";

import { loginUser } from "../../services/api";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

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

      alert("Login Successful!");
      navigate("/home");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.detail || "Invalid email or password."
      );
    }
  };

  return (
    <AuthLayout
      title="Welcome Back!!"
      subtitle="Sign in to continue."
    >
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

        <button
          type="button"
          className="flex w-full items-center justify-center gap-3 rounded-xl border p-4 hover:bg-gray-50"
        >
          <FaGoogle />
          Continue with Google
        </button>

        <p className="text-center">
          Don't have an account?
          <Link
            className="ml-2 font-semibold text-blue-600"
            to="/register"
          >
            Register
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default LoginForm;

