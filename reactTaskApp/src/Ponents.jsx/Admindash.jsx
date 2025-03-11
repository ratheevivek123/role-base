// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { baseURL } from "../Utils.jsx/utils";
// import Taskedit from "./Navbar.jsx/Taskmanager.jsx/Taskedit";
// import AdminNav from "./Navbar.jsx/AdminNav";

// const Admindash = () => {
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [tasks, setTasks] = useState([]);
//   const [feedbacks, setFeedbacks] = useState({}); // Store feedback for each task

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get(`${baseURL}/api/users/allusers`, {
//         withCredentials: true,
//       });
//       setUsers(response.data.users || []);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   };

//   const fetchUserTasks = async (userId) => {
//     const user = users.find((user) => user._id === userId);
//     if (!user) return;

//     if (user.role === "admin") {
//       setSelectedUser(user);
//       setTasks([]);
//       return;
//     }

//     try {
//       const response = await axios.get(`${baseURL}/api/tasks/user/${userId}`, {
//         withCredentials: true,
//       });
//       setTasks(response.data.tasks || []);
//       setSelectedUser(user);
//     } catch (error) {
//       console.error("Error fetching user tasks:", error);
//     }
//   };

//   const reassignTask = async (taskId) => {
//     const feedback = feedbacks[taskId]; // Get feedback for the specific task
//     if (!feedback) {
//       alert("Please provide feedback before reassigning the task.");
//       return;
//     }

//     try {
//       await axios.patch(
//         `${baseURL}/api/tasks/${taskId}/reassign`,
//         { feedback },
//         { withCredentials: true }
//       );
//       setFeedbacks((prev) => ({ ...prev, [taskId]: "" })); // Clear feedback after submission
//       fetchUserTasks(selectedUser._id);
//     } catch (error) {
//       console.error("Error reassigning task:", error);
//     }
//   };

//   const markTaskCompleted = async (taskId) => {
//     try {
//       await axios.patch(
//         `${baseURL}/api/tasks/${taskId}/complete`,
//         {},
//         { withCredentials: true }
//       );
//       setTasks((prevTasks) =>
//         prevTasks.map((task) =>
//           task._id === taskId ? { ...task, status: "Completed" } : task
//         )
//       );
//     } catch (error) {
//       console.error("Error marking task as completed:", error);
//     }
//   };

//   const deleteTask = async (taskId) => {
//     try {
//       await axios.delete(`${baseURL}/api/tasks/${taskId}`, {
//         withCredentials: true,
//       });
//       fetchUserTasks(selectedUser._id);
//     } catch (error) {
//       console.error("Error deleting task:", error);
//     }
//   };

//   return (
//     <div className="bg-gray-900 p-6 text-white min-h-screen">
//       <h1 className="text-3xl text-center font-bold mb-6">
//         <AdminNav />
//       </h1>
//       <Taskedit />

//       {/* User List */}
//       <div className="bg-gray-800 p-5 mt-8 rounded-lg">
//         <h2 className="text-xl font-semibold mb-3">Users</h2>
//         {users.length === 0 ? (
//           <p className="text-gray-400">No users found</p>
//         ) : (
//           users.map((user) => (
//             <div
//               key={user._id}
//               className="flex items-center justify-between bg-gray-700 p-3 rounded-lg mb-2 cursor-pointer hover:bg-gray-600"
//               onClick={() => fetchUserTasks(user._id)}
//             >
//               <h3 className="font-semibold">{user.username}</h3>
//               <p>{user.email}</p>
//               <span
//                 className={`px-3 py-1 text-xs rounded-lg ${
//                   user.role === "admin" ? "bg-red-500" : "bg-blue-500"
//                 }`}
//               >
//                 {user.role}
//               </span>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Task List for Selected User */}
//       {selectedUser && selectedUser.role !== "admin" && (
//         <div className="bg-gray-800 p-5 mt-6 rounded-lg">
//           <h2 className="text-xl font-semibold mb-3">
//             Tasks for {selectedUser.username}
//           </h2>

//           {tasks.length === 0 ? (
//             <p className="text-gray-400">No tasks assigned</p>
//           ) : (
//             tasks.map((task) => (
//               <div
//                 key={task._id}
//                 className="bg-gray-700 p-4 rounded-lg mb-3 flex flex-col gap-3"
//               >
//                 <div>
//                   <h3 className="text-lg font-bold">{task.title}</h3>
//                   <p className="text-sm text-gray-300">
//                     <strong>Date:</strong> {new Date(task.date).toDateString()}
//                   </p>
//                   <p className="text-sm text-gray-300">
//                     <strong>Description:</strong> {task.description}
//                   </p>
//                   <p className="text-sm text-gray-300">
//                     <strong>Status:</strong> {task.status}
//                   </p>
//                   <p className="text-sm text-gray-300">
//                     <strong>Priority:</strong> {task.priority}
//                   </p>
//                 </div>

//                 <div className="flex gap-2">
//                   <button
//                     onClick={() => deleteTask(task._id)}
//                     className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 transition duration-300"
//                   >
//                     Delete
//                   </button>
//                   {task.status !== "Completed" && task.status === "Failed" && (
//                     <button
//                       onClick={() => reassignTask(task._id)}
//                       className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
//                     >
//                       Reassign Task
//                     </button>
//                   )}
//                   {task.proof && task.status !== "Completed" && (
//                     <button
//                       onClick={() => markTaskCompleted(task._id)}
//                       className="px-4 py-2 bg-green-500 rounded-lg hover:bg-green-600 transition duration-300"
//                     >
//                       Mark Completed
//                     </button>
//                   )}
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Admindash;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../Utils.jsx/utils";
import Taskedit from "./Navbar.jsx/Taskmanager.jsx/Taskedit";
import AdminNav from "./Navbar.jsx/AdminNav";

const Admindash = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [feedbacks, setFeedbacks] = useState({}); // Store feedback for each task

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/users/allusers`, {
        withCredentials: true,
      });
      setUsers(response.data.users || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchUserTasks = async (userId) => {
    const user = users.find((user) => user._id === userId);
    if (!user) return;

    if (user.role === "admin") {
      setSelectedUser(user);
      setTasks([]);
      return;
    }

    try {
      const response = await axios.get(`${baseURL}/api/tasks/user/${userId}`, {
        withCredentials: true,
      });
      setTasks(response.data.tasks || []);
      setSelectedUser(user);
    } catch (error) {
      console.error("Error fetching user tasks:", error);
    }
  };

  const reassignTask = async (taskId) => {
    const feedback = feedbacks[taskId]; // Get feedback for the specific task
    if (!feedback) {
      alert("Please provide feedback before reassigning the task.");
      return;
    }

    try {
      await axios.patch(
        `${baseURL}/api/tasks/${taskId}/reassign`,
        { feedback },
        { withCredentials: true }
      );
      setFeedbacks((prev) => ({ ...prev, [taskId]: "" })); // Clear feedback after submission
      fetchUserTasks(selectedUser._id);
    } catch (error) {
      console.error("Error reassigning task:", error);
    }
  };

  const markTaskCompleted = async (taskId) => {
    try {
      await axios.patch(
        `${baseURL}/api/tasks/${taskId}/complete`,
        {},
        { withCredentials: true }
      );
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, status: "Completed" } : task
        )
      );
    } catch (error) {
      console.error("Error marking task as completed:", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`${baseURL}/api/tasks/${taskId}`, {
        withCredentials: true,
      });
      fetchUserTasks(selectedUser._id);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="bg-gray-900 p-6 text-white min-h-screen">
      <h1 className="text-3xl text-center font-bold mb-6">
        <AdminNav />
      </h1>
      <Taskedit />

      {/* User List */}
      <div className="bg-gray-800 p-5 mt-8 rounded-lg">
        <h2 className="text-xl font-semibold mb-3">Users</h2>
        {users.length === 0 ? (
          <p className="text-gray-400">No users found</p>
        ) : (
          users.map((user) => (
            <div
              key={user._id}
              className="flex items-center justify-between bg-gray-700 p-3 rounded-lg mb-2 cursor-pointer hover:bg-gray-600"
              onClick={() => fetchUserTasks(user._id)}
            >
              <h3 className="font-semibold">{user.username}</h3>
              <p>{user.email}</p>
              <span
                className={`px-3 py-1 text-xs rounded-lg ${
                  user.role === "admin" ? "bg-red-500" : "bg-blue-500"
                }`}
              >
                {user.role}
              </span>
            </div>
          ))
        )}
      </div>

      {/* Task List for Selected User */}
      {selectedUser && selectedUser.role !== "admin" && (
        <div className="bg-gray-800 p-5 mt-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">
            Tasks for {selectedUser.username}
          </h2>

          {tasks.length === 0 ? (
            <p className="text-gray-400">No tasks assigned</p>
          ) : (
            tasks.map((task) => (
              <div
                key={task._id}
                className="bg-gray-700 p-4 rounded-lg mb-3 flex flex-col gap-3"
              >
                <div>
                  <h3 className="text-lg font-bold">{task.title}</h3>
                  <p className="text-sm text-gray-300">
                    <strong>Date:</strong> {new Date(task.date).toDateString()}
                  </p>
                  <p className="text-sm text-gray-300">
                    <strong>Description:</strong> {task.description}
                  </p>
                  <p className="text-sm text-gray-300">
                    <strong>Status:</strong> {task.status}
                  </p>
                  <p className="text-sm text-gray-300">
                    <strong>Priority:</strong> {task.priority}
                  </p>

                  {/* Show Proof if available */}
                  {task.proof && (
                    <div className="mt-3">
                      <p className="text-sm text-gray-300 font-semibold">
                        Proof:
                      </p>
                      {task.proof.endsWith(".jpg") ||
                      task.proof.endsWith(".png") ? (
                        <img
                          src={task.proof}
                          alt="Task Proof"
                          className="mt-2 w-32 h-32 rounded-lg object-cover"
                        />
                      ) : (
                        <a
                          href={task.proof}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:underline"
                        >
                          View Document
                        </a>
                      )}
                    </div>
                  )}
                </div>

                {/* Feedback Input if task is Failed or Pending */}
                {(task.status === "Failed" || task.status === "Pending") && (
                  <div className="mt-3">
                    <textarea
                      value={feedbacks[task._id] || ""}
                      onChange={(e) =>
                        setFeedbacks((prev) => ({
                          ...prev,
                          [task._id]: e.target.value,
                        }))
                      }
                      placeholder="Enter feedback before reassigning..."
                      className="w-full p-2 rounded-lg bg-gray-800 text-white"
                    />
                  </div>
                )}

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => deleteTask(task._id)}
                    className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 transition duration-300"
                  >
                    Delete
                  </button>
                  {task.status !== "Completed" &&
                    (task.status === "Failed" || task.status === "Pending") && (
                      <button
                        onClick={() => reassignTask(task._id)}
                        className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
                      >
                        Reassign Task
                      </button>
                    )}

                  {task.proof &&
                    task.status !== "Completed" &&
                    task.status !== "Reassigned" && (
                      <button
                        onClick={() => markTaskCompleted(task._id)}
                        className="px-4 py-2 bg-green-500 rounded-lg hover:bg-green-600 transition duration-300"
                      >
                        Mark Completed
                      </button>
                    )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Admindash;
