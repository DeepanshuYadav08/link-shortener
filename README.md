# 🔗 LinkShort - Modern URL Shortener

A full-stack MERN application for creating and managing shortened URLs with analytics, custom short codes, and a beautiful modern UI.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)
![MongoDB](https://img.shields.io/badge/MongoDB-4.4+-green)

## ✨ Features

- 🚀 **Lightning Fast** - Create short links instantly
- 🎨 **Modern UI** - Beautiful glassmorphism design with gradient backgrounds
- 🔐 **Secure Authentication** - JWT-based user authentication
- 📊 **Analytics** - Track clicks and monitor link performance
- 🎯 **Custom Short Codes** - Create branded, memorable links
- 📱 **Responsive Design** - Works perfectly on all devices
- ⚡ **Real-time Updates** - Dashboard updates automatically
- 🌐 **Any URL Support** - Handles complex URLs with multiple parameters

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt.js** - Password hashing
- **Nanoid** - Short code generation

### Frontend
- **Next.js 14** - React framework
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Hooks** - State management

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/link-shortener.git
   cd link-shortener
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   
   # Create .env file
   cp .env.example .env
   
   # Edit .env with your settings:
   # PORT=5001
   # MONGODB_URI=mongodb://localhost:27017/link-shortener
   # JWT_SECRET=your_secret_key_here
   # BASE_URL=http://localhost:5001
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   
   # Create .env.local file
   cp .env.local.example .env.local
   
   # Edit .env.local:
   # NEXT_PUBLIC_API_URL=http://localhost:5001
   ```

4. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   ```

5. **Run the Application**
   
   **Terminal 1 - Backend:**
   ```bash
   cd backend
   npm run dev
   ```
   
   **Terminal 2 - Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

6. **Open your browser**
   ```
   http://localhost:3000
   ```

## 📖 Usage

1. **Sign Up** - Create a new account
2. **Login** - Access your dashboard
3. **Shorten URLs**:
   - Enter any long URL
   - Optionally add a custom short code
   - Get your shortened link instantly
4. **Manage Links** - View, copy, and delete your links from the dashboard
5. **Track Analytics** - Monitor click counts for each link

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### URL Operations
- `POST /api/url/shorten` - Create short URL
- `GET /api/url/myurls` - Get user's URLs
- `PUT /api/url/:id` - Update URL
- `DELETE /api/url/:id` - Delete URL
- `GET /:shortCode` - Redirect to original URL

## 🌍 Deployment

See the complete **Deployment Guide** in the artifacts for step-by-step instructions on:
- Pushing to GitHub ✅
- Getting a free domain (is-a.dev)
- Deploying backend to Railway
- Deploying frontend to Vercel
- Setting up MongoDB Atlas

## 📁 Project Structure

```
link-shortener/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Auth & error handling
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   └── server.js        # Entry point
├── frontend/
│   ├── app/             # Next.js pages
│   │   ├── dashboard/   # Dashboard page
│   │   ├── login/       # Login page
│   │   ├── register/    # Register page
│   │   └── page.js      # Home page
│   ├── components/      # React components
│   ├── utils/           # Utilities (API client)
│   └── public/          # Static files
└── README.md
```

## 🔐 Security Features

- ✅ Password hashing with bcrypt (10 salt rounds)
- ✅ JWT authentication with secure tokens
- ✅ Protected API routes
- ✅ Environment variables for sensitive data
- ✅ Input validation and sanitization
- ✅ Duplicate short code prevention

## 🎯 Custom Short Codes

Create branded links that are easy to remember:

- **Random**: `yoursite.com/abc12345`
- **Custom**: `yoursite.com/summer-sale`

Rules:
- 3-20 characters
- Letters, numbers, hyphens, underscores
- Unique (no duplicates)

## 📊 Analytics

Track important metrics for each link:
- Total clicks
- Click timestamps
- Location data (basic implementation)

## 🔮 Future Enhancements

- [ ] QR code generation
- [ ] Advanced analytics (geo-location, browser stats)
- [ ] Link expiration dates
- [ ] Bulk URL upload
- [ ] Team collaboration
- [ ] API rate limiting
- [ ] Browser extension

## 📝 License

This project is licensed under the MIT License.

---

**⭐ Star this repo if you found it helpful!**

Made with ❤️ using MERN Stack
