"use client";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import UserContext from "../../context/userContext";

const AddTask = () => {
  const { user } = useContext(UserContext);
  const id = user?.id;

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    status: "pending",
    image: null,
    userId: id,
  });

  const handleInputChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      image: e.target.files[0], // Store the file object
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const uploadData = new FormData();
    uploadData.append("title", formData.title);
    uploadData.append("content", formData.content);
    uploadData.append("status", formData.status);
    uploadData.append("userId", id);
    
    if (formData.image) {
      uploadData.append("image", formData.image);
    }

    try {
      const response = await axios.post("/api/tasks", uploadData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 201) {
        toast.success("Task added successfully!");
        setFormData({
          title: "",
          content: "",
          status: "pending",
          image: null,
          userId: id,
        });
      }
    } catch (error) {
      toast.error("Failed to add task. Try again.");
    }
  };

  const handleClear = () => {
    setFormData({
      title: "",
      content: "",
      status: "pending",
      image: null,
      userId: id,
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <div className="w-full max-w-lg mx-auto mt-20 mb-10 p-6 bg-gray-800 text-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Add Task</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Task Title */}
          <div>
            <label htmlFor="title" className="block font-medium mb-1">
              Task Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter task title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Task Description */}
          <div>
            <label htmlFor="content" className="block font-medium mb-1">
              Task Description
            </label>
            <textarea
              id="content"
              name="content"
              placeholder="Enter task description"
              value={formData.content}
              onChange={handleInputChange}
              rows="4"
              className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Task Status */}
          <div>
            <label htmlFor="status" className="block font-medium mb-1">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="just created">Just Created</option>
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block font-medium mb-1">Upload Image</label>
            <div className="flex items-center space-x-3">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formData.image && (
                <img
                  src={URL.createObjectURL(formData.image)}
                  alt="Preview"
                  className="w-16 h-16 rounded-md object-cover"
                />
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-all"
            >
              Add Task
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition-all"
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
