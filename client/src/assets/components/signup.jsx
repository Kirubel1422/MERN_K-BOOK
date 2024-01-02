import { useState } from "react";
import useSignup from "../../../hooks/useSignup";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { error, isLoading, signup } = useSignup();

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await signup(formData);
      setFormData({
        username: "",
        email: "",
        password: "",
      });
      e.target.reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="flex justify-center items-center w-full">
      <form
        className="p-10 border-2 border-cyan-300 bg-cyan-100 w-full"
        onSubmit={submitHandler}
      >
        <div className="py-2">
          <label htmlFor="username">Username:</label>
          <br />
          <input
            type="text"
            placeholder="Enter your username"
            className="w-full px-2 py-1 md:py-2 md:px-3 placeholder:tracking-wider placeholder:animate-ping duration-100  bg-white text-cyan-950 border-2 focus:border-transparent rounded-md hover:border-cyan-500 border-cyan-500 outline-none focus:ring-2 focus:ring-cyan-300"
            onChange={changeHandler}
            name="username"
            required
          />
        </div>
        <div className="py-2">
          <label htmlFor="email">Email:</label>
          <br />
          <input
            type="text"
            placeholder="Enter your email"
            className="w-full px-2 py-1 md:py-2 md:px-3 placeholder:tracking-wider placeholder:animate-ping duration-100  bg-white text-cyan-950 border-2 focus:border-transparent rounded-md hover:border-cyan-500 border-cyan-500 outline-none focus:ring-2 focus:ring-cyan-300"
            onChange={changeHandler}
            name="email"
            required
          />
        </div>
        <div className="py-2">
          <label htmlFor="password">Password:</label>
          <br />
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full px-2 py-1 md:py-2 md:px-3 placeholder:tracking-wider placeholder:animate-ping duration-100  bg-white text-cyan-950 border-2 focus:border-transparent rounded-md hover:border-cyan-500 border-cyan-500 outline-none focus:ring-2 focus:ring-cyan-300"
            onChange={changeHandler}
            name="password"
            required
          />
        </div>
        <div className="py-2">
          <input
            type="submit"
            className="w-full bg-cyan-500 text-white font-semibold py-2 cursor-pointer rounded-md hover:bg-cyan-400 transition-all duration-100 ease"
            disabled={isLoading}
            value="Signup"
          />
        </div>
        {error && (
          <div>
            <p className="p-2 text-red-600 bg-red-200 border-red-400 ">
              {error}
            </p>
          </div>
        )}
      </form>
    </section>
  );
};

export default Signup;
