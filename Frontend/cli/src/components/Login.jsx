import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Import the Cookies object

export default function Login() {
  const [field, setField] = useState({
    email: "",
    password: "",
  });
  const [submitted, setSubmit] = useState(false);
  const [validate, setValidation] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmit(true);
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:3005/login", {
        email: field.email,
        password: field.password,
        action: "login", // Add this line to specify the action
      });

            // Assuming your server returns a success message on successful login
      if (response.data.message === "Login successful") {
        setValidation(true);
        // Set the token value in a cookie
        Cookies.set("email", response.data.email, { expires: 1, secure: true, sameSite: 'strict' });
        Cookies.set("token",response.data.token)
        // Set the JWT token in a cookie
        Cookies.set("jwt", response.data.token, { expires: 1, secure: true, sameSite: 'strict' });
        setError("");
        navigate("/data");
      } else {
        setValidation(false);
        setError("Invalid credentials");
      }
    } catch (err) {
      setValidation(false);
      if (err.response && err.response.status === 401) {
        setError("Invalid email or password");
      } else {
      setError("An error occurred. Please try again later.");
    }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="form-container">
        <form className="register-form" onSubmit={handleSubmit}>
        {submitted && !validate && error && (
            <div className="error-message">{error}</div>
          )}
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
           {submitted && !field.email && <span>Please enter your Email</span>}
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
                    {submitted && !field.password && (
            <span>Please enter your password</span>
          )}
          <button className="form-field" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
}
