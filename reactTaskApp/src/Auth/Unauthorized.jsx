import React from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-400 text-center">
      <h1 className="text-4xl font-bold mb-4">Unauthorized Access</h1>
      <p className="text-lg mb-6">
        You do not have permission to view this page.
      </p>
      <button
        onClick={handleGoBack}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Go Back
      </button>
    </div>
  );
};

export default Unauthorized;
