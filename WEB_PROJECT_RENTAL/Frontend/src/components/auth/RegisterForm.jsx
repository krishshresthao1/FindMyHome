import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import { registerUser } from "../../services/api";

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

  const navigate = useNavigate();

  const [registerData, setRegisterData] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
    role: "tenant",
  });

  const handleChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (registerData.password !== registerData.confirm_password) {
      alert("Passwords do not match");
      return;
    }

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

      alert("Registration Successful!");

      navigate("/");
    } catch (error) {
      console.error(error);

      console.log("Full Error:", error);
      console.log("Response:", error.response);
      console.log("Data:", error.response?.data);

      alert(JSON.stringify(error.response?.data, null, 2));
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

          <div className="flex items-center rounded-xl border px-4">
            <FaUser className="text-gray-400" />

            <input
              name="fullname"
              value={registerData.fullname}
              onChange={handleChange}
              className="w-full p-4 outline-none"
              placeholder="Your full name"
            />
          </div>
        </div>

        {/* Email */}

        <div>
          <label className="mb-2 block font-medium">Email</label>

          <div className="flex items-center rounded-xl border px-4">
            <FaEnvelope className="text-gray-400" />

            <input
              type="email"
              name="email"
              value={registerData.email}
              onChange={handleChange}
              className="w-full p-4 outline-none"
              placeholder="example@gmail.com"
            />
          </div>
        </div>

        {/* Phone */}

        <div>
          <label className="mb-2 block font-medium">Phone Number</label>

          <div className="flex items-center rounded-xl border px-4">
            <FaPhone className="text-gray-400" />

            <input
              name="phone"
              value={registerData.phone}
              onChange={handleChange}
              className="w-full p-4 outline-none"
              placeholder="98XXXXXXXX"
            />
          </div>
        </div>

        {/* Password */}

        <div>
          <label className="mb-2 block font-medium">Password</label>

          <div className="flex items-center rounded-xl border px-4">
            <FaLock className="text-gray-400" />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={registerData.password}
              onChange={handleChange}
              className="w-full p-4 outline-none"
              placeholder="Enter your password"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <IoEyeOff /> : <IoEye />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}

        <div>
          <label className="mb-2 block font-medium">Confirm Password</label>

          <div className="flex items-center rounded-xl border px-4">
            <FaLock className="text-gray-400" />

            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirm_password"
              value={registerData.confirm_password}
              onChange={handleChange}
              className="w-full p-4 outline-none"
              placeholder="Confirm your password"
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <IoEyeOff /> : <IoEye />}
            </button>
          </div>
        </div>

        <button className="w-full rounded-xl bg-blue-600 p-4 font-semibold text-white hover:bg-blue-700">
          Create Account
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