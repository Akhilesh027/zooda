import React, { useState, useEffect } from 'react';
import './App.css';

// API Configuration
const API_BASE = 'https://api.zooda.in/api';

// Main App Component
function App() {
  const [adminData, setAdminData] = useState({
    pendingBusinesses: [],
    approvedBusinesses: [],
    platformStats: null,
    businessAnalytics: [],
    categories: [] 
  });
  const [adminLoading, setAdminLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(null);
  const [suspendReason, setSuspendReason] = useState('');
  const [showSuspendModal, setShowSuspendModal] = useState(null);

  useEffect(() => {
    loadAdminData();
  }, []);

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
        // Handle admin logout if needed
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

 const loadAdminData = async () => {
  setAdminLoading(true);
  try {
    const [pendingResult, approvedResult, statsResult, analyticsResult, categoriesResult] = await Promise.all([
      makeAPIRequest('/admin/businesses?status=pending'),
      makeAPIRequest('/admin/businesses?status=approved'),
      makeAPIRequest('/admin/stats'),
      makeAPIRequest('/admin/analytics/businesses'),
      makeAPIRequest('/admin/categories') // Load categories
    ]);

    setAdminData({
      pendingBusinesses: pendingResult.success ? pendingResult.data : getMockPendingBusinesses(),
      approvedBusinesses: approvedResult.success ? approvedResult.data : getMockApprovedBusinesses(),
      platformStats: statsResult.success ? statsResult.data : getMockPlatformStats(),
      businessAnalytics: analyticsResult.success ? analyticsResult.data : getMockBusinessAnalytics(),
      categories: categoriesResult.success ? categoriesResult.data : getMockCategories()
    });
  } catch (error) {
    console.error('Error loading admin data:', error);
    setAdminData({
      pendingBusinesses: getMockPendingBusinesses(),
      approvedBusinesses: getMockApprovedBusinesses(),
      platformStats: getMockPlatformStats(),
      businessAnalytics: getMockBusinessAnalytics(),
      categories: getMockCategories()
    });
  } finally {
    setAdminLoading(false);
  }
};
  const approveBusiness = async (businessId) => {
    const result = await makeAPIRequest(`/admin/businesses/${businessId}/approve`, {
      method: 'PUT'
    });
    
    if (result.success) {
      await loadAdminData();
      alert('Business approved successfully!');
    } else {
      alert('Error approving business: ' + result.error);
    }
  };

  const rejectBusiness = async (businessId, reason) => {
    const result = await makeAPIRequest(`/admin/businesses/${businessId}/reject`, {
      method: 'PUT',
      body: JSON.stringify({ reason })
    });
    
    if (result.success) {
      await loadAdminData();
      alert('Business rejected successfully!');
    } else {
      alert('Error rejecting business: ' + result.error);
    }
  };

  const suspendBusiness = async (businessId, reason) => {
    const result = await makeAPIRequest(`/admin/businesses/${businessId}/suspend`, {
      method: 'PUT',
      body: JSON.stringify({ reason })
    });
    
    if (result.success) {
      await loadAdminData();
      alert('Business suspended successfully!');
    } else {
      alert('Error suspending business: ' + result.error);
    }
  };

  const activateBusiness = async (businessId) => {
    const result = await makeAPIRequest(`/admin/businesses/${businessId}/activate`, {
      method: 'PUT'
    });
    
    if (result.success) {
      await loadAdminData();
      alert('Business activated successfully!');
    } else {
      alert('Error activating business: ' + result.error);
    }
  };

  // Mock data functions
  const getMockPendingBusinesses = () => [
    {
      _id: '1',
      businessName: 'Tech Solutions Inc',
      businessCategory: 'Technology',
      businessEmail: 'contact@techsolutions.com',
      businessPhone: '+1234567890',
      businessAddress: '123 Tech Street, San Francisco, CA',
      businessDescription: 'Leading technology solutions provider specializing in AI and machine learning applications for businesses.',
      status: 'pending',
      createdAt: '2024-01-15',
      user: { firstName: 'John', lastName: 'Doe', email: 'john@techsolutions.com' }
    },
    {
      _id: '2',
      businessName: 'Fashion Boutique',
      businessCategory: 'Retail',
      businessEmail: 'info@fashionboutique.com',
      businessPhone: '+1234567891',
      businessAddress: '456 Fashion Ave, New York, NY',
      businessDescription: 'Trendy fashion and accessories for modern professionals. We offer sustainable and ethically sourced clothing.',
      status: 'pending',
      createdAt: '2024-01-16',
      user: { firstName: 'Jane', lastName: 'Smith', email: 'jane@fashionboutique.com' }
    },
    {
      _id: '3',
      businessName: 'Organic Groceries',
      businessCategory: 'Food & Beverage',
      businessEmail: 'hello@organicgroceries.com',
      businessPhone: '+1234567892',
      businessAddress: '789 Green Lane, Portland, OR',
      businessDescription: 'Fresh organic produce and groceries delivered to your doorstep. Supporting local farmers and sustainable agriculture.',
      status: 'pending',
      createdAt: '2024-01-17',
      user: { firstName: 'Mike', lastName: 'Johnson', email: 'mike@organicgroceries.com' }
    }
  ];

  const getMockApprovedBusinesses = () => [
    {
      _id: '4',
      businessName: 'Coffee Corner',
      businessCategory: 'Food & Beverage',
      businessEmail: 'hello@coffeecorner.com',
      businessPhone: '+1234567893',
      businessAddress: '321 Brew Street, Seattle, WA',
      businessDescription: 'Artisanal coffee and pastries made with locally sourced ingredients. Co-working space available.',
      status: 'approved',
      createdAt: '2024-01-10',
      user: { firstName: 'Sarah', lastName: 'Wilson', email: 'sarah@coffeecorner.com' }
    },
    {
      _id: '5',
      businessName: 'Tech Gadgets',
      businessCategory: 'Technology',
      businessEmail: 'support@techgadgets.com',
      businessPhone: '+1234567894',
      businessAddress: '654 Innovation Drive, Austin, TX',
      businessDescription: 'Latest tech gadgets and electronics. From smartphones to smart home devices.',
      status: 'approved',
      createdAt: '2024-01-08',
      user: { firstName: 'David', lastName: 'Brown', email: 'david@techgadgets.com' }
    },
    {
      _id: '6',
      businessName: 'Fitness Center',
      businessCategory: 'Health & Fitness',
      businessEmail: 'info@fitnesscenter.com',
      businessPhone: '+1234567895',
      businessAddress: '987 Wellness Road, Miami, FL',
      businessDescription: 'State-of-the-art fitness center with personal training and group classes. Open 24/7.',
      status: 'suspended',
      createdAt: '2024-01-05',
      user: { firstName: 'Maria', lastName: 'Garcia', email: 'maria@fitnesscenter.com' }
    }
  ];

  const getMockPlatformStats = () => ({
    totalBusinesses: 45,
    pendingApprovals: 3,
    totalPosts: 320,
    totalProducts: 189,
    totalPromotions: 67,
    totalRevenue: 28450,
    activeBusinesses: 42
  });

  const getMockBusinessAnalytics = () => [
    {
      businessId: '4',
      businessName: 'Coffee Corner',
      totalPosts: 15,
      totalProducts: 8,
      totalPromotions: 3,
      totalEngagement: 245,
      revenue: 1250,
      growth: 12,
      status: 'approved'
    },
    {
      businessId: '5',
      businessName: 'Tech Gadgets',
      totalPosts: 28,
      totalProducts: 15,
      totalPromotions: 5,
      totalEngagement: 567,
      revenue: 3200,
      growth: 8,
      status: 'approved'
    },
    {
      businessId: '6',
      businessName: 'Fitness Center',
      totalPosts: 42,
      totalProducts: 12,
      totalPromotions: 8,
      totalEngagement: 892,
      revenue: 5800,
      growth: -5,
      status: 'suspended'
    },
    {
      businessId: '7',
      businessName: 'Book Store',
      totalPosts: 8,
      totalProducts: 45,
      totalPromotions: 2,
      totalEngagement: 123,
      revenue: 890,
      growth: 15,
      status: 'approved'
    },
    {
      businessId: '8',
      businessName: 'Restaurant',
      totalPosts: 35,
      totalProducts: 25,
      totalPromotions: 12,
      totalEngagement: 678,
      revenue: 4250,
      growth: 22,
      status: 'approved'
    }
  ];
  const getMockCategories = () => [
  {
    _id: '1',
    name: 'Food & Beverage',
    subcategories: [
      { _id: '1-1', name: 'Restaurants' },
      { _id: '1-2', name: 'Cafes' },
      { _id: '1-3', name: 'Food Delivery' }
    ]
  },
  {
    _id: '2',
    name: 'Retail',
    subcategories: [
      { _id: '2-1', name: 'Fashion' },
      { _id: '2-2', name: 'Electronics' }
    ]
  },
  {
    _id: '3',
    name: 'Services',
    subcategories: [
      { _id: '3-1', name: 'Beauty' },
      { _id: '3-2', name: 'Home Services' }
    ]
  }
];
const createCategory = async (categoryName) => {
  const result = await makeAPIRequest('/admin/categories', {
    method: 'POST',
    body: JSON.stringify({ name: categoryName })
  });
  
  if (result.success) {
    await loadAdminData();
    return { success: true, message: 'Category created successfully!' };
  } else {
    return { success: false, error: result.error };
  }
};

const deleteCategory = async (categoryId) => {
  const result = await makeAPIRequest(`/admin/categories/${categoryId}`, {
    method: 'DELETE'
  });
  
  if (result.success) {
    await loadAdminData();
    return { success: true, message: 'Category deleted successfully!' };
  } else {
    return { success: false, error: result.error };
  }
};

const createSubcategory = async (categoryId, subcategoryName) => {
  const result = await makeAPIRequest(`/admin/categories/${categoryId}/subcategories`, {
    method: 'POST',
    body: JSON.stringify({ name: subcategoryName })
  });
  
  if (result.success) {
    await loadAdminData();
    return { success: true, message: 'Subcategory created successfully!' };
  } else {
    return { success: false, error: result.error };
  }
};

const deleteSubcategory = async (categoryId, subcategoryId) => {
  const result = await makeAPIRequest(`/admin/categories/${categoryId}/subcategories/${subcategoryId}`, {
    method: 'DELETE'
  });
  
  if (result.success) {
    await loadAdminData();
    return { success: true, message: 'Subcategory deleted successfully!' };
  } else {
    return { success: false, error: result.error };
  }
};


// Update loadAdminData to include categories


  const adminTabs = [
    { id: 'overview', name: 'Overview', icon: 'fa-chart-bar' },
    { id: 'approvals', name: 'Business Approvals', icon: 'fa-building' },
    { id: 'analytics', name: 'Business Analytics', icon: 'fa-chart-line' },
      { id: 'categories', name: 'Categories', icon: 'fa-tags' } // New tab

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
        return (
          <AdminAnalyticsTab
            businessAnalytics={adminData.businessAnalytics}
          />
        );
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
      default:
        return <AdminOverviewTab stats={adminData.platformStats} />;
    }
  };

  return (
    <div className="app-layout">
      {/* Overlay */}
      {sidebarOpen && (
        <div 
          className="overlay active" 
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Admin Sidebar */}
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
      
      {/* Main Content */}
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
            <div key={i} className="stat-skeleton"></div>
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
          <p className="stat-trend positive">+8% growth</p>
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
          <p className="stat-trend positive">+15% growth</p>
        </div>

        <div className="stat-card admin-stat">
          <div className="stat-header">
            <h3 className="stat-title">Total Products</h3>
            <i className="fas fa-shopping-bag stat-icon product-icon"></i>
          </div>
          <p className="stat-value">{stats.totalProducts}</p>
          <p className="stat-trend positive">+23% growth</p>
        </div>

        <div className="stat-card admin-stat">
          <div className="stat-header">
            <h3 className="stat-title">Active Promotions</h3>
            <i className="fas fa-tag stat-icon promotion-icon"></i>
          </div>
          <p className="stat-value">{stats.totalPromotions}</p>
          <p className="stat-trend positive">+18% growth</p>
        </div>

        <div className="stat-card admin-stat">
          <div className="stat-header">
            <h3 className="stat-title">Platform Revenue</h3>
            <i className="fas fa-dollar-sign stat-icon revenue-icon"></i>
          </div>
          <p className="stat-value">${stats.totalRevenue?.toLocaleString()}</p>
          <p className="stat-trend positive">+25% growth</p>
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

                {/* Reject Reason Modal */}
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

          {/* Suspend Business Modal */}
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
                <span className="revenue">${business.revenue.toLocaleString()}</span>
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
                ${businessAnalytics.reduce((sum, biz) => sum + biz.revenue, 0).toLocaleString()}
              </span>
              <span className="label">Total Revenue</span>
            </div>
            <div className="metric">
              <span className="value">
                {businessAnalytics.reduce((sum, biz) => sum + biz.totalPosts, 0)}
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
                  <span className="metric-value">{business.totalPosts}</span>
                </td>
                <td>
                  <span className="metric-value">{business.totalProducts}</span>
                </td>
                <td>
                  <span className="metric-value">{business.totalPromotions}</span>
                </td>
                <td>
                  <span className="metric-value">{business.totalEngagement.toLocaleString()}</span>
                </td>
                <td>
                  <span className="metric-value revenue">${business.revenue.toLocaleString()}</span>
                </td>
                <td>
                  <span className={`growth-badge ${business.growth >= 0 ? 'positive' : 'negative'}`}>
                    {business.growth >= 0 ? '+' : ''}{business.growth}%
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

      {/* Add New Category Form */}
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

      {/* Categories List */}
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

            {/* Add Subcategory Form */}
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

            {/* Subcategories List */}
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

export default App;