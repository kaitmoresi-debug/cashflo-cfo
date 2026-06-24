import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, BarChart3, Calculator, Rocket } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="landing-page" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)', minHeight: '100vh', fontFamily: 'var(--font-body)' }}>
      {/* Navigation */}
      <nav style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: 'var(--space-4) var(--space-8)',
        backgroundColor: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <img src="/design/cashflow-cfo-logo.svg" alt="Cashflow CFO Logo" style={{ height: '40px' }} />
          <span style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-primary)' }}>Cashflow CFO</span>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-6)', alignItems: 'center' }}>
          <Link to="/login" style={{ color: 'var(--color-text)', textDecoration: 'none', fontWeight: 'var(--font-weight-medium)' }}>Log in</Link>
          <Link to="/signup" style={{ 
            backgroundColor: 'var(--color-primary)', 
            color: 'var(--color-text-on-primary)', 
            padding: 'var(--space-2) var(--space-4)', 
            borderRadius: 'var(--radius-md)',
            textDecoration: 'none',
            fontWeight: 'var(--font-weight-bold)'
          }}>Get Started</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header style={{ 
        padding: 'var(--space-12) var(--space-8)', 
        textAlign: 'center',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <h1 style={{ fontSize: 'var(--font-size-3xl)', color: 'var(--color-primary)', marginBottom: 'var(--space-4)' }}>
          Your AI Financial Co-pilot for One-Person Businesses
        </h1>
        <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-8)' }}>
          Automate cash flow tracking, predict tax obligations, and forecast runway without ever opening a spreadsheet.
        </p>
        <Link to="/signup" style={{ 
          backgroundColor: 'var(--color-secondary)', 
          color: 'var(--color-text-on-primary)', 
          padding: 'var(--space-4) var(--space-8)', 
          borderRadius: 'var(--radius-lg)',
          textDecoration: 'none',
          fontSize: 'var(--font-size-lg)',
          fontWeight: 'var(--font-weight-bold)',
          boxShadow: 'var(--shadow-md)'
        }}>Start Your Free Trial</Link>
      </header>

      {/* Features Section */}
      <section style={{ padding: 'var(--space-12) var(--space-8)', backgroundColor: 'var(--color-surface)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', marginBottom: 'var(--space-10)', fontSize: 'var(--font-size-2xl)' }}>Everything you need to stay in the green</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-8)' }}>
            <div style={{ textAlign: 'center', padding: 'var(--space-6)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
              <BarChart3 size={40} color="var(--color-secondary)" style={{ marginBottom: 'var(--space-4)' }} />
              <h3 style={{ marginBottom: 'var(--space-2)' }}>Cash Flow Tracking</h3>
              <p style={{ color: 'var(--color-text-secondary)' }}>Automatically track every dollar in and out with real-time dashboards.</p>
            </div>
            <div style={{ textAlign: 'center', padding: 'var(--space-6)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
              <Calculator size={40} color="var(--color-secondary)" style={{ marginBottom: 'var(--space-4)' }} />
              <h3 style={{ marginBottom: 'var(--space-2)' }}>Tax Predictions</h3>
              <p style={{ color: 'var(--color-text-secondary)' }}>Never be surprised by a tax bill. We calculate your obligations as you earn.</p>
            </div>
            <div style={{ textAlign: 'center', padding: 'var(--space-6)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
              <Rocket size={40} color="var(--color-secondary)" style={{ marginBottom: 'var(--space-4)' }} />
              <h3 style={{ marginBottom: 'var(--space-2)' }}>Runway Forecasting</h3>
              <p style={{ color: 'var(--color-text-secondary)' }}>Know exactly how much time you have left based on your spending trends.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section style={{ padding: 'var(--space-12) var(--space-8)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', marginBottom: 'var(--space-10)', fontSize: 'var(--font-size-2xl)' }}>Simple, Transparent Pricing</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-8)' }}>
            {/* Starter Plan */}
            <div style={{ 
              backgroundColor: 'var(--color-surface)', 
              padding: 'var(--space-8)', 
              borderRadius: 'var(--radius-xl)', 
              border: '1px solid var(--color-border)',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <h3 style={{ marginBottom: 'var(--space-2)' }}>Starter</h3>
              <div style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 'var(--font-weight-bold)', marginBottom: 'var(--space-4)' }}>$19<span style={{ fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-normal)' }}>/mo</span></div>
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: 'var(--space-8)', flex: 1 }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}><CheckCircle size={18} color="var(--color-success)" /> Cash flow tracking</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}><CheckCircle size={18} color="var(--color-success)" /> Tax obligation predictions</li>
              </ul>
              <Link to="/signup" style={{ 
                textAlign: 'center',
                border: '1px solid var(--color-primary)', 
                color: 'var(--color-primary)', 
                padding: 'var(--space-3)', 
                borderRadius: 'var(--radius-md)',
                textDecoration: 'none',
                fontWeight: 'var(--font-weight-bold)'
              }}>Choose Starter</Link>
            </div>
            {/* Pro Plan */}
            <div style={{ 
              backgroundColor: 'var(--color-primary)', 
              color: 'var(--color-text-on-primary)',
              padding: 'var(--space-8)', 
              borderRadius: 'var(--radius-xl)', 
              boxShadow: 'var(--shadow-lg)',
              display: 'flex',
              flexDirection: 'column',
              transform: 'scale(1.05)'
            }}>
              <h3 style={{ marginBottom: 'var(--space-2)' }}>Pro</h3>
              <div style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 'var(--font-weight-bold)', marginBottom: 'var(--space-4)' }}>$49<span style={{ fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-normal)' }}>/mo</span></div>
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: 'var(--space-8)', flex: 1 }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}><CheckCircle size={18} color="var(--color-accent)" /> Everything in Starter</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}><CheckCircle size={18} color="var(--color-accent)" /> Pricing suggestions</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}><CheckCircle size={18} color="var(--color-accent)" /> Runway forecasting</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}><CheckCircle size={18} color="var(--color-accent)" /> Bank account connection</li>
              </ul>
              <Link to="/signup" style={{ 
                textAlign: 'center',
                backgroundColor: 'var(--color-accent)', 
                color: 'var(--color-primary)', 
                padding: 'var(--space-3)', 
                borderRadius: 'var(--radius-md)',
                textDecoration: 'none',
                fontWeight: 'var(--font-weight-bold)'
              }}>Choose Pro</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ 
        padding: 'var(--space-8)', 
        textAlign: 'center', 
        borderTop: '1px solid var(--color-border)',
        color: 'var(--color-text-muted)',
        fontSize: 'var(--font-size-sm)'
      }}>
        &copy; 2026 Cashflow CFO. Built for Solopreneurs.
      </footer>
    </div>
  );
};

export default LandingPage;
