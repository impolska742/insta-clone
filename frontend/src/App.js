import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import Header from "./components/Header/Header";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import LandingPage from "./screens/LandingPage/LandingPage";
import Feed from "./screens/Feed/Feed";
import ViewProfile from "./screens/ViewProfile/ViewProfile";
import ChatBox from "./screens/Chat/ChatBox";
// import { useSelector } from "react-redux";
// import { useEffect } from "react";

function App() {
  // const userLogin = useSelector((state) => state.userLogin);
  // const { userInfo } = userLogin;

  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/view-profile/:id" element={<ViewProfile />} />
          <Route path="/chat" element={<ChatBox />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
