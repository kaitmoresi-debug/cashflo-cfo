import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import DashboardHome from './DashboardHome';
import TransactionsPage from './TransactionsPage';
import TaxPage from './TaxPage';
import RunwayPage from './RunwayPage';

const Dashboard = () => {
  return (
    <div className="dashboard-layout" style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)' }}>
      <Header />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <main style={{ 
          flex: 1, 
          marginLeft: 'var(--sidebar-width)', 
          padding: 'var(--space-8)',
          maxWidth: 'var(--max-content-width)',
          marginRight: 'auto'
        }}>
          <Routes>
            <Route index element={<DashboardHome />} />
            <Route path="transactions" element={<TransactionsPage />} />
            <Route path="tax" element={<TaxPage />} />
            <Route path="runway" element={<RunwayPage />} />
            <Route path="*" element={<div>Page under construction</div>} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
