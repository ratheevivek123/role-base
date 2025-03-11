// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { baseURL } from "../Utils.jsx/utils";
// import { useNavigate } from "react-router-dom";
// import Nav from "./Navbar.jsx/Nav";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Employ = () => {
//   const [tasks, setTasks] = useState([]);
//   const [user, setUser] = useState({ username: "", email: "" });
//   const navigate = useNavigate();
//   const [ProofFile, setProofFile] = useState(null);

//   useEffect(() => {
//     fetchUserData();
//     fetchTasks();
//   }, []);

//   const fetchUserData = async () => {
//     try {
//       const response = await axios.get(`${baseURL}/api/users/verify-token`, {
//         withCredentials: true,
//       });
//       setUser(response.data.userInfo);
//     } catch (error) {
//       if (error.response?.status === 401) navigate("/login");
//     }
//   };

//   const fetchTasks = async () => {
//     try {
//       const response = await axios.get(`${baseURL}/api/tasks/Usertsk`, {
//         withCredentials: true,
//       });
//       setTasks(response.data.tasks);
//     } catch (error) {
//       console.error("Error fetching tasks:", error);
//     }
//   };

//   // const updateTaskStatus = async (taskId, status, file) => {
//   //   const formData = new FormData();
//   //   formData.append("status", status);
//   //   if (file) formData.append("proof", file);

//   //   try {
//   //     await axios.patch(`${baseURL}/api/tasks/${taskId}/status`, formData, {
//   //       withCredentials: true,
//   //       headers: { "Content-Type": "multipart/form-data" },
//   //     });
//   //     fetchTasks();
//   //   } catch (error) {
//   //     console.error(
//   //       "Error updating task status:",
//   //       error.response?.data || error
//   //     );
//   //   }
//   // };
//   const updateTaskStatus = async (taskId, status, file) => {
//     const formData = new FormData();
//     formData.append("status", status);

//     if (file) {
//       formData.append("proof", file);
//     }

//     try {
//       const response = await axios.patch(
//         `${baseURL}/api/tasks/${taskId}/status`,
//         formData,
//         {
//           withCredentials: true,
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       );

//       if (response.status === 200) {
//         toast.success("Proof uploaded successfully!", {
//           position: "top-right",
//         });
//       }

//       fetchTasks();
//     } catch (error) {
//       console.error(
//         "Error updating task status:",
//         error.response?.data || error
//       );
//       toast.error("Failed to upload proof. Please try again.", {
//         position: "top-right",
//       });
//     }
//   };

//   const taskStats = {
//     new: tasks.filter((task) => task.status === "New").length,
//     accepted: tasks.filter((task) => task.status === "Accepted").length,
//     completed: tasks.filter((task) => task.status === "Completed").length,
//     failed: tasks.filter((task) => task.status === "Failed").length,
//   };

//   return (
//     <div className="bg-gray-900 min-h-screen text-white p-6">
//       <Nav name={user.name} />
//       <p className="text-gray-400 text-lg mt-4">Email: {user.email}</p>

//       <div className="grid grid-cols-4 gap-4 mt-5 text-center">
//         <div className="bg-blue-500 p-4 font-bold rounded-lg">
//           <h2 className="text-2xl font-bold">{taskStats.new}</h2>
//           <p>All Tasks</p>
//         </div>
//         <div className="bg-green-500 p-4 font-bold rounded-lg">
//           <h2 className="text-2xl font-bold">{taskStats.completed}</h2>
//           <p>Completed</p>
//         </div>
//         <div className="bg-yellow-500 font-bold p-4 rounded-lg">
//           <h2 className="text-2xl font-bold">{taskStats.accepted}</h2>
//           <p>Accepted</p>
//         </div>
//         <div className="bg-red-600 p-4 font-bold rounded-lg">
//           <h2 className="text-2xl font-bold">{taskStats.failed}</h2>
//           <p>Failed</p>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
//         {tasks.map((task) => {
//           let borderColor = "border-gray-700";
//           if (task.status === "Reassigned") borderColor = "border-blue-500";
//           if (task.status === "Failed") borderColor = "border-red-500";
//           if (task.status === "Completed") borderColor = "border-green-500";

//           return (
//             <div
//               key={task._id}
//               className={`p-5 rounded-lg bg-gray-800 shadow-black border-2 ${borderColor}`}
//             >
//               <h3 className="text-2xl font-bold text-center uppercase">
//                 {task.title}
//               </h3>
//               <p className="mt-2 text-sm font-semibold">
//                 Last Date: {new Date(task.date).toDateString()}
//               </p>
//               <p className="text-gray-300 mt-2">
//                 Description: {task.description}
//               </p>
//               <p
//                 className={`px-3 mt-3 py-1 rounded-lg ${
//                   task.priority === "High"
//                     ? "bg-red-600 text-white"
//                     : task.priority === "Medium"
//                     ? "bg-yellow-500 text-black"
//                     : "bg-green-500 text-black"
//                 }`}
//               >
//                 {task.priority}
//               </p>

//               {task.status === "Reassigned" && task.feedback && (
//                 <p className="bg-gray-700 text-yellow-300 p-3 mt-3 rounded-lg">
//                   Feedback: {task.feedback}
//                 </p>
//               )}

//               <div className="mt-4 flex flex-col space-y-2">
//                 {(task.status === "New" || task.status === "Reassigned") && (
//                   <button
//                     onClick={() => updateTaskStatus(task._id, "Accepted")}
//                     className="px-3 py-1 bg-yellow-500 font-bold rounded-lg text-gray-600 hover:bg-yellow-600 hover:text-black transition duration-300"
//                   >
//                     Accept
//                   </button>
//                 )}
//                 {task.status === "Accepted" && (
//                   <>
//                     <input
//                       type="file"
//                       onChange={(e) => setProofFile(e.target.files[0])}
//                       accept=".jpg,.png,.jpeg,.mp4,.pdf"
//                       className="mt-2 block w-full text-sm text-gray-500"
//                     />
//                     <button
//                       onClick={() =>
//                         updateTaskStatus(task._id, "Pending", ProofFile)
//                       }
//                       className="px-3 py-1 bg-green-500 rounded-lg font-bold hover:bg-green-600 transition duration-300"
//                     >
//                       Submit Proof
//                     </button>
//                     <button
//                       onClick={() => updateTaskStatus(task._id, "Failed")}
//                       className="px-3 py-1 bg-red-600 rounded-lg font-bold hover:bg-red-700 transition duration-300"
//                     >
//                       Mark as Failed
//                     </button>
//                   </>
//                 )}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Employ;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../Utils.jsx/utils";
import { useNavigate } from "react-router-dom";
import Nav from "./Navbar.jsx/Nav";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Employ = () => {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState({ username: "", email: "" });
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isFileUploaded, setIsFileUploaded] = useState(false);

  useEffect(() => {
    fetchUserData();
    fetchTasks();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/users/verify-token`, {
        withCredentials: true,
      });
      setUser(response.data.userInfo);
    } catch (error) {
      if (error.response?.status === 401) navigate("/login");
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/tasks/Usertsk`, {
        withCredentials: true,
      });
      setTasks(response.data.tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setIsFileUploaded(true);
      toast.success("File uploaded successfully! Now you can submit proof.");
    }
  };

  const updateTaskStatus = async (taskId, status) => {
    if (status === "Pending" && !selectedFile) {
      toast.error("Please upload a file before submitting proof!");
      return;
    }

    const formData = new FormData();
    formData.append("status", status);
    if (selectedFile) {
      formData.append("proof", selectedFile);
    }

    try {
      await axios.patch(`${baseURL}/api/tasks/${taskId}/status`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Proof submitted successfully!");
      setSelectedFile(null);
      setIsFileUploaded(false);
      fetchTasks();
    } catch (error) {
      toast.error("Error updating task status.");
      console.error(
        "Error updating task status:",
        error.response?.data || error
      );
    }
  };

  const taskStats = {
    new: tasks.filter((task) => task.status === "New").length,
    accepted: tasks.filter((task) => task.status === "Accepted").length,
    completed: tasks.filter((task) => task.status === "Completed").length,
    failed: tasks.filter((task) => task.status === "Failed").length,
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <Nav name={user.name} />
      <p className="text-gray-400 text-lg mt-4">Email: {user.email}</p>
      <div className="grid grid-cols-4 gap-4 mt-5 text-center">
        <div className="bg-blue-500 p-4 font-bold rounded-lg">
          <h2 className="text-2xl font-bold">{taskStats.new}</h2>
          <p>All Tasks</p>
        </div>
        <div className="bg-green-500 p-4 font-bold rounded-lg">
          <h2 className="text-2xl font-bold">{taskStats.completed}</h2>
          <p>Completed</p>
        </div>
        <div className="bg-yellow-500 font-bold p-4 rounded-lg">
          <h2 className="text-2xl font-bold">{taskStats.accepted}</h2>
          <p>Accepted</p>
        </div>
        <div className="bg-red-600 p-4 font-bold rounded-lg">
          <h2 className="text-2xl font-bold">{taskStats.failed}</h2>
          <p>Failed</p>
        </div>
      </div>{" "}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {" "}
        {tasks.map((task) => {
          let borderColor = "border-gray-700";
          if (task.status === "Reassigned") borderColor = "border-blue-500";
          if (task.status === "Failed") borderColor = "border-red-500";
          if (task.status === "Completed") borderColor = "border-green-500";

          return (
            <div
              key={task._id}
              className={`p-5 rounded-lg bg-gray-800 shadow-black border-2 ${borderColor}`}
            >
              <h3 className="text-2xl font-bold text-center uppercase">
                {task.title}
              </h3>
              <p className="mt-2 text-sm font-semibold">
                Last Date: {new Date(task.date).toDateString()}
              </p>
              <p className="text-gray-300 mt-2">
                Description: {task.description}
              </p>
              <p
                className={`px-3 mt-3 py-1 rounded-lg ${
                  task.priority === "High"
                    ? "bg-red-600 text-white"
                    : task.priority === "Medium"
                    ? "bg-yellow-500 text-black"
                    : "bg-green-500 text-black"
                }`}
              >
                {task.priority}
              </p>

              <div className="mt-4 flex flex-col space-y-2">
                {task.status === "Accepted" && (
                  <>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      accept=".jpg,.png,.jpeg,.mp4,.pdf"
                      className="mt-2 block w-full text-sm text-gray-500"
                    />
                    <button
                      onClick={() => updateTaskStatus(task._id, "Pending")}
                      className={`px-3 py-1 font-bold rounded-lg transition duration-300 ${
                        isFileUploaded
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-gray-500 cursor-not-allowed"
                      }`}
                      disabled={!isFileUploaded}
                    >
                      Submit Proof
                    </button>
                    <button
                      onClick={() => updateTaskStatus(task._id, "Failed")}
                      className="px-3 py-1 bg-red-600 rounded-lg font-bold hover:bg-red-700 transition duration-300"
                    >
                      Mark as Failed
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Employ;
