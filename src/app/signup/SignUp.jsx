"use client";
import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import UserContext from "../../context/userContext";


const AuthPage = () => {
 const {user,signup,setSignup}=useContext(UserContext);
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(isSignUp ? "Sign Up Data:" : "Login Data:", formData);
    try {
      const response = await axios.post("/api/users", formData);
      console.log("Response data:", response.data);
      if (response.data.status === true) {
        toast.success(isSignUp ? "User created successfully!" : "User logged in successfully!");
        if (isSignUp) {
          setIsSignUp(signup=> !signup);
        }
        else {
          setSignup(isSignUp =>!isSignUp);
          setIsSignUp(isSignUp => !isSignUp);
          console.log(isSignUp, "else")
    
          router.push("/");
        }
      }
    }
    catch (error) {
      toast.error("Failed to create user. Try again.");
    }


  };
  console.log(isSignUp, "outside")

  return (
    <div className="flex min-h-screen items-center justify-center bg-sblack">
      <div className="w-full max-w-md bg-slate-900 text-white shadow-xl rounded-lg p-8">
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          {isSignUp ? "Sign Up" : "Login"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-sm font-medium text-white">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-400  
                bg-slate-800"

                placeholder="Enter your name"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-white">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-400 
                bg-slate-800"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full bg-slate-800 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-400"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 bg-blue-800 text-white font-bold rounded-md hover:bg-blue-700 transition duration-200"
          >
            {isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-4 text-center">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => setIsSignUp(!isSignUp)} // Form toggle karega
            className="text-blue-500 hover:underline"
          >
            {isSignUp ? "Login" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
