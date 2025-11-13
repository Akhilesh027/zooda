const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  }
});

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://192.168.0.104:27017/socialdash', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Database Models
const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, select: false },
  phone: { type: String, default: null },
  address: { type: String, default: null },
  avatar: { type: String, default: null },
  role: { type: String, enum: ['user', 'admin', 'business_owner'], default: 'user' },
  socialAccounts: {
    facebook: { type: String, default: null },
    twitter: { type: String, default: null },
    instagram: { type: String, default: null },
    linkedin: { type: String, default: null }
  }
}, { timestamps: true });

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', UserSchema);

const BusinessSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  businessName: { type: String, required: true },
  businessCategory: { 
    type: String, 
    required: true,
    enum: ['retail', 'services', 'technology', 'healthcare', 'finance', 'education', 'hospitality', 'other']
  },
  businessDescription: { type: String, required: true },
  businessWebsite: { type: String, default: null },
  businessAddress: { type: String, required: true },
  businessPhone: { type: String, required: true },
  businessLogo: { type: String, default: null }
}, { timestamps: true });

const Business = mongoose.model('Business', BusinessSchema);

const PostSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  business: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true },
  content: { type: String, required: true },
  mediaUrl: { type: String, default: null },
  mediaType: { type: String, enum: ['image', 'video', 'none'], default: 'none' },
  platforms: [{ type: String, enum: ['facebook', 'twitter', 'instagram', 'linkedin'] }],
  status: { 
    type: String, 
    enum: ['draft', 'scheduled', 'published', 'failed'], 
    default: 'draft' 
  },
  scheduledFor: { type: Date, default: null },
  engagement: {
    likes: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    clicks: { type: Number, default: 0 }
  },
  tags: [String]
}, { timestamps: true });

const Post = mongoose.model('Post', PostSchema);

const ProductSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  business: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, required: true, min: 0, default: 0 },
  sku: { type: String, unique: true, sparse: true },
  images: [{
    url: String,
    alt: String,
    isPrimary: { type: Boolean, default: false }
  }],
  category: { type: String, required: true },
  tags: [String],
  features: [String],
  isActive: { type: Boolean, default: true },
  sales: {
    totalSold: { type: Number, default: 0 },
    revenue: { type: Number, default: 0 }
  }
}, { timestamps: true });

ProductSchema.pre('save', function(next) {
  if (!this.sku) {
    this.sku = `SKU-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
  next();
});

const Product = mongoose.model('Product', ProductSchema);

const PromotionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  business: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['discount', 'bogo', 'free_shipping', 'flash_sale', 'coupon', 'bundle'],
    required: true 
  },
  discountType: { 
    type: String, 
    enum: ['percentage', 'fixed', 'none'], 
    default: 'none' 
  },
  discountValue: { type: Number, default: 0 },
  couponCode: { type: String, uppercase: true, trim: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ['active', 'scheduled', 'paused', 'expired', 'draft'], 
    default: 'draft' 
  },
  platforms: [{ 
    type: String, 
    enum: ['facebook', 'instagram', 'twitter', 'google', 'email', 'website'] 
  }],
  performance: {
    impressions: { type: Number, default: 0 },
    clicks: { type: Number, default: 0 },
    conversions: { type: Number, default: 0 },
    revenue: { type: Number, default: 0 }
  }
}, { timestamps: true });

const Promotion = mongoose.model('Promotion', PromotionSchema);

const AnalyticsSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  business: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true },
  period: { 
    type: String, 
    required: true, 
    enum: ['daily', 'weekly', 'monthly'] 
  },
  date: { type: Date, required: true },
  followers: {
    total: { type: Number, default: 0 },
    growth: { type: Number, default: 0 }
  },
  engagement: {
    rate: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
    shares: { type: Number, default: 0 }
  },
  reach: {
    total: { type: Number, default: 0 },
    organic: { type: Number, default: 0 },
    paid: { type: Number, default: 0 }
  },
  sales: {
    revenue: { type: Number, default: 0 },
    orders: { type: Number, default: 0 },
    conversionRate: { type: Number, default: 0 }
  }
}, { timestamps: true });

const Analytics = mongoose.model('Analytics', AnalyticsSchema);

// Authentication Middleware
const authMiddleware = async (req, res, next) => {
  let token;
  
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
      req.user = await User.findById(decoded.id).select('-password');
      
      if (!req.user) {
        return res.status(401).json({ message: 'Not authorized, user not found' });
      }
      
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }
  
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Utility function to generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'your_jwt_secret', {
    expiresIn: '30d',
  });
};

// Get user's business
const getUserBusiness = async (userId) => {
  return await Business.findOne({ user: userId });
};

// API Routes

// Auth Routes
app.post('/api/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
    });

    if (user) {
      const token = generateToken(user._id);
      
      res.status(201).json({
        success: true,
        token,
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
        },
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email }).select('+password');
    
    if (user && (await user.matchPassword(password))) {
      const token = generateToken(user._id);
      
      res.json({
        success: true,
        token,
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
        },
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// Profile Routes
app.get('/api/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const business = await Business.findOne({ user: req.user.id });

    res.json({
      success: true,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        address: user.address,
        avatar: user.avatar,
        role: user.role,
        socialAccounts: user.socialAccounts,
      },
      business: business || null,
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error while fetching profile' });
  }
});

app.put('/api/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (user) {
      user.firstName = req.body.firstName || user.firstName;
      user.lastName = req.body.lastName || user.lastName;
      user.phone = req.body.phone || user.phone;
      user.address = req.body.address || user.address;
      user.avatar = req.body.avatar || user.avatar;
      user.socialAccounts = req.body.socialAccounts || user.socialAccounts;

      const updatedUser = await user.save();

      res.json({
        success: true,
        user: {
          id: updatedUser._id,
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          email: updatedUser.email,
          phone: updatedUser.phone,
          address: updatedUser.address,
          avatar: updatedUser.avatar,
          role: updatedUser.role,
          socialAccounts: updatedUser.socialAccounts,
        },
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error while updating profile' });
  }
});

// Business Routes
app.post('/api/business', authMiddleware, async (req, res) => {
  try {
    const {
      businessName,
      businessCategory,
      businessDescription,
      businessWebsite,
      businessAddress,
      businessPhone
    } = req.body;

    if (!businessName || !businessCategory || !businessDescription || !businessAddress || !businessPhone) {
      return res.status(400).json({ message: 'All business fields are required' });
    }

    const existingBusiness = await Business.findOne({ user: req.user.id });
    if (existingBusiness) {
      return res.status(400).json({ message: 'User already has a business registered' });
    }

    const business = await Business.create({
      user: req.user.id,
      businessName,
      businessCategory,
      businessDescription,
      businessWebsite,
      businessAddress,
      businessPhone
    });

    // Update user role to business_owner
    await User.findByIdAndUpdate(req.user.id, { role: 'business_owner' });

    res.status(201).json({
      success: true,
      business
    });
  } catch (error) {
    console.error('Create business error:', error);
    res.status(500).json({ message: 'Server error while creating business' });
  }
});

app.get('/api/business', authMiddleware, async (req, res) => {
  try {
    const business = await Business.findOne({ user: req.user.id });

    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }

    res.json({
      success: true,
      business
    });
  } catch (error) {
    console.error('Get business error:', error);
    res.status(500).json({ message: 'Server error while fetching business' });
  }
});

// Posts Routes
app.post('/api/posts', authMiddleware, async (req, res) => {
  try {
    const { content, platforms, mediaUrl, mediaType, scheduledFor, tags } = req.body;

    if (!content) {
      return res.status(400).json({ message: 'Post content is required' });
    }

    const business = await getUserBusiness(req.user.id);
    if (!business) {
      return res.status(400).json({ message: 'No business found for this user' });
    }

    const post = await Post.create({
      user: req.user.id,
      business: business._id,
      content,
      platforms: platforms || ['facebook'],
      mediaUrl: mediaUrl || null,
      mediaType: mediaType || 'none',
      scheduledFor: scheduledFor || null,
      tags: tags || [],
      status: scheduledFor ? 'scheduled' : 'draft'
    });

    res.status(201).json({
      success: true,
      post
    });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ message: 'Server error while creating post' });
  }
});

app.get('/api/posts', authMiddleware, async (req, res) => {
  try {
    const business = await getUserBusiness(req.user.id);
    if (!business) {
      return res.status(400).json({ message: 'No business found for this user' });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const posts = await Post.find({ business: business._id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('user', 'firstName lastName');

    const total = await Post.countDocuments({ business: business._id });

    res.json({
      success: true,
      posts,
      pagination: {
        page,
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ message: 'Server error while fetching posts' });
  }
});

// Products Routes
app.post('/api/products', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const { name, description, price, stock, category, tags, features } = req.body;

    if (!name || !description || !price || !stock || !category) {
      return res.status(400).json({ message: 'All product fields are required' });
    }

    const business = await getUserBusiness(req.user.id);
    if (!business) {
      return res.status(400).json({ message: 'No business found for this user' });
    }

    // Handle image upload
    let images = [];
    if (req.file) {
      images.push({
        url: `/uploads/${req.file.filename}`,
        alt: name,
        isPrimary: true
      });
    }

    const product = await Product.create({
      user: req.user.id,
      business: business._id,
      name,
      description,
      price: parseFloat(price),
      stock: parseInt(stock),
      category,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      features: features ? features.split(',').map(feature => feature.trim()) : [],
      images
    });

    res.status(201).json({
      success: true,
      product
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ message: 'Server error while creating product' });
  }
});

app.get('/api/products', authMiddleware, async (req, res) => {
  try {
    const business = await getUserBusiness(req.user.id);
    if (!business) {
      return res.status(400).json({ message: 'No business found for this user' });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const products = await Product.find({ business: business._id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Product.countDocuments({ business: business._id });

    res.json({
      success: true,
      products,
      pagination: {
        page,
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ message: 'Server error while fetching products' });
  }
});

// Promotions Routes
app.post('/api/promotions', authMiddleware, async (req, res) => {
  try {
    const { 
      name, 
      description, 
      type, 
      discountType, 
      discountValue, 
      couponCode, 
      startDate, 
      endDate, 
      platforms 
    } = req.body;

    if (!name || !description || !type || !startDate || !endDate) {
      return res.status(400).json({ message: 'All required promotion fields must be filled' });
    }

    const business = await getUserBusiness(req.user.id);
    if (!business) {
      return res.status(400).json({ message: 'No business found for this user' });
    }

    const promotion = await Promotion.create({
      user: req.user.id,
      business: business._id,
      name,
      description,
      type,
      discountType: discountType || 'none',
      discountValue: discountValue ? parseFloat(discountValue) : 0,
      couponCode: couponCode || null,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      platforms: platforms || ['website'],
      status: new Date(startDate) <= new Date() ? 'active' : 'scheduled'
    });

    res.status(201).json({
      success: true,
      promotion
    });
  } catch (error) {
    console.error('Create promotion error:', error);
    res.status(500).json({ message: 'Server error while creating promotion' });
  }
});

app.get('/api/promotions', authMiddleware, async (req, res) => {
  try {
    const business = await getUserBusiness(req.user.id);
    if (!business) {
      return res.status(400).json({ message: 'No business found for this user' });
    }

    const promotions = await Promotion.find({ business: business._id })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      promotions
    });
  } catch (error) {
    console.error('Get promotions error:', error);
    res.status(500).json({ message: 'Server error while fetching promotions' });
  }
});

// Analytics Routes
app.get('/api/analytics', authMiddleware, async (req, res) => {
  try {
    const business = await getUserBusiness(req.user.id);
    if (!business) {
      return res.status(400).json({ message: 'No business found for this user' });
    }

    // Get recent analytics or create default if none exists
    let analytics = await Analytics.findOne({ 
      business: business._id 
    }).sort({ date: -1 });

    if (!analytics) {
      // Create default analytics data
      analytics = await Analytics.create({
        user: req.user.id,
        business: business._id,
        period: 'monthly',
        date: new Date(),
        followers: {
          total: 12500,
          growth: 520
        },
        engagement: {
          rate: 48.7,
          likes: 2450,
          comments: 356,
          shares: 128
        },
        reach: {
          total: 45600,
          organic: 38900,
          paid: 6700
        },
        sales: {
          revenue: 12560,
          orders: 156,
          conversionRate: 3.4
        }
      });
    }

    // Get posts count
    const postsCount = await Post.countDocuments({ business: business._id });
    
    // Get products count
    const productsCount = await Product.countDocuments({ business: business._id });

    // Calculate total revenue from products
    const products = await Product.find({ business: business._id });
    const totalRevenue = products.reduce((sum, product) => sum + product.sales.revenue, 0);

    res.json({
      success: true,
      analytics: {
        followers: analytics.followers.total,
        engagement: analytics.engagement.rate,
        posts: postsCount,
        leads: analytics.sales.orders,
        revenue: totalRevenue,
        products: productsCount
      },
      detailedAnalytics: analytics
    });
  } catch (error) {
    console.error('Get analytics error:', error);
    res.status(500).json({ message: 'Server error while fetching analytics' });
  }
});

// Demo Data Endpoint (for initial setup)
app.post('/api/demo-data', authMiddleware, async (req, res) => {
  try {
    const business = await getUserBusiness(req.user.id);
    if (!business) {
      return res.status(400).json({ message: 'No business found for this user' });
    }

    // Create sample posts
    const samplePosts = [
      {
        user: req.user.id,
        business: business._id,
        content: "Check out our new summer collection! We're excited to launch these amazing products that will make your summer unforgettable.",
        platforms: ['facebook', 'instagram'],
        status: 'published',
        engagement: { likes: 124, comments: 23, shares: 15, views: 2450, clicks: 156 }
      },
      {
        user: req.user.id,
        business: business._id,
        content: "Behind the scenes at our photoshoot! Our team worked hard to bring you the best quality content and products.",
        platforms: ['instagram'],
        status: 'published',
        engagement: { likes: 89, comments: 12, shares: 8, views: 1870, clicks: 98 }
      }
    ];

    await Post.insertMany(samplePosts);

    // Create sample products
    const sampleProducts = [
      {
        user: req.user.id,
        business: business._id,
        name: "Premium Wireless Headphones",
        description: "High-quality wireless headphones with noise cancellation and premium sound quality.",
        price: 199.99,
        stock: 50,
        category: "Electronics",
        tags: ["wireless", "audio", "premium"],
        features: ["Noise Cancellation", "30hr Battery", "Bluetooth 5.0"]
      },
      {
        user: req.user.id,
        business: business._id,
        name: "Organic Cotton T-Shirt",
        description: "Comfortable and sustainable organic cotton t-shirt available in multiple colors.",
        price: 29.99,
        stock: 100,
        category: "Clothing",
        tags: ["organic", "sustainable", "cotton"],
        features: ["100% Organic Cotton", "Machine Washable", "Multiple Colors"]
      }
    ];

    await Product.insertMany(sampleProducts);

    // Create sample promotions
    const samplePromotions = [
      {
        user: req.user.id,
        business: business._id,
        name: "Summer Sale 2024",
        description: "Get 20% off on all summer collection items. Limited time offer!",
        type: "discount",
        discountType: "percentage",
        discountValue: 20,
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        status: "active",
        platforms: ["website", "email", "facebook"]
      }
    ];

    await Promotion.insertMany(samplePromotions);

    res.json({
      success: true,
      message: "Demo data created successfully"
    });
  } catch (error) {
    console.error('Demo data error:', error);
    res.status(500).json({ message: 'Server error while creating demo data' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'File too large. Maximum size is 10MB.' });
    }
  }
  
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});
app.get('/api/business/all', async (req, res) => {
  try {
    const business = await Business.find();
    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }
    res.json(business);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API Base URL: http://localhost:${PORT}/api`);
});