import { useState } from "react";
import Login from "../components/login";
import Signup from "../components/signup";

const LogSign = () => {
  const [clicked, setClicked] = useState(false);
  return (
    <main className="py-2 md:mt-10">
      <div className="flex items-center justify-center gap-10 h-96 bg-cyan-50 py-10">
        <div className="flex flex-col justify-between gap-10">
          <h2 className="text-cyan text-xl md:text-3xl">
            {clicked && <span>Signup</span>}
            {!clicked && <span>Login</span>}
          </h2>
          <button onClick={() => setClicked((prev) => !prev)}>
            {!clicked && (
              <span className="text-cyan-400">Do you want to Signup?</span>
            )}
            {clicked && (
              <span className="text-cyan-400">Do you want to Login?</span>
            )}
          </button>
        </div>
        <div>
          {clicked && <Signup />}
          {!clicked && <Login />}
        </div>
      </div>
    </main>
  );
};

export default LogSign;
