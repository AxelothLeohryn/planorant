import { useAuth } from "./context/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

import Header from "./components/Header/Header";
import Main from "./components/Main/";
import Footer from "./components/Footer/Footer";
import Authenticate from "./components/Authenticate/Authenticate";
import CreateUser from "./components/CreateUser/CreateUser";

// Set the base URL for axios requests
axios.defaults.baseURL = import.meta.env.VITE_API_URL;
// console.log(import.meta.env.VITE_API_URL);
// axios.defaults.baseURL = "http://localhost:5000";

function App() {
  const { isAuthenticated, isNewUser } = useAuth();

  // Function to render the appropriate component based on the authentication status
  const renderContent = () => {
    if (!isAuthenticated) {
      return <Authenticate />;
    }
    if (isNewUser) {
      return <CreateUser />;
    }
    return (
      <Router>
        <Header />
        <Main />
        {/* Uncomment if you decide to use the Footer component */}
        {/* <Footer /> */}
      </Router>
    );
  };

  return (
    <>
      {renderContent()}
      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            className: "alert alert-success text-white",
          },
          error: {
            className: "alert alert-error text-white",
          },
        }}
      />
    </>
  );
}

export default App;
