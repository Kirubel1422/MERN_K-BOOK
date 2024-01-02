import { Route, Routes, Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import Nav from "./assets/components/nav";
import Home from "./assets/pages/home";
import LogSign from "./assets/pages/login_signup";
import PublicPosts from "./assets/pages/publicPosts";
import MyPosts from "./assets/pages/myPosts";

const App = () => {
  const { user } = useAuthContext();
  return (
    <div className="sm:px-14 px-4 md:px-32 overflow-hidden">
      <Nav />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/myPosts"
            element={user ? <MyPosts /> : <Navigate to="/account" />}
          />
          <Route
            path="/public"
            element={user ? <PublicPosts /> : <Navigate to="/account" />}
          />
          <Route
            path="/account"
            element={!user ? <LogSign /> : <Navigate to="/myPosts" />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
