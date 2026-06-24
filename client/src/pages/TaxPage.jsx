import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calculator, ShieldCheck, Info, ArrowRight } from 'lucide-react';

const TaxPage = () => {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTax = async () => {
      try {
        const res = await axios.get('/api/predictions');
        const tax = res.data.find(p => p.type === 'tax');
        if (tax) {
          setPrediction({ ...tax, details: JSON.parse(tax.details) });
        }
      } catch (err) {
        console.error('Error fetching tax data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTax();
  }, []);

  if (loading) return <div>Loading tax details...</div>;
  if (!prediction) return <div>No tax data available. Add some transactions first!</div>;

  const { details } = prediction;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
      <div>
        <h2 style={{ fontSize: 'var(--font-size-2xl)', color: 'var(--color-primary)', marginBottom: 'var(--space-1)' }}>Tax Obligation Prediction</h2>
        <p style={{ color: 'var(--color-text-secondary)' }}>Estimated obligations for the current tax year.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-8)' }}>
        {/* Main Summary */}
        <div style={{ 
          backgroundColor: 'var(--color-surface)', 
          padding: 'var(--space-8)', 
          borderRadius: 'var(--radius-xl)', 
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-md)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-6)' }}>
            <Calculator size={28} color="var(--color-secondary)" />
            <h3 style={{ fontSize: 'var(--font-size-xl)' }}>Estimated Total Tax</h3>
          </div>
          
          <div style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-primary)', marginBottom: 'var(--space-2)' }}>
            ${Math.round(prediction.value).toLocaleString()}
          </div>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-8)' }}>
            Total amount to set aside from your 2026 earnings.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 'var(--space-3)', borderBottom: '1px solid var(--color-border-light)' }}>
              <span style={{ color: 'var(--color-text-secondary)' }}>Self-Employment Tax (15.3%)</span>
              <span style={{ fontWeight: 'var(--font-weight-semibold)' }}>${Math.round(details.selfEmploymentTax).toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 'var(--space-3)', borderBottom: '1px solid var(--color-border-light)' }}>
              <span style={{ color: 'var(--color-text-secondary)' }}>Estimated Income Tax (~15%)</span>
              <span style={{ fontWeight: 'var(--font-weight-semibold)' }}>${Math.round(details.estimatedIncomeTax).toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 'var(--space-1)' }}>
              <span style={{ fontWeight: 'var(--font-weight-bold)' }}>Total Reserve</span>
              <span style={{ fontWeight: 'var(--font-weight-bold)', color: 'var(--color-secondary)' }}>${Math.round(prediction.value).toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Calculation Basis */}
        <div style={{ 
          backgroundColor: 'var(--color-surface)', 
          padding: 'var(--space-8)', 
          borderRadius: 'var(--radius-xl)', 
          border: '1px solid var(--color-border)'
        }}>
          <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--space-6)' }}>Calculation Basis</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <div>
              <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-1)' }}>YTD Gross Income</div>
              <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-semibold)' }}>${Math.round(details.income).toLocaleString()}</div>
            </div>
            <div>
              <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-1)' }}>YTD Deductible Expenses</div>
              <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-danger)' }}>-${Math.round(details.expenses).toLocaleString()}</div>
            </div>
            <div style={{ padding: 'var(--space-4)', backgroundColor: 'var(--color-bg)', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-1)' }}>Taxable Profit</div>
              <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)' }}>${Math.round(details.profit).toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Schedule */}
      <div style={{ 
        backgroundColor: 'var(--color-surface)', 
        padding: 'var(--space-8)', 
        borderRadius: 'var(--radius-xl)', 
        border: '1px solid var(--color-border)'
      }}>
        <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--space-6)' }}>Estimated Payment Schedule</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-4)' }}>
          {details.nextPayments.map((p, i) => (
            <div key={i} style={{ padding: 'var(--space-6)', backgroundColor: 'var(--color-bg)', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
              <div style={{ color: 'var(--color-secondary)', fontWeight: 'var(--font-weight-bold)', marginBottom: 'var(--space-1)' }}>{p.label} Payment</div>
              <div style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-bold)', marginBottom: 'var(--space-2)' }}>{p.date}</div>
              <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
                Estimated: ${Math.round(prediction.value / 4).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info Box */}
      <div style={{ 
        backgroundColor: 'var(--color-surface-hover)', 
        padding: 'var(--space-6)', 
        borderRadius: 'var(--radius-lg)', 
        border: '1px solid var(--color-border)',
        display: 'flex',
        gap: 'var(--space-4)',
        alignItems: 'flex-start'
      }}>
        <Info size={24} color="var(--color-info)" style={{ flexShrink: 0 }} />
        <div>
          <h4 style={{ marginBottom: 'var(--space-2)' }}>How we calculate your taxes</h4>
          <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 'var(--line-height-relaxed)' }}>
            We use a simplified model for solopreneurs: 15.3% for Social Security and Medicare (Self-Employment Tax) on 92.35% of your profit, plus an estimated 15% for federal income tax. Actual taxes depend on your total household income, filing status, and location.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TaxPage;
