import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { login } from "../api/blog.api";
// import Cookies from "js-cookie";

function Login() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  // Redirect to dashboard if already logged in
  // useEffect(() => {
  //   console.log("Cookies.get: ", Cookies.get("token"));

  //   if (Cookies.get("token")) {
  //     navigate("/");
  //   }
  // }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value.trim(),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login(loginData);
      console.log("Login Response:", response);

      if (response.success) {
        alert("Login successful!");
        navigate("/");
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Login Error:", error.message);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Log In</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            value={loginData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
