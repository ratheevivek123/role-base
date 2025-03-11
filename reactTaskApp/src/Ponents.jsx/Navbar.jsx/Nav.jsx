import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../Utils.jsx/utils";

const Nav = ({ name }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogoutClick = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${baseURL}/api/users/logout`, {
        withCredentials: true,
      });

      if (res.data.success) {
        setTimeout(() => {
          setLoading(false);
          navigate("/login");
        }, 2000);
      } else {
        alert(res.data.message);
        setLoading(false);
      }
    } catch (error) {
      alert(error.response?.data?.message || "Logout failed");
      setLoading(false);
    }
  };

  return (
    <nav className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center shadow-lg rounded-lg">
      <h1 className="text-xl font-semibold">
        HELLO MISTER <span className="text-blue-400">{name}</span>
      </h1>
      <h1 className="text-2xl font-bold text-center tracking-wide">
        WELCOME TO YOUR DASHBOARD
      </h1>
      <button
        className="bg-red-600 hover:bg-red-700 transition duration-300 text-white px-5 py-2 rounded-lg shadow-md font-medium flex items-center justify-center"
        onClick={handleLogoutClick}
        disabled={loading}
      >
        {loading ? (
          <div className="w-6 h-6 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
        ) : (
          "Log Out"
        )}
      </button>
    </nav>
  );
};

export default Nav;
