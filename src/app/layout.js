import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomNavbar from "../components/CustomNavbar";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

import UserProvider from "../context/UserProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} no-scrollbar`}>
      <body>
      <UserProvider>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
        <CustomNavbar />
        <main>{children}</main>
        <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
