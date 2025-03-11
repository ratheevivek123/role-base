import React, { useState } from "react";
import { useNavigate, Link, resolvePath } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../Utils.jsx/utils";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        `http://localhost:7000/api/users/register`,
        formData
      );
      setSuccess("Registration successful!");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setError("Error registering user");
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen  bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center w-80 bg-transparent text-white border-2 border-red-600 p-8 rounded-lg"
      >
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="border-red-600 border-2 outline-none rounded-full px-5 py-3 text-lg bg-transparent w-full text-white"
          placeholder="Enter your name"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="border-red-600 border-2 outline-none rounded-full px-5 py-3 text-lg bg-transparent w-full mt-4 text-white"
          placeholder="Enter your email"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="border-red-600 border-2 outline-none rounded-full px-5 py-3 text-lg bg-transparent w-full mt-4 text-white"
          placeholder="Enter your password"
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
          className="border-red-600 border-2 outline-none rounded-full px-5 py-3 text-lg bg-transparent w-full mt-4 text-grey-600"
        >
          <option className="text-black" value="" disabled>
            Select your role
          </option>
          <option className="text-black" value="admin">
            Admin
          </option>
          <option className="text-black" value="user">
            User
          </option>
        </select>
        <button
          type="submit"
          className="bg-red-600 hover:bg-red-500 font-bold rounded-full px-4 py-3 text-lg mt-7 w-full"
        >
          Register
        </button>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}{" "}
        <Link to="/login" className="mt-4 text-red-600 hover:underline">
          if you have an account? <span className="text-red-600">Login</span>{" "}
        </Link>
      </form>
    </div>
  );
};

export default Register;
