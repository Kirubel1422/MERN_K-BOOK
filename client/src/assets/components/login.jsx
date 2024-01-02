import { useState } from "react";
import useLogin from "../../../hooks/useLogin";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { error, isLoading, login } = useLogin();

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
      setFormData({
        email: "",
        password: "",
      });
      e.target.reset();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <section className="flex justify-center items w-full">
      <form
        className="p-10 border-2 border-cyan-300 bg-cyan-100"
        onSubmit={submitHandler}
      >
        <div className="py-2">
          <label htmlFor="email">Email:</label>
          <br />
          <input
            type="text"
            className="w-full px-2 py-1 md:py-2 md:px-3 placeholder:tracking-wider placeholder:animate-ping duration-100  bg-white text-cyan-950 border-2 focus:border-transparent rounded-md hover:border-cyan-500 border-cyan-500 outline-none focus:ring-2 focus:ring-cyan-300"
            placeholder="Enter your email"
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
            name="password"
            className="w-full px-2 py-1 md:py-2 md:px-3 placeholder:tracking-wider placeholder:animate-ping duration-100  bg-white text-cyan-950 border-2 focus:border-transparent rounded-md hover:border-cyan-500 border-cyan-500 outline-none focus:ring-2 focus:ring-cyan-300"
            placeholder="Enter your password"
            onChange={changeHandler}
            required
          />
        </div>
        <div className="py-2">
          <input
            type="submit"
            className="w-full bg-cyan-500 text-white font-semibold py-2 cursor-pointer rounded-md hover:bg-cyan-400 transition-all duration-100 ease"
            value="Login"
            disabled={isLoading}
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

export default Login;
