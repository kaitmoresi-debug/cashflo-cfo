import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get plan from query string
  const queryParams = new URLSearchParams(location.search);
  const selectedPlan = queryParams.get('plan');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signup(email, password);
      
      if (selectedPlan) {
        // If a plan was selected on the landing page, redirect to Stripe Checkout
        try {
          const res = await axios.post('/api/create-checkout-session', { tier: selectedPlan });
          if (res.data.url) {
            window.location.href = res.data.url;
            return;
          }
        } catch (checkoutErr) {
          console.error('Checkout redirect failed:', checkoutErr);
          // Fallback to dashboard if checkout session creation fails
          navigate('/dashboard');
        }
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to sign up');
    } finally {
      setLoading(false);
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
          <h2 style={{ color: 'var(--color-primary)' }}>Create Account</h2>
          <p style={{ color: 'var(--color-text-secondary)' }}>
            {selectedPlan ? `Finish signing up for the ${selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} plan` : 'Get started with your co-pilot'}
          </p>
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
          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              width: '100%', 
              padding: 'var(--space-3)', 
              backgroundColor: 'var(--color-primary)', 
              color: 'var(--color-text-on-primary)', 
              border: 'none', 
              borderRadius: 'var(--radius-md)', 
              fontWeight: 'var(--font-weight-bold)',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 'var(--space-6)', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--color-secondary)', textDecoration: 'none', fontWeight: 'var(--font-weight-bold)' }}>Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
