import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Clock, TrendingUp, TrendingDown, RefreshCcw } from 'lucide-react';

const RunwayPage = () => {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [scenarios, setScenarios] = useState({
    revenueChange: 0, // e.g. -20 for 20% drop
    expenseChange: 0  // e.g. 10 for 10% increase
  });

  const fetchRunway = async () => {
    try {
      const res = await axios.get('/api/predictions');
      const runway = res.data.find(p => p.type === 'runway');
      if (runway) {
        setPrediction({ ...runway, details: JSON.parse(runway.details) });
      }
    } catch (err) {
      console.error('Error fetching runway data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRunway();
  }, []);

  if (loading) return <div>Loading runway forecasting...</div>;
  if (!prediction) return <div>No runway data available. Add some transactions first!</div>;

  const { details } = prediction;
  
  // Scenario calculation
  const calcScenario = () => {
    const revAdj = 1 + (scenarios.revenueChange / 100);
    const expAdj = 1 + (scenarios.expenseChange / 100);
    
    const newIncome = (details.avgMonthlyIncome || 0) * revAdj;
    const newExpenses = (details.avgMonthlyExpenses || 0) * expAdj;
    const newNetBurn = Math.max(0, newExpenses - newIncome);
    
    return newNetBurn > 0 ? (details.currentBalance / newNetBurn).toFixed(1) : '∞';
  };

  const scenarioRunway = calcScenario();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
      <div>
        <h2 style={{ fontSize: 'var(--font-size-2xl)', color: 'var(--color-primary)', marginBottom: 'var(--space-1)' }}>Runway Forecasting</h2>
        <p style={{ color: 'var(--color-text-secondary)' }}>Predict how long your business can operate at current levels.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-8)' }}>
        {/* Current Status */}
        <div style={{ 
          backgroundColor: 'var(--color-surface)', 
          padding: 'var(--space-8)', 
          borderRadius: 'var(--radius-xl)', 
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-md)',
          textAlign: 'center'
        }}>
          <Clock size={48} color={details.status === 'red' ? 'var(--color-danger)' : (details.status === 'amber' ? 'var(--color-warning)' : 'var(--color-success)')} style={{ margin: '0 auto var(--space-4)' }} />
          <h3 style={{ fontSize: 'var(--font-size-xl)', marginBottom: 'var(--space-2)' }}>Current Runway</h3>
          <div style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-primary)', marginBottom: 'var(--space-4)' }}>
            {prediction.value === 99 ? '∞' : prediction.value.toFixed(1)} Months
          </div>
          <p style={{ color: 'var(--color-text-secondary)' }}>
            Based on your average monthly net burn of <strong>${Math.round(details.netBurn).toLocaleString()}</strong>.
          </p>
        </div>

        {/* Financial Health */}
        <div style={{ 
          backgroundColor: 'var(--color-surface)', 
          padding: 'var(--space-8)', 
          borderRadius: 'var(--radius-xl)', 
          border: '1px solid var(--color-border)'
        }}>
          <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--space-6)' }}>Monthly Average</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--color-text-secondary)' }}>Income</span>
              <span style={{ fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-success)' }}>+${Math.round(details.avgMonthlyIncome).toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--color-text-secondary)' }}>Expenses</span>
              <span style={{ fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-danger)' }}>-${Math.round(details.avgMonthlyExpenses).toLocaleString()}</span>
            </div>
            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-3)', marginTop: 'var(--space-1)', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: 'var(--font-weight-bold)' }}>Net Burn</span>
              <span style={{ fontWeight: 'var(--font-weight-bold)' }}>${Math.round(details.netBurn).toLocaleString()}</span>
            </div>
          </div>
          <div style={{ marginTop: 'var(--space-8)', padding: 'var(--space-4)', backgroundColor: 'var(--color-bg)', borderRadius: 'var(--radius-lg)' }}>
            <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-1)' }}>Estimated Cash Balance</div>
            <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)' }}>${Math.round(details.currentBalance).toLocaleString()}</div>
          </div>
        </div>
      </div>

      {/* Scenario Planning */}
      <div style={{ 
        backgroundColor: 'var(--color-surface)', 
        padding: 'var(--space-8)', 
        borderRadius: 'var(--radius-xl)', 
        border: '1px solid var(--color-border)'
      }}>
        <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--space-6)' }}>What-If Scenarios</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-10)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <div>
              <label style={{ display: 'block', marginBottom: 'var(--space-3)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                Revenue Change: {scenarios.revenueChange}%
              </label>
              <input 
                type="range" 
                min="-50" max="50" step="5"
                value={scenarios.revenueChange}
                onChange={(e) => setScenarios({...scenarios, revenueChange: parseInt(e.target.value)})}
                style={{ width: '100%' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--color-text-muted)', marginTop: 'var(--space-1)' }}>
                <span>-50%</span>
                <span>0%</span>
                <span>+50%</span>
              </div>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 'var(--space-3)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                Expense Change: {scenarios.expenseChange}%
              </label>
              <input 
                type="range" 
                min="-50" max="50" step="5"
                value={scenarios.expenseChange}
                onChange={(e) => setScenarios({...scenarios, expenseChange: parseInt(e.target.value)})}
                style={{ width: '100%' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--color-text-muted)', marginTop: 'var(--space-1)' }}>
                <span>-50%</span>
                <span>0%</span>
                <span>+50%</span>
              </div>
            </div>
          </div>

          <div style={{ backgroundColor: 'var(--color-bg)', padding: 'var(--space-8)', borderRadius: 'var(--radius-xl)', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>Projected Scenario Runway</div>
            <div style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 'var(--font-weight-bold)', color: scenarioRunway === '∞' ? 'var(--color-success)' : (parseFloat(scenarioRunway) < 3 ? 'var(--color-danger)' : 'var(--color-primary)') }}>
              {scenarioRunway} {scenarioRunway === '∞' ? '' : 'Months'}
            </div>
            {parseFloat(scenarioRunway) > prediction.value && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-1)', color: 'var(--color-success)', fontSize: 'var(--font-size-sm)', marginTop: 'var(--space-2)' }}>
                <TrendingUp size={16} /> <span>+{ (parseFloat(scenarioRunway) - prediction.value).toFixed(1) } months better</span>
              </div>
            )}
            {parseFloat(scenarioRunway) < prediction.value && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-1)', color: 'var(--color-danger)', fontSize: 'var(--font-size-sm)', marginTop: 'var(--space-2)' }}>
                <TrendingDown size={16} /> <span>{ (prediction.value - parseFloat(scenarioRunway)).toFixed(1) } months shorter</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RunwayPage;
