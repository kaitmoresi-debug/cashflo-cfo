import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ReceiptText, Calculator, TrendingUp, Settings, Clock } from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Transactions', path: '/dashboard/transactions', icon: ReceiptText },
    { name: 'Tax', path: '/dashboard/tax', icon: Calculator },
    { name: 'Runway', path: '/dashboard/runway', icon: Clock },
    { name: 'Pricing', path: '/dashboard/pricing', icon: TrendingUp },
    { name: 'Settings', path: '/dashboard/settings', icon: Settings },
  ];

  return (
    <aside style={{ 
      width: 'var(--sidebar-width)', 
      backgroundColor: 'var(--color-surface)', 
      borderRight: '1px solid var(--color-border)',
      height: 'calc(100vh - var(--header-height))',
      padding: 'var(--space-4) 0',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      left: 0,
      top: 'var(--header-height)'
    }}>
      <nav style={{ flex: 1 }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink 
                to={item.path}
                end={item.path === '/dashboard'}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-3)',
                  padding: 'var(--space-3) var(--space-6)',
                  color: isActive ? 'var(--color-secondary)' : 'var(--color-text-secondary)',
                  textDecoration: 'none',
                  fontSize: 'var(--font-size-base)',
                  fontWeight: isActive ? 'var(--font-weight-semibold)' : 'var(--font-weight-medium)',
                  backgroundColor: isActive ? 'var(--color-surface-hover)' : 'transparent',
                  borderLeft: isActive ? '3px solid var(--color-secondary)' : '3px solid transparent',
                  transition: 'var(--transition-fast)'
                })}
              >
                <item.icon size={20} />
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
