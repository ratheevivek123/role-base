// import React from "react";
// import axios from "axios";
// import { baseURL } from "../../../Utils.jsx/utils";
// import { useState, useEffect } from "react";

// const Alltasks = () => {
//   const [Tasks, setTasks] = useState([]);

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const response = await axios.get(`${baseURL}/api/tasks/Alltsk`, {
//           withCredentials: true,
//         });
//         setTasks(response.data);
//         console.log(response.data);
//       } catch (error) {
//         console.error("Error fetching tasks:", error);
//       }
//     };
//     fetchTasks();
//   }, []);
//   return (
//     <div
//       id="vivek"
//       className="bg-[#1C1C1C] p-5 mt-7 rounded-xl overflow-auto h-56"
//     >
//       {Tasks.map((tasks) => (
//         <div
//           key={tasks._id}
//           className="bg-red-600 flex items-center justify-between py-2 mb-2 px-3"
//         >
//           <h3>{tasks.assignedTo}</h3>
//           <h3>{tasks.date}</h3>
//           <h3>{tasks.description}</h3>
//           <h3>{tasks.status}</h3>
//         </div>
//       ))}
//     </div>
//   );
// };
// //     >
// //       {Tasks.map((tasks) => (
// //         <div
// //           key={tasks._id}
// //           className="bg-red-600 flex items-center justify-between py-2 mb-2 px-3"
// //         >
// //           <h3>{tasks.name}</h3>
// //           <h3>{tasks.description}</h3>
// //           <h3>{tasks.status}</h3>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // };

// export default Alltasks;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../../../Utils.jsx/utils";

const Alltasks = () => {
  const [Tasks, setTasks] = useState([]);

  const getRandomColor = () => {
    const colors = [
      "bg-red-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-orange-500",
      "bg-teal-500",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/tasks/Alltsk`, {
          withCredentials: true,
        });
        setTasks(response.data.tasks || []); // Ensure tasks array exists
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div
      id="vivek"
      className="bg-[#1C1C1C] p-5 mt-7 rounded-xl overflow-auto h-56"
    >
      {Tasks.length === 0 ? (
        <p className="text-gray-400 text-center">No tasks available</p>
      ) : (
        Tasks.map((task) => (
          <div
            key={task._id}
            className={`${getRandomColor()} flex items-center justify-between py-2 mb-2 px-3 rounded-lg text-white text-xl`}
          >
            <h3>
              <strong>Assigned To:</strong> {task.assignedTo}
            </h3>
            <h3 className="capitalize text-left">
              <strong>Date:</strong> {new Date(task.date).toDateString()}
            </h3>
            <h3>
              <strong>Description:</strong> {task.description}
            </h3>
            <h3>
              <strong>Status:</strong>{" "}
              <span className="capitalize">{task.status}</span>
            </h3>
          </div>
        ))
      )}
    </div>
  );
};

export default Alltasks;
