"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";



export default function Home() {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("/api/tasks");
        setTasks(response.data.tasks);
      } catch (err) {
        setError("Failed to fetch tasks.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-10 mb-10 px-6">
      <h2 className="text-4xl font-bold text-center mb-8 text-white">
        All Blogs
      </h2>

      {loading ? (
        <p className="text-center text-gray-300">Loading blogs...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : tasks.length > 0 ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-gray-900 text-white p-6 rounded-lg shadow-lg flex flex-col transition-transform duration-300 transform hover:scale-105"
              style={{ height: "450px" }}
            >
              {task.image && (
                <img
                  src={task.image}
                  alt={task.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              <h3
                className="text-xl font-semibold mb-2"
                style={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2, 
                  overflow: "hidden",
                }}
              >
                {task.title}
              </h3>
              <p
                className="text-gray-300 flex-grow"
                style={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 3, // Content limited to 3 lines
                  overflow: "hidden",
                }}
              >
                {task.content}
              </p>
              <div className="mt-4">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-all"
                  onClick={() => router.push(`/task/${task._id}`)}
                >
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-300">No tasks available.</p>
      )}
    </div>
  );
}
