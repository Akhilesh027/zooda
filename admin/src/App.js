import React, { useState, useEffect } from 'react';
import './App.css';

const API_BASE = 'https://api.zooda.in/api';

function App() {
  const [adminData, setAdminData] = useState({
    pendingBusinesses: [],
    approvedBusinesses: [],
    platformStats: null,
    businessAnalytics: [],
    categories: [],
    allBusinesses: []
  });
  const [adminLoading, setAdminLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(null);
  const [suspendReason, setSuspendReason] = useState('');
  const [showSuspendModal, setShowSuspendModal] = useState(null);

  // Password protection states
  const [passwordInput, setPasswordInput] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const ADMIN_PASSWORD = '224466'; // change this to your password

  useEffect(() => {
    if (authenticated) {
      loadAdminData();
    }
  }, [authenticated]);

  // -------------------- Password Check --------------------
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setAuthenticated(true);
    } else {
      alert('Incorrect password! Access denied.');
      setPasswordInput('');
    }
  };

  // -------------------- API Request Helper --------------------
  const makeAPIRequest = async (endpoint, options = {}) => {
    const token = localStorage.getItem('adminToken');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers
      },
      ...options
    };

    try {
      const response = await fetch(`${API_BASE}${endpoint}`, config);
      
      if (response.status === 401) {
        return { success: false, error: 'Session expired' };
      }

      const data = await response.json();
      
      if (!response.ok) {
        return { success: false, error: data.message || 'Request failed' };
      }
      
      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'Network error' };
    }
  };

  // -------------------- Load Admin Data --------------------
  const loadAdminData = async () => {
    setAdminLoading(true);
    try {
      const [pendingResult, approvedResult, statsResult, analyticsResult, categoriesResult, allBusinessesResult] = await Promise.all([
        makeAPIRequest('/admin/businesses?status=pending'),
        makeAPIRequest('/admin/businesses?status=approved'),
        makeAPIRequest('/admin/stats'),
        makeAPIRequest('/admin/analytics/businesses'),
        makeAPIRequest('/admin/categories'),
        makeAPIRequest('/admin/businesses')
      ]);

      setAdminData({
        pendingBusinesses: pendingResult.success ? pendingResult.data : [],
        approvedBusinesses: approvedResult.success ? approvedResult.data : [],
        platformStats: statsResult.success ? statsResult.data : null,
        businessAnalytics: analyticsResult.success ? analyticsResult.data : [],
        categories: categoriesResult.success ? categoriesResult.data : [],
        allBusinesses: allBusinessesResult.success ? allBusinessesResult.data : []
      });
    } catch (error) {
      console.error('Error loading admin data:', error);
      setAdminData({
        pendingBusinesses: [],
        approvedBusinesses: [],
        platformStats: null,
        businessAnalytics: [],
        categories: [],
        allBusinesses: []
      });
    } finally {
      setAdminLoading(false);
    }
  };

  // -------------------- Business Management Functions --------------------
  const approveBusiness = async (businessId) => {
    const result = await makeAPIRequest(`/admin/businesses/${businessId}/approve`, { method: 'PUT' });
    if (result.success) { await loadAdminData(); alert('Business approved successfully!'); }
    else alert('Error approving business: ' + result.error);
  };

  const rejectBusiness = async (businessId, reason) => {
    const result = await makeAPIRequest(`/admin/businesses/${businessId}/reject`, { method: 'PUT', body: JSON.stringify({ reason }) });
    if (result.success) { await loadAdminData(); alert('Business rejected successfully!'); }
    else alert('Error rejecting business: ' + result.error);
  };

  const suspendBusiness = async (businessId, reason) => {
    const result = await makeAPIRequest(`/admin/businesses/${businessId}/suspend`, { method: 'PUT', body: JSON.stringify({ reason }) });
    if (result.success) { await loadAdminData(); alert('Business suspended successfully!'); }
    else alert('Error suspending business: ' + result.error);
  };

  const activateBusiness = async (businessId) => {
    const result = await makeAPIRequest(`/admin/businesses/${businessId}/activate`, { method: 'PUT' });
    if (result.success) { await loadAdminData(); alert('Business activated successfully!'); }
    else alert('Error activating business: ' + result.error);
  };

  const deleteBusiness = async (businessId) => {
    const result = await makeAPIRequest(`/admin/businesses/${businessId}`, { method: 'DELETE' });
    if (result.success) { await loadAdminData(); alert('Business deleted successfully!'); }
    else alert('Error deleting business: ' + result.error);
  };

  const deletePost = async (businessId, postId) => {
    const result = await makeAPIRequest(`/admin/businesses/${businessId}/posts/${postId}`, { method: 'DELETE' });
    if (result.success) { alert('Post deleted successfully!'); return { success: true }; }
    else return { success: false, error: result.error };
  };

  const deleteProduct = async (businessId, productId) => {
    const result = await makeAPIRequest(`/admin/businesses/${businessId}/products/${productId}`, { method: 'DELETE' });
    if (result.success) { alert('Product deleted successfully!'); return { success: true }; }
    else return { success: false, error: result.error };
  };

  const deletePromotion = async (businessId, promotionId) => {
    const result = await makeAPIRequest(`/admin/businesses/${businessId}/promotions/${promotionId}`, { method: 'DELETE' });
    if (result.success) { alert('Promotion deleted successfully!'); return { success: true }; }
    else return { success: false, error: result.error };
  };

  const updateBusiness = async (businessId, updateData) => {
    const result = await makeAPIRequest(`/admin/businesses/${businessId}`, { method: 'PUT', body: JSON.stringify(updateData) });
    if (result.success) { await loadAdminData(); alert('Business updated successfully!'); }
    else alert('Error updating business: ' + result.error);
  };

  const fetchBusinessPosts = async (businessId) => {
    const result = await makeAPIRequest(`/post/${businessId}`);
    return result.success ? result.data : [];
  };

  const fetchBusinessProducts = async (businessId) => {
    const result = await makeAPIRequest(`/product/${businessId}`);
    return result.success ? result.data : [];
  };

  const fetchBusinessPromotions = async (businessId) => {
    const result = await makeAPIRequest(`/promotions/${businessId}`);
    return result.success ? result.data : [];
  };

  // -------------------- Category Management Functions --------------------
  const createCategory = async (categoryName) => {
    const result = await makeAPIRequest('/admin/categories', { method: 'POST', body: JSON.stringify({ name: categoryName }) });
    if (result.success) { await loadAdminData(); return { success: true, message: 'Category created successfully!' }; }
    else return { success: false, error: result.error };
  };

  const deleteCategory = async (categoryId) => {
    const result = await makeAPIRequest(`/admin/categories/${categoryId}`, { method: 'DELETE' });
    if (result.success) { await loadAdminData(); return { success: true, message: 'Category deleted successfully!' }; }
    else return { success: false, error: result.error };
  };

  const createSubcategory = async (categoryId, subcategoryName) => {
    const result = await makeAPIRequest(`/admin/categories/${categoryId}/subcategories`, { method: 'POST', body: JSON.stringify({ name: subcategoryName }) });
    if (result.success) { await loadAdminData(); return { success: true, message: 'Subcategory created successfully!' }; }
    else return { success: false, error: result.error };
  };

  const deleteSubcategory = async (categoryId, subcategoryId) => {
    const result = await makeAPIRequest(`/admin/categories/${categoryId}/subcategories/${subcategoryId}`, { method: 'DELETE' });
    if (result.success) { await loadAdminData(); return { success: true, message: 'Subcategory deleted successfully!' }; }
    else return { success: false, error: result.error };
  };

  // -------------------- Admin Tabs --------------------
  const adminTabs = [
    { id: 'overview', name: 'Overview', icon: 'fa-chart-bar' },
    { id: 'approvals', name: 'Business Approvals', icon: 'fa-building' },
    { id: 'analytics', name: 'Business Analytics', icon: 'fa-chart-line' },
    { id: 'categories', name: 'Categories', icon: 'fa-tags' },
    { id: 'businesses', name: 'All Businesses', icon: 'fa-store' }
  ];

  const renderTabContent = () => {
    if (adminLoading) {
      return (
        <div className="admin-loading">
          <div className="loading-spinner"></div>
          <p>Loading admin data...</p>
        </div>
      );
    }

    switch (activeTab) {
      case 'overview':
        return <AdminOverviewTab stats={adminData.platformStats} />;
      case 'approvals':
        return (
          <AdminApprovalsTab
            pendingBusinesses={adminData.pendingBusinesses}
            approvedBusinesses={adminData.approvedBusinesses}
            onApproveBusiness={approveBusiness}
            onRejectBusiness={rejectBusiness}
            onSuspendBusiness={suspendBusiness}
            onActivateBusiness={activateBusiness}
            showRejectModal={showRejectModal}
            setShowRejectModal={setShowRejectModal}
            rejectReason={rejectReason}
            setRejectReason={setRejectReason}
            showSuspendModal={showSuspendModal}
            setShowSuspendModal={setShowSuspendModal}
            suspendReason={suspendReason}
            setSuspendReason={setSuspendReason}
          />
        );
      case 'analytics':
        return <AdminAnalyticsTab businessAnalytics={adminData.businessAnalytics} />;
      case 'categories':
        return (
          <CategoryManagementTab
            categories={adminData.categories}
            onCreateCategory={createCategory}
            onDeleteCategory={deleteCategory}
            onCreateSubcategory={createSubcategory}
            onDeleteSubcategory={deleteSubcategory}
          />
        );
      case 'businesses':
        return (
          <BusinessManagementTab
            businesses={adminData.allBusinesses}
            onDeleteBusiness={deleteBusiness}
            onDeletePost={deletePost}
            onDeleteProduct={deleteProduct}
            onDeletePromotion={deletePromotion}
            onUpdateBusiness={updateBusiness}
            fetchBusinessPosts={fetchBusinessPosts}
            fetchBusinessProducts={fetchBusinessProducts}
            fetchBusinessPromotions={fetchBusinessPromotions}
          />
        );
      default:
        return <AdminOverviewTab stats={adminData.platformStats} />;
    }
  };

  // -------------------- Render Password Form if Not Authenticated --------------------
  if (!authenticated) {
    return (
      <div className="password-prompt-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <form onSubmit={handlePasswordSubmit} className="password-form" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '2rem', border: '1px solid #ccc', borderRadius: '8px' }}>
          <h2>Enter Admin Password</h2>
          <input
            type="password"
            placeholder="Password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            required
            style={{ padding: '0.5rem', fontSize: '1rem' }}
          />
          <button type="submit" style={{ padding: '0.5rem', fontSize: '1rem', cursor: 'pointer' }}>Submit</button>
        </form>
      </div>
    );
  }

  // -------------------- Render Full Admin Panel --------------------
  return (
    <div className="app-layout">
      {sidebarOpen && <div className="overlay active" onClick={() => setSidebarOpen(false)} />}
      
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <i className="fas fa-shield-alt sidebar-brand-icon"></i>
            <h1 className="sidebar-brand-text">Admin Panel</h1>
          </div>
          <button className="sidebar-close" onClick={() => setSidebarOpen(false)}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="sidebar-content">
          <div className="user-profile">
            <div className="user-avatar admin-avatar">A</div>
            <h2 className="user-name">Administrator</h2>
            <p className="user-role">System Admin</p>
            <div className="user-location">
              <i className="fas fa-cog"></i>
              <span>Platform Management</span>
            </div>
          </div>
          
          <div className="sidebar-menu">
            <h3 className="menu-title">Admin Controls</h3>
            <ul className="menu-list">
              {adminTabs.map(tab => (
                <li key={tab.id} className="menu-item">
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    className={`menu-link ${activeTab === tab.id ? 'active' : ''}`}
                  >
                    <i className={`fas ${tab.icon} menu-icon`}></i>
                    <span className="menu-text">{tab.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="sidebar-upgrade">
            <div className="upgrade-card admin-card">
              <h3 className="upgrade-title">System Status</h3>
              <p className="upgrade-description">All systems operational</p>
              <div className="status-indicator online"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="main-content">
        <header className="header">
          <div className="header-content">
            <div className="header-left">
              <button className="menu-toggle" onClick={() => setSidebarOpen(true)}>
                <i className="fas fa-bars"></i>
              </button>
              <div className="header-title">
                <h1 className="title">Admin Dashboard</h1>
                <p className="description">Manage business approvals and analytics</p>
              </div>
            </div>
            
            <div className="header-right">
              <button className="refresh-button" onClick={loadAdminData}>
                <i className="fas fa-sync-alt"></i>
                Refresh
              </button>
              <div className="user-dropdown">
                <button className="user-button">
                  <div className="user-info">
                    <p className="user-name">Admin User</p>
                    <p className="user-role">Administrator</p>
                  </div>
                  <div className="user-avatar admin-avatar">A</div>
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="main-content-area admin-content">
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
}
// Admin Overview Tab Component
function AdminOverviewTab({ stats }) {
  if (!stats) {
    return (
      <div className="admin-overview">
        <div className="stats-grid">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="stat-skeleton">
              <div className="skeleton-loader"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="admin-overview">
      <div className="stats-grid">
        <div className="stat-card admin-stat">
          <div className="stat-header">
            <h3 className="stat-title">Total Businesses</h3>
            <i className="fas fa-building stat-icon business-icon"></i>
          </div>
          <p className="stat-value">{stats.totalBusinesses}</p>
          <p className="stat-trend positive">Active businesses</p>
        </div>
        
        <div className="stat-card admin-stat">
          <div className="stat-header">
            <h3 className="stat-title">Pending Approvals</h3>
            <i className="fas fa-clock stat-icon pending-icon"></i>
          </div>
          <p className="stat-value">{stats.pendingApprovals}</p>
          <p className="stat-trend warning">Needs attention</p>
        </div>
        
        <div className="stat-card admin-stat">
          <div className="stat-header">
            <h3 className="stat-title">Total Posts</h3>
            <i className="fas fa-newspaper stat-icon post-icon"></i>
          </div>
          <p className="stat-value">{stats.totalPosts}</p>
          <p className="stat-trend positive">Platform content</p>
        </div>

        <div className="stat-card admin-stat">
          <div className="stat-header">
            <h3 className="stat-title">Total Products</h3>
            <i className="fas fa-shopping-bag stat-icon product-icon"></i>
          </div>
          <p className="stat-value">{stats.totalProducts}</p>
          <p className="stat-trend positive">Business products</p>
        </div>

        <div className="stat-card admin-stat">
          <div className="stat-header">
            <h3 className="stat-title">Active Promotions</h3>
            <i className="fas fa-tag stat-icon promotion-icon"></i>
          </div>
          <p className="stat-value">{stats.totalPromotions}</p>
          <p className="stat-trend positive">Running promotions</p>
        </div>

        <div className="stat-card admin-stat">
          <div className="stat-header">
            <h3 className="stat-title">Platform Revenue</h3>
            <i className="fas fa-dollar-sign stat-icon revenue-icon"></i>
          </div>
          <p className="stat-value">${stats.totalRevenue?.toLocaleString()}</p>
          <p className="stat-trend positive">Total revenue</p>
        </div>
      </div>

      <div className="admin-quick-actions">
        <h2 className="section-title">Quick Actions</h2>
        <div className="actions-grid">
          <button className="action-button primary">
            <i className="fas fa-building"></i>
            Review Pending Businesses
          </button>
          <button className="action-button secondary">
            <i className="fas fa-chart-line"></i>
            View Business Analytics
          </button>
          <button className="action-button info">
            <i className="fas fa-download"></i>
            Export Reports
          </button>
        </div>
      </div>
    </div>
  );
}

// Admin Approvals Tab Component
function AdminApprovalsTab({ 
  pendingBusinesses, 
  approvedBusinesses,
  onApproveBusiness, 
  onRejectBusiness,
  onSuspendBusiness,
  onActivateBusiness,
  showRejectModal,
  setShowRejectModal,
  rejectReason,
  setRejectReason,
  showSuspendModal,
  setShowSuspendModal,
  suspendReason,
  setSuspendReason
}) {
  const [view, setView] = useState('pending');

  const handleReject = (businessId) => {
    if (!rejectReason.trim()) {
      alert('Please provide a rejection reason');
      return;
    }
    onRejectBusiness(businessId, rejectReason);
    setShowRejectModal(null);
    setRejectReason('');
  };

  const handleSuspend = (businessId) => {
    if (!suspendReason.trim()) {
      alert('Please provide a suspension reason');
      return;
    }
    onSuspendBusiness(businessId, suspendReason);
    setShowSuspendModal(null);
    setSuspendReason('');
  };

  return (
    <div className="admin-approvals">
      <div className="admin-section-header">
        <h2>Business Management</h2>
        <div className="view-toggle">
          <button 
            className={`toggle-button ${view === 'pending' ? 'active' : ''}`}
            onClick={() => setView('pending')}
          >
            Pending Approval ({pendingBusinesses.length})
          </button>
          <button 
            className={`toggle-button ${view === 'approved' ? 'active' : ''}`}
            onClick={() => setView('approved')}
          >
            Approved Businesses ({approvedBusinesses.length})
          </button>
        </div>
      </div>

      {view === 'pending' ? (
        <div className="businesses-list">
          {pendingBusinesses.length === 0 ? (
            <div className="empty-state">
              <i className="fas fa-check-circle empty-icon"></i>
              <p className="empty-text">No pending business approvals</p>
              <p className="empty-subtext">All businesses have been reviewed and processed.</p>
            </div>
          ) : (
            pendingBusinesses.map(business => (
              <div key={business._id} className="business-card pending-card">
                <div className="business-header">
                  <div className="business-info">
                    <h3 className="business-name">{business.businessName}</h3>
                    <p className="business-category">
                      <i className="fas fa-tag"></i>
                      {business.businessCategory}
                    </p>
                    <p className="business-contact">
                      <i className="fas fa-envelope"></i>
                      {business.businessEmail}
                    </p>
                    <p className="business-contact">
                      <i className="fas fa-phone"></i>
                      {business.businessPhone}
                    </p>
                  </div>
                  <div className="business-actions">
                    <button 
                      onClick={() => onApproveBusiness(business._id)}
                      className="action-button success"
                    >
                      <i className="fas fa-check"></i> Approve
                    </button>
                    <button 
                      onClick={() => setShowRejectModal(business._id)}
                      className="action-button danger"
                    >
                      <i className="fas fa-times"></i> Reject
                    </button>
                  </div>
                </div>
                <div className="business-details">
                  <div className="detail-section">
                    <strong>Business Address:</strong>
                    <p>{business.businessAddress}</p>
                  </div>
                  <div className="detail-section">
                    <strong>Business Description:</strong>
                    <p>{business.businessDescription}</p>
                  </div>
                  <div className="detail-section">
                    <strong>Registered by:</strong>
                    <p>{business.user?.firstName} {business.user?.lastName} ({business.user?.email})</p>
                  </div>
                  <div className="detail-section">
                    <strong>Submitted on:</strong>
                    <p>{new Date(business.createdAt).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</p>
                  </div>
                </div>

                {showRejectModal === business._id && (
                  <div className="modal-overlay" onClick={() => setShowRejectModal(null)}>
                    <div className="modal-content small-modal" onClick={(e) => e.stopPropagation()}>
                      <h3>Reject Business Application</h3>
                      <p>Please provide a reason for rejecting {business.businessName}:</p>
                      <textarea
                        value={rejectReason}
                        onChange={(e) => setRejectReason(e.target.value)}
                        placeholder="Enter detailed rejection reason..."
                        rows="4"
                        className="reason-textarea"
                      />
                      <div className="modal-actions">
                        <button 
                          onClick={() => setShowRejectModal(null)}
                          className="button secondary"
                        >
                          Cancel
                        </button>
                        <button 
                          onClick={() => handleReject(business._id)}
                          className="button danger"
                        >
                          Confirm Rejection
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="businesses-table">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Business Name</th>
                <th>Category</th>
                <th>Contact Email</th>
                <th>Owner</th>
                <th>Status</th>
                <th>Registered Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {approvedBusinesses.map(business => (
                <tr key={business._id}>
                  <td>
                    <strong>{business.businessName}</strong>
                  </td>
                  <td>{business.businessCategory}</td>
                  <td>{business.businessEmail}</td>
                  <td>{business.user?.firstName} {business.user?.lastName}</td>
                  <td>
                    <span className={`status-badge ${business.status}`}>
                      {business.status}
                    </span>
                  </td>
                  <td>{new Date(business.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div className="table-actions">
                      <button className="action-icon view" title="View Details">
                        <i className="fas fa-eye"></i>
                      </button>
                      {business.status === 'approved' ? (
                        <button 
                          className="action-icon suspend" 
                          title="Suspend Business"
                          onClick={() => setShowSuspendModal(business._id)}
                        >
                          <i className="fas fa-pause"></i>
                        </button>
                      ) : (
                        <button 
                          className="action-icon success" 
                          title="Activate Business"
                          onClick={() => onActivateBusiness(business._id)}
                        >
                          <i className="fas fa-play"></i>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {showSuspendModal && (
            <div className="modal-overlay" onClick={() => setShowSuspendModal(null)}>
              <div className="modal-content small-modal" onClick={(e) => e.stopPropagation()}>
                <h3>Suspend Business</h3>
                <p>Please provide a reason for suspending this business:</p>
                <textarea
                  value={suspendReason}
                  onChange={(e) => setSuspendReason(e.target.value)}
                  placeholder="Enter suspension reason..."
                  rows="4"
                  className="reason-textarea"
                />
                <div className="modal-actions">
                  <button 
                    onClick={() => setShowSuspendModal(null)}
                    className="button secondary"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => handleSuspend(showSuspendModal)}
                    className="button warning"
                  >
                    Confirm Suspension
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Admin Analytics Tab Component
function AdminAnalyticsTab({ businessAnalytics }) {
  const [sortField, setSortField] = useState('revenue');
  const [sortDirection, setSortDirection] = useState('desc');

  const sortedAnalytics = [...businessAnalytics].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const SortIcon = ({ field }) => (
    <span className="sort-icon">
      {sortField === field && (
        sortDirection === 'asc' ? '↑' : '↓'
      )}
    </span>
  );

  return (
    <div className="admin-analytics">
      <div className="admin-section-header">
        <h2>Business Performance Analytics</h2>
        <p>Comprehensive metrics and performance data for all businesses</p>
      </div>

      <div className="analytics-summary">
        <div className="summary-card">
          <h3>Top Performers</h3>
          <div className="top-businesses">
            {sortedAnalytics.slice(0, 3).map((business, index) => (
              <div key={business.businessId} className="top-business">
                <span className="rank">{index + 1}</span>
                <span className="name">{business.businessName}</span>
                <span className="revenue">${business.revenue?.toLocaleString() || 0}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="summary-card">
          <h3>Platform Overview</h3>
          <div className="platform-metrics">
            <div className="metric">
              <span className="value">{businessAnalytics.length}</span>
              <span className="label">Businesses Tracked</span>
            </div>
            <div className="metric">
              <span className="value">
                ${businessAnalytics.reduce((sum, biz) => sum + (biz.revenue || 0), 0).toLocaleString()}
              </span>
              <span className="label">Total Revenue</span>
            </div>
            <div className="metric">
              <span className="value">
                {businessAnalytics.reduce((sum, biz) => sum + (biz.totalPosts || 0), 0)}
              </span>
              <span className="label">Total Posts</span>
            </div>
          </div>
        </div>
      </div>

      <div className="analytics-table">
        <table className="admin-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('businessName')}>
                Business Name <SortIcon field="businessName" />
              </th>
              <th onClick={() => handleSort('totalPosts')}>
                Posts <SortIcon field="totalPosts" />
              </th>
              <th onClick={() => handleSort('totalProducts')}>
                Products <SortIcon field="totalProducts" />
              </th>
              <th onClick={() => handleSort('totalPromotions')}>
                Promotions <SortIcon field="totalPromotions" />
              </th>
              <th onClick={() => handleSort('totalEngagement')}>
                Engagement <SortIcon field="totalEngagement" />
              </th>
              <th onClick={() => handleSort('revenue')}>
                Revenue <SortIcon field="revenue" />
              </th>
              <th onClick={() => handleSort('growth')}>
                Growth <SortIcon field="growth" />
              </th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedAnalytics.map(business => (
              <tr key={business.businessId}>
                <td>
                  <div className="business-cell">
                    <strong>{business.businessName}</strong>
                  </div>
                </td>
                <td>
                  <span className="metric-value">{business.totalPosts || 0}</span>
                </td>
                <td>
                  <span className="metric-value">{business.totalProducts || 0}</span>
                </td>
                <td>
                  <span className="metric-value">{business.totalPromotions || 0}</span>
                </td>
                <td>
                  <span className="metric-value">{business.totalEngagement?.toLocaleString() || 0}</span>
                </td>
                <td>
                  <span className="metric-value revenue">${business.revenue?.toLocaleString() || 0}</span>
                </td>
                <td>
                  <span className={`growth-badge ${(business.growth || 0) >= 0 ? 'positive' : 'negative'}`}>
                    {(business.growth || 0) >= 0 ? '+' : ''}{business.growth || 0}%
                  </span>
                </td>
                <td>
                  <span className={`status-badge ${business.status}`}>
                    {business.status}
                  </span>
                </td>
                <td>
                  <div className="table-actions">
                    <button className="action-icon view" title="View Details">
                      <i className="fas fa-eye"></i>
                    </button>
                    <button className="action-icon chart" title="View Charts">
                      <i className="fas fa-chart-bar"></i>
                    </button>
                    <button className="action-icon download" title="Download Report">
                      <i className="fas fa-download"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {businessAnalytics.length === 0 && (
        <div className="empty-state">
          <i className="fas fa-chart-line empty-icon"></i>
          <p className="empty-text">No business analytics data available</p>
          <p className="empty-subtext">Analytics data will appear here once businesses start using the platform.</p>
        </div>
      )}
    </div>
  );
}

// Category Management Tab Component
function CategoryManagementTab({
  categories,
  onCreateCategory,
  onDeleteCategory,
  onCreateSubcategory,
  onDeleteSubcategory
}) {
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newSubcategoryName, setNewSubcategoryName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    const result = await onCreateCategory(newCategoryName);
    if (result.success) {
      setNewCategoryName('');
      alert(result.message);
    } else {
      alert('Error: ' + result.error);
    }
  };

  const handleCreateSubcategory = async (e) => {
    e.preventDefault();
    if (!newSubcategoryName.trim() || !selectedCategory) return;

    const result = await onCreateSubcategory(selectedCategory._id, newSubcategoryName);
    if (result.success) {
      setNewSubcategoryName('');
      alert(result.message);
    } else {
      alert('Error: ' + result.error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      const result = await onDeleteCategory(categoryId);
      if (result.success) {
        alert(result.message);
      } else {
        alert('Error: ' + result.error);
      }
    }
  };

  const handleDeleteSubcategory = async (categoryId, subcategoryId, subcategoryName) => {
    if (window.confirm(`Are you sure you want to delete "${subcategoryName}"?`)) {
      const result = await onDeleteSubcategory(categoryId, subcategoryId);
      if (result.success) {
        alert(result.message);
      } else {
        alert('Error: ' + result.error);
      }
    }
  };

  return (
    <div className="category-management">
      <div className="admin-section-header">
        <h2>Category Management</h2>
        <p>Manage categories and subcategories</p>
      </div>

      <div className="category-form-section">
        <h3>Add New Category</h3>
        <form onSubmit={handleCreateCategory} className="category-form">
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="Enter category name"
            className="category-input"
            required
          />
          <button type="submit" className="button primary">
            <i className="fas fa-plus"></i> Add Category
          </button>
        </form>
      </div>

      <div className="categories-list">
        {categories.map(category => (
          <div key={category._id} className="category-card">
            <div className="category-header">
              <h3 className="category-name">{category.name}</h3>
              <div className="category-actions">
                <button 
                  className="action-button danger small"
                  onClick={() => handleDeleteCategory(category._id)}
                  title="Delete Category"
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>

            <div className="subcategory-form">
              <input
                type="text"
                value={selectedCategory?._id === category._id ? newSubcategoryName : ''}
                onChange={(e) => {
                  setSelectedCategory(category);
                  setNewSubcategoryName(e.target.value);
                }}
                placeholder="Add subcategory"
                className="subcategory-input"
              />
              <button 
                onClick={(e) => {
                  setSelectedCategory(category);
                  handleCreateSubcategory(e);
                }}
                className="button secondary small"
                disabled={!newSubcategoryName.trim()}
              >
                <i className="fas fa-plus"></i> Add
              </button>
            </div>

            <div className="subcategories-list">
              {category.subcategories && category.subcategories.map(subcategory => (
                <div key={subcategory._id} className="subcategory-item">
                  <span className="subcategory-name">{subcategory.name}</span>
                  <button 
                    className="action-icon danger small"
                    onClick={() => handleDeleteSubcategory(category._id, subcategory._id, subcategory.name)}
                    title="Delete Subcategory"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {categories.length === 0 && (
        <div className="empty-state">
          <i className="fas fa-tags empty-icon"></i>
          <p className="empty-text">No categories found</p>
          <p className="empty-subtext">Create your first category to get started</p>
        </div>
      )}
    </div>
  );
}
function BusinessManagementTab({
  businesses,
  onDeleteBusiness,
  onDeletePost,
  onDeleteProduct,
  onDeletePromotion,
  onUpdateBusiness,
  fetchBusinessPosts,
  fetchBusinessProducts,
  fetchBusinessPromotions
}) {
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [activeSection, setActiveSection] = useState('details');
  const [editingBusiness, setEditingBusiness] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [businessData, setBusinessData] = useState({
    posts: [],
    products: [],
    promotions: []
  });
  const [loadingData, setLoadingData] = useState(false);

  // Load business-specific data when a business is selected or section changes
  useEffect(() => {
    if (selectedBusiness && activeSection !== 'details') {
      loadBusinessData();
    }
  }, [selectedBusiness, activeSection]);

  const loadBusinessData = async () => {
    if (!selectedBusiness) return;
    
    setLoadingData(true);
    try {
      const [posts, products, promotions] = await Promise.all([
        activeSection === 'posts' ? fetchBusinessPosts(selectedBusiness._id) : Promise.resolve([]),
        activeSection === 'products' ? fetchBusinessProducts(selectedBusiness._id) : Promise.resolve([]),
        activeSection === 'promotions' ? fetchBusinessPromotions(selectedBusiness._id) : Promise.resolve([])
      ]);

      setBusinessData({
        posts: posts || [],
        products: products || [],
        promotions: promotions || []
      });
    } catch (error) {
      console.error('Error loading business data:', error);
      setBusinessData({ posts: [], products: [], promotions: [] });
    } finally {
      setLoadingData(false);
    }
  };

  const handleEditBusiness = (business) => {
    setEditingBusiness(business._id);
    setEditForm({
      businessName: business.businessName,
      businessCategory: business.businessCategory,
      businessEmail: business.businessEmail,
      businessPhone: business.businessPhone,
      businessAddress: business.businessAddress,
      businessDescription: business.businessDescription,
      businessWebsite: business.businessWebsite || ''
    });
  };

  const handleSaveBusiness = async (businessId) => {
    await onUpdateBusiness(businessId, editForm);
    setEditingBusiness(null);
    setEditForm({});
  };

  const handleCancelEdit = () => {
    setEditingBusiness(null);
    setEditForm({});
  };

  const handleDeletePost = async (businessId, postId) => {
    const result = await onDeletePost(businessId, postId);
    if (result.success) {
      // Reload posts after deletion
      const posts = await fetchBusinessPosts(businessId);
      setBusinessData(prev => ({ ...prev, posts }));
    }
  };

  const handleDeleteProduct = async (businessId, productId) => {
    const result = await onDeleteProduct(businessId, productId);
    if (result.success) {
      // Reload products after deletion
      const products = await fetchBusinessProducts(businessId);
      setBusinessData(prev => ({ ...prev, products }));
    }
  };

  const handleDeletePromotion = async (businessId, promotionId) => {
    const result = await onDeletePromotion(businessId, promotionId);
    if (result.success) {
      // Reload promotions after deletion
      const promotions = await fetchBusinessPromotions(businessId);
      setBusinessData(prev => ({ ...prev, promotions }));
    }
  };

  if (selectedBusiness) {
    return (
      <div className="business-detail-view">
        <div className="detail-header">
          <button 
            className="back-button"
            onClick={() => {
              setSelectedBusiness(null);
              setBusinessData({ posts: [], products: [], promotions: [] });
            }}
          >
            <i className="fas fa-arrow-left"></i> Back to Businesses
          </button>
          <h2>{selectedBusiness.businessName}</h2>
          <span className={`status-badge ${selectedBusiness.status}`}>
            {selectedBusiness.status}
          </span>
        </div>

        <div className="business-tabs">
          <button 
            className={`tab-button ${activeSection === 'details' ? 'active' : ''}`}
            onClick={() => setActiveSection('details')}
          >
            Business Details
          </button>
          <button 
            className={`tab-button ${activeSection === 'posts' ? 'active' : ''}`}
            onClick={() => setActiveSection('posts')}
          >
            Posts ({businessData.posts.length || 0})
          </button>
          <button 
            className={`tab-button ${activeSection === 'products' ? 'active' : ''}`}
            onClick={() => setActiveSection('products')}
          >
            Products ({businessData.products.length || 0})
          </button>
          <button 
            className={`tab-button ${activeSection === 'promotions' ? 'active' : ''}`}
            onClick={() => setActiveSection('promotions')}
          >
            Promotions ({businessData.promotions.length || 0})
          </button>
        </div>

        <div className="tab-content">
          {activeSection === 'details' && (
            <BusinessDetailsSection 
              business={selectedBusiness}
              onEditBusiness={handleEditBusiness}
              onSaveBusiness={handleSaveBusiness}
              onCancelEdit={handleCancelEdit}
              editingBusiness={editingBusiness}
              editForm={editForm}
              setEditForm={setEditForm}
              onDeleteBusiness={onDeleteBusiness}
            />
          )}

          {activeSection === 'posts' && (
            <PostsSection 
              business={selectedBusiness}
              posts={businessData.posts}
              loading={loadingData}
              onDeletePost={handleDeletePost}
            />
          )}

          {activeSection === 'products' && (
            <ProductsSection 
              business={selectedBusiness}
              products={businessData.products}
              loading={loadingData}
              onDeleteProduct={handleDeleteProduct}
            />
          )}

          {activeSection === 'promotions' && (
            <PromotionsSection 
              business={selectedBusiness}
              promotions={businessData.promotions}
              loading={loadingData}
              onDeletePromotion={handleDeletePromotion}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="business-management">
      <div className="admin-section-header">
        <h2>All Businesses</h2>
        <p>Manage and view all business accounts</p>
      </div>

      <div className="businesses-grid">
        {businesses.map(business => (
          <div key={business._id} className="business-card">
            <div className="business-card-header">
              <h3>{business.businessName}</h3>
              <span className={`status-badge ${business.status}`}>
                {business.status}
              </span>
            </div>
            
            <div className="business-card-info">
              <p><i className="fas fa-tag"></i> {business.businessCategory}</p>
              <p><i className="fas fa-envelope"></i> {business.businessEmail}</p>
              <p><i className="fas fa-phone"></i> {business.businessPhone}</p>
            </div>

            <div className="business-stats">
              <div className="stat">
                <span className="stat-number">{business.totalPosts || 0}</span>
                <span className="stat-label">Posts</span>
              </div>
              <div className="stat">
                <span className="stat-number">{business.totalProducts || 0}</span>
                <span className="stat-label">Products</span>
              </div>
              <div className="stat">
                <span className="stat-number">{/* Promotions count not available in main business data */}0</span>
                <span className="stat-label">Promotions</span>
              </div>
            </div>

            <div className="business-card-actions">
              <button 
                className="button primary"
                onClick={() => setSelectedBusiness(business)}
              >
                <i className="fas fa-eye"></i> View Details
              </button>
              <button 
                className="button danger"
                onClick={() => {
                  if (window.confirm(`Are you sure you want to delete ${business.businessName}? This will also delete all posts, products, and promotions.`)) {
                    onDeleteBusiness(business._id);
                  }
                }}
              >
                <i className="fas fa-trash"></i> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {businesses.length === 0 && (
        <div className="empty-state">
          <i className="fas fa-store empty-icon"></i>
          <p className="empty-text">No businesses found</p>
          <p className="empty-subtext">Businesses will appear here once they register</p>
        </div>
      )}
    </div>
  );
}

// Updated Business Details Section Component
function BusinessDetailsSection({ 
  business, 
  onEditBusiness, 
  onSaveBusiness, 
  onCancelEdit, 
  editingBusiness, 
  editForm, 
  setEditForm,
  onDeleteBusiness 
}) {
  return (
    <div className="business-details-section">
      <div className="section-header">
        <h3>Business Information</h3>
        {editingBusiness !== business._id ? (
          <button 
            className="button secondary"
            onClick={() => onEditBusiness(business)}
          >
            <i className="fas fa-edit"></i> Edit Business
          </button>
        ) : (
          <div className="edit-actions">
            <button 
              className="button success"
              onClick={() => onSaveBusiness(business._id)}
            >
              <i className="fas fa-save"></i> Save
            </button>
            <button 
              className="button secondary"
              onClick={onCancelEdit}
            >
              <i className="fas fa-times"></i> Cancel
            </button>
          </div>
        )}
      </div>

      <div className="details-grid">
        <div className="detail-field">
          <label>Business Name</label>
          {editingBusiness === business._id ? (
            <input
              type="text"
              value={editForm.businessName}
              onChange={(e) => setEditForm({...editForm, businessName: e.target.value})}
              className="edit-input"
            />
          ) : (
            <p>{business.businessName}</p>
          )}
        </div>

        <div className="detail-field">
          <label>Category</label>
          {editingBusiness === business._id ? (
            <input
              type="text"
              value={editForm.businessCategory}
              onChange={(e) => setEditForm({...editForm, businessCategory: e.target.value})}
              className="edit-input"
            />
          ) : (
            <p>{business.businessCategory}</p>
          )}
        </div>

        <div className="detail-field">
          <label>Email</label>
          {editingBusiness === business._id ? (
            <input
              type="email"
              value={editForm.businessEmail}
              onChange={(e) => setEditForm({...editForm, businessEmail: e.target.value})}
              className="edit-input"
            />
          ) : (
            <p>{business.businessEmail}</p>
          )}
        </div>

        <div className="detail-field">
          <label>Phone</label>
          {editingBusiness === business._id ? (
            <input
              type="text"
              value={editForm.businessPhone}
              onChange={(e) => setEditForm({...editForm, businessPhone: e.target.value})}
              className="edit-input"
            />
          ) : (
            <p>{business.businessPhone}</p>
          )}
        </div>

        <div className="detail-field">
          <label>Website</label>
          {editingBusiness === business._id ? (
            <input
              type="url"
              value={editForm.businessWebsite}
              onChange={(e) => setEditForm({...editForm, businessWebsite: e.target.value})}
              className="edit-input"
              placeholder="https://example.com"
            />
          ) : (
            <p>{business.businessWebsite || 'Not provided'}</p>
          )}
        </div>

        <div className="detail-field full-width">
          <label>Address</label>
          {editingBusiness === business._id ? (
            <textarea
              value={editForm.businessAddress}
              onChange={(e) => setEditForm({...editForm, businessAddress: e.target.value})}
              className="edit-textarea"
              rows="3"
            />
          ) : (
            <p>{business.businessAddress}</p>
          )}
        </div>

        <div className="detail-field full-width">
          <label>Description</label>
          {editingBusiness === business._id ? (
            <textarea
              value={editForm.businessDescription}
              onChange={(e) => setEditForm({...editForm, businessDescription: e.target.value})}
              className="edit-textarea"
              rows="4"
            />
          ) : (
            <p>{business.businessDescription}</p>
          )}
        </div>
      </div>

      <div className="danger-zone">
        <h4>Danger Zone</h4>
        <p>Permanently delete this business and all its data</p>
        <button 
          className="button danger"
          onClick={() => {
            if (window.confirm(`Are you sure you want to delete ${business.businessName}? This action cannot be undone and will delete all posts, products, and promotions.`)) {
              onDeleteBusiness(business._id);
            }
          }}
        >
          <i className="fas fa-trash"></i> Delete Business
        </button>
      </div>
    </div>
  );
}

// Updated Posts Section Component
function PostsSection({ business, posts, loading, onDeletePost }) {
  if (loading) {
    return (
      <div className="posts-section">
        <h3>Business Posts</h3>
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="posts-section">
      <h3>Business Posts</h3>
      {posts && posts.length > 0 ? (
        <div className="posts-list">
          {posts.map(post => (
            <div key={post._id} className="post-card">
              <div className="post-header">
                <h4>{post.title || 'Untitled Post'}</h4>
                <span className="post-date">
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="post-content">{post.content}</p>
              <div className="post-stats">
                <span><i className="fas fa-heart"></i> {post.likesCount || 0} likes</span>
                <span><i className="fas fa-comment"></i> {post.commentsCount || 0} comments</span>
                <span className={`status-badge ${post.status}`}>{post.status}</span>
              </div>
              <div className="post-actions">
                <button 
                  className="button danger small"
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this post?')) {
                      onDeletePost(business._id, post._id);
                    }
                  }}
                >
                  <i className="fas fa-trash"></i> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <i className="fas fa-newspaper empty-icon"></i>
          <p className="empty-text">No posts found</p>
          <p className="empty-subtext">This business hasn't created any posts yet</p>
        </div>
      )}
    </div>
  );
}

// Updated Products Section Component
function ProductsSection({ business, products, loading, onDeleteProduct }) {
  if (loading) {
    return (
      <div className="products-section">
        <h3>Business Products</h3>
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="products-section">
      <h3>Business Products</h3>
      {products && products.length > 0 ? (
        <div className="products-grid">
          {products.map(product => (
            <div key={product._id} className="product-card">
              <div className="product-header">
                <h4>{product.name}</h4>
                <span className="product-price">${product.price}</span>
              </div>
              <p className="product-description">{product.description}</p>
              <div className="product-meta">
                <span>SKU: {product.sku}</span>
                <span className={`status-badge ${product.isActive ? 'active' : 'inactive'}`}>
                  {product.isActive ? 'active' : 'inactive'}
                </span>
              </div>
              <div className="product-actions">
                <button 
                  className="button danger small"
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this product?')) {
                      onDeleteProduct(business._id, product._id);
                    }
                  }}
                >
                  <i className="fas fa-trash"></i> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <i className="fas fa-shopping-bag empty-icon"></i>
          <p className="empty-text">No products found</p>
          <p className="empty-subtext">This business hasn't added any products yet</p>
        </div>
      )}
    </div>
  );
}

// Updated Promotions Section Component
function PromotionsSection({ business, promotions, loading, onDeletePromotion }) {
  if (loading) {
    return (
      <div className="promotions-section">
        <h3>Business Promotions</h3>
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading promotions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="promotions-section">
      <h3>Business Promotions</h3>
      {promotions && promotions.length > 0 ? (
        <div className="promotions-list">
          {promotions.map(promotion => (
            <div key={promotion._id} className="promotion-card">
              <div className="promotion-header">
                <h4>{promotion.name}</h4>
                <span className="promotion-discount">
                  {promotion.discountValue > 0 ? `${promotion.discountValue}% OFF` : 'Promotion'}
                </span>
              </div>
              <p className="promotion-description">{promotion.description}</p>
              <div className="promotion-dates">
                <span>Start: {new Date(promotion.startDate).toLocaleDateString()}</span>
                <span>End: {promotion.endDate ? new Date(promotion.endDate).toLocaleDateString() : 'No end date'}</span>
              </div>
              <div className="promotion-meta">
                <span>Type: {promotion.type}</span>
                <span className={`status-badge ${promotion.status}`}>{promotion.status}</span>
              </div>
              <div className="promotion-actions">
                <button 
                  className="button danger small"
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this promotion?')) {
                      onDeletePromotion(business._id, promotion._id);
                    }
                  }}
                >
                  <i className="fas fa-trash"></i> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <i className="fas fa-tag empty-icon"></i>
          <p className="empty-text">No promotions found</p>
          <p className="empty-subtext">This business hasn't created any promotions yet</p>
        </div>
      )}
    </div>
  );
}

export default App;