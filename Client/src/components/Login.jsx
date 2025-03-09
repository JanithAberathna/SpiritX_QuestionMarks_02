import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext";

function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const { login } = useContext(AuthContext);

  // Handle Input Change & Validate
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validation
    if (value.trim() === "") {
      setErrors({ ...errors, [name]: `${name} is required` });
    } else {
      setErrors({ ...errors, [name]: "" });
    }
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};
    setLoginError("");

    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    axios.post('http://localhost:3001/login', formData)
      .then(response => {
        console.log('Login successful:', response.data);
        
        // Use the login function from AuthContext
        login({
          username: formData.username,
          token: response.data.token,
          isAdmin: response.data.user.isAdmin
        });
        
        // Redirect based on role
        if (response.data.user.isAdmin) {
          window.location.href = '/admin';
        } else {
          window.location.href = '/user';
        }
      })
      .catch(error => {
        console.error('Login error:', error);
        
        if (error.response) {
          setLoginError(error.response.data.message || "Login failed. Please check your credentials.");
        } else if (error.request) {
          setLoginError("No response from server. Please try again later.");
        } else {
          setLoginError("Login failed. Please try again.");
        }
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-green-500">Login</h2>

        {loginError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4 mb-4">
            {loginError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6">
          {/* Username Field */}
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

          {/* Password Field */}
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
          </div>

          {/* Sign-up Link */}
          <p className="text-gray-600 text-sm">
            Don't have an account?{" "}
            <a href="/signup" className="text-red-600 hover:text-red-800 font-semibold">
              Sign Up Now
            </a>
          </p>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-700 text-white text-lg py-3 rounded-md mt-4 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;