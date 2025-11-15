const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
cloudinary.config({
  cloud_name: "dguxtvyut",
  api_key: "952138336163551",
  api_secret: "ppFNE2zTSuTPotEZcemJ_on7iHg",
});

// ✅ Cloudinary Storage Setup
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads", // Folder name on Cloudinary
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 800, height: 800, crop: "limit" }], // optional resizing
  },
});

// ✅ Multer Middleware
const upload = multer({ storage });

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://akhileshreddy811_db_user:6MQywIJtJR8oLeCo@cluster0.t0i7d7t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
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
const ClientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  company: { type: String, default: "" },
  password: { type: String, required: true },
 profileImage: {
    type: String,
    default: ""
  },
  interests: { type: [String], default: [] }, // store client interests
}, { timestamps: true });
ClientSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
ClientSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};
const Client = mongoose.model("Client", ClientSchema);
const businessSchema = new mongoose.Schema({
    // --- Core Identification & Owner ---
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true,
        index: true // Explicitly set index here
    },
    businessName: { 
        type: String, 
        required: true, 
        trim: true, 
        maxlength: 100,
        unique: true // Added unique constraint for stronger data integrity
    },
   businessCategory: {
    type: String,
    required: true,
},
    businessDescription: { 
        type: String, 
        required: true, 
        maxlength: 500 
    },
    businessWebsite: { 
        type: String, 
        default: null,
        trim: true,
unique: true, // Ensure no duplicate URLs
        // Basic URL validation
        validate: {
            validator: function(v) {
                if (!v) return true;
                return /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/i.test(v);
            },
            message: props => `${props.value} is not a valid URL!`
        }
    },
    
    // --- Contact & Location ---
    businessAddress: { 
        type: String, 
        required: true, 
        maxlength: 200 
    },
    businessPhone: { 
        type: String, 
        required: true,
        trim: true
    },
    logoUrl: { 
        type: String, 
        default: null 
    },

    // --- Status and Verification (Updated for Admin Flow) ---
    status: { 
        type: String, 
        // Added 'inactive' for rejected businesses and 'pending' for explicit review phase
        enum: ['pending', 'active', 'inactive', 'suspended'], 
        default: 'pending' // Changed default to 'pending' for mandatory review
    },
    verified: { 
        type: Boolean, 
        default: false 
    },
    rejectionReason: { // NEW FIELD: Store reason if admin rejects
        type: String,
        default: null
    },
    suspensionReason: { // NEW FIELD: Store reason if admin suspends
        type: String,
        default: null
    },

    // --- Metrics and Analytics ---
    followers: { 
        type: Number, 
        default: 1
    },
    followersList: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Client' 
    }],
    totalPosts: { 
        type: Number, 
        default: 0 
    },
    totalProducts: { 
        type: Number, 
        default: 0 
    },
    engagementRate: { 
        type: Number, 
        default: 0 
    } 
}, { 
    timestamps: true 
});

const Business = mongoose.model('Business', businessSchema);
const PostSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  business: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true },
  content: { type: String, required: true },

  // Single media upload
  mediaUrl: { type: String, default: null },
  mediaType: { type: String, enum: ['image', 'video', 'none'], default: 'none' },
  mediaMetadata: {
    filename: String,
    originalName: String,
    size: Number,
    uploadedAt: { type: Date, default: Date.now }
  },

  platforms: [{ type: String, enum: ['facebook', 'twitter', 'instagram', 'linkedin'] }],
  status: { 
    type: String, 
    enum: ['draft', 'scheduled', 'published', 'failed'], 
    default: 'draft' 
  },
  scheduledFor: { type: Date, default: null },

  // Engagement metrics
  likesList: [
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' }
  }
]
,
  likesCount: { type: Number, default: 0 }, // Total likes

  commentsList: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
      text: { type: String, required: true },
      date: { type: Date, default: Date.now }
    }
  ],
  commentsCount: { type: Number, default: 0 }, // Total comments
  shares: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  clicks: { type: Number, default: 0 },

  tags: [String],
  category: { type: String, default: 'General' },
  caption: { type: String, default: '' }
}, { 
  timestamps: true
});


// Indexes for faster queries
PostSchema.index({ user: 1, createdAt: -1 });
PostSchema.index({ business: 1, status: 1 });
PostSchema.index({ scheduledFor: 1 });
PostSchema.index({ tags: 1 });

const Post = mongoose.model('Post', PostSchema);
const ProductSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  business: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true },

  name: { type: String, required: true, trim: true },
  productLink: { type: String, default: null },
  price: { type: Number, required: true, min: 0 },

  sku: { type: String, unique: true },

  // Single image instead of array
  image: {
    url: { type: String, required: true },
    alt: { type: String, default: '' }
  },

  isActive: { type: Boolean, default: true },

  sales: {
    totalSold: { type: Number, default: 0 },
    revenue: { type: Number, default: 0 }
  }
}, { timestamps: true });
ProductSchema.pre('save', function (next) {
  if (!this.sku) {
    this.sku = `SKU-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
  }
  next();
});
const Product = mongoose.model('Product', ProductSchema);
const PromotionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    business: { type: mongoose.Schema.Types.ObjectId, ref: "Business", required: true },

    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },

    type: {
      type: String,
      enum: ["general"],
      required: true,
    },
link:{
      type: String,
},
    displayType: {
      type: String,
      enum: ["banner", "popup"],
      default: "banner",
      required: true,
    },

    discountType: {
      type: String,
      enum: ["percentage", "fixed", "none"],
      default: "none",
     
    },

    discountValue: {
      type: Number,
      default: 0,
      validate: {
        validator: function (value) {
          if (this.discountType === "none") return true;
          return value > 0;
        },
        message: "Discount value must be greater than 0",
      },
    },

    couponCode: {
      type: String,
      uppercase: true,
      trim: true,
      required: function () {
        return this.type === "coupon";
      },
    },

    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      validate: {
        validator: function (value) {
          return !value || value > this.startDate;
        },
        message: "End date must be after start date",
      },
    },

    status: {
      type: String,
      enum: ["active", "scheduled", "paused", "expired", "draft"],
      default: "draft",
    },

    platforms: [
      {
        type: String,
        enum: ["facebook", "instagram", "twitter", "google", "email", "website"],
      },
    ],

    image: { type: String },

    // ✅ Promotion Performance Metrics
    performance: {
      impressions: { type: Number, default: 0 },
      clicks: { type: Number, default: 0 },
      conversions: { type: Number, default: 0 },
      revenue: { type: Number, default: 0 },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ✅ Virtual Field: Is Active
PromotionSchema.virtual("isActive").get(function () {
  const now = new Date();
  return this.status === "active" && this.startDate <= now && (!this.endDate || this.endDate > now);
});

// ✅ Middleware: Update Status Automatically Before Save
PromotionSchema.pre("save", function (next) {
  const now = new Date();

  if (this.startDate > now) {
    this.status = "scheduled";
  } else if (this.endDate && this.endDate < now) {
    this.status = "expired";
  } else if (this.status === "draft" && this.startDate <= now) {
    this.status = "active";
  }

  next();
});

const Promotion = mongoose.model("Promotion", PromotionSchema);
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
const authMiddleware = (req, res, next) => {
    // 1. Get token from header (Authorization: Bearer <token>)
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // 2. Verify token: MUST use the same key as generateToken
        const secret = process.env.JWT_SECRET || 'your_jwt_secret'; // Use ENV var!
        const decoded = jwt.verify(token, secret);
        
        // 3. Attach the decoded user payload to the request object
        req.user = decoded; 
        
        next(); // Proceed to the route handler
    } catch (err) {
        // Token is invalid (expired, wrong signature, etc.)
        console.error("JWT Verification Error:", err.message);
        return res.status(401).json({ message: 'Token is not valid or expired' });
    }
};
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET || "your_jwt_secret_key",
    { expiresIn: "7d" } // token valid for 7 days
  );
};
const getUserBusiness = async (userId) => {
  try {
    return await Business.findOne({ user: userId });
  } catch (error) {
    console.error("Database Error in getUserBusiness:", error);
    // You might throw a custom error or return null/undefined
    return null; 
  }
};
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
app.post('/api/auth/register', async (req, res) => {
    try {
    const { name, email, company, password, interests } = req.body;

    // Check if client exists
    let client = await Client.findOne({ email });
    if (client) return res.status(400).json({ message: "Email already registered" });

    // Create new client
    client = new Client({ name, email, company, password, interests });
    await client.save();

    res.status(201).json({
      message: "User registered successfully",
      client: {
        _id: client._id,
        name: client.name,
        email: client.email,
        company: client.company,
        interests: client.interests
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }

});
app.post('/api/auth/login', async (req, res) => {
   try {
    const { email, password } = req.body;

    const client = await Client.findOne({ email });
    if (!client) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await client.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT token
    const token = jwt.sign({ id: client._id }, "BANNU9", { expiresIn: "7d" });

    res.json({
      message: "Login successful",
      token,
      user: {
        _id: client._id,
        name: client.name,
        email: client.email,
        company: client.company,
        interests: client.interests
      }

    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
app.post("/api/auth/check-email", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await Client.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(404).json({ exists: false, message: "Email not found" });

    return res.json({ exists: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ---------------- Reset Password ----------------
app.post("/api/auth/reset-password", async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    if (!email || !newPassword)
      return res.status(400).json({ message: "Email and new password are required" });

    const user = await Client.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.json({ success: true, message: "Password updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
app.get('/api/auth/profile', async (req, res) => {
  try {
    const client = await Client.findById(req.user.id);
    if (!client) return res.status(404).json({ success: false, message: 'User not found' });

    res.json({
      success: true,
      user: {
        name: client.name,
        email: client.email,
        company: client.company,
        // other fields if needed
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});
app.get('/api/profile/:businessid', async (req, res) => {
  try {
    const { businessid } = req.params;
    
    // Find the business by ID
    const business = await Business.findById(businessid);
    if (!business) {
      return res.status(404).json({ 
        success: false,
        message: 'Business not found' 
      });
    }

    // Find the user associated with this business
    const user = await User.findById(business.user);
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found for this business' 
      });
    }

    // Get social accounts connected to this business
    // const socialAccounts = await SocialAccount.find({ business: businessid }); // Assuming SocialAccount model exists elsewhere

    // Get business statistics
    const postCount = await Post.countDocuments({ businessId: businessid });
    const productCount = await Product.countDocuments({ businessId: businessid });
    
    // Get recent activity
    const recentPosts = await Post.find({ businessId: businessid })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('user', 'firstName lastName');

    const recentProducts = await Product.find({ businessId: businessid })
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      success: true,
      profile: {
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          address: user.address,
          avatar: user.avatar,
          role: user.role,
          createdAt: user.createdAt
        },
        business: {
          id: business._id,
          businessName: business.businessName,
          businessCategory: business.businessCategory,
          businessDescription: business.businessDescription,
          businessWebsite: business.businessWebsite,
          businessAddress: business.businessAddress,
          businessPhone: business.businessPhone,
          businessLogo: business.logo,
          createdAt: business.createdAt,
          updatedAt: business.updatedAt
        },
        stats: {
          totalPosts: postCount,
          totalProducts: productCount,
          // socialAccounts: socialAccounts.length // Assuming 0 if model is missing
        },
        socialAccounts: [
          // ... socialAccounts data
        ],
        recentActivity: [
          ...recentPosts.map(post => ({
            type: 'post',
            description: `Created a new post: "${post.content.substring(0, 50)}..."`,
            time: post.createdAt,
            postId: post._id
          })),
          ...recentProducts.map(product => ({
            type: 'product',
            description: `Added new product: ${product.name}`,
            time: product.createdAt,
            productId: product._id
          }))
        ].sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 10)
      }
    });
  } catch (error) {
    console.error('Get profile by business ID error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error while fetching profile' 
    });
  }
});
app.get('/api/dashboard/:businessid', async (req, res) => {
  try {
    const { businessid } = req.params;

    // ✅ 1. Verify business exists
    const business = await Business.findById(businessid);
    if (!business) {
      return res.status(404).json({
        success: false,
        message: 'Business not found',
      });
    }

    // ✅ 2. Get basic counts
    const totalPosts = await Post.countDocuments({ business: businessid });
    const totalProducts = await Product.countDocuments({ business: businessid });
    const totalPromotions = await Promotion.countDocuments({ business: businessid, isActive: true });
    const followers = business.followers ? business.followers.length : 0;

    // ✅ 3. Calculate engagement + revenue
    const posts = await Post.find({ business: businessid });
    let totalEngagement = 0;
    let totalRevenue = 0;

    posts.forEach((post) => {
      const likes = post.likesList ? post.likesList.length : 0;
      const comments = post.commentsList ? post.commentsList.length : 0;
      const shares = post.shares || 0;
      totalEngagement += likes + comments + shares;
    });

    const products = await Product.find({ business: businessid });
    products.forEach((product) => {
      const sales = product.sales || 0;
      const price = product.price || 0;
      totalRevenue += sales * price;
    });

    // ✅ 4. Recent Activity: Posts + Products
    const recentPosts = await Post.find({ business: businessid })
      .sort({ createdAt: -1 })
      .limit(3)
      .populate('user', 'firstName lastName')
      .select('content createdAt likesList commentsList shares');

    const recentProducts = await Product.find({ business: businessid })
      .sort({ createdAt: -1 })
      .limit(2)
      .select('name createdAt sales');

    const recentActivity = [
      ...recentPosts.map((post) => ({
        type: 'post',
        description: `New post: "${post.content.substring(0, 30)}..."`,
        engagement: `${post.likesList?.length || 0} likes, ${post.commentsList?.length || 0} comments`,
        time: post.createdAt,
      })),
      ...recentProducts.map((product) => ({
        type: 'product',
        description: `New product added: ${product.name}`,
        engagement: `${product.sales || 0} sales`,
        time: product.createdAt,
      })),
    ].sort((a, b) => new Date(b.time) - new Date(a.time));

    // ✅ 5. Platform-wise engagement (if platforms exist)
    const platformStats = await Post.aggregate([
      { $match: { business: new mongoose.Types.ObjectId(businessid) } },
      { $unwind: { path: '$platforms', preserveNullAndEmptyArrays: true } },
      {
        $group: {
          _id: '$platforms',
          count: { $sum: 1 },
          totalEngagement: {
            $sum: {
              $add: [
                { $size: { $ifNull: ['$likesList', []] } },
                { $size: { $ifNull: ['$commentsList', []] } },
                { $ifNull: ['$shares', 0] },
              ],
            },
          },
        },
      },
    ]);

    // ✅ 6. Respond with clean dashboard data
    res.json({
      success: true,
      dashboard: {
        stats: {
          totalPosts,
          totalEngagement,
          totalProducts,
          totalPromotions,
          followers,
          totalRevenue: Math.round(totalRevenue * 100) / 100 || 0,
        },
        recentActivity,
        platformPerformance: platformStats || [],
        business: {
          name: business.businessName,
          category: business.businessCategory,
          joinedDate: business.createdAt,
        },
      },
    });
  } catch (error) {
    console.error('Get dashboard by business ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching dashboard data',
    });
  }
});

app.put('/api/profile', async (req, res) => {
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
app.post("/api/business", authMiddleware, upload.single("media"), async (req, res) => {
  try {
    const {
      businessName,
      businessCategory,
      businessDescription,
      businessWebsite,
      businessAddress,
      businessPhone,
    } = req.body;

    // Validate required fields
    if (!businessName || !businessCategory || !businessDescription || !businessAddress || !businessPhone) {
      return res.status(400).json({ message: "All business fields are required" });
    }

    // Validate field lengths
    if (businessName.length < 2 || businessName.length > 100) {
      return res.status(400).json({ message: "Business name must be between 2 and 100 characters" });
    }

    if (businessDescription.length < 10 || businessDescription.length > 500) {
      return res.status(400).json({ message: "Business description must be between 10 and 500 characters" });
    }

    if (businessAddress.length > 200) {
      return res.status(400).json({ message: "Business address must be less than 200 characters" });
    }

    // Validate phone number
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const cleanPhone = businessPhone.replace(/[\s\-\(\)]/g, "");
    if (!phoneRegex.test(cleanPhone)) {
      return res.status(400).json({ message: "Please enter a valid phone number" });
    }

    // Validate website if provided
    if (businessWebsite && businessWebsite.trim() !== "") {
      try {
        new URL(businessWebsite);
      } catch (error) {
        return res.status(400).json({ message: "Please enter a valid website URL" });
      }
    }

    // Check if user already has a business
    const existingBusiness = await Business.findOne({ user: req.user.id });
    if (existingBusiness) {
      return res.status(400).json({ message: "You already have a business registered" });
    }

    // Check for duplicate business name
    const duplicateBusiness = await Business.findOne({
      businessName: new RegExp(`^${businessName.trim()}$`, "i"),
    });
    if (duplicateBusiness) {
      return res.status(400).json({ message: "A business with this name already exists" });
    }

    // ✅ Prepare business data
    const businessData = {
      user: req.user.id,
      businessName: businessName.trim(),
      businessCategory,
      businessDescription: businessDescription.trim(),
      businessAddress: businessAddress.trim(),
      businessPhone: cleanPhone,
      businessWebsite:
        businessWebsite && businessWebsite.trim() !== "" ? businessWebsite.trim() : null,
      status: "pending",
      verified: false,
    };

    // ✅ If file uploaded, use Cloudinary URL
    if (req.file && req.file.path) {
      businessData.logoUrl = req.file.path; // Cloudinary gives a secure URL here
    }

    // ✅ Create business
    const business = await Business.create(businessData);

    // ✅ Update user role
    await User.findByIdAndUpdate(req.user.id, {
      role: "business_owner",
      hasBusiness: true,
    });

    // ✅ Populate response
    const populatedBusiness = await Business.findById(business._id)
      .populate("user", "firstName lastName email avatar")
      .lean();

    res.status(201).json({
      success: true,
      message: "Business registered successfully!",
      business: populatedBusiness,
    });
  } catch (error) {
    console.error("Create business error:", error);

    // Handle Mongoose validation errors
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        message: "Validation failed",
        errors,
      });
    }

    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Business with this name already exists",
      });
    }

    res.status(500).json({
      message: "Internal server error while creating business",
      ...(process.env.NODE_ENV === "development" && { error: error.message }),
    });
  }
});


app.get('/api/business', async (req, res) => {
  try {
    // ✅ Get userId from query parameters (since it's a GET request)
    const userId = req.query.userId;

    // ✅ Validate
    if (!userId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing userId in request query.' 
      });
    }

    // ✅ Find the business owned by the user
    const business = await Business.findOne({ user: userId })
      .populate('user', 'firstName lastName email role');

    if (!business) {
      // Expected 404 if user has no business
      return res.status(404).json({ 
        success: false, 
        message: 'Business not found for this user.' 
      });
    }

    // ✅ Send success response
    res.json({
      success: true,
      business
    });

  } catch (error) {
    console.error('Get business error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error while fetching business.' 
    });
  }
});
app.post("/api/posts", authMiddleware, upload.single("media"), async (req, res) => {
  try {
    const { content, platforms, scheduledFor, tags, category, caption } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Post content is required" });
    }

    const business = await getUserBusiness(req.user.id);
    if (!business) {
      return res.status(400).json({ message: "No business found for this user" });
    }

    // Parse platforms
    let platformsArray = ["facebook"];
    if (platforms) {
      if (typeof platforms === "string") {
        platformsArray = platforms.split(",");
      } else if (Array.isArray(platforms)) {
        platformsArray = platforms;
      }
    }

    // Parse tags
    let tagsArray = [];
    if (tags) {
      if (typeof tags === "string") {
        tagsArray = tags.split(",").map((tag) => tag.trim());
      } else if (Array.isArray(tags)) {
        tagsArray = tags;
      }
    }

    // ✅ Handle Cloudinary upload
    let mediaUrl = null;
    let mediaType = "none";
    let mediaMetadata = null;

    if (req.file) {
      mediaUrl = req.file.path; // ✅ Cloudinary file URL
      mediaType = req.file.mimetype.startsWith("video/") ? "video" : "image";
      mediaMetadata = {
        public_id: req.file.filename,
        format: req.file.format,
        size: req.file.size || null,
        resource_type: req.file.mimetype.startsWith("video/") ? "video" : "image",
      };
    }

    // ✅ Create new post
    const post = await Post.create({
      user: req.user.id,
      business: business._id,
      content,
      mediaUrl,
      mediaType,
      mediaMetadata,
      platforms: platformsArray,
      scheduledFor: scheduledFor || null,
      tags: tagsArray,
      category: category || "General",
      caption: caption || "",
      status: scheduledFor ? "scheduled" : "published",
    });

    // ✅ Populate user and business data
    const populatedPost = await Post.findById(post._id)
      .populate("user", "firstName lastName email")
      .populate("business", "businessName businessCategory");

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      post: populatedPost,
    });
  } catch (error) {
    console.error("Create post error:", error);

    if (error instanceof multer.MulterError) {
      if (error.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ message: "File too large. Maximum size is 20MB." });
      }
    }

    if (error.message === "Only image and video files are allowed!") {
      return res.status(400).json({ message: error.message });
    }

    res.status(500).json({ message: "Server error while creating post" });
  }
});

app.get('/api/posts', async (req, res) => {
   try {
    const business = await Post.find();
    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }
    res.json(business);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});
app.get("/api/post/:businessId", async (req, res) => {
  try {
    const { businessId } = req.params;

    if (!businessId) {
      return res.status(400).json({ message: "Business ID is required" });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const posts = await Post.find({ business: businessId })
      .skip(skip)
      .limit(limit)
      .exec();

    // Fetch client details for each post likes

    const updatedPosts = await Promise.all(posts.map(async (post) => {
      const likesWithUser = await Promise.all(
        post.likesList.map(async (like) => {
          try {
            const client = await Client.findById(like._id).select("name email");
            return client ? { _id: like._id, name: client.name, email: client.email } : null;
          } catch {
            return null;
          }
        })
      );

      return {
        ...post.toObject(),
        likesList: likesWithUser.filter(like => like !== null)
      };
    }));

    const total = await Post.countDocuments({ business: businessId });

    res.status(200).json({
      success: true,
      posts: updatedPosts,
      pagination: {
        page,
        pages: Math.ceil(total / limit),
        total,
      }
    });

  } catch (error) {
    console.error("Error fetching posts by business:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching posts"
    });
  }
});

// GET /api/business/:businessId/followers
app.get("/api/business/:businessId/followers", async (req, res) => {
  try {
    const business = await Business.findById(req.params.businessId).populate("followersList", "name email");
    if (!business) return res.status(404).json({ success: false, message: "Business not found" });
    res.json({ success: true, followers: business.followersList });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});
app.post("/api/products", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    const { name, productLink, price } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: "Product name and price are required" });
    }

    const business = await getUserBusiness(req.user.id);
    if (!business) {
      return res.status(400).json({ message: "No business found for this user" });
    }

    console.log("File received from Cloudinary:", req.file);

    let image = null;
    if (req.file && req.file.path) {
      image = {
        url: req.file.path, // Cloudinary gives the secure URL here
        alt: name,
      };
    }

    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice)) {
      return res.status(400).json({ message: "Invalid price format" });
    }

    const product = await Product.create({
      user: req.user.id,
      business: business._id,
      name,
      productLink: productLink || null,
      price: parsedPrice,
      image, // ✅ stores Cloudinary image URL
    });

    const populatedProduct = await Product.findById(product._id)
      .populate("user", "firstName lastName email")
      .populate("business", "businessName businessCategory");

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: populatedProduct,
    });
  } catch (error) {
    console.error("Create product error:", error);

    if (error instanceof multer.MulterError && error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ message: "File too large. Max 10MB allowed." });
    }

    res.status(500).json({ message: "Server error while creating product" });
  }
});
app.get("/api/business/search", async (req, res) => {
  try {
    const { filter, category } = req.query;

    // 🧠 Build query dynamically
    const query = {};

    if (filter === "approved") {
      query.status = "approved";
    }

    if (category && category !== "All") {
      query.businessCategory = category;
    }

    // 🏪 Fetch businesses based on query
    const businesses = await Business.find(query).sort({ createdAt: -1 });

    // 🧩 Get all related products & posts for each business
    const populatedBusinesses = await Promise.all(
      businesses.map(async (business) => {
        const [products, posts] = await Promise.all([
          Product.find({ business: business._id }).sort({ createdAt: -1 }),
          Post.find({ business: business._id }).sort({ createdAt: -1 }),
        ]);

        return {
          ...business.toObject(),
          products,
          posts,
        };
      })
    );

    res.status(200).json({
      success: true,
      businesses: populatedBusinesses,
    });
  } catch (err) {
    console.error("❌ Error fetching businesses with products/posts:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch businesses with products and posts",
    });
  }
});
app.get("/api/product/:businessId", async (req, res) => {
  try {
    const { businessId } = req.params;
    const products = await Product.find({ business: businessId })
      .sort({ createdAt: -1 });
    res.json({ success: true, products });
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: "Server error fetching products" });
  }
});
app.post("/api/promotions", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    const business = await getUserBusiness(req.user.id);
    if (!business) {
      return res.status(400).json({
        success: false,
        message: "No business found for this user",
      });
    }

    // ✅ Use Cloudinary image URL if uploaded
    const imageUrl = req.file && req.file.path ? req.file.path : null;

    const promotion = new Promotion({
      ...req.body,
      user: req.user.id,
      business: business._id,
      image: imageUrl, // ✅ Cloudinary image URL stored here
    });

    await promotion.save();

    res.status(201).json({
      success: true,
      message: "Promotion created successfully",
      promotion,
    });
  } catch (error) {
    console.error("Create promotion error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create promotion",
    });
  }
});


app.get('/api/promotions/:businessId', async (req, res) => {
  try {
    const { businessId } = req.params;

    if (!businessId) {
      return res.status(400).json({ message: 'Business ID is required' });
    }

    // Verify the business exists
    const business = await Business.findById(businessId);
    if (!business) {
      return res.status(404).json({ message: 'Business not found' });
    }

    // Fetch promotions for this business
    const promotions = await Promotion.find({ business: businessId })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      promotions,
    });
  } catch (error) {
    console.error('Get promotions error:', error);
    res.status(500).json({ message: 'Server error while fetching promotions' });
  }
});

app.get('/api/promotion', async (req, res) => {
  try {
    const { page = 1, limit = 10, type, isActive, companyId, businessId, search } = req.query;

    const query = {};

    if (type) query.type = type;
    if (isActive !== undefined) query.isActive = isActive === 'true';
    if (companyId) query.companyId = companyId;
    if (businessId) query.businessId = businessId;
    if (search) query.name = { $regex: search, $options: 'i' };

    const promotions = await Promotion.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await Promotion.countDocuments(query);

    res.json({
      success: true,
      data: promotions,
      total,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
app.delete("/api/promotions/:id", authMiddleware, async (req, res) => {
  try {
    const promotion = await Promotion.findByIdAndDelete(req.params.id);
    if (!promotion) {
      return res.status(404).json({ success: false, message: "Promotion not found" });
    }
    res.json({ success: true, message: "Promotion deleted successfully" });
  } catch (error) {
    console.error("Delete promotion error:", error);
    res.status(500).json({ success: false, message: "Failed to delete promotion" });
  }
});

// ---------------- GET SINGLE PROMOTION BY ID ----------------
app.get('/api/promotions', async (req, res) => {
  try {
    const promotion = await Promotion.findById(req.params.id);
    if (!promotion) {
      return res.status(404).json({ success: false, message: 'Promotion not found' });
    }
    res.json({ success: true, data: promotion });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ---------------- GET PROMOTIONS BY COMPANY ID ----------------
app.get('/api/promotions/company/:businessId', async (req, res) => {
  try {
    const promotions = await Promotion.find({ business: req.params.businessId });
    res.json({ success: true, promotions });
  } catch (error) {
    console.error("Error fetching promotions:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});


// ---------------- CREATE NEW PROMOTION ----------------


// ---------------- UPDATE PROMOTION ----------------
app.put('/api/promotions/:id', async (req, res) => {
  try {
    const updatedPromotion = await Promotion.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPromotion) {
      return res.status(404).json({ success: false, message: 'Promotion not found' });
    }
    res.json({ success: true, data: updatedPromotion });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// ---------------- DELETE PROMOTION ----------------
app.delete('/api/promotions/:id', async (req, res) => {
  try {
    const deleted = await Promotion.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Promotion not found' });
    }
    res.json({ success: true, message: 'Promotion deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

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
app.get('/api/businesses/:id', async (req, res) => {
  try {
    const business = await Business.findById(req.params.id)
      .populate('user', 'firstName lastName email phone')
      .select('-__v');

    if (!business) {
      return res.status(404).json({ 
        success: false,
        message: 'Business not found' 
      });
    }

    // Get business products
    const products = await Product.find({ 
      business: req.params.id, 
      isActive: true 
    })
    .sort({ createdAt: -1 })
    .select('name description price stock images category');

    // Get business reviews
    const reviews = await Post.find({ business: req.params.id })
      .populate('user', 'firstName lastName')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: {
        business,
        products,
        reviews
      }
    });
  } catch (error) {
    console.error('Get business error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error while fetching business' 
    });
  }
});
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
// --- GET /api/business/all?filter=approved ---
// This endpoint is used by the client-side component to list approved businesses.
app.get('/api/business/all', async (req, res) => {
   try {
    const { filter, category } = req.query;

    // ✅ Build query object dynamically
    const query = {};

    // Only show approved businesses if requested
    if (filter === "approved") {
      query.status = "approved";
    }

    // ✅ Filter by category if provided (e.g. Ecommerce or LMS)
    if (category && category !== "All") {
      query.businessCategory = category;
    }

    const businesses = await Business.find(query).sort({ createdAt: -1 });

    res.status(200).json(businesses);
  } catch (err) {
    console.error("Error fetching businesses:", err);
    res.status(500).json({ success: false, message: "Failed to fetch businesses" });
  }

});
// --- GET /api/dashboard/:businessId (UPDATED CODE) ---
app.get('/api/dashboard/:businessId', async (req, res) => {
    try {
        const { businessId } = req.params;
        
        const businessObjectId = new mongoose.Types.ObjectId(businessId);

        const business = await Business.findById(businessId).select('businessName businessCategory createdAt engagementRate');
        if (!business) {
            return res.status(404).json({ success: false, message: 'Business not found' });
        }

        const [metricsResult, revenueResult, totalProducts, recentPosts] = await Promise.all([
            
            // A. Post Aggregation for Engagement and Total Posts
            Post.aggregate([
                { $match: { business: businessObjectId } }, // Use ObjectId for efficient matching
                {
                    $group: {
                        _id: null,
                        totalPosts: { $sum: 1 },
                        totalEngagement: {
                            $sum: {
                                $add: [
                                    { $size: { $ifNull: ['$likesList', []] } },
                                    { $size: { $ifNull: ['$commentsList', []] } },
                                    { $ifNull: ['$shares', 0] }
                                ]
                            }
                        },
                    }
                },
                { $project: { _id: 0, totalPosts: 1, totalEngagement: 1 } }
            ]),
            
            // B. Product Aggregation for Revenue
            Product.aggregate([
                { $match: { business: businessObjectId } },
                { $group: { _id: null, totalRevenue: { $sum: '$sales.revenue' } } }
            ]),

            // C. Product Count (Efficient query)
            Product.countDocuments({ business: businessId }),
            
            // D. RECENT ACTIVITY (FIX: Separate query for correct sorting and limiting)
            Post.find({ business: businessObjectId })
                .sort({ createdAt: -1 }) // Sort Descending by date
                .limit(10)               // Limit to 10 items
                .select('content createdAt likesList commentsList')
        ]);

        const metrics = metricsResult[0] || { totalPosts: 0, totalEngagement: 0 };
        const revenue = revenueResult[0] || { totalRevenue: 0 };
        
        // 4. Format Recent Activity
        const formattedActivity = recentPosts.map(post => ({
            type: 'post',
            description: `New post: "${post.content.substring(0, 30)}${post.content.length > 30 ? '...' : ''}"`,
            // Calculate engagement from the fetched lists
            engagement: `${post.likesList.length} likes, ${post.commentsList.length} comments`,
            time: post.createdAt
        }));

        // 5. SEND RESPONSE
        res.json({
            success: true,
            dashboard: {
                stats: {
                    totalPosts: metrics.totalPosts,
                    totalEngagement: metrics.totalEngagement,
                    totalProducts: totalProducts,
                    totalRevenue: Math.round((revenue.totalRevenue || 0) * 100) / 100
                },
                recentActivity: formattedActivity,
                business: {
                    name: business.businessName,
                    category: business.businessCategory,
                    joinedDate: business.createdAt
                }
            }
        });
    } catch (error) {
        console.error('Get dashboard by business ID error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Server error while fetching dashboard data'
        });
    }
});
app.post("/api/post/:postId/like", async (req, res) => {
  try {
    const { userId } = req.body; // Extract userId from request body
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const userObjectId = new mongoose.Types.ObjectId(userId);

    if (!post.likesList) post.likesList = [];

    const alreadyLiked = post.likesList.some(likeId => likeId.equals(userObjectId));

    if (alreadyLiked) {
      post.likesList = post.likesList.filter(likeId => !likeId.equals(userObjectId));
    } else {
      post.likesList.push(userObjectId);
    }

    post.likesCount = post.likesList.length;
    await post.save();

    // Optional: get the user data if you want to return it
    // const user = await User.findById(userObjectId).select("name avatarUrl");

    // Update engagement rate
    await updateBusinessEngagementRate(post.business);

    res.json({
      success: true,
      likesCount: post.likesCount,
      isLiked: !alreadyLiked,
      // user // optionally return user info
    });
  } catch (err) {
    console.error("Like error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/post/:postId/comment", async (req, res) => {
  try {
    const { text, userId } = req.body;
    
    if (!userId) {
      return res.status(400).json({ message: "User ID is required to comment" });
    }

    if (!text?.trim()) return res.status(400).json({ message: "Comment cannot be empty" });

    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const newComment = {
      userId: new mongoose.Types.ObjectId(userId),
      text: text.trim(),
      date: new Date()
    };

    if (!post.commentsList) post.commentsList = [];
    post.commentsList.push(newComment);
    post.commentsCount = post.commentsList.length;
    await post.save();

    // Optional: populate user details for the newly added comment
    // const user = await User.findById(userId).select("name avatarUrl");
    // const commentWithUser = { ...newComment, user };

    // Update engagement rate
    await updateBusinessEngagementRate(post.business);

    res.json({
      success: true,
      commentsCount: post.commentsCount,
      comment: newComment,
      // commentUser: user // optionally return user info with the comment
    });
  } catch (err) {
    console.error("Comment error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/follow/:businessId", async (req, res) => {
  const { businessId } = req.params;
  const { userId } = req.body;

  try {
    if (!userId) return res.status(400).json({ success: false, message: "User ID is required" });

    const business = await Business.findById(businessId);
    if (!business) return res.status(404).json({ success: false, message: "Business not found" });

    if (!business.followersList) business.followersList = [];

    const userObjectId = new mongoose.Types.ObjectId(userId);
    const isFollowing = business.followersList.some(followerId => followerId.equals(userObjectId));

    if (isFollowing) {
      business.followersList = business.followersList.filter(followerId => !followerId.equals(userObjectId));
    } else {
      business.followersList.push(userObjectId);
    }

    business.followers = business.followersList.length;
    await business.save();

    // Optional: update engagementRate when followers change
    await updateBusinessEngagementRate(business._id);

    res.json({ success: true, followers: business.followers, isFollowing: !isFollowing });
  } catch (err) {
    console.error("Follow error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
app.get("/api/post/:postId/like-status/:userId", async (req, res) => {
  try {
    const { postId, userId } = req.params;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);
    const isLiked = post.likesList?.some(likeId => likeId.equals(userObjectId)) || false;

    res.json({ isLiked });
  } catch (err) {
    console.error("Like status error:", err);
    res.status(500).json({ message: "Server error" });
  }
});
app.get("/api/post/:postId/comments", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId)
      .populate('commentsList.userId', 'name email') // Populate user details in comments
      .select('commentsList');

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json({ 
      success: true, 
      comments: post.commentsList || [] 
    });
  } catch (err) {
    console.error("Get comments error:", err);
    res.status(500).json({ message: "Server error" });
  }
});
// Get all users who liked a specific post
app.get("/api/post/:postId/likes", async (req, res) => {
  try {
    const { postId } = req.params;

    if (!postId) {
      return res.status(400).json({ success: false, message: "Post ID is required" });
    }

    // Find the post and populate likesList.userId
    const post = await Post.findById(postId)
      .populate({
        path: "likesList.userId",
        select: "name email" // pick the fields you want
      })
      .exec();

    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    // Map to get an array of users who liked the post
    const likedUsers = post.likesList.map(like => like.userId);

    res.status(200).json({
      success: true,
      totalLikes: likedUsers.length,
      users: likedUsers
    });

  } catch (error) {
    console.error("Error fetching liked users:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching liked users"
    });
  }
});
// Upload profile image
app.post("/api/user/:userId/upload-image", async (req, res) => {
  const { userId } = req.params;

  try {
    // Check if user exists
    const user = await Client.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // In a real application, you would handle file upload here
    // For now, we'll assume the image URL is provided in the request
    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).json({
        success: false,
        message: "Image URL is required"
      });
    }

    // Update user's profile image
    user.profileImage = imageUrl;
    await user.save();

    res.json({
      success: true,
      message: "Profile image updated successfully",
      profileImage: imageUrl
    });
  } catch (err) {
    console.error("Error uploading profile image:", err);
    res.status(500).json({
      success: false,
      message: "Server error while uploading profile image"
    });
  }
});
// Get user's followed businesses
app.get("/api/user/:userId/following", async (req, res) => {
  const { userId } = req.params;

  try {
    // Find user and populate following businesses with full details
    const user = await Client.findById(userId)
      .select("following")
      .populate({
        path: "following",
        select: "businessName businessCategory businessDescription businessWebsite logoUrl verified followers totalPosts totalProducts engagementRate",
        model: "Business"
      });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Process businesses to ensure proper logo URLs
    const followingBusinesses = user.following.map(business => {
      const businessObj = business.toObject();
      
      // Ensure logo URL is properly formatted
      if (businessObj.logoUrl && !businessObj.logoUrl.startsWith("http")) {
        businessObj.logoUrl = `${process.env.API_BASE_URL || 'http://192.168.0.102:5000'}${businessObj.logoUrl.startsWith("/") ? "" : "/"}${businessObj.logoUrl}`;
      }

      // Generate username from businessName
      if (businessObj.businessName) {
        businessObj.username = businessObj.businessName.toLowerCase().replace(/[\s.]/g, "_");
        businessObj.name = businessObj.businessName; // Add alias for frontend
      }

      return businessObj;
    });

    res.json({
      success: true,
      following: followingBusinesses,
      count: followingBusinesses.length
    });
  } catch (err) {
    console.error("Error fetching user's following businesses:", err);
    res.status(500).json({
      success: false,
      message: "Server error while fetching followed businesses"
    });
  }
});
// Update user profile
app.put("/api/user/:userId", async (req, res) => {
  const { userId } = req.params;
  const { name, email, phone, bio, website, profileImage } = req.body;

  try {
    // Check if user exists
    const user = await Client.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Check if email is being changed and if it's already taken
    if (email && email !== user.email) {
      const existingUser = await Client.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Email already exists"
        });
      }
    }

    // Update user fields
    const updateFields = {};
    if (name) updateFields.name = name;
    if (email) updateFields.email = email;
    if (phone !== undefined) updateFields.phone = phone;
    if (bio !== undefined) updateFields.bio = bio;
    if (website !== undefined) updateFields.website = website;
    if (profileImage !== undefined) updateFields.profileImage = profileImage;

    // Update user
    const updatedUser = await Client.findByIdAndUpdate(
      userId,
      { $set: updateFields },
      { new: true, runValidators: true }
    ).select("-password"); // Exclude password from response

    res.json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser
    });
  } catch (err) {
    console.error("Error updating user profile:", err);
    
    // Handle validation errors
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(error => error.message);
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors
      });
    }

    // Handle duplicate key error
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Email already exists"
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error while updating profile"
    });
  }
});
app.post("/api/unfollow/:businessId", async (req, res) => {
 const { businessId } = req.params;
  const { userId } = req.body;

  try {
    const business = await Business.findById(businessId);
    if (!business) return res.status(404).json({ success: false, message: "Business not found" });

    if (business.followers && business.followers > 0) business.followers -= 1;

    business.followersList = business.followersList.filter(id => id.toString() !== userId);

  
    await business.save();

    res.json({ success: true, followers: business.followers });
  } catch (err) {
    console.error("Unfollow error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
// Check if a user follows a specific business
app.get("/api/follow/:businessId/status/:userId", async (req, res) => {
  const { businessId, userId } = req.params;

  try {
    const business = await Business.findById(businessId);

    if (!business) {
      return res.status(404).json({ success: false, message: "Business not found" });
    }

    if (!business.followersList) {
      business.followersList = [];
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);
    const isFollowing = business.followersList.some(followerId => followerId.equals(userObjectId));

    res.json({ success: true, isFollowing });
  } catch (err) {
    console.error("Error checking follow status:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
app.get("/api/followers/:businessId", async (req, res) => {
  try {
    const business = await Business.findById(req.params.businessId)
      .populate("followersList", "name email");
    if (!business) {
      return res.status(404).json({ success: false, message: "Business not found" });
    }

    res.json({ success: true, followers: business.followersList });
  } catch (err) {
    console.error("Error fetching followers:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
app.get("/api/posts/following/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    // Step 1: Find all businesses the user follows with complete details
    const businesses = await Business.find({ 
      followersList: userId,
      status: 'active' // Only include active businesses
    }).select("_id businessName businessCategory businessDescription businessWebsite businessAddress businessPhone logoUrl verified followers totalPosts");

    if (!businesses || businesses.length === 0) {
      return res.json({ 
        success: true, 
        posts: [], 
        message: "User is not following any businesses" 
      });
    }

    const businessIds = businesses.map(b => b._id);

    // Step 2: Get all posts from those businesses
    const posts = await Post.find({ 
      business: { $in: businessIds } 
    })
      .populate({
        path: 'business',
        select: 'businessName businessCategory businessDescription businessWebsite logoUrl verified followers totalPosts createdAt',
        model: 'Business'
      })
      .sort({ createdAt: -1 }); // newest first

    // Process posts to include complete business information
    const processedPosts = posts.map(post => {
      const postObj = post.toObject();
      
      // If business is not populated but we have business ID, find the business details
      if (!postObj.business || !postObj.business.businessName) {
        const businessId = postObj.business?._id || postObj.business;
        const foundBusiness = businesses.find(b => b._id.toString() === businessId?.toString());
        
        if (foundBusiness) {
          postObj.business = foundBusiness.toObject();
        } else {
          postObj.business = {
            _id: businessId,
            businessName: "Unknown Business",
            username: "unknown_business",
            logoUrl: null
          };
        }
      }

      // Ensure logo URL is properly formatted
      if (postObj.business && postObj.business.logoUrl) {
        let logoUrl = postObj.business.logoUrl;
        if (!logoUrl.startsWith("http")) {
          logoUrl = `${process.env.API_BASE_URL || 'http://192.168.0.102:5000'}${logoUrl.startsWith("/") ? "" : "/"}${logoUrl}`;
        }
        postObj.business.logoUrl = logoUrl;
      }

      // Generate username from businessName for consistency
      if (postObj.business && postObj.business.businessName) {
        postObj.business.username = postObj.business.businessName.toLowerCase().replace(/[\s.]/g, "_");
        postObj.business.name = postObj.business.businessName; // Add alias for frontend
      }
      
      return postObj;
    });

    res.json({
      success: true,
      count: processedPosts.length,
      posts: processedPosts,
    });
  } catch (err) {
    console.error("Error fetching following posts:", err);
    res.status(500).json({
      success: false,
      message: "Server error while fetching following posts",
    });
  }
});

app.get("/api/posts/unfollowed/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const followedBusinesses = await Business.find({ 
      followersList: userId 
    }).select("_id");
    
    const followedIds = followedBusinesses.map(b => b._id);

    // Get all businesses that are not followed
    const unfollowedBusinesses = await Business.find({
      _id: { $nin: followedIds },
      status: 'active'
    }).select("_id businessName businessCategory businessDescription businessWebsite logoUrl verified followers totalPosts");

    const posts = await Post.find({
      business: { $nin: followedIds }, // not followed businesses
    })
      .populate({
        path: 'business',
        select: 'businessName businessCategory businessDescription businessWebsite logoUrl verified followers totalPosts createdAt',
        model: 'Business'
      })
      .sort({ createdAt: -1 });

    // Process posts to include complete business information
    const processedPosts = posts.map(post => {
      const postObj = post.toObject();
      
      // If business is not populated but we have business ID, find the business details
      if (!postObj.business || !postObj.business.businessName) {
        const businessId = postObj.business?._id || postObj.business;
        const foundBusiness = unfollowedBusinesses.find(b => b._id.toString() === businessId?.toString());
        
        if (foundBusiness) {
          postObj.business = foundBusiness.toObject();
        } else {
          postObj.business = {
            _id: businessId,
            businessName: "Unknown Business",
            username: "unknown_business",
            logoUrl: null
          };
        }
      }

      // Ensure logo URL is properly formatted
      if (postObj.business && postObj.business.logoUrl) {
        let logoUrl = postObj.business.logoUrl;
        if (!logoUrl.startsWith("http")) {
          logoUrl = `${process.env.API_BASE_URL || 'http://192.168.0.102:5000'}${logoUrl.startsWith("/") ? "" : "/"}${logoUrl}`;
        }
        postObj.business.logoUrl = logoUrl;
      }

      // Generate username from businessName for consistency
      if (postObj.business && postObj.business.businessName) {
        postObj.business.username = postObj.business.businessName.toLowerCase().replace(/[\s.]/g, "_");
        postObj.business.name = postObj.business.businessName; // Add alias for frontend
      }
      
      return postObj;
    });

    res.json({ 
      success: true, 
      count: processedPosts.length, 
      posts: processedPosts 
    });
  } catch (err) {
    console.error("Error fetching unfollowed posts:", err);
    res.status(500).json({ 
      success: false, 
      message: "Server error while fetching unfollowed posts" 
    });
  }
});
app.get("/api/companies/:companyId", async (req, res) => {
  const { companyId } = req.params;

  try {
    const company = await Business.findById(companyId)
      .select("businessName businessCategory businessDescription businessWebsite businessAddress businessPhone logoUrl status verified followers totalPosts totalProducts engagementRate createdAt");

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Business not found"
      });
    }

    // Process logo URL
    const companyObj = company.toObject();
    if (companyObj.logoUrl) {
      let logoUrl = companyObj.logoUrl;
      if (!logoUrl.startsWith("http")) {
        logoUrl = `${process.env.API_BASE_URL || 'http://localhost:3000'}${logoUrl.startsWith("/") ? "" : "/"}${logoUrl}`;
      }
      companyObj.logoUrl = logoUrl;
    }

    // Generate username from businessName for frontend consistency
    if (companyObj.businessName) {
      companyObj.username = companyObj.businessName.toLowerCase().replace(/[\s.]/g, "_");
      companyObj.name = companyObj.businessName; // Add alias for frontend compatibility
    }

    res.json({
      success: true,
      company: companyObj
    });
  } catch (err) {
    console.error("Error fetching company details:", err);
    res.status(500).json({
      success: false,
      message: "Server error while fetching company details"
    });
  }
});
// Increment promotion performance (impression or click)
app.post("/api/promotion/:id/track", async (req, res) => {
  try {
    const { type } = req.body; // 'impression' or 'click'
    const { id } = req.params;

    const promotion = await Promotion.findById(id);
    if (!promotion) {
      return res.status(404).json({ success: false, message: "Promotion not found" });
    }

    if (!promotion.performance) {
      promotion.performance = { impressions: 0, clicks: 0, conversions: 0, revenue: 0 };
    }

    if (type === "impression") promotion.performance.impressions += 1;
    if (type === "click") promotion.performance.clicks += 1;

    await promotion.save();

    res.json({ success: true, promotion });
  } catch (error) {
    console.error("Track promotion error:", error);
    res.status(500).json({ success: false, message: "Failed to track promotion" });
  }
});
app.delete("/api/product/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const deleted = await Product.findByIdAndDelete(productId);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("Delete product error:", error);
    res.status(500).json({ success: false, message: "Failed to delete product" });
  }
});
app.delete("/api/post/:postId", authMiddleware, async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    // Optional: Ensure only post owner or business owner can delete
    if (post.user.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Unauthorized to delete this post" });
    }

    await Post.findByIdAndDelete(postId);

    res.json({ success: true, message: "Post deleted successfully" });
  } catch (error) {
    console.error("Delete post error:", error);
    res.status(500).json({ success: false, message: "Failed to delete post" });
  }
});

// =========================================================================
//                             ADMIN ROUTES
// =========================================================================

// --- GET /api/admin/businesses?status=pending/approved ---
app.get('/api/admin/businesses', async (req, res) => {
    try {
        const { status } = req.query;
        let query = {};
        
        if (status === 'pending') {
            // Fetch businesses explicitly set to 'pending' or 'active' but unverified
            query = { $or: [{ status: 'pending' }, { status: 'active', verified: false }] }; 
            
        } else if (status === 'approved') {
            // Approved and Suspended (for management)
            query = { $or: [{ status: 'active', verified: true }, { status: 'suspended' }] };
        } else {
            return res.status(400).json({ message: 'Invalid status query parameter.' });
        }

        const businesses = await Business.find(query)
            .populate('user', 'firstName lastName email')
            .lean();

        // Adjusting business status for frontend logic if using the proposed `verified` flag:
        const formattedBusinesses = businesses.map(biz => ({
            ...biz,
            status: biz.status === 'active' && !biz.verified ? 'pending' : biz.status // For frontend UI
        }));
        
        res.json(formattedBusinesses);

    } catch (error) {
        console.error('Admin get businesses error:', error);
        res.status(500).json({ message: 'Server error fetching businesses' });
    }
});

// --- PUT /api/admin/businesses/:businessId/approve ---
app.put('/api/admin/businesses/:businessId/approve', async (req, res) => {
    try {
        const business = await Business.findByIdAndUpdate(
            req.params.businessId,
            { status: 'active', verified: true, suspensionReason: null, rejectionReason: null }, // Set to active and fully verified
            { new: true }
        );

        if (!business) {
            return res.status(404).json({ message: 'Business not found' });
        }
        
        // Update the associated user role to ensure they are a business_owner
        await User.findByIdAndUpdate(business.user, { role: 'business_owner' });

        res.json({ success: true, message: 'Business approved and verified successfully!' });
    } catch (error) {
        console.error('Admin approve business error:', error);
        res.status(500).json({ message: 'Server error during business approval' });
    }
});

// --- PUT /api/admin/businesses/:businessId/reject ---
app.put('/api/admin/businesses/:businessId/reject', async (req, res) => {
    const { reason } = req.body;
    if (!reason) {
        return res.status(400).json({ message: 'Rejection reason is required.' });
    }
    
    try {
        // Since 'rejected' is not in your schema's enum ['active','inactive','suspended'],
        // we'll mark it as 'inactive' and clear verification/add rejection reason.
        const business = await Business.findByIdAndUpdate(
            req.params.businessId,
            { 
                status: 'inactive', 
                verified: false, 
                rejectionReason: reason,
                suspensionReason: null
            },
            { new: true }
        );

        if (!business) {
            return res.status(404).json({ message: 'Business not found' });
        }
        
        // Note: You may want to demote the user's role here if necessary.

        res.json({ success: true, message: 'Business rejected and marked inactive.' });
    } catch (error) {
        console.error('Admin reject business error:', error);
        res.status(500).json({ message: 'Server error during business rejection' });
    }
});

// --- PUT /api/admin/businesses/:businessId/suspend ---
app.put('/api/admin/businesses/:businessId/suspend', async (req, res) => {
    const { reason } = req.body;
    if (!reason) {
        return res.status(400).json({ message: 'Suspension reason is required.' });
    }

    try {
        const business = await Business.findByIdAndUpdate(
            req.params.businessId,
            { status: 'suspended', suspensionReason: reason },
            { new: true }
        );

        if (!business) {
            return res.status(404).json({ message: 'Business not found' });
        }

        res.json({ success: true, message: 'Business suspended successfully.' });
    } catch (error) {
        console.error('Admin suspend business error:', error);
        res.status(500).json({ message: 'Server error during business suspension' });
    }
});

// --- PUT /api/admin/businesses/:businessId/activate ---
app.put('/api/admin/businesses/:businessId/activate', async (req, res) => {
    try {
        const business = await Business.findByIdAndUpdate(
            req.params.businessId,
            { status: 'active', suspensionReason: null },
            { new: true }
        );

        if (!business) {
            return res.status(404).json({ message: 'Business not found' });
        }

        res.json({ success: true, message: 'Business activated successfully.' });
    } catch (error) {
        console.error('Admin activate business error:', error);
        res.status(500).json({ message: 'Server error during business activation' });
    }
});

// --- GET /api/admin/stats ---
app.get('/api/admin/stats', async (req, res) => {
    try {
        const [totalBusinesses, pendingApprovals, totalPosts, totalProducts, totalPromotions] = await Promise.all([
            Business.countDocuments(),
            Business.countDocuments({ $or: [{ status: 'pending' }, { status: 'active', verified: false }] }), // Pending
            Post.countDocuments(),
            Product.countDocuments(),
            Promotion.countDocuments({ status: 'active' }),
        ]);

        // Revenue Calculation (simplified/mocked as full order/transaction logic is complex)
        const totalRevenueResult = await Product.aggregate([
            { $group: { _id: null, totalRevenue: { $sum: '$sales.revenue' } } }
        ]);
        const totalRevenue = totalRevenueResult.length > 0 ? totalRevenueResult[0].totalRevenue : 0;
        
        const activeBusinesses = await Business.countDocuments({ status: 'active', verified: true });

        res.json({
            totalBusinesses,
            pendingApprovals,
            totalPosts,
            totalProducts,
            totalPromotions,
            totalRevenue: Math.round(totalRevenue),
            activeBusinesses
        });
    } catch (error) {
        console.error('Admin get stats error:', error);
        res.status(500).json({ message: 'Server error fetching platform statistics' });
    }
});

// --- GET /api/admin/analytics/businesses (Dashboard Analytics Table) ---
app.get('/api/admin/analytics/businesses', async (req, res) => {
    try {
        // Find all businesses, then aggregate metrics for each one.
        const analyticsData = await Business.aggregate([
            {
                $lookup: {
                    from: 'posts',
                    localField: '_id',
                    foreignField: 'business',
                    as: 'posts'
                }
            },
            {
                $lookup: {
                    from: 'products',
                    localField: '_id',
                    foreignField: 'business',
                    as: 'products'
                }
            },
            {
                $lookup: {
                    from: 'promotions',
                    localField: '_id',
                    foreignField: 'business',
                    as: 'promotions'
                }
            },
            {
                $project: {
                    businessId: '$_id',
                    businessName: '$businessName',
                    status: '$status',
                    totalPosts: { $size: '$posts' },
                    totalProducts: { $size: '$products' },
                    totalPromotions: { 
                        $size: { $filter: { input: '$promotions', as: 'promo', cond: { $eq: ['$$promo.status', 'active'] } } }
                    },
                    totalEngagement: {
                        $sum: {
                            $map: {
                                input: '$posts',
                                as: 'post',
                                in: { $add: [{ $size: { $ifNull: ['$$post.likesList', []] } }, { $size: { $ifNull: ['$$post.commentsList', []] } }, { $ifNull: ['$$post.shares', 0] }] }
                            }
                        }
                    },
                    // Sum up revenue from all products
                    revenue: { $sum: '$products.sales.revenue' },
                    // Mocking simple growth since complex comparison requires historical Analytics data
                    growth: { $floor: { $multiply: [{ $rand: {} }, 50] } } // Random value between 0 and 50
                }
            }
        ]);

        // Filter out growth to allow for negative numbers in mock (since aggregation returns positive)
        const finalAnalytics = analyticsData.map(data => ({
            ...data,
            growth: data.businessName === 'Fitness Center' ? -5 : data.growth
        }));
        
        res.json(finalAnalytics);

    } catch (error) {
        console.error('Admin get analytics error:', error);
        res.status(500).json({ message: 'Server error fetching business analytics' });
    }
});
// Get logged-in user's profile
app.get("/api/client", authMiddleware, async (req, res) => {
  try {
    const user = await Client.findById(req.user.id).select("-password"); // exclude password
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch profile" });
  }
});

async function updateBusinessEngagementRate(businessId) {
    const businessObjectId = new mongoose.Types.ObjectId(businessId);
    
    // --- 8. Define 15-day time constraint ---
    const lookbackDays = 15;
    const fifteenDaysAgo = new Date();
    fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - lookbackDays);
    
    // 1. Fetch current business data (needed for registration date and followers)
    // Select relevant fields only for performance
    const business = await Business.findById(businessId).select('createdAt followers totalPosts');
    if (!business) return;

    // --- 9. Handle newly registered websites (less than 15 days old) ---
    if (business.createdAt > fifteenDaysAgo) {
        // Newly registered, skip calculation and set ER to 0.00%
        await Business.findByIdAndUpdate(businessId, { engagementRate: 0.00, totalPosts: 0 });
        return;
    }

    // --- Aggregation: Match by Business ID AND Time Constraint ---
    const pipeline = [
        { 
            $match: { 
                business: businessObjectId,
                createdAt: { $gte: fifteenDaysAgo } // Filter by the last 15 days
            } 
        },
        {
            $group: {
                _id: null,
                totalPosts: { $sum: 1 }, // Count posts in the 15-day period
                totalLikes: { $sum: { $size: { $ifNull: ['$likesList', []] } } },
                totalComments: { $sum: { $size: { $ifNull: ['$commentsList', []] } } },
                totalShares: { $sum: { $ifNull: ['$shares', 0] } },
                // Assuming "Reviews" and "Visit site" metrics are handled/tracked elsewhere
                // Since 'Reviews' maps to Comments in previous logic, we use Comments count again here.
                totalReviews: { $sum: { $size: { $ifNull: ['$commentsList', []] } } }, 
            }
        }
    ];

    const result = await Post.aggregate(pipeline);
    const metrics = result[0] || { totalPosts: 0, totalLikes: 0, totalComments: 0, totalShares: 0, totalReviews: 0 };
    
    
    // --- Define Static Inputs (Replace with actual data if available) ---
    // NOTE: 'Visit Site' visits/clicks are assumed to be tracked outside of the Posts schema.
    const TOTAL_VISITS_LAST_15_DAYS = 1000; // <<< Placeholder: Use a real metric if implemented
    const totalDenominator = TOTAL_VISITS_LAST_15_DAYS;
    
    const followerCount = business.followers || 1; // Used only if you change the formula back to standard ER
    
    // --- 7. Calculate Weighted Engagement Score (WES) ---
    // WES = (0.1*Likes) + (0.1*Comments) + (0.2*Shares) + (0.2*Reviews) + (0.4*Visits Site)
    const weightedScore = (
        (metrics.totalLikes * 0.1) +
        (metrics.totalComments * 0.1) + 
        (metrics.totalShares * 0.2) +
        (metrics.totalReviews * 0.2) +
        (TOTAL_VISITS_LAST_15_DAYS * 0.4) // Apply 0.4 weight to the total visit count
    );
    
    // --- Final ER Calculation ---
    // ER = (WES / Total Visits) * 100 
    let engagementRate = 0;

    if (totalDenominator > 0) {
        engagementRate = (weightedScore / totalDenominator) * 100;
    }
    
    // --- Save Results ---
    await Business.findByIdAndUpdate(businessId, {
        engagementRate: parseFloat(engagementRate.toFixed(2)),
        // Update total posts count for the business model for consistency (using the 15-day post count here)
        totalPosts: metrics.totalPosts 
    });
}
const subcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  }
});

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  subcategories: [subcategorySchema]
}, {
  timestamps: true
});
const Category = mongoose.model('Category', categorySchema);
app.get('/api/admin/categories', async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error: error.message });
  }
});

app.post('/api/admin/categories', async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Category name is required' });
    }

    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: 'Category already exists' });
    }

    const category = new Category({ name });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Error creating category', error: error.message });
  }
});

// Delete category
app.delete('/api/admin/categories/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting category', error: error.message });
  }
});

// Create subcategory
app.post('/api/admin/categories/:categoryId/subcategories', async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.findById(req.params.categoryId);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    if (!name) {
      return res.status(400).json({ message: 'Subcategory name is required' });
    }

    const existingSubcategory = category.subcategories.find(
      sub => sub.name.toLowerCase() === name.toLowerCase()
    );

    if (existingSubcategory) {
      return res.status(400).json({ message: 'Subcategory already exists' });
    }

    category.subcategories.push({ name });
    await category.save();

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Error creating subcategory', error: error.message });
  }
});

// Delete subcategory
app.delete('/api/admin/categories/:categoryId/subcategories/:subcategoryId', async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    category.subcategories.pull({ _id: req.params.subcategoryId });
    await category.save();

    res.json({ message: 'Subcategory deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting subcategory', error: error.message });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  
});