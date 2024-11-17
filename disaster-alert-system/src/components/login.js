import React, { useState } from "react";


const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Hardcoded credentials
  const validCredentials = {
    email: "user@example.com",
    password: "password123",
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh

    // Check credentials    
    if (email === validCredentials.email && password === validCredentials.password) {
      setError(""); // Clear error
      onLogin(); // Trigger login action
    } else {
      setError("Invalid username or password"); // Show error
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Error Message */}
          {error && <p className="error-message">{error}</p>}

          {/* Submit Button */}
          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        {/* Sign-Up Link */}
        <p className="signup-text">
          Don't have an account?{" "}
          <a href="/signup" className="signup-link">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
