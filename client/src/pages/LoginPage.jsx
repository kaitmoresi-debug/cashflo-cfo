import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to login');
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh', 
      backgroundColor: 'var(--color-bg)',
      fontFamily: 'var(--font-body)'
    }}>
      <div style={{ 
        width: '100%', 
        maxWidth: '400px', 
        padding: 'var(--space-8)', 
        backgroundColor: 'var(--color-surface)', 
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-md)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
          <img src="/design/cashflow-cfo-logo.svg" alt="Logo" style={{ height: '48px', marginBottom: 'var(--space-4)' }} />
          <h2 style={{ color: 'var(--color-primary)' }}>Welcome Back</h2>
          <p style={{ color: 'var(--color-text-secondary)' }}>Log in to your account</p>
        </div>

        {error && <div style={{ 
          backgroundColor: '#FEE2E2', 
          color: 'var(--color-danger)', 
          padding: 'var(--space-3)', 
          borderRadius: 'var(--radius-md)', 
          marginBottom: 'var(--space-4)',
          fontSize: 'var(--font-size-sm)'
        }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 'var(--space-4)' }}>
            <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              style={{ 
                width: '100%', 
                padding: 'var(--space-3)', 
                borderRadius: 'var(--radius-md)', 
                border: '1px solid var(--color-border)',
                boxSizing: 'border-box'
              }}
              required
            />
          </div>
          <div style={{ marginBottom: 'var(--space-6)' }}>
            <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              style={{ 
                width: '100%', 
                padding: 'var(--space-3)', 
                borderRadius: 'var(--radius-md)', 
                border: '1px solid var(--color-border)',
                boxSizing: 'border-box'
              }}
              required
            />
          </div>
          <button type="submit" style={{ 
            width: '100%', 
            padding: 'var(--space-3)', 
            backgroundColor: 'var(--color-primary)', 
            color: 'var(--color-text-on-primary)', 
            border: 'none', 
            borderRadius: 'var(--radius-md)', 
            fontWeight: 'var(--font-weight-bold)',
            cursor: 'pointer'
          }}>Log In</button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 'var(--space-6)', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
          Don't have an account? <Link to="/signup" style={{ color: 'var(--color-secondary)', textDecoration: 'none', fontWeight: 'var(--font-weight-bold)' }}>Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
