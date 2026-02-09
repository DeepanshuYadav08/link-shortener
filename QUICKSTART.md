# Quick Start Guide

## Prerequisites Check
- ✅ Node.js installed (check with: `node --version`)
- ✅ MongoDB installed and running
- ✅ Dependencies installed

## Start the Application

### Terminal 1 - Start Backend
```bash
cd backend
npm run dev
```

**Expected Output:**
```
Server is running on port 5000
MongoDB Connected: localhost
```

### Terminal 2 - Start Frontend
```bash
cd frontend
npm run dev
```

**Expected Output:**
```
- ready started server on 0.0.0.0:3000
- Local: http://localhost:3000
```

## Access the Application

**Frontend:** http://localhost:3000
**Backend:** http://localhost:5000

## First Steps

1. **Register** - Go to http://localhost:3000/register
2. **Login** - Sign in with your credentials
3. **Shorten URL** - Enter a long URL on the home page
4. **Dashboard** - View all your links at http://localhost:3000/dashboard
5. **Test Redirect** - Visit any short URL (e.g., http://localhost:5000/abc12345)

## Troubleshooting

**MongoDB Connection Error:**
- Make sure MongoDB is running: `brew services start mongodb-community`
- Or start manually: `mongod --dbpath /path/to/data`

**Port Already in Use:**
- Backend: Change PORT in `backend/.env`
- Frontend: Change port with `npm run dev -- -p 3001`

**Dependencies Issues:**
- Delete `node_modules` and run `npm install` again

## Environment Variables

Backend (`.env`):
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `BASE_URL` - Base URL for short links

Frontend (`.env.local`):
- `NEXT_PUBLIC_API_URL` - Backend API URL (default: http://localhost:5000)

---

## API Testing

You can test the API directly with curl or Postman:

**Register:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123"}'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

**Shorten URL:**
```bash
curl -X POST http://localhost:5000/api/url/shorten \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"originalUrl":"https://www.example.com/very/long/url"}'
```

---

Enjoy your Link Shortener! 🚀
