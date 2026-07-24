import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import { registerUser } from "../../services/api";

import { toast } from "react-toastify";

import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaIdCard,
  FaBuilding,
  FaMapMarkerAlt,
} from "react-icons/fa";

import { IoEye, IoEyeOff } from "react-icons/io5";

const RegisterForm = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [registerData, setRegisterData] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
    role: "tenant",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setRegisterData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
     e.preventDefault();

     console.log("SUBMIT CLICKED");

     const newErrors = {};

     const nameRegex = /^[A-Za-z\s]+$/;
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     const phoneRegex = /^(97|98)\d{8}$/;
     const passwordRegex =
       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

     if (!registerData.fullname.trim()) {
       newErrors.fullname = "Full name is required";
     } else if (!nameRegex.test(registerData.fullname)) {
       newErrors.fullname = "Only letters are allowed";
     }

     if (!emailRegex.test(registerData.email)) {
       newErrors.email = "Enter a valid email";
     }

     if (!phoneRegex.test(registerData.phone)) {
       newErrors.phone = "Enter a valid phone number";
     }

     if (!passwordRegex.test(registerData.password)) {
       newErrors.password =
         "Minimum 8 characters with uppercase, lowercase, number and special character";
     }

     if (registerData.confirm_password !== registerData.password) {
       newErrors.confirm_password = "Passwords do not match";
     }

     setErrors(newErrors);

     if (Object.keys(newErrors).length > 0) {
       return;
     }
     setLoading(true);

    try {
      const dataToSend = {
        fullname: registerData.fullname,
        email: registerData.email,
        phone: registerData.phone,
        password: registerData.password,
        role: registerData.role,
      };

      const response = await registerUser(dataToSend);

      console.log(response.data);

      toast.success("Verification code sent to your email.");

      navigate("/verify-email", {
        state: {
          email: registerData.email,
        },
      });
    } catch (error) {
      console.error(error);

      console.log("Full Error:", error);
      console.log("Response:", error.response);
      console.log("Data:", error.response?.data);

      const detail = error.response?.data?.detail;

      if (Array.isArray(detail)) {
        toast.error(detail.map((err) => err.msg).join(", "));
      } else {
        toast.error(
          detail || error.response?.data?.message || "Registration failed!",
        );
      }
    } finally {
      setLoading(false);
    }
    
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join Find My Home and discover verified rental properties."
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* Role */}
        <div>
          <label className="mb-2 block font-medium">Register As</label>

          <select
            name="role"
            value={registerData.role}
            onChange={handleChange}
            className="w-full rounded-xl border p-4 outline-none"
          >
            <option value="tenant">Tenant</option>
            <option value="owner">Property Owner</option>
          </select>
        </div>
        {/* Full Name */}

        <div>
          <label className="mb-2 block font-medium">Full Name</label>

          <div
            className={`flex items-center rounded-xl border px-4 ${
              errors.fullname ? "border-red-500" : "border-gray-300"
            }`}
          >
            <FaUser className="text-gray-400" />

            <input
              name="fullname"
              value={registerData.fullname}
              onChange={handleChange}
              className="w-full p-4 outline-none"
              placeholder="Your full name"
              required
            />
          </div>

          {errors.fullname && (
            <p className="mt-1 text-sm text-red-500">{errors.fullname}</p>
          )}
        </div>

        {/* Email */}

        <div>
          <label className="mb-2 block font-medium">Email</label>

          <div
            className={`flex items-center rounded-xl border px-4 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          >
            <FaEnvelope className="text-gray-400" />

            <input
              type="email"
              name="email"
              value={registerData.email}
              onChange={handleChange}
              className="w-full p-4 outline-none"
              placeholder="example@gmail.com"
              required
            />
          </div>

          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        {/* Phone */}

        <div>
          <label className="mb-2 block font-medium">Phone Number</label>

          <div
            className={`flex items-center rounded-xl border px-4 ${
              errors.phone ? "border-red-500" : "border-gray-300"
            }`}
          >
            <FaPhone className="text-gray-400" />

            <input
              name="phone"
              value={registerData.phone}
              onChange={handleChange}
              className="w-full p-4 outline-none"
              placeholder="98XXXXXXXX"
              required
            />
          </div>

          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
          )}
        </div>

        {/* Password */}

        <div>
          <label className="mb-2 block font-medium">Password</label>

          <div
            className={`flex items-center rounded-xl border px-4 ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          >
            <FaLock className="text-gray-400" />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={registerData.password}
              onChange={handleChange}
              className="w-full p-4 outline-none"
              placeholder="Enter your password"
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <IoEyeOff /> : <IoEye />}
            </button>
          </div>

          {errors.password && (
            <p className="mt-1 text-sm text-red-500">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password */}

        <div>
          <label className="mb-2 block font-medium">Confirm Password</label>

          <div
            className={`flex items-center rounded-xl border px-4 ${
              errors.confirm_password ? "border-red-500" : "border-gray-300"
            }`}
          >
            <FaLock className="text-gray-400" />

            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirm_password"
              value={registerData.confirm_password}
              onChange={handleChange}
              className="w-full p-4 outline-none"
              placeholder="Confirm your password"
              required
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <IoEyeOff /> : <IoEye />}
            </button>
          </div>

          {errors.confirm_password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.confirm_password}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full rounded-xl p-4 font-semibold text-white transition ${
            loading
              ? "cursor-not-allowed bg-blue-400"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Sending verification code..." : "Create Account"}
        </button>

        <p className="text-center">
          Already have an account?
          <Link to="/" className="ml-2 font-semibold text-blue-600">
            Sign In
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default RegisterForm;