import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Login() {
  const [field, setField] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:3005/login", {
        email: field.email,
        password: field.password,
      });

      if (response.data.message === "Login successful") {
        // Set the JWT token in a cookie
        Cookies.set("jwt", response.data.token, { expires: 1, secure: true, sameSite: 'strict' });
        setError("");
        navigate("/data");
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="form-container">
        <form className="register-form" onSubmit={handleSubmit}>
          <input
            id="email"
            className="form-field"
            type="text"
            placeholder="Email"
            name="email"
            value={field.email}
            onChange={(e) => {
              setField({ ...field, email: e.target.value });
            }}
          />
          <input
            id="password"
            className="form-field"
            type="password"
            placeholder="Password"
            name="password"
            value={field.password}
            onChange={(e) => {
              setField({ ...field, password: e.target.value });
            }}
          />
          <button className="form-field" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
}
