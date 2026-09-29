import { useState } from "react";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5001/api/auth/register",
        {
          name,
          email,
          password,
        }
      );

      alert(response.data.message);

      console.log(response.data);

      setName("");
      setEmail("");
      setPassword("");

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        "Registration failed"
      );
    }
  };

  return (
    <div className="auth-container">

      <div className="auth-card">

        <h1>AI StudyMate</h1>

        <h2>Create Account 🚀</h2>

        <p>Start your smarter study journey.</p>

        <form onSubmit={handleRegister}>

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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
            Create Account
          </button>

        </form>

      </div>

    </div>
  );
}

export default Register;