import { useState } from "react";
import { useAuth } from "./context/AuthContext";

import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
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
        <Header />
        <Main />
        <Footer />
      </>
    );
  }
}

export default App;
