import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [form, setForm] = useState({ email: "", password: "", confirm: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirm) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Account created successfully!");
        navigate("/signin");
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div>
      <h1>Create Account</h1>

      <form onSubmit={handleSubmit}>
        <input
          className="todo-entry"
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          className="todo-entry"
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <input
          className="todo-entry"
          type="password"
          name="confirm"
          placeholder="Confirm Password"
          value={form.confirm}
          onChange={handleChange}
          required
        />
        <button type="submit">Create Account</button>
      </form>

      <p>
        Already have an account?{" "}
        <Link style={{ color: "#9b9bff" }} to="/signin">
          Sign In
        </Link>
      </p>
    </div>
  );
}
