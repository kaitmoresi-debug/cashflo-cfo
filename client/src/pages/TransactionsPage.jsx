import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Search, Filter, Download } from 'lucide-react';

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    amount: '',
    category: 'Revenue',
    date: new Date().toISOString().split('T')[0],
    description: ''
  });

  const fetchTransactions = async () => {
    try {
      const res = await axios.get('/api/transactions');
      setTransactions(res.data);
    } catch (err) {
      console.error('Error fetching transactions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/transactions', {
        ...formData,
        amount: parseFloat(formData.amount)
      });
      // Recalculate predictions after new transaction
      await axios.post('/api/predictions/recalculate');
      
      setIsModalOpen(false);
      setFormData({
        amount: '',
        category: 'Revenue',
        date: new Date().toISOString().split('T')[0],
        description: ''
      });
      fetchTransactions();
    } catch (err) {
      console.error('Error adding transaction:', err);
    }
  };

  if (loading) return <div>Loading transactions...</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: 'var(--font-size-2xl)', color: 'var(--color-primary)' }}>Transactions</h2>
        <button 
          onClick={() => setIsModalOpen(true)}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 'var(--space-2)', 
            backgroundColor: 'var(--color-secondary)', 
            color: 'white', 
            padding: 'var(--space-2) var(--space-4)', 
            borderRadius: 'var(--radius-md)', 
            border: 'none',
            fontWeight: 'var(--font-weight-bold)',
            cursor: 'pointer'
          }}
        >
          <Plus size={18} />
          <span>Add Transaction</span>
        </button>
      </div>

      {/* Filters Bar */}
      <div style={{ 
        display: 'flex', 
        gap: 'var(--space-4)', 
        padding: 'var(--space-4)', 
        backgroundColor: 'var(--color-surface)', 
        borderRadius: 'var(--radius-lg)', 
        border: '1px solid var(--color-border)',
        alignItems: 'center'
      }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={16} style={{ position: 'absolute', left: 'var(--space-3)', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
          <input 
            type="text" 
            placeholder="Search transactions..." 
            style={{ 
              width: '100%', 
              padding: 'var(--space-2) var(--space-2) var(--space-2) var(--space-10)', 
              borderRadius: 'var(--radius-md)', 
              border: '1px solid var(--color-border)',
              fontSize: 'var(--font-size-sm)'
            }}
          />
        </div>
        <button style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', padding: 'var(--space-2) var(--space-4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'transparent', fontSize: 'var(--font-size-sm)', cursor: 'pointer' }}>
          <Filter size={16} />
          <span>Filter</span>
        </button>
        <button style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', padding: 'var(--space-2) var(--space-4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'transparent', fontSize: 'var(--font-size-sm)', cursor: 'pointer' }}>
          <Download size={16} />
          <span>Export</span>
        </button>
      </div>

      {/* Transactions Table */}
      <div style={{ 
        backgroundColor: 'var(--color-surface)', 
        borderRadius: 'var(--radius-lg)', 
        border: '1px solid var(--color-border)',
        overflow: 'hidden'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: 'var(--color-surface-hover)' }}>
            <tr style={{ textAlign: 'left' }}>
              <th style={{ padding: 'var(--space-4)', color: 'var(--color-text-muted)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-bold)', textTransform: 'uppercase' }}>Date</th>
              <th style={{ padding: 'var(--space-4)', color: 'var(--color-text-muted)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-bold)', textTransform: 'uppercase' }}>Description</th>
              <th style={{ padding: 'var(--space-4)', color: 'var(--color-text-muted)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-bold)', textTransform: 'uppercase' }}>Category</th>
              <th style={{ padding: 'var(--space-4)', textAlign: 'right', color: 'var(--color-text-muted)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-bold)', textTransform: 'uppercase' }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t.id} style={{ borderBottom: '1px solid var(--color-border-light)' }}>
                <td style={{ padding: 'var(--space-4)', fontSize: 'var(--font-size-sm)' }}>{t.date}</td>
                <td style={{ padding: 'var(--space-4)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>{t.description}</td>
                <td style={{ padding: 'var(--space-4)' }}>
                  <span style={{ 
                    fontSize: 'var(--font-size-xs)', 
                    padding: 'var(--space-1) var(--space-2)', 
                    backgroundColor: 'var(--color-surface-hover)', 
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--color-text-secondary)'
                  }}>{t.category}</span>
                </td>
                <td style={{ 
                  padding: 'var(--space-4)', 
                  textAlign: 'right', 
                  fontSize: 'var(--font-size-sm)', 
                  fontWeight: 'var(--font-weight-bold)',
                  color: t.amount >= 0 ? 'var(--color-success)' : 'var(--color-danger)'
                }}>
                  {t.amount >= 0 ? '+' : ''}{t.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                </td>
              </tr>
            ))}
            {transactions.length === 0 && (
              <tr>
                <td colSpan="4" style={{ padding: 'var(--space-12)', textAlign: 'center', color: 'var(--color-text-muted)' }}>No transactions found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Transaction Modal */}
      {isModalOpen && (
        <div style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          backgroundColor: 'rgba(0,0,0,0.5)', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          zIndex: 100
        }}>
          <div style={{ 
            backgroundColor: 'var(--color-surface)', 
            padding: 'var(--space-8)', 
            borderRadius: 'var(--radius-lg)', 
            width: '100%', 
            maxWidth: '500px' 
          }}>
            <h3 style={{ marginBottom: 'var(--space-6)', fontSize: 'var(--font-size-xl)' }}>Add New Transaction</h3>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 'var(--space-4)' }}>
                <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontSize: 'var(--font-size-sm)' }}>Amount (use negative for expenses)</label>
                <input 
                  type="number" 
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  style={{ width: '100%', padding: 'var(--space-2)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}
                  required
                />
              </div>
              <div style={{ marginBottom: 'var(--space-4)' }}>
                <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontSize: 'var(--font-size-sm)' }}>Category</label>
                <select 
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  style={{ width: '100%', padding: 'var(--space-2)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}
                >
                  <option>Revenue</option>
                  <option>Software</option>
                  <option>Marketing</option>
                  <option>Operations</option>
                  <option>Other</option>
                </select>
              </div>
              <div style={{ marginBottom: 'var(--space-4)' }}>
                <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontSize: 'var(--font-size-sm)' }}>Date</label>
                <input 
                  type="date" 
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  style={{ width: '100%', padding: 'var(--space-2)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}
                  required
                />
              </div>
              <div style={{ marginBottom: 'var(--space-6)' }}>
                <label style={{ display: 'block', marginBottom: 'var(--space-2)', fontSize: 'var(--font-size-sm)' }}>Description</label>
                <input 
                  type="text" 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  style={{ width: '100%', padding: 'var(--space-2)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}
                />
              </div>
              <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'flex-end' }}>
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  style={{ padding: 'var(--space-2) var(--space-4)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'transparent', cursor: 'pointer' }}
                >Cancel</button>
                <button 
                  type="submit"
                  style={{ padding: 'var(--space-2) var(--space-4)', borderRadius: 'var(--radius-md)', border: 'none', backgroundColor: 'var(--color-primary)', color: 'white', fontWeight: 'var(--font-weight-bold)', cursor: 'pointer' }}
                >Save Transaction</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionsPage;
