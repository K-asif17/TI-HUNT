import React, { useState, useEffect } from 'react';
import './login.css';

import logo from '../assets/cyveon.jpeg';

const LoginPage = () => {
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    setErrors({ ...errors, [name]: '' });
  };

  const togglePassword = (e) => {
    const input = e.target.previousSibling;
    input.type = input.type === 'password' ? 'text' : 'password';
    e.target.classList.toggle('show');
  };

  const validate = () => {
    let valid = true;
    let newErrors = {};

    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = 'Please enter a valid email address';
      valid = false;
    }

    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
      valid = false;
    }

    if (isSignup) {
      if (formData.name.trim().length < 2) {
        newErrors.name = 'Please enter your full name';
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        alert('Form submitted successfully!');
      }, 2000);
    }
  };

  return (
    <div className="container">
      <div className="panel left-panel">
        <div className="content">
          <div className="brand">
            <div className="brand-header">
              <img src={logo} alt="TI-Hunt Logo" className="logo" />
              <h1>TI-Hunt</h1>
            </div>
            <p className="tagline">Threat Intelligence & Hunting Platform</p>
            <p className="description">
              TI-Hunt empowers analysts and defenders to proactively hunt threats using real-time intelligence, automated scanning, and deep log analysis.
            </p>
          </div>

          <div className="features">
            <h2>Key Features</h2>
            <div className="feature">
              <div className="feature-icon">🧠</div>
              <div className="feature-text">
                <h3>Threat Intelligence Integration</h3>
                <p>Fetch and analyze IOCs from leading threat feeds</p>
              </div>
            </div>
            <div className="feature">
              <div className="feature-icon">📂</div>
              <div className="feature-text">
                <h3>Log File Analysis</h3>
                <p>Upload and parse logs to identify malicious activity</p>
              </div>
            </div>
            <div className="feature">
              <div className="feature-icon">🌐</div>
              <div className="feature-text">
                <h3>Scanning Tools</h3>
                <p>Perform URL, file, and port scanning for suspicious behavior</p>
              </div>
            </div>
          </div>

          <footer>
            <p>© 2025 TI-Hunt. All rights reserved.</p>
          </footer>
        </div>
      </div>

      <div className="panel right-panel">
        <div className="form-container">
          <h2>{isSignup ? 'Create Account' : 'Welcome Back'}</h2>
          <p className="form-subtitle">{isSignup ? 'Sign up for an account to get started' : 'Sign in to your account to continue'}</p>

          <form onSubmit={handleSubmit} className="auth-form">
            {isSignup && (
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input type="text" name="name" placeholder="Enter your full name" value={formData.name} onChange={handleChange} />
                <span className="error-message">{errors.name}</span>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} />
              <span className="error-message">{errors.email}</span>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-input">
                <input type="password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} />
                <button type="button" className="toggle-password" onClick={togglePassword}></button>
              </div>
              <span className="error-message">{errors.password}</span>
            </div>

            {isSignup && (
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="password-input">
                  <input type="password" name="confirmPassword" placeholder="Confirm your password" value={formData.confirmPassword} onChange={handleChange} />
                  <button type="button" className="toggle-password" onClick={togglePassword}></button>
                </div>
                <span className="error-message">{errors.confirmPassword}</span>
              </div>
            )}

            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" name="remember" checked={formData.remember} onChange={handleChange} />
                <span>Remember me</span>
              </label>
              <a href="#" className="forgot-password">Forgot password?</a>
            </div>

            <button type="submit" className={`btn btn-primary ${loading ? 'loading' : ''}`}>
              <span className="btn-text">{loading ? 'Please wait...' : isSignup ? 'Sign Up' : 'Sign In'}</span>
              <span className="btn-loader"></span>
            </button>

            <div className="divider">
              <span>Or continue with</span>
            </div>

            <a href="mainpage.html">
              <button type="button" className="btn btn-google">
                <span className="google-icon"></span>
                <span>Continue with Google</span>
              </button>
            </a>
          </form>

          <p className="toggle-prompt">
            <span>{isSignup ? 'Already have an account?' : "Don't have an account?"}</span>
            <button type="button" className="toggle-btn" onClick={() => setIsSignup(!isSignup)}>
              {isSignup ? 'Sign in' : 'Sign up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
