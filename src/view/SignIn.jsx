import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Store JWT in localStorage
        localStorage.setItem("token", data.token);
        alert("Login successful!");
        navigate("/app");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div>
      <h1>Sign In</h1>

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
        <button type="submit">Sign In</button>
      </form>

      <p>
        Don’t have an account?{" "}
        <Link style={{ color: "#9b9bff" }} to="/signup">
          Sign Up
        </Link>
      </p>
    </div>
  );
}
