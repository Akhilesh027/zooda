import React, { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import {
  LogIn, UserPlus, Home, Briefcase, BarChart3, Image, Tag, Plus, 
  ShoppingBag, TrendingUp, Menu, X, ArrowLeft, Heart, MessageCircle, 
  Clock, CheckCircle, Hourglass, XCircle, Users, Calendar, Eye, Edit,Edit3, Globe, Phone, MapPin
} from 'lucide-react';

// --- CONFIGURATION ---
const API_BASE_URL = 'http://31.97.237.137:5000/api';
axios.defaults.baseURL = API_BASE_URL;
axios.defaults.headers.common['Accept'] = 'application/json'; // Added common Accept header

// --- CONTEXT FOR GLOBAL STATE ---
const AppContext = React.createContext();

// --- UTILITY COMPONENTS ---
const LoadingSpinner = ({ text = "Loading..." }) => (
  <div className="flex flex-col items-center justify-center p-8 bg-white/70 backdrop-blur-sm rounded-xl shadow-lg">
    <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-4 border-blue-500 border-t-transparent mb-4"></div>
    <p className="text-gray-700 font-semibold">{text}</p>
  </div>
);

const Notification = ({ message, type, onClose }) => {
  const bgColor = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
  }[type] || 'bg-gray-500';

  return (
    <div className={`p-4 rounded-lg text-white shadow-xl flex justify-between items-center ${bgColor}`}>
      <p>{message}</p>
      <button onClick={onClose} className="ml-4 opacity-70 hover:opacity-100">
        <X size={20} />
      </button>
    </div>
  );
};

const StatCard = ({ title, value, icon, color }) => (
  <div
    className={`flex flex-col items-center justify-center p-5 rounded-2xl shadow-md text-white ${color}`}
  >
    <div className="flex items-center space-x-3">
      {icon}
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
    <p className="text-3xl font-bold mt-3">{value}</p>
  </div>
);



// --- AUTH COMPONENTS ---
const AuthScreen = ({ isRegister, onAuthSuccess, switchMode }) => {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', password: '', confirmPassword: ''
  });
  const [authLoading, setAuthLoading] = useState(false);
  
  const API_URL = isRegister ? '/register' : '/login';

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    
    if (isRegister && formData.password !== formData.confirmPassword) {
      onAuthSuccess('error', "Passwords do not match.");
      setAuthLoading(false);
      return;
    }
    
    try {
      console.log(`[DEBUG] Attempting Auth: ${isRegister ? 'Register' : 'Login'} to ${API_URL}`);
      const payload = isRegister ? formData : { email: formData.email, password: formData.password };
      const res = await axios.post(API_URL, payload);
      
      console.log('[DEBUG] Auth Success Response:', res.data);
      onAuthSuccess('success', `Welcome, ${res.data.user.firstName}!`, res.data.token, res.data.user);
    } catch (error) {
      console.error('[ERROR] Auth failed:', error.response?.data || error.message);
      onAuthSuccess('error', error.response?.data?.message || 'Authentication failed. Check API URL and server status.');
    } finally {
      setAuthLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-8">
          {isRegister ? 'Business Owner Register' : 'Business Owner Login'}
        </h2>
        <form onSubmit={handleAuthSubmit} className="space-y-6">
          {isRegister && (
            <>
              <input 
                type="text" name="firstName" placeholder="First Name" 
                onChange={(e) => setFormData({...formData, firstName: e.target.value})} 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" required 
              />
              <input 
                type="text" name="lastName" placeholder="Last Name" 
                onChange={(e) => setFormData({...formData, lastName: e.target.value})} 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" required 
              />
            </>
          )}
          <input 
            type="email" name="email" placeholder="Email" 
            onChange={(e) => setFormData({...formData, email: e.target.value})} 
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" required 
          />
          <input 
            type="password" name="password" placeholder="Password" 
            onChange={(e) => setFormData({...formData, password: e.target.value})} 
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" required 
          />
          {isRegister && (
            <input 
              type="password" name="confirmPassword" placeholder="Confirm Password" 
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500" required 
            />
          )}
          <button 
            type="submit" 
            disabled={authLoading} 
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-semibold transition duration-200 disabled:opacity-50"
          >
            {authLoading ? 'Processing...' : (isRegister ? 'Register' : 'Login')}
          </button>
        </form>
        <button 
          onClick={switchMode} 
          className="mt-6 w-full text-center text-indigo-600 hover:text-indigo-800 transition duration-200"
        >
          {isRegister ? 'Already have an account? Login' : 'Need an account? Register'}
        </button>
      </div>
    </div>
  );
};

// --- BUSINESS FLOW COMPONENTS ---

const BusinessProfileScreen = ({ existingBusiness, onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    businessName: "",
    businessCategory: "ecommerce",
    businessDescription: "",
    businessWebsite: "",
    businessAddress: "",
    businessPhone: "",
  });
  const [logoFile, setLogoFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (existingBusiness) {
      setFormData({
        businessName: existingBusiness.businessName || "",
        businessCategory: existingBusiness.businessCategory || "ecommerce",
        businessDescription: existingBusiness.businessDescription || "",
        businessWebsite: existingBusiness.businessWebsite || "",
        businessAddress: existingBusiness.businessAddress || "",
        businessPhone: existingBusiness.businessPhone || "",
      });
    }
  }, [existingBusiness]);

  const handleFileChange = (e) => {
    setLogoFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, logoFile);
    setIsEditing(false);
  };

  // ---------- READ-ONLY VIEW ----------
  if (existingBusiness && !isEditing) {
    return (
      <div className="p-8 max-w-4xl mx-auto bg-white shadow-xl rounded-xl mt-10">
        <div className="flex justify-between items-center border-b pb-3 mb-6">
          <h2 className="text-3xl font-bold text-indigo-600 flex items-center">
            <Briefcase className="mr-3" />
            Your Business Profile
          </h2>
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition"
          >
            <Edit3 size={18} className="mr-2" /> Edit
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-500">Business Name</p>
            <p className="text-lg font-semibold">{existingBusiness.businessName}</p>
          </div>
          <div>
            <p className="text-gray-500">Category</p>
            <p className="text-lg font-semibold capitalize">{existingBusiness.businessCategory}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-gray-500">Description</p>
            <p className="text-gray-700">{existingBusiness.businessDescription}</p>
          </div>
          <div>
            <p className="text-gray-500 flex items-center">
              <MapPin className="mr-2" size={16} /> Address
            </p>
            <p className="text-gray-700">{existingBusiness.businessAddress}</p>
          </div>
          <div>
            <p className="text-gray-500 flex items-center">
              <Phone className="mr-2" size={16} /> Phone
            </p>
            <p className="text-gray-700">{existingBusiness.businessPhone}</p>
          </div>
          {existingBusiness.businessWebsite && (
            <div>
              <p className="text-gray-500 flex items-center">
                <Globe className="mr-2" size={16} /> Website
              </p>
              <a
                href={existingBusiness.businessWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:underline"
              >
                {existingBusiness.businessWebsite}
              </a>
            </div>
          )}
          {existingBusiness.logoUrl && (
            <div className="md:col-span-2">
              <p className="text-gray-500">Logo</p>
              <img
                src={`${existingBusiness.logoUrl}`}
                alt="Business Logo"
                className="w-32 h-32 object-cover rounded-lg border"
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  // ---------- EDIT MODE (FORM) ----------
  return (
    <div className="p-8 max-w-4xl mx-auto bg-white shadow-xl rounded-xl mt-10">
      <div className="flex justify-between items-center border-b pb-3 mb-6">
        <h2 className="text-3xl font-bold text-indigo-600 flex items-center">
          <UserPlus className="mr-3" />
          {existingBusiness ? "Edit Your Business Profile" : "Register Your Business"}
        </h2>
        {existingBusiness && (
          <button
            onClick={() => setIsEditing(false)}
            className="flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
          >
            <X size={18} className="mr-1" /> Cancel
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            name="businessName"
            placeholder="Business Name"
            value={formData.businessName}
            onChange={(e) =>
              setFormData({ ...formData, businessName: e.target.value })
            }
            className="p-3 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            required
          />

          {/* ✅ Updated Category Options */}
          <select
            name="businessCategory"
            value={formData.businessCategory}
            onChange={(e) =>
              setFormData({ ...formData, businessCategory: e.target.value })
            }
            className="p-3 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            required
          >
            <option value="ecommerce">E-commerce</option>
            <option value="lms">LMS</option>
          </select>
        </div>

        <textarea
          name="businessDescription"
          placeholder="Description (Max 500 chars)"
          value={formData.businessDescription}
          onChange={(e) =>
            setFormData({ ...formData, businessDescription: e.target.value })
          }
          className="w-full p-3 border rounded-lg h-24 focus:ring-indigo-500 focus:border-indigo-500"
          required
          maxLength={500}
        />
        <input
          type="text"
          name="businessAddress"
          placeholder="Physical Address"
          value={formData.businessAddress}
          onChange={(e) =>
            setFormData({ ...formData, businessAddress: e.target.value })
          }
          className="w-full p-3 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="url"
            name="businessWebsite"
            placeholder="Website URL (Optional)"
            value={formData.businessWebsite}
            onChange={(e) =>
              setFormData({ ...formData, businessWebsite: e.target.value })
            }
            className="p-3 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
          <input
            type="tel"
            name="businessPhone"
            placeholder="Phone Number"
            value={formData.businessPhone}
            onChange={(e) =>
              setFormData({ ...formData, businessPhone: e.target.value })
            }
            className="p-3 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Business Logo (Optional, Max 10MB)
          </label>
          <input
            type="file"
            name="logo"
            onChange={handleFileChange}
            accept="image/*"
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition duration-200 disabled:opacity-50"
          >
            {loading
              ? "Submitting..."
              : existingBusiness
              ? "Update Profile"
              : "Register Business"}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition duration-200"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};


const BusinessPendingScreen = ({ business, onLogout }) => {
  const [polling, setPolling] = useState(true);

  const getStatusMessage = () => {
    if (business?.status === 'inactive') {
      return {
        icon: <XCircle size={24} className="text-red-500" />,
        title: 'Business Rejected/Inactive',
        message: `Your business listing was rejected or set to inactive. Reason: ${business?.rejectionReason || 'N/A'}`,
        color: 'bg-red-50',
      };
    }
    if (business?.status === 'suspended') {
      return {
        icon: <XCircle size={24} className="text-red-500" />,
        title: 'Business Suspended',
        message: `Your business account has been suspended. Reason: ${business?.suspensionReason || 'N/A'}`,
        color: 'bg-red-50',
      };
    }
    return {
      icon: <Hourglass size={24} className="text-yellow-500" />,
      title: 'Under Review',
      message: 'Thank you for registering. Your business listing is under review. We will notify you once approved.',
      color: 'bg-yellow-50',
    };
  };

  const status = getStatusMessage();

  return (
    <div className="p-8 max-w-xl mx-auto mt-20 text-center">
      <div className={`p-8 ${status.color} rounded-xl shadow-lg border border-gray-200`}>
        <div className="flex justify-center mb-4">{status.icon}</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-3">{status.title}</h2>
        <p className="text-gray-600 mb-6">{status.message}</p>
        {polling && !['inactive', 'suspended'].includes(business?.status) && (
          <p className="text-sm text-gray-500 mt-4">Checking status automatically...</p>
        )}
      </div>
      <button 
        onClick={onLogout} 
        className="mt-8 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition"
      >
        Logout
      </button>
    </div>
  );
};


// --- DashboardScreen Component (REVISED) ---
const DashboardScreen = ({ existingBusiness, user, notify }) => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const businessId = existingBusiness?._id;

  const fetchDashboardData = useCallback(async () => {
    if (!businessId) {
      setError("Business ID is missing.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      console.log(`[DEBUG] Dashboard Fetching: Requesting data for Business ID: ${businessId}`);
      
      const response = await axios.get(
        `/dashboard/${businessId}`
      );

      console.log('[DEBUG] Dashboard API Response (Raw):', response.data);
      
      if (response.data && response.data.success && response.data.dashboard) {
        setDashboardData(response.data.dashboard);
        console.log('[DEBUG] Dashboard Data Set:', response.data.dashboard);
        notify('success', 'Dashboard data loaded!');
      } else {
        setError("Failed to load dashboard data: API response missing 'dashboard' object or 'success' is false.");
        notify('error', 'Dashboard load failed: Invalid response structure.');
        console.error('[ERROR] Dashboard Data Structure Error:', response.data);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error loading dashboard data. Check API route/server.';
      console.error("[ERROR] Failed to fetch dashboard data:", err.response?.data || err.message);
      setError(errorMessage);
      notify('error', errorMessage);
    } finally {
      setLoading(false);
    }
  }, [businessId, notify]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  if (loading) return <LoadingSpinner text="Loading Dashboard..." />;
  
  if (error) return (
    <div className="p-6 text-center bg-red-50 rounded-xl shadow mt-10">
      <h2 className="text-2xl font-bold text-red-600 mb-3">Dashboard Load Failed</h2>
      <p className="text-red-500">{error}</p>
      <button onClick={fetchDashboardData} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
        Try Again
      </button>
    </div>
  );
  
  if (!dashboardData) return null;

  // --- START: CORRECTION APPLIED HERE ---
  const {
    stats = {},
    recentActivity = [],
    business = {},
    // Added platformPerformance, though not used in stats cards
    platformPerformance = [] 
  } = dashboardData;

  const {
    totalEngagement = 0,
    totalProducts = 0,
    totalPromotions = 0,
    // Note: 'followers' is missing in your sample data, but setting a default
    followers = 0, 
    // totalPosts is now the total engagement value source
    totalPosts = 0
  } = stats; 
  // --- END: CORRECTION APPLIED HERE ---
  
  // Choose the higher value for Engagement card, assuming totalEngagement is correct
  const displayEngagement = totalEngagement > 0 ? totalEngagement : totalPosts;


  return (
    <div className="p-6 bg-gray-50 min-h-screen rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
        <BarChart3 className="mr-3 text-indigo-600" />
        {business.name || existingBusiness?.businessName || "Business"} Dashboard
      </h1>

      {/* KPI CARDS - UPDATED to use 'stats' values */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Engagement"
          value={displayEngagement} 
          icon={<Heart size={24} />}
          color="bg-green-500"
        />
        <StatCard
          title="Products Listed"
          value={totalProducts} 
          icon={<ShoppingBag size={24} />}
          color="bg-yellow-500"
        />
        <StatCard
          title="Active Promotions"
          value={totalPromotions} 
          icon={<Tag size={24} />}
          color="bg-purple-500"
        />
        <StatCard
          title="Followers (Mock)"
          value={followers} 
          icon={<Users size={24} />}
          color="bg-pink-500"
        />
      </div>

      {/* MAIN SECTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* RECENT ACTIVITY */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {recentActivity.length > 0 ? (
              recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 rounded-lg border border-gray-100 flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium text-sm text-gray-900">
                      {activity.description}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(activity.time).toLocaleString()}
                    </p>
                  </div>
                  <span className="text-sm text-indigo-600 font-medium">
                    {activity.engagement}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No recent activity.</p>
            )}
          </div>
        </div>

        {/* BUSINESS INFO */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
            Business Details
          </h2>
          <p className="mb-2">
            <span className="font-medium">Category:</span>{" "}
            {business.category || existingBusiness?.businessCategory || "N/A"}
          </p>
          <p className="mb-2">
            <span className="font-medium">Owner:</span>{" "}
            {user?.firstName} {user?.lastName}
          </p>
          <p className="text-sm text-gray-500">
            <span className="font-medium">Joined:</span>{" "}
            {new Date(
              business.joinedDate || existingBusiness?.createdAt || Date.now()
            ).toLocaleDateString()}
          </p>
          
          {/* Platform Performance Block (Optional: Displaying the new data) */}
          <h3 className="text-md font-semibold text-gray-700 mt-4 border-t pt-3">
            Platform Performance
          </h3>
          <ul className="text-sm text-gray-600 space-y-1 mt-2">
            {platformPerformance.map(platform => (
              <li key={platform._id}>
                <span className="font-medium capitalize">{platform._id}:</span> {platform.count} Posts ({platform.totalEngagement} Engagements)
              </li>
            ))}
          </ul>
          
        </div>
      </div>
    </div>
  );
};

// --- POSTS COMPONENTS ---

const PostCreateForm = ({ businessId, onClose, onSuccess, notify }) => {
  const [formData, setFormData] = useState({
    content: '',
    scheduledFor: '',
    filter: 'all',
  });
  const [mediaFile, setMediaFile] = useState(null);
  const [postLoading, setPostLoading] = useState(false);

  // Example filters (you can customize these)
  const filterOptions = [
    { label: 'All', value: 'all' },
    { label: 'Images', value: 'image' },
    { label: 'Videos', value: 'video' },
    { label: 'Scheduled', value: 'scheduled' },
    { label: 'Published', value: 'published' },
  ];

  const handleFilterChange = (value) => {
    setFormData((prev) => ({ ...prev, filter: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPostLoading(true);

    const data = new FormData();
    data.append('businessId', businessId);
    data.append('content', formData.content);
    data.append('filter', formData.filter);
    data.append('scheduledFor', formData.scheduledFor);
    if (mediaFile) {
      data.append('media', mediaFile);
    }

    try {
      console.log('[DEBUG] Post Creation: Attempting to post content.');
      await axios.post('/posts', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      notify('success', 'Post created successfully.');
      onSuccess();
    } catch (err) {
      console.error('[ERROR] Post creation error:', err.response?.data || err.message);
      notify('error', err.response?.data?.message || 'Failed to create post.');
    } finally {
      setPostLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl p-6">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h3 className="text-xl font-semibold">Schedule New Post</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Content */}
          <textarea
            placeholder="Post content..."
            value={formData.content}
            required
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="w-full p-3 border rounded-lg h-32 resize-none focus:ring-indigo-500 focus:border-indigo-500"
          />

          {/* Filter Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Filter
            </label>
            <div className="flex flex-wrap gap-2">
              {filterOptions.map((option) => (
                <button
                  type="button"
                  key={option.value}
                  onClick={() => handleFilterChange(option.value)}
                  className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
                    formData.filter === option.value
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Schedule Date */}
          <div className="flex space-x-4 items-center">
            <label className="text-gray-700">Schedule Date (Optional):</label>
            <input
              type="datetime-local"
              value={formData.scheduledFor}
              onChange={(e) => setFormData({ ...formData, scheduledFor: e.target.value })}
              className="p-3 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Media */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Media (Image/Video)
            </label>
            <input
              type="file"
              accept="image/*,video/*"
              onChange={(e) => setMediaFile(e.target.files[0])}
              className="w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={postLoading}
            className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition disabled:opacity-50"
          >
            {postLoading ? 'Creating...' : 'Create Post'}
          </button>
        </form>
      </div>
    </div>
  );
};


const CommentSection = ({ postId, comments, setComments, notify, currentUser }) => {
  const [newCommentText, setNewCommentText] = useState('');
  const [isCommenting, setIsCommenting] = useState(false);
  
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return notify('info', "Please log in to comment.");
    if (!newCommentText.trim()) return;

    setIsCommenting(true);
    try {
      const res = await axios.post(`/post/${postId}/comment`, { 
        userId: currentUser._id, 
        text: newCommentText.trim() 
      });
      
      const newComment = { 
        ...res.data.comment, 
        userId: { name: `${currentUser.firstName} ${currentUser.lastName}` } 
      }; 
      
      setComments(prev => [...prev, newComment]);
      setNewCommentText('');
      notify('success', 'Comment added!');
    } catch (err) {
      notify('error', 'Failed to add comment.');
    } finally {
      setIsCommenting(false);
    }
  };
  
  return (
    <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
      <h4 className="text-md font-semibold text-gray-700">
        Comments ({comments.length})
      </h4>
      <div className="max-h-60 overflow-y-auto space-y-3 pr-2">
        {comments.map((comment, index) => (
          <div key={index} className="p-3 bg-gray-50 rounded-lg text-sm">
            <p className="font-medium text-gray-800">
              {comment.userId?.name || 'User'}
            </p>
            <p className="text-gray-600 mt-1">{comment.text}</p>
          </div>
        ))}
      </div>
      
      <form onSubmit={handleCommentSubmit} className="flex space-x-2 pt-2">
        <input
          type="text" 
          placeholder="Add a comment..."
          value={newCommentText} 
          onChange={(e) => setNewCommentText(e.target.value)}
          className="flex-grow p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          type="submit" 
          disabled={isCommenting || !currentUser}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isCommenting ? '...' : 'Send'}
        </button>
      </form>
    </div>
  );
};
const LikesModal = ({ likesList, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-96 max-h-[70vh] overflow-y-auto p-5">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Liked by</h2>
        
        {likesList.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {likesList.map(user => (
              <li key={user._id} className="py-3 flex items-center">
                <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold mr-3">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{user.name}</p>
                  <p className="text-gray-500 text-sm">{user.email}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center py-6">No likes yet.</p>
        )}

        <button 
          onClick={onClose} 
          className="w-full mt-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};
const PostCard = ({ post, notify, currentUser, onDelete }) => {
  const [likes, setLikes] = useState(post.likesCount || 0);
  const [likesList, setLikesList] = useState(post.likesList || []);
  const [showLikes, setShowLikes] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState(post.commentsList || []);
  const [showComments, setShowComments] = useState(false);

  // ✅ Check if current user has liked this post
  const checkLikeStatus = async () => {
    if (!currentUser) return;
    try {
      const res = await axios.get(`/post/${post._id}/like-status/${currentUser._id}`);
      setIsLiked(res.data.isLiked);
    } catch (err) {
      console.error("Failed to check like status:", err);
    }
  };

  useEffect(() => {
    checkLikeStatus();
  }, [post._id, currentUser]);

  // ✅ Fetch comments for this post
  const fetchComments = async () => {
    try {
      const res = await axios.get(`/post/${post._id}/comments`);
      setComments(res.data.comments || []);
    } catch (err) {
      notify('error', 'Failed to fetch comments.');
    }
  };

  // ✅ Handle like/unlike
  const handleLike = async () => {
    if (!currentUser) return notify("info", "Please log in to interact with posts.");

    try {
      const res = await axios.post(`/post/${post._id}/like`, { userId: currentUser._id });
      setLikes(res.data.likesCount);
      setIsLiked(res.data.isLiked);

      // Refresh likes list after like/unlike
      const updated = await axios.get(`/post/${post.business}`);
      const current = updated.data.posts.find(p => p._id === post._id);
      if (current) setLikesList(current.likesList);

      notify('success', res.data.isLiked ? 'Post liked!' : 'Post unliked!');
    } catch (err) {
      notify('error', 'Failed to toggle like.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 relative">
      {/* ✅ Delete button (only show for post owner or business owner) */}
      {currentUser && post.user === currentUser._id && (
        <button
          onClick={() => onDelete(post._id)}
          className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-md transition"
          title="Delete Post"
        >
          ✕
        </button>
      )}

      {post.mediaUrl && (
        <div className="mb-4">
          <img 
            src={`${post.mediaUrl}`} 
            alt="Post Media" 
            className="w-full h-80 object-cover rounded-lg" 
            onError={(e) => { 
              e.target.src = 'https://placehold.co/600x400/CCCCCC/333333?text=Image+Not+Found'; 
            }}
          />
        </div>
      )}

      <p className="text-gray-800 mb-3">{post.content}</p>

      <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
        <Clock size={16} />
        <span>{new Date(post.createdAt).toLocaleString()}</span>
      </div>

      <div className="flex items-center justify-between border-t pt-4">
        <div className="flex space-x-4">
          <button 
            onClick={handleLike} 
            className="flex items-center text-sm font-medium hover:text-red-500 transition"
          >
            <Heart 
              size={20} 
              className={`mr-1 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
            />
            {likes} Likes
          </button>

          {likes > 0 && (
            <button 
              onClick={() => setShowLikes(true)} 
              className="text-sm text-blue-600 underline hover:text-blue-800"
            >
              View
            </button>
          )}

          <button 
            onClick={() => { 
              setShowComments(!showComments); 
              if (!showComments) fetchComments(); 
            }} 
            className="flex items-center text-sm font-medium hover:text-blue-500 transition"
          >
            <MessageCircle size={20} className="mr-1 text-gray-400" />
            {post.commentsCount || 0} Comments
          </button>
        </div>
      </div>

      {showComments && (
        <CommentSection 
          postId={post._id} 
          comments={comments} 
          setComments={setComments} 
          notify={notify} 
          currentUser={currentUser}
        />
      )}

      {showLikes && (
        <LikesModal 
          likesList={likesList} 
          onClose={() => setShowLikes(false)} 
        />
      )}
    </div>
  );
};

const PostsScreen = ({ business, currentUser, notify }) => {
  const [posts, setPosts] = useState([]);
  const [isPostFormOpen, setIsPostFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const businessId = business?._id;

  const fetchPosts = useCallback(async () => {
    if (!businessId) {
      setLoading(false);
      return;
    }
    
    setLoading(true);
    try {
      const res = await axios.get(`/post/${businessId}`);
      setPosts(res.data.posts || []);
    } catch (error) {
      console.error('Failed to fetch posts:', error.response?.data || error.message);
      notify('error', 'Failed to fetch posts.');
    } finally {
      setLoading(false);
    }
  }, [businessId, notify]);

  useEffect(() => {
    if (businessId) fetchPosts();
  }, [businessId, fetchPosts]);

  const handlePostCreated = () => {
    setIsPostFormOpen(false);
    fetchPosts();
  };

  // ✅ Delete post handler
  const handleDeletePost = async (postId) => {
    const confirmed = window.confirm("Are you sure you want to delete this post?");
    if (!confirmed) return;

    try {
      await axios.delete(`/post/${postId}`);
      notify('success', 'Post deleted successfully.');
      setPosts(prev => prev.filter(p => p._id !== postId));
    } catch (error) {
      console.error('Delete post failed:', error.response?.data || error.message);
      notify('error', 'Failed to delete post.');
    }
  };

  if (loading) return <LoadingSpinner text="Loading Posts..." />;

  return (
    <div className="p-6 bg-gray-50 min-h-full rounded-lg">
      <div className="flex justify-between items-center mb-6 border-b pb-3">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          <Image className="mr-2" /> Content Manager
        </h1>
        <button 
          onClick={() => setIsPostFormOpen(true)} 
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          <Plus size={20} className="mr-1" /> New Post
        </button>
      </div>

      {isPostFormOpen && (
        <PostCreateForm 
          businessId={businessId} 
          onClose={() => setIsPostFormOpen(false)} 
          onSuccess={handlePostCreated}
          notify={notify}
        />
      )}
      
      <div className="space-y-6 mt-6">
        {posts.length > 0 ? posts.map(post => (
          <PostCard 
            key={post._id} 
            post={post} 
            notify={notify} 
            currentUser={currentUser}
            onDelete={handleDeletePost}
          />
        )) : (
          <p className="text-center text-gray-500 p-8 bg-white rounded-xl shadow">
            No posts found for this business.
          </p>
        )}
      </div>
    </div>
  );
};

const ProductCreateForm = ({ businessId, onClose, onSuccess, notify }) => {
  const [formData, setFormData] = useState({ 
    name: '', 
    productLink: '', 
    price: '' 
  });
  const [imageFile, setImageFile] = useState(null);
  const [prodLoading, setProdLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProdLoading(true);
    
    const data = new FormData();
    data.append('businessId', businessId);
    data.append('name', formData.name);
    data.append('productLink', formData.productLink);
    data.append('price', formData.price);
    if (imageFile) {
      data.append('image', imageFile);
    }

    try {
      console.log('[DEBUG] Product Creation: Attempting to create product.');
      await axios.post('/products', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      notify('success', 'Product created successfully.');
      onSuccess();
    } catch (err) {
      console.error('[ERROR] Product creation error:', err.response?.data);
      notify('error', err.response?.data?.message || 'Failed to create product.');
    } finally {
      setProdLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h3 className="text-xl font-semibold">Create New Product</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text" 
            placeholder="Product Name" 
            value={formData.name} 
            required
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full p-3 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
          <input 
            type="text" 
            placeholder="Product Link (Optional)" 
            value={formData.productLink}
            onChange={(e) => setFormData({...formData, productLink: e.target.value})}
            className="w-full p-3 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
          <input 
            type="number" 
            step="0.01" 
            placeholder="Price" 
            value={formData.price} 
            required
            onChange={(e) => setFormData({...formData, price: e.target.value})}
            className="w-full p-3 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Image (Required)
            </label>
            <input 
              type="file" 
              required 
              accept="image/*" 
              onChange={(e) => setImageFile(e.target.files[0])}
              className="w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
          </div>
          <button 
            type="submit" 
            disabled={prodLoading}
            className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition disabled:opacity-50"
          >
            {prodLoading ? 'Adding Product...' : 'Add Product'}
          </button>
        </form>
      </div>
    </div>
  );
};
const ProductCard = ({ product, onDelete }) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 relative">
    <img
      src={`${product.image?.url || '/uploads/default.png'}`}
      alt={product.name}
      className="w-full h-48 object-cover"
      onError={(e) => {
        e.target.src = 'https://placehold.co/400x300/CCCCCC/333333?text=Image+Not+Found';
      }}
    />

    {/* Delete button (top-right corner) */}
    <button
      onClick={() => onDelete(product._id)}
      className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-md transition"
      title="Delete Product"
    >
      ✕
    </button>

    <div className="p-4">
      <h3 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h3>
      <p className="text-2xl font-bold text-indigo-600 mt-1 mb-3">
        ${(product.price || 0).toFixed(2)}
      </p>
      <div className="flex justify-between text-sm text-gray-600">
        <span>SKU: {product.sku}</span>
        <span className={`font-semibold ${product.isActive ? 'text-green-600' : 'text-red-600'}`}>
          {product.isActive ? 'Active' : 'Inactive'}
        </span>
      </div>
    </div>
  </div>
);
const ProductsScreen = ({ business, notify }) => {
  const [products, setProducts] = useState([]);
  const [isProductFormOpen, setIsProductFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const businessId = business?._id;

  const fetchProducts = useCallback(async () => {
    if (!businessId) {
      setLoading(false);
      return;
    }
    
    setLoading(true);
    try {
      const res = await axios.get(`/product/${businessId}`);
      setProducts(res.data.products || []);
    } catch (error) {
      console.error('Failed to fetch products:', error.response?.data || error.message);
      notify('error', 'Failed to fetch products.');
    } finally {
      setLoading(false);
    }
  }, [businessId, notify]);

  useEffect(() => {
    if (businessId) fetchProducts();
  }, [businessId, fetchProducts]);

  const handleProductCreated = () => {
    setIsProductFormOpen(false);
    fetchProducts();
  };

  // ✅ Delete product handler
  const handleDeleteProduct = async (productId) => {
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;

    try {
      await axios.delete(`/product/${productId}`);
      notify('success', 'Product deleted successfully.');
      setProducts(prev => prev.filter(p => p._id !== productId));
    } catch (error) {
      console.error('Delete product failed:', error.response?.data || error.message);
      notify('error', 'Failed to delete product.');
    }
  };

  if (loading) return <LoadingSpinner text="Loading Products..." />;

  return (
    <div className="p-6 bg-gray-50 min-h-full rounded-lg">
      <div className="flex justify-between items-center mb-6 border-b pb-3">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          <ShoppingBag className="mr-2" /> Product Listing
        </h1>
        <button 
          onClick={() => setIsProductFormOpen(true)} 
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          <Plus size={20} className="mr-1" /> New Product
        </button>
      </div>

      {isProductFormOpen && (
        <ProductCreateForm 
          businessId={businessId}
          onClose={() => setIsProductFormOpen(false)} 
          onSuccess={handleProductCreated}
          notify={notify}
        />
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {products.length > 0 ? products.map(product => (
          <ProductCard key={product._id} product={product} onDelete={handleDeleteProduct} />
        )) : (
          <p className="col-span-4 text-center text-gray-500 p-8 bg-white rounded-xl shadow">
            No products listed.
          </p>
        )}
      </div>
    </div>
  );
};
const PromotionCreateForm = ({
  businessId,
  onClose,
  onSuccess,
  notify,
  existingPromotion,
}) => {
  const [formData, setFormData] = useState(() => ({
    name: "",
    description: "",
    type: "general",
    couponCode: "",
    link: "",
    startDate: "",
    endDate: "",
    platforms: ["website"],
    status: "draft",
    displayType: "banner",
  }));

  const [imageFile, setImageFile] = useState(null);
  const [promoLoading, setPromoLoading] = useState(false);

  useEffect(() => {
    if (existingPromotion) {
      setFormData({
        name: existingPromotion.name || "",
        description: existingPromotion.description || "",
        type: existingPromotion.type || "general",
        couponCode: existingPromotion.couponCode || "",
        link: existingPromotion.link || "",
        startDate: existingPromotion.startDate
          ? new Date(existingPromotion.startDate).toISOString().slice(0, 16)
          : "",
        endDate: existingPromotion.endDate
          ? new Date(existingPromotion.endDate).toISOString().slice(0, 16)
          : "",
        platforms: existingPromotion.platforms || ["website"],
        status: existingPromotion.status || "draft",
        displayType: existingPromotion.displayType || "banner",
      });
    }
  }, [existingPromotion]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPromoLoading(true);

    const data = new FormData();
    data.append("businessId", businessId);

    // Append all form data
    Object.keys(formData).forEach((key) => {
      if (key === "platforms") {
        formData[key].forEach((platform) => data.append("platforms", platform));
      } else {
        data.append(key, formData[key]);
      }
    });

    if (imageFile) {
      data.append("image", imageFile);
    }

    try {
      const isUpdate = !!existingPromotion;
      const apiEndpoint = isUpdate
        ? `/promotions/${existingPromotion._id}`
        : "/promotions";
      const method = isUpdate ? axios.put : axios.post;

      await method(apiEndpoint, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      notify("success", `Promotion ${isUpdate ? "updated" : "created"} successfully.`);
      onSuccess();
    } catch (err) {
      console.error("Promotion operation error:", err.response?.data);
      notify(
        "error",
        err.response?.data?.message ||
          `Failed to ${existingPromotion ? "update" : "create"} promotion.`
      );
    } finally {
      setPromoLoading(false);
    }
  };

  const platformOptions = [
    { value: "facebook", label: "Facebook" },
    { value: "instagram", label: "Instagram" },
    { value: "twitter", label: "Twitter" },
    { value: "google", label: "Google" },
    { value: "email", label: "Email" },
    { value: "website", label: "Website" },
  ];

  const handlePlatformChange = (platform) => {
    setFormData((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter((p) => p !== platform)
        : [...prev.platforms, platform],
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b pb-3 mb-4 p-6 sticky top-0 bg-white">
          <h3 className="text-xl font-semibold">
            {existingPromotion ? "Edit Promotion" : "Create New Promotion"}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          {/* Name */}
          <input
            type="text"
            placeholder="Promotion Name"
            value={formData.name}
            required
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            className="w-full p-3 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />

          {/* Description */}
          <textarea
            placeholder="Description"
            value={formData.description}
            required
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full p-3 border rounded-lg h-20 resize-none focus:ring-indigo-500 focus:border-indigo-500"
          />

          {/* Display Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Display Type
            </label>
            <select
              value={formData.displayType || "banner"}
              onChange={(e) =>
                setFormData({ ...formData, displayType: e.target.value })
              }
              className="w-full p-3 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="banner">Banner</option>
              <option value="popup">Popup</option>
            </select>
          </div>

          {/* Link */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Promotion Link
            </label>
            <input
              type="url"
              placeholder="https://example.com/promotion"
              value={formData.link}
              onChange={(e) =>
                setFormData({ ...formData, link: e.target.value })
              }
              className="w-full p-3 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date & Time
              </label>
              <input
                type="datetime-local"
                value={formData.startDate}
                required
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
                className="w-full p-3 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date & Time (Optional)
              </label>
              <input
                type="datetime-local"
                value={formData.endDate}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
                className="w-full p-3 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Platforms */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Platforms
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {platformOptions.map((platform) => (
                <label
                  key={platform.value}
                  className="flex items-center space-x-2"
                >
                  <input
                    type="checkbox"
                    checked={formData.platforms.includes(platform.value)}
                    onChange={() => handlePlatformChange(platform.value)}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm">{platform.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              className="w-full p-3 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="draft">Draft</option>
              <option value="scheduled">Scheduled</option>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
            </select>
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Promotion Image (Optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={promoLoading}
            className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition disabled:opacity-50"
          >
            {promoLoading
              ? "Saving..."
              : existingPromotion
              ? "Update Promotion"
              : "Create Promotion"}
          </button>
        </form>
      </div>
    </div>
  );
};
const PromotionCard = ({ promotion, onEdit, notify, onStatusChange, onDelete }) => {
  const [isActive, setIsActive] = useState(promotion.status === "active");
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "scheduled": return "bg-blue-100 text-blue-800";
      case "paused": return "bg-yellow-100 text-yellow-800";
      case "expired": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getDiscountText = () => {
    if (promotion.discountType === "none") {
      return promotion.type.replace("_", " ").toUpperCase();
    }
    return promotion.discountType === "percentage"
      ? `${promotion.discountValue}% OFF`
      : `₹${promotion.discountValue} OFF`;
  };

  // ✅ Toggle Active / Paused
  const togglePromotionStatus = async () => {
    setLoading(true);
    try {
      const newStatus = isActive ? "paused" : "active";
      const res = await axios.patch(`/promotions/${promotion._id}`, { status: newStatus });
      setIsActive(res.data.promotion.status === "active");
      notify("success", `Promotion ${newStatus} successfully.`);
      onStatusChange(); // refresh parent list
    } catch (err) {
      console.error(err);
      notify("error", "Failed to update promotion status.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete Promotion
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this promotion?")) return;
    setDeleting(true);
    try {
      await axios.delete(`/promotions/${promotion._id}`);
      notify("success", "Promotion deleted successfully.");
      onDelete(promotion._id);
    } catch (err) {
      console.error(err);
      notify("error", "Failed to delete promotion.");
    } finally {
      setDeleting(false);
    }
  };

  const isExpired = promotion.endDate && new Date(promotion.endDate) < new Date();

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold text-gray-800">{promotion.name}</h3>
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(promotion.status)}`}>
                {promotion.status.toUpperCase()}
              </span>
              {isExpired && (
                <span className="px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">
                  EXPIRED
                </span>
              )}
            </div>
          </div>

          <p className="text-gray-600 mb-3">{promotion.description}</p>

          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
            <div className="flex items-center">
              <Calendar size={16} className="mr-1" />
              <span>Starts: {new Date(promotion.startDate).toLocaleDateString()}</span>
            </div>
            {promotion.endDate && (
              <div className="flex items-center">
                <span>Ends: {new Date(promotion.endDate).toLocaleDateString()}</span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            {promotion.platforms?.map((platform) => (
              <span
                key={platform}
                className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium"
              >
                {platform.charAt(0).toUpperCase() + platform.slice(1)}
              </span>
            ))}
          </div>

          {promotion.couponCode && (
            <div className="mb-3">
              <span className="text-sm font-medium text-gray-700">Coupon Code: </span>
              <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                {promotion.couponCode}
              </code>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-2xl font-bold text-indigo-600">{getDiscountText()}</span>

              {promotion.performance && (
                <div className="text-sm text-gray-500">
                  <span className="mr-3">👁️ {promotion.performance.impressions || 0}</span>
                  <span className="mr-3">👆 {promotion.performance.clicks || 0}</span>
                  <span>💰 {promotion.performance.conversions || 0}</span>
                </div>
              )}
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(promotion)}
                className="p-2 text-gray-600 hover:text-indigo-600 transition"
                title="Edit Promotion"
              >
                <Edit size={18} />
              </button>

              {!isExpired && (
                <button
                  onClick={togglePromotionStatus}
                  disabled={loading}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                    isActive
                      ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                      : "bg-green-100 text-green-700 hover:bg-green-200"
                  } disabled:opacity-50`}
                >
                  {loading ? "..." : isActive ? "Pause" : "Activate"}
                </button>
              )}

              <button
                onClick={handleDelete}
                disabled={deleting}
                className="px-3 py-1 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 text-sm font-medium transition disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>

        {promotion.image && (
          <div className="ml-4 flex-shrink-0">
            <img
              src={`${promotion.image}`}
              alt={promotion.name}
              className="w-24 h-24 object-cover rounded-lg"
              onError={(e) => {
                e.target.src = "https://placehold.co/100x100/CCCCCC/333333?text=Promo";
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
const PromotionsScreen = ({ business, notify }) => {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [isPromotionFormOpen, setIsPromotionFormOpen] = useState(false);
  const [editingPromotion, setEditingPromotion] = useState(null);
  const businessId = business?._id;

  const fetchPromotions = useCallback(async () => {
    if (!businessId) return;
    setLoading(true);
    try {
      const res = await axios.get(`/promotions/${businessId}`);
      setPromotions(res.data.promotions || []);
    } catch (error) {
      console.error("Failed to fetch promotions:", error);
      notify("error", "Failed to fetch promotions.");
    } finally {
      setLoading(false);
    }
  }, [businessId, notify]);

  useEffect(() => {
    fetchPromotions();
  }, [fetchPromotions]);

  const handlePromotionCreated = () => {
    setIsPromotionFormOpen(false);
    setEditingPromotion(null);
    fetchPromotions();
  };

  const handleDeletePromotion = (id) => {
    setPromotions((prev) => prev.filter((promo) => promo._id !== id));
  };

  const filteredPromotions = promotions.filter((promo) => {
    if (filter === "all") return true;
    const isExpired = promo.endDate && new Date(promo.endDate) < new Date();
    if (filter === "expired") return isExpired;
    return promo.status === filter;
  });

  if (loading) return <LoadingSpinner text="Loading Promotions..." />;

  return (
    <div className="p-6 bg-gray-50 min-h-full rounded-lg">
      <div className="flex justify-between items-center mb-6 border-b pb-3">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          <Tag className="mr-2" /> Promotions Manager
        </h1>
        <button
          onClick={() => {
            setEditingPromotion(null);
            setIsPromotionFormOpen(true);
          }}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          <Plus size={20} className="mr-1" /> New Promotion
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6">
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {["all", "active", "scheduled", "paused", "draft", "expired"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${
                filter === status
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)} (
              {status === "all"
                ? promotions.length
                : promotions.filter((p) => p.status === status).length}
              )
            </button>
          ))}
        </div>
      </div>

      {isPromotionFormOpen && (
        <PromotionCreateForm
          businessId={businessId}
          onClose={() => {
            setIsPromotionFormOpen(false);
            setEditingPromotion(null);
          }}
          onSuccess={handlePromotionCreated}
          notify={notify}
          existingPromotion={editingPromotion}
        />
      )}

      <div className="space-y-6">
        {filteredPromotions.length > 0 ? (
          filteredPromotions.map((promotion) => (
            <PromotionCard
              key={promotion._id}
              promotion={promotion}
              onEdit={(promo) => {
                setEditingPromotion(promo);
                setIsPromotionFormOpen(true);
              }}
              notify={notify}
              onStatusChange={fetchPromotions}
              onDelete={handleDeletePromotion}
            />
          ))
        ) : (
          <div className="text-center p-8 bg-white rounded-xl shadow">
            <Tag size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No promotions found</h3>
            <p className="text-gray-500 mb-4">
              {filter === "all"
                ? "You haven't created any promotions yet."
                : `No ${filter} promotions found.`}
            </p>
            {filter === "all" && (
              <button
                onClick={() => {
                  setEditingPromotion(null);
                  setIsPromotionFormOpen(true);
                }}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                Create Your First Promotion
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
const Sidebar = ({ currentPage, onPageChange, business, onLogout, isOpen, onClose }) => {
  const navItems = [
    { name: 'Dashboard', page: 'dashboard', icon: Home },
    { name: 'Profile', page: 'business-profile', icon: Briefcase },
    { name: 'Content Posts', page: 'posts', icon: Image },
    { name: 'Products', page: 'products', icon: ShoppingBag },
    { name: 'Promotions', page: 'promotions', icon: Tag },
  ];

  const listClasses = "flex items-center p-3 rounded-xl hover:bg-indigo-50 transition duration-150 cursor-pointer";
  const activeClasses = "bg-indigo-100 text-indigo-700 font-semibold";

  return (
    <div
      className={`fixed inset-y-0 left-0 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out bg-white w-64 p-5 shadow-xl z-30 flex flex-col justify-between`}
    >
      {/* --- Top Section --- */}
      <div>
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-2xl font-extrabold text-indigo-600">SocialDash</h1>
          <button
            onClick={onClose}
            className="lg:hidden text-gray-600 hover:text-indigo-600"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="space-y-2">
          {navItems.map(item => (
            <div
              key={item.page}
              onClick={() => {
                onPageChange(item.page);
                onClose();
              }}
              className={`${listClasses} ${
                currentPage === item.page
                  ? activeClasses
                  : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'
              } flex items-center rounded-lg p-2 cursor-pointer transition`}
            >
              <item.icon size={20} className="mr-3" />
              {item.name}
            </div>
          ))}
        </nav>
      </div>

      {/* --- Bottom Section --- */}
      <div className="border-t pt-4">
        <div className="flex items-center mb-3">
          <Briefcase size={20} className="mr-2 text-gray-500" />
          <span className="font-semibold text-gray-700 truncate">
            {business?.businessName || 'N/A'}
          </span>
        </div>

        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center p-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition"
        >
          <LogIn size={20} className="mr-2" /> Logout
        </button>
      </div>
    </div>
  );
};

// --- MAIN APP COMPONENT ---
const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'));
  const [business, setBusiness] = useState(JSON.parse(localStorage.getItem('business') || 'null'));
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  const notify = useCallback((type, message) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  }, []);

  const handleLogout = useCallback(() => {
    console.log('[DEBUG] Logging out. Clearing storage.');
    localStorage.clear();
    setToken(null);
    setUser(null);
    setBusiness(null);
    setCurrentPage('login');
    notify('info', "Logged out successfully.");
  }, [notify]);

  const checkAuthAndBusiness = useCallback(async () => {
    const storedToken = localStorage.getItem('token');
    const storedUserId = localStorage.getItem('userId');
    
    console.log(`[DEBUG] Initial Check: Token=${!!storedToken}, UserID=${!!storedUserId}`);
    
    if (!storedToken || !storedUserId) {
      setIsLoading(false);
      setCurrentPage('login');
      return;
    }

    try {
      let fetchedBusiness = null;
      
      const businessRes = await axios.get(`/business`, {
        params: { userId: storedUserId },
        headers: { Authorization: `Bearer ${storedToken}` },
      });

      fetchedBusiness = businessRes.data.business;
      
      if (fetchedBusiness) {
        console.log('[DEBUG] Business Found:', fetchedBusiness);
        setBusiness(fetchedBusiness);
        localStorage.setItem('business', JSON.stringify(fetchedBusiness));
        localStorage.setItem('businessId', fetchedBusiness._id);

        if (fetchedBusiness.user) {
          setUser(fetchedBusiness.user);
          localStorage.setItem('user', JSON.stringify(fetchedBusiness.user));
        }

        if (fetchedBusiness.status === 'active' && fetchedBusiness.verified) {
          setCurrentPage('dashboard');
        } else {
          setCurrentPage('business-pending');
        }
      } else {
        console.log('[DEBUG] No Business Profile Found. Redirecting to setup.');
        setCurrentPage('business-profile');
      }
    } catch (error) {
      console.error('[ERROR] Initial check failed (Authentication/Business Fetch):', error.response?.data || error.message);
      if (error.response?.status === 401) {
        handleLogout();
        notify('error', 'Session expired. Please log in again.');
      } else if (error.response?.status !== 404) {
        // 404 might mean no business exists yet, which is expected for a new owner.
        // Other errors need a notification.
        notify('error', 'Network error or unhandled server error. Please try again.');
      } else {
        // Force new business creation screen if 404
        setCurrentPage('business-profile');
      }
    } finally {
      setIsLoading(false);
    }
  }, [handleLogout, notify]);

  useEffect(() => {
    if (token) {
      console.log('[DEBUG] Setting Authorization Header.');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      console.log('[DEBUG] Clearing Authorization Header.');
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  useEffect(() => {
    checkAuthAndBusiness();
  }, [checkAuthAndBusiness]);

  const handleAuthSuccess = useCallback((type, message, newToken, newUser) => {
    console.log(`[DEBUG] Auth Success Handler: Type=${type}`);
    if (type === 'success') {
      localStorage.setItem('token', newToken);
      localStorage.setItem('userId', newUser._id || newUser.id);
      localStorage.setItem('user', JSON.stringify(newUser));
      
      setToken(newToken);
      setUser(newUser);
      
      // Re-run the main check logic to fetch business data and navigate
      checkAuthAndBusiness();
    }
    notify(type, message);
  }, [checkAuthAndBusiness, notify]);

  const handleBusinessSubmit = async (formData, logoFile) => {
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    if (logoFile) {
      data.append('media', logoFile);
    }
    
    const isUpdate = business && business._id;
    if (!isUpdate) {
      data.append('userId', user._id);
    }

    try {
      const apiEndpoint = isUpdate ? `/business/${business._id}` : '/business';
      const method = isUpdate ? axios.put : axios.post;
      console.log(`[DEBUG] Business Submission: ${isUpdate ? 'Updating' : 'Creating'} business at ${apiEndpoint}`);

      const response = await method(apiEndpoint, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const newBusiness = response.data.business;
      setBusiness(newBusiness);
      localStorage.setItem('business', JSON.stringify(newBusiness));
      localStorage.setItem('businessId', newBusiness._id);

      notify('success', `Business ${isUpdate ? 'updated' : 'registered'} successfully.`);

      if (newBusiness.status === 'active' && newBusiness.verified) {
        setCurrentPage('dashboard');
      } else {
        setCurrentPage('business-pending');
      }
    } catch (err) {
      console.error('[ERROR] Business operation error:', err.response?.data);
      notify('error', err.response?.data?.message || `Failed to ${business ? 'update' : 'register'} business.`);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
          <LoadingSpinner text="Initializing application..." />
        </div>
      );
    }
    
    if (!token || !user) {
      return (
        <AuthScreen 
          isRegister={authMode === 'register'} 
          onAuthSuccess={handleAuthSuccess}
          switchMode={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
        />
      );
    }

    const isBusinessRegistered = business && business._id;
    const isBusinessActive = business && business.status === 'active' && business.verified;

    if (!isBusinessRegistered || currentPage === 'business-profile-setup') {
      return (
        <BusinessProfileScreen 
          existingBusiness={business} 
          onSubmit={handleBusinessSubmit}
          onCancel={currentPage !== 'business-profile-setup' ? () => setCurrentPage('dashboard') : undefined}
          loading={false}
        />
      );
    }

    if (!isBusinessActive) {
      return <BusinessPendingScreen business={business} onLogout={handleLogout} />;
    }
    
    if (isBusinessActive) {
      switch (currentPage) {
        case 'dashboard':
          return <DashboardScreen existingBusiness={business} user={user} notify={notify} />;
        case 'posts':
          return <PostsScreen business={business} currentUser={user} notify={notify} />;
        case 'products':
          return <ProductsScreen business={business} notify={notify} />;
        case 'promotions':
          return <PromotionsScreen business={business} notify={notify} />;
        case 'business-profile':
          return (
            <BusinessProfileScreen 
              existingBusiness={business} 
              onSubmit={handleBusinessSubmit}
              onCancel={() => setCurrentPage('dashboard')}
              loading={false}
            />
          );
        default:
          return <DashboardScreen existingBusiness={business} user={user} notify={notify} />;
      }
    }
    
    return <div className="p-6 text-center text-red-500">Authentication/State Error. Please refresh.</div>;
  };

  const isMainApp = token && business && business.status === 'active' && business.verified;

  return (
    <div className={`font-sans ${isMainApp ? 'flex min-h-screen bg-gray-50' : 'min-h-screen'}`}>
      
      {isMainApp && (
        <Sidebar 
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          business={business}
          onLogout={handleLogout}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      )}
      
      <div className={`${isMainApp ? 'flex-1 p-4 lg:p-6' : 'w-full'}`}>
        
        {isMainApp && (
          <div className="lg:hidden flex justify-between items-center bg-white p-4 rounded-xl shadow mb-4">
            <button onClick={() => setIsSidebarOpen(true)} className="text-indigo-600">
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-bold text-indigo-600">{business.businessName}</h1>
            <div className="w-6"></div>
          </div>
        )}

        {notification && (
          <div className="fixed top-4 right-4 z-50 transition-all duration-300 transform translate-x-0">
            <Notification 
              {...notification} 
              onClose={() => setNotification(null)} 
            />
          </div>
        )}

        {renderContent()}
      </div>
    </div>
  );
};

export default App;