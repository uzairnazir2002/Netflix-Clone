// Login.jsx
import React, { useState } from "react";
import "./Login.css";
import logo from "../../assets/logo.png";
import { firebaseService } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import netflix_spinner from "../../assets/netflix_spinner.gif";
import {
  isAlphabeticName,
  isStrongPassword,
  isValidEmail,
  isValidUsername,
} from "../../utils/validation";

const Login = () => {
  const [signState, setSignState] = useState("Sign In");
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ name: "", username: "", email: "", password: "" });
  const [formError, setFormError] = useState("");

  const validateForm = () => {
    const trimmedEmail = email.trim();
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();
    const trimmedName = name.trim();
    const nextErrors = { name: "", username: "", email: "", password: "" };

    if (signState === "Sign Up") {
      if (!trimmedName) {
        nextErrors.name = "Full name is required for sign up.";
      } else if (!isAlphabeticName(trimmedName)) {
        nextErrors.name = "Name must contain alphabets only.";
      }

      if (!trimmedUsername) {
        nextErrors.username = "Username is required for sign up.";
      } else if (!isValidUsername(trimmedUsername)) {
        nextErrors.username = "Username must include letters and numbers only.";
      }
    }

    if (!trimmedEmail) {
      nextErrors.email = "Email address is required.";
    } else if (!isValidEmail(trimmedEmail)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!trimmedPassword) {
      nextErrors.password = "Password is required.";
    } else if (!isStrongPassword(trimmedPassword)) {
      nextErrors.password = "Password must include uppercase, lowercase, number, special character, and be at least 8 characters.";
    }

    setErrors(nextErrors);
    setFormError("");

    return !nextErrors.name && !nextErrors.email && !nextErrors.password;
  };

  const user_auth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFormError("");

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      if (signState === "Sign In") {
        const res = await firebaseService.login(email.trim(), password.trim());
        setLoading(false);

        if (res.success) {
          toast.success("Logged in successfully.");
          navigate("/home");
        } else {
          setFormError(res.message || "Login failed. Please verify your credentials.");
        }
      } else {
        const res = await firebaseService.signup(name.trim(), username.trim(), email.trim(), password.trim());
        setLoading(false);

        if (res.success) {
          toast.success("Account created successfully! Redirecting to home...");
          navigate("/home");
        } else {
          setFormError(res.message || "Sign up failed. Please verify your details.");
        }
      }
    } catch (error) {
      setLoading(false);
      console.error("Sign in/up error:", error);
      setFormError("Something went wrong. Please try again later.");
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return loading ? (
    <div className="login-spinner">
      <img src={netflix_spinner} alt="Loading..." />
    </div>
  ) : (
    <div className="login">
      <img src={logo} className="login-logo" alt="Netflix logo" />
      <div className="login-form">
        <h1>{signState}</h1>
        <form onSubmit={user_auth}>
          {signState === "Sign Up" && (
            <>
              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
                }}
                type="text"
                placeholder="Your Full Name"
                required
                aria-label="Full name"
              />
              {errors.name && <p className="field-error">{errors.name}</p>}

              <input
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (errors.username) setErrors((prev) => ({ ...prev, username: "" }));
                }}
                type="text"
                placeholder="Username (letters + numbers)"
                required
                aria-label="Username"
              />
              {errors.username && <p className="field-error">{errors.username}</p>}
            </>
          )}

          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
            }}
            type="email"
            placeholder="Enter Email"
            required
            aria-label="Email address"
          />
          {errors.email && <p className="field-error">{errors.email}</p>}

          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) setErrors((prev) => ({ ...prev, password: "" }));
            }}
            type="password"
            placeholder="Enter Password"
            minLength={8}
            required
            aria-label="Password"
          />
          {errors.password && <p className="field-error">{errors.password}</p>}

          {formError && <p className="form-error">{formError}</p>}

          <button onClick={user_auth} type="submit" disabled={loading}>
            {signState}
          </button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" id="rememberMe" aria-label="Remember me" />
              <label htmlFor="rememberMe">Remember Me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>
        <div className="form-switch">
          {signState === "Sign In" ? (
            <p>
              New to Netflix?{" "}
              <span 
                onClick={() => setSignState("Sign Up")}
                role="button"
                tabIndex="0"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setSignState("Sign Up");
                  }
                }}
              >
                Sign Up Now
              </span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span 
                onClick={() => setSignState("Sign In")}
                role="button"
                tabIndex="0"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setSignState("Sign In");
                  }
                }}
              >
                Sign In Now
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
