import { useState } from "react";
import { useAuth } from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom";

import Header from "./components/Header/Header";
import Main from "./components/Main/";
import Footer from "./components/Footer/Footer";
import Authenticate from "./components/Authenticate/Authenticate";
import CreateUser from "./components/CreateUser/CreateUser";

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
          <Footer />
        </BrowserRouter>
      </>
    );
  }
}

export default App;
