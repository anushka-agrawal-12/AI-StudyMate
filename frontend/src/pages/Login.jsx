import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5001/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", response.data.token);

      alert("Login successful!");

navigate("/dashboard");

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        "Login failed"
      );
    }
  };

  return (
    <div className="auth-container">

      <div className="auth-card">

        <h1>AI StudyMate</h1>

        <h2>Welcome Back 👋</h2>

        <p>Login to continue your study journey.</p>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">
            Login
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;