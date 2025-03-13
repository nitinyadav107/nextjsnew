"use client";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import UserContext from "../../../context/userContext";


const TaskDetail = () => {
  const {user}=useContext(UserContext);
  console.log(user,"from task detail");
  const { id } = useParams();
  console.log(id);
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(""); 
  const [updatedContent, setUpdatedContent] = useState("");
  const [userId,setUserId]=useState("");

  useEffect(() => {
    if (!id) return;

    const fetchTask = async () => {
      try {
        const response = await axios.get(`/api/tasks/${id}`);
        setTask(response.data);
        setUpdatedTitle(response.data.title);
        setUpdatedContent(response.data.content);
        setUserId(response.data.userId);
        console.log("user id from response",response.data.userId);
      } catch (err) {
        setError("Failed to fetch task details.");
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`/api/tasks/${id}`, {
        title: updatedTitle,
        content: updatedContent,
      });

      if (response.data.status === true) {
        toast.success("Blog updated successfully!");
        setTask({ ...task, title: updatedTitle, content: updatedContent });
        setIsEditing(false);
      } else {
        toast.error("Failed to update blog.");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-10 mb-10 px-4">
      {loading ? (
        <p className="text-center text-gray-300">Loading task...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg">
          {task.image && (
            <img
              src={task.image}
              alt={task.title}
              className="w-full h-60 object-cover rounded-lg mb-4"
            />
          )}

          {isEditing ? (
            <div>
              <input
                type="text"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
                className="w-full p-2 text-black rounded mb-4"
              />
              <textarea
                value={updatedContent}
                onChange={(e) => setUpdatedContent(e.target.value)}
                className="w-full p-2 text-black rounded mb-4 h-40"
              ></textarea>
              <div className="flex gap-4">
                <button
                  onClick={handleUpdate}
                  className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <h2 className="text-3xl font-bold mb-4 font-sans">{task.title}</h2>
              <pre className="text-gray-300 whitespace-pre-wrap break-words font-sans">
                {task.content}
              </pre>
              {user?.id===userId &&
                 <button
                 onClick={() => setIsEditing(true)}
                 className="mt-4 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
               >
                 Edit Blog
               </button>

              }
             
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskDetail;
