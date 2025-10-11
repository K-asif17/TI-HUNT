// LoginPage.jsx
import React, { useState } from 'react';
import './login.css';
import logo from '../assets/cyveon.jpeg';
// import LogAnalysisPage from '../components/mainpage/mainpage';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    remember: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    setErrors({ ...errors, [name]: '' });
  };

  const validate = () => {
    let newErrors = {};
    let valid = true;

    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = 'Please enter a valid email';
      valid = false;
    }

    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      valid = false;
    }

    if (isSignup) {
      if (!formData.name.trim()) {
        newErrors.name = 'Name is required';
        valid = false;
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
        valid = false;
      }
    }

    setErrors(newErrors);
    return valid;
  };

 
  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validate()) return;

  setLoading(true);
  const url = isSignup ? 'http://localhost:5000/signup' : 'http://localhost:5000/login';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      }),
    });

    const result = await response.json();

    if (response.ok) {
      if (isSignup) {
        alert("Signup successful! Please log in.");
        setIsSignup(false); // Switch to login form
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          remember: false,
        });
      } else {
        alert("Login successful!");
        navigate('/main');
      }
    } else {
      alert(isSignup ? (result.error || "Signup failed.") : (result.error || "Login failed."));
    }

  } catch (err) {
    console.error("Error:", err);
    alert("Server error. Try again later.");
  } finally {
    setLoading(false);
  }
};



  

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="logo-header">
          <img src={logo} alt="TI-Hunt Logo" className="logo" />
          <h1 className="gradient-text">TI-Hunt</h1>
        </div>
        <p className="tagline">Threat Intelligence & Hunting Platform</p>
        <ul className="features">
          <li>🧠 Real-time Threat Intelligence</li>
          <li>📂 Log File Analysis</li>
          <li>🌐 URL, IP & File Scanning</li>
        </ul>
        <footer>© 2025 TI-Hunt. All rights reserved.</footer>
      </div>

      <div className="login-right">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>{isSignup ? 'Create Account' : 'Welcome Back'}</h2>

          {isSignup && (
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} />
              {errors.name && <span className="error">{errors.name}</span>}
            </div>
          )}

          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="form-group password-group">
            <label>Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? '🙈' : '👁️'}
            </button>
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          {isSignup && (
            <div className="form-group password-group">
              <label>Confirm Password</label>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? '🙈' : '👁️'}
              </button>
              {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
            </div>
          )}

          <div className="form-options">
            <label>
              <input type="checkbox" name="remember" checked={formData.remember} onChange={handleChange} />
              Remember me
            </label>
            <button type="button" className="link">Forgot password?</button>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Please wait...' : isSignup ? 'Sign Up' : 'Sign In'}
          </button>

          <p className="switch-mode">
            {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button type="button" className="link" onClick={() => setIsSignup(!isSignup)}>
              {isSignup ? 'Sign in' : 'Sign up'}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
