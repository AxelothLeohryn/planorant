import { useState } from "react";
import { useAuth } from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import Header from "./components/Header/Header";
import Main from "./components/Main/";
import Footer from "./components/Footer/Footer";
import Authenticate from "./components/Authenticate/Authenticate";
import CreateUser from "./components/CreateUser/CreateUser";
import axios from "axios";

//REMOVE IN PRODUCTION
axios.defaults.baseURL = "http://localhost:5000";



function App() {
  const { isAuthenticated, isNewUser } = useAuth();

  if (!isAuthenticated) {
    return <Authenticate />;
  } else if (isAuthenticated && isNewUser) {
    return <CreateUser />;
  } else {
    return (
      <>
        <BrowserRouter>
          <Header />
          <Main />
          {/* <Footer /> */}
        </BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            success: {
              className: "alert alert-success text-white"
            },
            error: {
              className: "alert alert-error text-white"
            },
          }}
        />
      </>
    );
  }
}

export default App;
