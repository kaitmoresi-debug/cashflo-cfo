import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { ArrowUpCircle, ArrowDownCircle, Wallet, Clock, ShieldAlert, Check, X, TrendingUp, CreditCard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const MetricCard = ({ title, value, icon: Icon, color, subtext }) => (
  <div style={{ 
    backgroundColor: 'var(--color-surface)', 
    padding: 'var(--space-6)', 
    borderRadius: 'var(--radius-lg)', 
    boxShadow: 'var(--shadow-sm)',
    border: '1px solid var(--color-border)',
    flex: 1,
    minWidth: '250px'
  }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-4)' }}>
      <span style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>{title}</span>
      <div style={{ padding: 'var(--space-2)', backgroundColor: `${color}10`, borderRadius: 'var(--radius-md)' }}>
        <Icon size={20} color={color} />
      </div>
    </div>
    <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'var(--font-weight-bold)', color: 'var(--color-primary)', marginBottom: 'var(--space-1)' }}>
      {value}
    </div>
    <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>{subtext}</div>
  </div>
);

const DashboardHome = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [predictions, setPredictions] = useState({});
  const [suggestions, setSuggestions] = useState([]);
  const [subscription, setSubscription] = useState({ status: 'none', plan: 'none' });
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      // Recalculate first to ensure fresh data
      await axios.post('/api/predictions/recalculate');
      
      const [transRes, predRes, suggRes, subRes] = await Promise.all([
        axios.get('/api/transactions'),
        axios.get('/api/predictions'),
        axios.get('/api/predictions/suggestions'),
        axios.get('/api/subscription')
      ]);
      
      setTransactions(transRes.data);
      
      const predMap = {};
      predRes.data.forEach(p => {
        predMap[p.type] = { ...p, details: JSON.parse(p.details) };
      });
      setPredictions(predMap);
      setSuggestions(suggRes.data);
      setSubscription(subRes.data);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSuggestion = async (id, status) => {
    try {
      await axios.post(`/api/predictions/suggestions/${id}/status`, { status });
      setSuggestions(suggestions.filter(s => s.id !== id));
    } catch (err) {
      console.error('Error updating suggestion:', err);
    }
  };

  const handleUpgrade = async (tier) => {
    try {
      const res = await axios.post('/api/create-checkout-session', { tier });
      if (res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (error) {
      console.error('Upgrade error:', error);
      alert('Failed to start checkout. Please try again.');
    }
  };

  if (loading) return <div>Loading dashboard...</div>;

  const taxPred = predictions.tax || { value: 0, details: {} };
  const runwayPred = predictions.runway || { value: 0, details: {} };

  const chartData = transactions.length > 0 
    ? transactions.slice(0, 10).reverse().map(t => ({
        name: t.date.slice(5),
        amount: t.amount
      }))
    : [];

  const isPro = subscription.plan === 'pro' && (subscription.status === 'active' || subscription.status === 'trialing');
  const isStarter = subscription.plan === 'starter' && (subscription.status === 'active' || subscription.status === 'trialing');
  const isSubscribed = isPro || isStarter;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h2 style={{ fontSize: 'var(--font-size-2xl)', color: 'var(--color-primary)', marginBottom: 'var(--space-1)' }}>Dashboard Overview</h2>
          <p style={{ color: 'var(--color-text-secondary)' }}>AI-powered financial insights for your business.</p>
        </div>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 'var(--space-2)', 
          padding: 'var(--space-2) var(--space-4)', 
          backgroundColor: isSubscribed ? 'var(--color-success)15' : 'var(--color-warning)15',
          borderRadius: 'var(--radius-full)',
          border: `1px solid ${isSubscribed ? 'var(--color-success)30' : 'var(--color-warning)30'}`,
          fontSize: 'var(--font-size-xs)',
          fontWeight: 'var(--font-weight-bold)',
          color: isSubscribed ? 'var(--color-success)' : 'var(--color-warning)'
        }}>
          <CreditCard size={14} />
          {isSubscribed ? (
            <span>{subscription.plan.toUpperCase()} PLAN - {subscription.status.toUpperCase()}</span>
          ) : (
            <span>NO ACTIVE SUBSCRIPTION</span>
          )}
        </div>
      </div>

      {/* Subscription Banner for non-subscribed users */}
      {!isSubscribed && (
        <div style={{ 
          backgroundColor: 'var(--color-warning)10', 
          border: '1px solid var(--color-warning)30', 
          padding: 'var(--space-4) var(--space-6)', 
          borderRadius: 'var(--radius-lg)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ fontWeight: 'var(--font-weight-bold)', color: 'var(--color-warning)' }}>Finish setting up your account</div>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>Subscribe to a plan to unlock all features and start your 14-day free trial.</p>
          </div>
          <button 
            onClick={() => handleUpgrade('starter')}
            style={{ 
              backgroundColor: 'var(--color-primary)', 
              color: 'white', 
              border: 'none', 
              padding: 'var(--space-2) var(--space-4)', 
              borderRadius: 'var(--radius-md)', 
              fontWeight: 'var(--font-weight-bold)', 
              cursor: 'pointer' 
            }}
          >
            Choose a Plan
          </button>
        </div>
      )}

      {/* Suggestions Section */}
      {suggestions.length > 0 && (
        <div style={{ 
          backgroundColor: 'var(--color-primary)', 
          color: 'white', 
          padding: 'var(--space-6)', 
          borderRadius: 'var(--radius-lg)', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          boxShadow: 'var(--shadow-lg)'
        }}>
          <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center' }}>
            <div style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: 'var(--space-3)', borderRadius: 'var(--radius-full)' }}>
              <TrendingUp size={24} />
            </div>
            <div>
              <div style={{ fontWeight: 'var(--font-weight-bold)', fontSize: 'var(--font-size-lg)' }}>Smart Suggestion</div>
              <p style={{ opacity: 0.9 }}>{suggestions[0].suggestion}</p>
              <div style={{ fontSize: 'var(--font-size-sm)', marginTop: 'var(--space-1)', color: 'var(--color-accent)' }}>{suggestions[0].impact}</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <button 
              onClick={() => handleSuggestion(suggestions[0].id, 'accepted')}
              style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-primary)', border: 'none', padding: 'var(--space-2) var(--space-4)', borderRadius: 'var(--radius-md)', fontWeight: 'var(--font-weight-bold)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 'var(--space-1)' }}
            >
              <Check size={18} /> Accept
            </button>
            <button 
              onClick={() => handleSuggestion(suggestions[0].id, 'dismissed')}
              style={{ backgroundColor: 'transparent', color: 'white', border: '1px solid rgba(255,255,255,0.3)', padding: 'var(--space-2) var(--space-4)', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Metrics Grid */}
      <div style={{ display: 'flex', gap: 'var(--space-6)', flexWrap: 'wrap' }}>
        <MetricCard 
          title="Current Runway" 
          value={`${runwayPred.value === 99 ? '∞' : runwayPred.value.toFixed(1)} Months`} 
          icon={Clock} 
          color={runwayPred.details?.status === 'red' ? 'var(--color-danger)' : (runwayPred.details?.status === 'amber' ? 'var(--color-warning)' : 'var(--color-success)')} 
          subtext={runwayPred.value === 99 ? "Profitable! No burn." : `Based on $${Math.round(runwayPred.details?.netBurn || 0)}/mo net burn`}
        />
        <MetricCard 
          title="Tax Reserve Needed" 
          value={`$${Math.round(taxPred.value).toLocaleString()}`} 
          icon={ShieldAlert} 
          color="var(--color-warning)" 
          subtext="Includes SE tax + income tax"
        />
        <MetricCard 
          title="Net Cash Flow (Month)" 
          value={`$${Math.round(transactions.reduce((acc, t) => acc + t.amount, 0)).toLocaleString()}`} 
          icon={transactions.reduce((acc, t) => acc + t.amount, 0) >= 0 ? ArrowUpCircle : ArrowDownCircle} 
          color={transactions.reduce((acc, t) => acc + t.amount, 0) >= 0 ? 'var(--color-success)' : 'var(--color-danger)'} 
          subtext="Current month's total"
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 'var(--space-8)' }}>
        {/* Chart Section */}
        <div style={{ 
          backgroundColor: 'var(--color-surface)', 
          padding: 'var(--space-6)', 
          borderRadius: 'var(--radius-lg)', 
          boxShadow: 'var(--shadow-sm)',
          border: '1px solid var(--color-border)'
        }}>
          <h3 style={{ marginBottom: 'var(--space-6)', fontSize: 'var(--font-size-lg)' }}>Cash Flow Trend</h3>
          <div style={{ height: '300px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}
                  cursor={{ fill: 'var(--color-surface-hover)' }}
                />
                <Bar dataKey="amount" fill="var(--color-secondary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Next Tax Payments */}
        <div style={{ 
          backgroundColor: 'var(--color-surface)', 
          padding: 'var(--space-6)', 
          borderRadius: 'var(--radius-lg)', 
          boxShadow: 'var(--shadow-sm)',
          border: '1px solid var(--color-border)'
        }}>
          <h3 style={{ marginBottom: 'var(--space-6)', fontSize: 'var(--font-size-lg)' }}>Upcoming Tax Deadlines</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {taxPred.details?.nextPayments?.map((p, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-3)', backgroundColor: i === 0 ? 'var(--color-surface-hover)' : 'transparent', borderRadius: 'var(--radius-md)', border: i === 0 ? '1px solid var(--color-border)' : '1px solid transparent' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-bg)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-bold)' }}>
                    <div style={{ color: 'var(--color-danger)' }}>{p.date.split('-')[1]}</div>
                    <div>{p.date.split('-')[2]}</div>
                  </div>
                  <div>
                    <div style={{ fontWeight: 'var(--font-weight-semibold)' }}>{p.label} Estimated Tax</div>
                    <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>Due {p.date}</div>
                  </div>
                </div>
                {i === 0 && <span style={{ fontSize: 'var(--font-size-xs)', padding: 'var(--space-1) var(--space-2)', backgroundColor: 'var(--color-warning)20', color: 'var(--color-warning)', borderRadius: 'var(--radius-full)', fontWeight: 'var(--font-weight-bold)' }}>Upcoming</span>}
              </div>
            ))}
          </div>
          <Link to="/dashboard/tax" style={{ display: 'block', textAlign: 'center', marginTop: 'var(--space-6)', color: 'var(--color-secondary)', textDecoration: 'none', fontWeight: 'var(--font-weight-bold)', fontSize: 'var(--font-size-sm)' }}>View Tax Breakdown</Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
