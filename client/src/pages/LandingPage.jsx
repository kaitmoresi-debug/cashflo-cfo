import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, BarChart3, Calculator, Rocket } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const LandingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleChoosePlan = async (tier) => {
    if (!user) {
      navigate(`/signup?plan=${tier}`);
      return;
    }

    try {
      const res = await axios.post('/api/create-checkout-session', { tier });
      if (res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to start checkout. Please try again.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-background)', color: 'var(--color-text)' }}>
      {/* Navigation */}
      <nav style={{ padding: 'var(--space-6) var(--space-8)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <img src="/design/cashflow-cfo-logo.svg" alt="Cashflow CFO Logo" style={{ height: '32px' }} />
          <span style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)' }}>Cashflow CFO</span>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
          {user ? (
            <Link to="/dashboard" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 'var(--font-weight-bold)' }}>Dashboard</Link>
          ) : (
            <>
              <Link to="/login" style={{ color: 'var(--color-text)', textDecoration: 'none' }}>Log In</Link>
              <Link to="/signup" style={{ 
                backgroundColor: 'var(--color-primary)', 
                color: 'var(--color-text-on-primary)', 
                padding: 'var(--space-2) var(--space-4)', 
                borderRadius: 'var(--radius-md)',
                textDecoration: 'none',
                fontWeight: 'var(--font-weight-bold)'
              }}>Get Started</Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <header style={{ padding: 'var(--space-20) var(--space-8)', textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{ fontSize: 'var(--font-size-4xl)', marginBottom: 'var(--space-6)', lineHeight: 1.1 }}>
          The AI Financial Co-pilot for <span style={{ color: 'var(--color-secondary)' }}>One-Person Businesses</span>.
        </h1>
        <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-10)', lineHeight: 1.6 }}>
          Automate cash flow tracking, predict tax obligations, and forecast your runway without a spreadsheet.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-4)' }}>
          <button 
            onClick={() => handleChoosePlan('starter')}
            style={{ 
              backgroundColor: 'var(--color-primary)', 
              color: 'var(--color-text-on-primary)', 
              padding: 'var(--space-4) var(--space-8)', 
              borderRadius: 'var(--radius-lg)',
              border: 'none',
              fontSize: 'var(--font-size-lg)',
              fontWeight: 'var(--font-weight-bold)',
              cursor: 'pointer'
            }}
          >
            Start 14-Day Free Trial
          </button>
        </div>
      </header>

      {/* Features Section */}
      <section style={{ padding: 'var(--space-20) var(--space-8)', backgroundColor: 'var(--color-surface)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', marginBottom: 'var(--space-12)', fontSize: 'var(--font-size-2xl)' }}>Everything you need to stay in the green</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-8)' }}>
            <div style={{ padding: 'var(--space-8)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-background)' }}>
              <BarChart3 size={40} color="var(--color-secondary)" style={{ marginBottom: 'var(--space-4)' }} />
              <h3 style={{ marginBottom: 'var(--space-2)' }}>Cash Flow Tracking</h3>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>Automatically track every dollar in and out with real-time dashboards.</p>
            </div>
            <div style={{ padding: 'var(--space-8)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-background)' }}>
              <Calculator size={40} color="var(--color-secondary)" style={{ marginBottom: 'var(--space-4)' }} />
              <h3 style={{ marginBottom: 'var(--space-2)' }}>Tax Predictions</h3>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>Never be surprised by a tax bill. We calculate your obligations as you earn.</p>
            </div>
            <div style={{ padding: 'var(--space-8)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-background)' }}>
              <Rocket size={40} color="var(--color-secondary)" style={{ marginBottom: 'var(--space-4)' }} />
              <h3 style={{ marginBottom: 'var(--space-2)' }}>Runway Forecasting</h3>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>Know exactly how much time you have left based on your spending trends.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" style={{ padding: 'var(--space-20) var(--space-8)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', marginBottom: 'var(--space-4)', fontSize: 'var(--font-size-3xl)' }}>Simple, Transparent Pricing</h2>
          <p style={{ textAlign: 'center', marginBottom: 'var(--space-12)', color: 'var(--color-text-secondary)' }}>All plans include a 14-day free trial. No credit card required to start.</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-8)', alignItems: 'stretch' }}>
            {/* Starter Plan */}
            <div style={{
              backgroundColor: 'var(--color-surface)',
              padding: 'var(--space-10)',
              borderRadius: 'var(--radius-2xl)',
              border: '1px solid var(--color-border)',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <h3 style={{ marginBottom: 'var(--space-2)', fontSize: 'var(--font-size-xl)' }}>Starter</h3>
              <p style={{ marginBottom: 'var(--space-6)', color: 'var(--color-text-secondary)' }}>Perfect for freelancers just getting started.</p>
              <div style={{ fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-bold)', marginBottom: 'var(--space-8)' }}>
                $19<span style={{ fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-normal)', color: 'var(--color-text-secondary)' }}>/mo</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: 'var(--space-10)', flex: 1 }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}><CheckCircle size={20} color="var(--color-success)" /> Cash flow tracking</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}><CheckCircle size={20} color="var(--color-success)" /> Tax obligation predictions</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}><CheckCircle size={20} color="var(--color-success)" /> Quarterly tax schedule</li>
              </ul>
              <button 
                onClick={() => handleChoosePlan('starter')}
                style={{
                  textAlign: 'center',
                  border: '2px solid var(--color-primary)',
                  backgroundColor: 'transparent',
                  color: 'var(--color-primary)',
                  padding: 'var(--space-4)',
                  borderRadius: 'var(--radius-lg)',
                  fontWeight: 'var(--font-weight-bold)',
                  cursor: 'pointer',
                  fontSize: 'var(--font-size-md)'
                }}
              >
                Choose Starter
              </button>
            </div>

            {/* Pro Plan */}
            <div style={{
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-text-on-primary)',
              padding: 'var(--space-10)',
              borderRadius: 'var(--radius-2xl)',
              boxShadow: 'var(--shadow-xl)',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: '12px',
                right: '-35px',
                backgroundColor: 'var(--color-accent)',
                color: 'var(--color-primary)',
                padding: 'var(--space-1) var(--space-10)',
                transform: 'rotate(45deg)',
                fontSize: 'var(--font-size-xs)',
                fontWeight: 'var(--font-weight-bold)'
              }}>POPULAR</div>
              
              <h3 style={{ marginBottom: 'var(--space-2)', fontSize: 'var(--font-size-xl)' }}>Pro</h3>
              <p style={{ marginBottom: 'var(--space-6)', color: 'rgba(255,255,255,0.7)' }}>For growing businesses that need more insight.</p>
              <div style={{ fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-bold)', marginBottom: 'var(--space-8)' }}>
                $49<span style={{ fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-normal)', color: 'rgba(255,255,255,0.7)' }}>/mo</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: 'var(--space-10)', flex: 1 }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}><CheckCircle size={20} color="var(--color-accent)" /> Everything in Starter</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}><CheckCircle size={20} color="var(--color-accent)" /> Pricing suggestions</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}><CheckCircle size={20} color="var(--color-accent)" /> Runway forecasting</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}><CheckCircle size={20} color="var(--color-accent)" /> Bank account connection</li>
              </ul>
              <button 
                onClick={() => handleChoosePlan('pro')}
                style={{
                  textAlign: 'center',
                  backgroundColor: 'var(--color-accent)',
                  color: 'var(--color-primary)',
                  padding: 'var(--space-4)',
                  borderRadius: 'var(--radius-lg)',
                  border: 'none',
                  fontWeight: 'var(--font-weight-bold)',
                  cursor: 'pointer',
                  fontSize: 'var(--font-size-md)'
                }}
              >
                Choose Pro
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: 'var(--space-12) var(--space-8)', textAlign: 'center', borderTop: '1px solid var(--color-border)', color: 'var(--color-text-muted)' }}>
        <p>&copy; 2026 Cashflow CFO. Built for Solopreneurs.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
