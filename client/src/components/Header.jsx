import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, User } from 'lucide-react';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header style={{ 
      height: 'var(--header-height)', 
      backgroundColor: 'var(--color-surface)', 
      borderBottom: '1px solid var(--color-border)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 var(--space-6)',
      position: 'sticky',
      top: 0,
      zIndex: 10
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
        <img src="/design/cashflow-cfo-logo.svg" alt="Logo" style={{ height: '32px' }} />
        <span style={{ fontWeight: 'var(--font-weight-bold)', color: 'var(--color-primary)' }}>Cashflow CFO</span>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--color-text-secondary)' }}>
          <User size={18} />
          <span style={{ fontSize: 'var(--font-size-sm)' }}>{user?.email}</span>
        </div>
        <button 
          onClick={logout}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 'var(--space-1)', 
            backgroundColor: 'transparent', 
            border: 'none', 
            color: 'var(--color-text-secondary)',
            cursor: 'pointer',
            fontSize: 'var(--font-size-sm)',
            padding: 'var(--space-2)',
            borderRadius: 'var(--radius-md)',
            transition: 'var(--transition-fast)'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
