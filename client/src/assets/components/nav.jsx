import { useAuthContext } from "../../../hooks/useAuthContext";
import { useLogout } from "../../../hooks/useLogout";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";

const Nav = () => {
  const [popNav, setPopNav] = useState(false);
  const { logout } = useLogout();
  const handleLogout = () => {
    logout();
  };
  const { user } = useAuthContext();

  const PopNav = () => {
    return (
      <div className="flex md:hidden justify-end gap-5 items-center absolute bg-white w-full top-8 z-50 py-3 transition-all duration-300 ease ">
        <div>
          <Link
            to="public"
            className="hover:text-cyan-500 hover:border-b-2 hover:opacity-80 text-cyan-700 border-cyan-500 py-1 transition-all duration-100 ease"
            onClick={() => setPopNav((prev) => !prev)}
          >
            Public Posts
          </Link>
        </div>
        <div>
          <Link
            onClick={() => setPopNav((prev) => !prev)}
            to="/myPosts"
            className="hover:text-cyan-500 hover:border-b-2 hover:opacity-80 text-cyan-700 border-cyan-500 py-1 transition-all duration-100 ease"
          >
            My Posts
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-cyan-400">{user.email}</span>
          <button
            onClick={handleLogout}
            className="px-2 py-1 md:px-3 md:py-2  bg-cyan-500 text-white hover:bg-cyan-400 transition-all duration-100 ease hover:shadow-sm active:bg-cyan-300"
          >
            Logout
          </button>
        </div>
      </div>
    );
  };
  return (
    <header className="py-3 md:py-5">
      <nav className="flex justify-between items-center relative">
        <div>
          <Link
            to="/"
            className="font-bold text-lg md:text-2xl text-cyan-500 tracking-wider"
          >
            K-BOOK
          </Link>
        </div>

        <div className="hidden md:flex gap-20">
          <div>
            <Link
              to="/myPosts"
              className="hover:text-cyan-500 hover:border-b-2 hover:opacity-80 text-cyan-700 border-cyan-500 py-1 transition-all duration-100 ease"
            >
              My Posts
            </Link>
          </div>
          <div>
            <Link
              to="public"
              className="hover:text-cyan-500 hover:border-b-2 hover:opacity-80 text-cyan-700 border-cyan-500 py-1 transition-all duration-100 ease"
            >
              Public Posts
            </Link>
          </div>
        </div>
        {!user && (
          <div className="hidden md:flex">
            <ul className="flex gap-3">
              <li>
                <Link
                  to="/account"
                  className="bg-cyan-500 p-2 text-white rounded-md hover:shadow-sm hover:bg-cyan-400 active:scale-90 opacity-90 transition-all duration-100"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/account"
                  className="bg-cyan-500 p-2 text-white rounded-md hover:shadow-sm hover:bg-cyan-400 active:scale-90 opacity-90 transition-all duration-100"
                >
                  SignUp
                </Link>
              </li>
            </ul>
          </div>
        )}
        {user && (
          <div className="md:flex hidden items-center gap-4">
            <span className="text-cyan-400">{user.email}</span>
            <button
              onClick={handleLogout}
              className="px-2 py-1 md:px-3 md:py-2  bg-cyan-500 text-white hover:bg-cyan-400 transition-all duration-100 ease hover:shadow-sm active:bg-cyan-300"
            >
              Logout
            </button>
          </div>
        )}
        {popNav && <PopNav />}
        <div className="flex md:hidden">
          <span onClick={() => setPopNav((prev) => !prev)}>
            <GiHamburgerMenu className="text-cyan-600 hover:cursor-pointer text-2xl" />
          </span>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
