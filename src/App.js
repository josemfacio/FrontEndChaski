import React from "react";
import { Navigation } from "./routes";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context";
export default function App() {
  return (
    <AuthProvider>
      <Navigation />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </AuthProvider>
  );
}
