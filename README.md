# SwapStyle

**A Sustainable Fashion Marketplace for Clothing Swaps**

SwapStyle is a full-stack MERN application that enables users to exchange pre-loved clothing items, reducing fashion waste while building a community-driven sustainable fashion ecosystem.

---

## Overview

SwapStyle solves the problem of unused clothing sitting idle in wardrobes by creating a peer-to-peer marketplace where users can:

- List clothing items they no longer wear
- Discover and request swaps with other users
- Negotiate terms through real-time chat
- Complete secure exchanges with verification

**Target Audience:** Eco-conscious individuals, fashion enthusiasts, and anyone looking to refresh their wardrobe sustainably without purchasing new items.

**Key Value Proposition:** Reduce textile waste, save money, and discover unique pieces through a trusted community-driven swapping platform.

---

## Features

### Authentication & User Management

- JWT-based authentication with secure cookie sessions
- Google OAuth 2.0 integration for seamless login
- OTP verification for enhanced security
- Redis-backed token blacklisting for logout
- User profiles with ratings and reputation system
- Account management with fraud scoring

### Listings Management

- Create, read, update, and delete clothing listings
- Multi-image upload with ImageKit cloud storage
- AI-powered value estimation (Google Gemini integration)
- Geographic location tagging with coordinates
- Advanced filtering by category, size, condition, and location
- Full-text search capabilities
- Listing availability and status management

### Swap System

- Complete swap lifecycle management
- Request swaps with custom messages
- Accept/reject swap requests
- Dual-confirmation system for completion
- Shipping details management
- Change history tracking
- Dispute resolution workflow

### Real-Time Chat

- Socket.IO-powered instant messaging
- Room-based private conversations
- Message persistence in MongoDB
- Image sharing in chat
- Emoji picker integration
- Online/offline status indicators
- Message read receipts

### Notifications

- Real-time notification system via WebSockets
- Push notifications for swap requests, messages, and updates
- Notification center with read/unread status
- Mark all as read functionality

### Admin Dashboard

- Platform analytics with Recharts visualization
- User management (view, ban/unban)
- Listing moderation (remove/restore)
- Swap monitoring and dispute resolution
- AI-generated platform insights
- Activity distribution charts (donut charts)

### Search & Discovery

- Geographic radius-based search
- Category and clothing type filters
- Size and condition filtering
- Real-time search results
- Responsive grid layout

---

## Tech Stack

### Frontend

- **React 19** - Modern React with hooks and context
- **Vite** - Fast development and build tooling
- **Tailwind CSS 4** - Utility-first styling with custom design system
- **Framer Motion** - Smooth animations and transitions
- **React Router DOM** - Client-side routing
- **Recharts** - Data visualization for analytics
- **Socket.IO Client** - Real-time communication
- **Lucide React** - Icon library
- **React Toastify** - Toast notifications
- **React Loading Skeleton** - Loading state UI

### Backend

- **Node.js** - JavaScript runtime
- **Express.js 5** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **Socket.IO** - Real-time bidirectional communication
- **JWT** - JSON Web Token authentication
- **Bcrypt.js** - Password hashing
- **Passport.js** - Google OAuth integration
- **Redis** - Session storage and caching
- **ImageKit** - Image storage and transformation
- **Cloudinary** - Cloud media management
- **Multer** - File upload handling
- **Sharp** - Image optimization
- **Helmet.js** - Security headers
- **Express Rate Limit** - API rate limiting
- **Winston** - Logging
- **Nodemailer** - Email services

### AI & External Services

- **Google Gemini AI** - Value estimation and platform insights
- **Google OAuth 2.0** - Social authentication

### DevOps & Tools

- **Git** - Version control
- **ESLint** - Code linting
- **Nodemon** - Development auto-reload
- **dotenv** - Environment variable management

---

## Architecture

SwapStyle follows a **Layered Architecture** pattern with clear separation of concerns:

### Backend Architecture

```
┌─────────────────────────────────────────┐
│           Client (React)                │
└──────────────┬──────────────────────────┘
               │ HTTP / WebSocket
┌──────────────▼──────────────────────────┐
│           Express Routes                │
│  /api/auth, /api/listings, /api/swaps   │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│         Controllers                     │
│  Handle HTTP requests/responses         │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│          Services                       │
│  Business logic & external integrations  │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│           Models (Mongoose)             │
│    User, Listing, Swap, Chat, etc.      │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│           Database (MongoDB)              │
└─────────────────────────────────────────┘
```

### Frontend Architecture

- **Feature-based folder structure** - Each feature contains its components, hooks, services, and context
- **Context API** for global state management (Auth, Admin, Notifications)
- **Custom hooks** for reusable business logic
- **Service layer** for API communication
- **Layout components** for consistent page structures

### Communication Flow

1. **REST API** - Standard CRUD operations, authentication, listings
2. **WebSockets (Socket.IO)** - Real-time chat, notifications, live updates
3. **JWT Authentication** - Secure token-based auth with cookie storage
4. **Redis** - Token blacklisting and session management

---

## Folder Structure

```
SwapStyle/
├── backend/
│   ├── src/
│   │   ├── Validators/           # Input validation schemas
│   │   ├── config/               # Database, Redis, ImageKit config
│   │   ├── constants/            # Enums and constants
│   │   ├── controllers/          # Request handlers
│   │   │   ├── auth.controller.js
│   │   │   ├── listing.controller.js
│   │   │   ├── swap.controller.js
│   │   │   ├── chat.controller.js
│   │   │   ├── user.controller.js
│   │   │   └── admin.controller.js
│   │   ├── middlewares/        # Auth, validation, rate limiting
│   │   ├── models/               # Mongoose schemas
│   │   │   ├── listing.model.js
│   │   │   ├── user/
│   │   │   │   ├── user.model.js
│   │   │   │   ├── notification.model.js
│   │   │   │   └── rating.model.js
│   │   │   ├── swap/
│   │   │   │   ├── swap.model.js
│   │   │   │   ├── dispute.model.js
│   │   │   │   └── changeHistory.model.js
│   │   │   └── chats/
│   │   │       ├── chat.model.js
│   │   │       └── message.model.js
│   │   ├── routes/               # API route definitions
│   │   ├── services/             # Business logic layer
│   │   │   ├── ai/               # Gemini AI integrations
│   │   │   ├── auth/
│   │   │   ├── listing/
│   │   │   ├── swap/
│   │   │   ├── chat/
│   │   │   └── user/
│   │   ├── sockets/              # Socket.IO event handlers
│   │   │   ├── initialize.js
│   │   │   ├── chat.socket.js
│   │   │   └── notification.socket.js
│   │   └── utils/                # Helper functions
│   ├── server.js                 # Entry point
│   └── env.example               # Environment template
│
├── frontend/
│   ├── src/
│   │   ├── features/             # Feature-based modules
│   │   │   ├── LandingPage/      # Hero, Categories, How It Works
│   │   │   ├── auth/             # Login, Register, OTP
│   │   │   ├── listings/         # Browse, Create, Edit, View
│   │   │   ├── swap/             # Swaps management
│   │   │   ├── chats/            # Real-time messaging
│   │   │   ├── Profile/          # User profiles
│   │   │   ├── notifications/    # Notification center
│   │   │   └── admin/            # Admin dashboard
│   │   ├── Layouts/              # Page layout wrappers
│   │   ├── utils/                # Socket manager, helpers
│   │   ├── routes.jsx            # Route definitions
│   │   ├── App.jsx               # Root component
│   │   └── index.css             # Tailwind + custom theme
│   └── public/                   # Static assets
│
└── README.md
```

---

## Installation & Setup

### Prerequisites

- Node.js 18+ and npm
- MongoDB Atlas account or local MongoDB
- Redis instance (local or cloud)
- Google Cloud Console account (for OAuth)
- ImageKit account (for image storage)
- Gemini API key (for AI features)

### Clone Repository

```bash
git clone https://github.com/vigreenhussainmoiyedi23-lab/SwapStyle
cd SwapStyle
```

### Backend Setup

```bash
cd backend
npm install
```

Create `.env` file (see Environment Variables section below):

```bash
cp env.example .env
# Edit .env with your credentials
```

Start development server:

```bash
npm run dev
# or
npm start
```

### Frontend Setup

```bash
cd frontend
npm install
```

Create `.env.development` file:

```env
VITE_API_URL=http://localhost:3000/api
VITE_SOCKET_URL=http://localhost:3000
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

Start development server:

```bash
npm run dev
```

### Production Build

```bash
cd frontend
npm run build
# Built files will be served by backend from /public
```

---

## Environment Variables

### Backend (.env)

| Variable                 | Description                 | Required              |
| ------------------------ | --------------------------- | --------------------- |
| `PORT`                   | Server port (default: 3000) | Yes                   |
| `MONGO_URI`              | MongoDB connection string   | Yes                   |
| `JWT_SECRET`             | Secret key for JWT signing  | Yes                   |
| `GOOGLE_CLIENT_ID`       | Google OAuth client ID      | Yes                   |
| `GOOGLE_CLIENT_SECRET`   | Google OAuth client secret  | Yes                   |
| `GOOGLE_APP_PASSWORD`    | Gmail SMTP password         | Yes (for email)       |
| `GEMINI_API_KEY`         | Google Gemini AI API key    | Yes (for AI features) |
| `RAZORPAY_KEY_ID`        | Razorpay payment key        | Yes (for payments)    |
| `RAZORPAY_KEY_SECRET`    | Razorpay secret             | Yes                   |
| `REDIS_HOST`             | Redis server host           | Yes                   |
| `REDIS_PORT`             | Redis server port           | Yes                   |
| `REDIS_PASSWORD`         | Redis password              | If required           |
| `CSC_API_KEY`            | City/State/Country API key  | Yes                   |
| `POSTALCODE_CHECKER_URL` | Indian postal code API      | Yes                   |
| `NODE_ENV`               | Environment mode            | Yes                   |

### Frontend

| Variable                | Description            |
| ----------------------- | ---------------------- |
| `VITE_API_URL`          | Backend API base URL   |
| `VITE_SOCKET_URL`       | Socket.IO server URL   |
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth client ID |

---

## API Overview

### Authentication Routes (`/api/auth`)

- `POST /register` - User registration with OTP
- `POST /verify-otp` - OTP verification
- `POST /login` - Email/password login
- `POST /google` - Google OAuth login
- `POST /logout` - Logout and token blacklisting
- `POST /forgot-password` - Password reset request

### Listing Routes (`/api/listings`)

- `POST /` - Create listing with images
- `POST /get-all` - Get listings with filters
- `GET /:id` - Get single listing
- `PATCH /:id` - Update listing
- `DELETE /:id` - Delete listing
- `POST /estimate-value` - AI value estimation

### Swap Routes (`/api/swaps`)

- `POST /` - Create swap request
- `GET /my-swaps` - Get user's swaps
- `POST /:id/accept` - Accept swap
- `POST /:id/reject` - Reject swap
- `POST /:id/complete` - Mark swap complete
- `POST /:id/dispute` - Raise dispute
- `POST /:id/message` - Add negotiation message

### Chat Routes (`/api/chat`)

- `GET /conversations` - Get user's chats
- `GET /:chatId/messages` - Get chat messages
- `POST /` - Create new chat

### User Routes (`/api/user`)

- `GET /profile/:id` - Get user profile
- `GET /notifications` - Get notifications
- `POST /rate` - Submit rating

### Admin Routes (`/api/admin`)

- `GET /analytics` - Platform analytics
- `GET /insights` - AI-generated insights
- `GET /users` - List users
- `POST /users/:id/ban` - Ban/unban user
- `GET /listings` - List all listings
- `POST /listings/:id/remove` - Remove listing

---

## Key Features Deep Dive

### Authentication System

SwapStyle implements a robust multi-layer authentication system:

1. **JWT Tokens:** Short-lived access tokens (15 mins) with secure httpOnly cookies
2. **Redis Blacklisting:** Token invalidation on logout for security
3. **Google OAuth:** Seamless social login with profile synchronization
4. **OTP Verification:** 6-digit email verification for new registrations
5. **Protected Routes:** Middleware validates tokens on every protected endpoint

### Real-Time Chat System

Built on Socket.IO with room-based architecture:

- **Rooms:** Each swap creates a private chat room identified by `chatId`
- **Persistence:** All messages stored in MongoDB with sender/receiver references
- **Features:** Text messages, image sharing, emoji support
- **Scalability:** Room-based broadcasting ensures messages only reach intended recipients
- **Security:** Socket authentication middleware validates JWT before connection

### Swap Lifecycle

Complete workflow from request to completion:

1. **Request:** User A selects an item and offers one of theirs
2. **Accept/Reject:** User B responds to the request
3. **Negotiation:** Both parties chat to finalize terms
4. **Shipping:** Shipping details exchanged
5. **Completion:** Dual confirmation system requires both users to confirm
6. **Dispute:** Optional dispute resolution if issues arise

### AI-Powered Features

Google Gemini AI integration adds intelligence:

- **Value Estimation:** AI analyzes brand, type, size, and condition to suggest fair values
- **Platform Insights:** Admin dashboard receives AI-generated business insights about platform health, trends, and recommendations
- **Fallback Logic:** Smart fallback algorithms ensure functionality even if AI is unavailable

---

## Deployment

The application is structured for flexible deployment:

### Frontend Build

```bash
cd frontend
npm run build
```

Built assets are automatically served by the backend from the `/public` directory.

### Recommended Platforms

- **Backend:** Railway, Render, or AWS EC2
- **Frontend:** Served by backend (no separate hosting needed)
- **Database:** MongoDB Atlas
- **Redis:** Redis Cloud or Upstash
- **Images:** ImageKit (built-in CDN)

### Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Configure proper CORS origins
- [ ] Enable Helmet security headers
- [ ] Set up rate limiting
- [ ] Configure Winston logging
- [ ] Set up monitoring (optional)

---

## Screenshots

> **Note:** Screenshots should be added to the repository in a `/screenshots` folder and linked here.

### Landing Page

_Hero section with animated visuals and CTA_

### Listings Grid

_Browse page with filters and search_

### Listing Detail

_Individual listing with swap request option_

### Real-Time Chat

_Chat interface with image sharing_

### Admin Dashboard

_Analytics with charts and insights_

---

## Future Improvements

Based on current codebase analysis, potential enhancements include:

### High Priority

1. **Complete Admin Dashboard** - Full user management, content moderation, and analytics
2. **Unit & Integration Tests** - Jest test suite for critical business logic
3. **Performance Optimization** - Redis caching for listings, image lazy loading
4. **Push Notifications** - Browser push for mobile-like notification experience

### Medium Priority

5. **Mobile App** - React Native companion app
6. **Advanced Search** - Elasticsearch integration for better discovery
7. **Recommendation Engine** - ML-based item recommendations
8. **Shipping Integration** - Partner with logistics APIs for tracking

### Nice to Have

9. **Gamification** - Badges, achievements, and streaks for active swappers
10. **Social Features** - Follow users, activity feeds, collections
11. **Multi-language Support** - i18n for regional expansion
12. **Dark Mode Toggle** - Alternative theme option

---

## Contributing

Contributions are welcome! Please follow these guidelines:

1. **Fork** the repository
2. **Create a branch** for your feature (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Code Standards

- Follow existing code style and patterns
- Add meaningful comments for complex logic
- Ensure all tests pass before submitting
- Update documentation for new features

---

## License

This project is licensed under the MIT License - see below for details:

```
MIT License

Copyright (c) 2026 SwapStyle

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## Contact & Support

For questions, issues, or contributions:

- **GitHub Issues:** Report bugs or request features
- **Email:** vigreenhussainmoiyedi23@gmail.com

---

**Built with 💚 for sustainable fashion**

_SwapStyle - Refresh your wardrobe, reduce your footprint_
