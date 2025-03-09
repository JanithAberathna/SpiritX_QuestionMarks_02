import React, { useState } from "react";
import axios from "axios";

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState("");
  const [authError, setAuthError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Handle Input Change & Validate in Real-time
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    let newErrors = { ...errors };

    if (value.trim() === "") {
      newErrors[name] = `${name} is required`;
    } else {
      delete newErrors[name];
    }

    // Username Validation (Minimum 8 characters)
    if (name === "username" && value.length < 8) {
      newErrors.username = "Username must be at least 8 characters long";
    }

    // Password Validation
    if (name === "password") {
      validatePassword(value);
    }

    // Confirm Password Validation
    if (name === "confirmPassword" && value !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
  };

  // Validate Password Strength
  const validatePassword = (password) => {
    let strength = "Weak";
    let newErrors = { ...errors };

    if (!/[A-Z]/.test(password)) newErrors.password = "Must include an uppercase letter";
    else if (!/[a-z]/.test(password)) newErrors.password = "Must include a lowercase letter";
    else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
      newErrors.password = "Must include a special character";
    else if (password.length < 8) newErrors.password = "Must be at least 8 characters long";
    else {
      delete newErrors.password;
      strength = "Strong";
    }

    if (Object.keys(newErrors).length === 0 && password.length >= 6) {
      strength = "Medium";
    }

    setPasswordStrength(strength);
    setErrors(newErrors);
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear previous messages
    setAuthError("");
    setSuccessMessage("");

    console.log("Sending registration data:", {
      username: formData.username,
      passwordLength: formData.password.length,
      confirmPasswordMatch: formData.password === formData.confirmPassword
    });

    try {
      // Make API call to register user - CORRECTED ENDPOINT
      const response = await axios.post("http://localhost:3001/signup", {
        username: formData.username,
        password: formData.password,
        confirmPassword: formData.confirmPassword
      });
      
      console.log("Registration response:", response.data);
      setSuccessMessage("Signup successful! Redirecting...");
      
      // Redirect to login page after successful registration
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (error) {
      console.error("Registration error:", error);
      if (error.response && error.response.data) {
        setAuthError(error.response.data.error || "Registration failed. Please try again.");
      } else {
        setAuthError("An error occurred during registration. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-green-500">Sign Up</h2>

        {authError && <p className="text-red-500 text-center">{authError}</p>}
        {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}

        <form onSubmit={handleSubmit} className="mt-6">
          {/* Username */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              className={`w-full h-12 px-4 border rounded-md text-base ${
                errors.username ? "border-red-500" : "border-gray-300 focus:border-blue-500"
              }`}
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full h-12 px-4 border rounded-md text-base ${
                errors.password ? "border-red-500" : "border-gray-300 focus:border-blue-500"
              }`}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            <p
              className={`text-sm font-semibold ${
                passwordStrength === "Strong"
                  ? "text-green-600"
                  : passwordStrength === "Medium"
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
            >
              Strength: {passwordStrength}
            </p>
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full h-12 px-4 border rounded-md text-base ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300 focus:border-blue-500"
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Login Redirect */}
          <p className="text-gray-600 text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-red-600 hover:text-red-800 font-semibold">
              Login
            </a>
          </p>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-700 text-white text-lg py-3 rounded-md mt-4 transition duration-300"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;