// import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import "./App.css";

// import Login from "./Ponents.jsx/Aouther.jsx/Login";
// import Nav from "./Ponents.jsx/Navbar.jsx/Nav";
// // import Employdashboard from "./Ponents.jsx/Employdashboard";

// import Register from "./Ponents.jsx/Aouther.jsx/Register";
// import ProtectedRoute from "./Auth/ProtectedRoute";

// import Unauthorized from "./Auth/Unauthorized";
// import AdminProtectedRoute from "./Auth/AdminProtectedRoute";
// import Admindash from "./Ponents.jsx/Admindash";
// import Employ from "./Ponents.jsx/Employ";
// import { ToastContainer } from "react-toastify";

// function App() {
//   return (
//     <>
//       <ToastContainer position="top-right" autoClose={3000} />
//       <Employ />
//     </>
//   );
// }

// const App = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route
//           path="/"
//           element={
//             <ProtectedRoute>
//               <Employ />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/admin"
//           element={
//             <AdminProtectedRoute>
//               <Admindash />
//             </AdminProtectedRoute>
//           }
//         />

//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />

//         <Route path="/unauthorized" element={<Unauthorized />} />
//         {/* <Route path="/user" element={<Employdashboard />} /> */}
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Login from "./Ponents.jsx/Aouther.jsx/Login";
import Register from "./Ponents.jsx/Aouther.jsx/Register";
import Unauthorized from "./Auth/Unauthorized";
import ProtectedRoute from "./Auth/ProtectedRoute";
import AdminProtectedRoute from "./Auth/AdminProtectedRoute";
import Admindash from "./Ponents.jsx/Admindash";
import Employ from "./Ponents.jsx/Employ";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Employ />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminProtectedRoute>
                <Admindash />
              </AdminProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
