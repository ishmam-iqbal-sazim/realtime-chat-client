import { useState } from "react";

const LoginForm = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 items-center justify-center w-[500px] px-10 py-12 border border-slate-200"
    >
      <h1 className="font-medium text-lg mb-5">LOGIN</h1>

      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Username</span>
        </label>
        <input
          type="text"
          placeholder="Your username"
          className="input input-bordered w-full max-w-xs"
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
      </div>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <input
          type="password"
          placeholder="Your password"
          className="input input-bordered w-full max-w-xs"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
      </div>
      <button
        className="btn btn-md btn-secondary font-semibold mt-5"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default LoginForm;
