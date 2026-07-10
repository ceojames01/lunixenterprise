# LaunchPad - Startup Project Tracker

A MERN stack application for tracking startup projects and tasks.

## Architecture

```
launchpad/
├── client/          # React + Vite + Tailwind frontend
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API service layer
│   │   ├── store/        # Auth context
│   │   └── utils/        # Helpers
├── server/          # Express + MongoDB backend
│   ├── src/
│   │   ├── config/       # Database, env config
│   │   ├── models/       # Mongoose schemas
│   │   ├── controllers/  # Business logic
│   │   ├── routes/       # API routes
│   │   ├── middleware/   # Auth, validation, error handling
│   │   ├── validators/   # Input validation
│   │   └── services/     # Token service
```

## Tech Stack

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs for password hashing
- express-validator for validation
- express-rate-limit for rate limiting
- helmet for security headers
- Winston for logging

**Frontend:**
- React 18 + Vite
- Tailwind CSS
- React Router v6
- React Query for data fetching
- Axios for HTTP client
- Lucide React for icons

## Database Schema

### User
- name, email, password, avatar, role
- Indexed on email

### Project
- name, description, owner, members, status, dueDate, color
- Indexed on owner, members

### Task
- title, description, project, assignedTo, createdBy, status, priority, dueDate, tags
- Indexed on project, assignedTo, status, priority, dueDate

## API Endpoints

### Auth
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Projects
- `POST /api/projects` - Create project
- `GET /api/projects` - List projects (paginated)
- `GET /api/projects/:id` - Get project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Tasks
- `POST /api/tasks` - Create task
- `GET /api/tasks` - List tasks (filtered, paginated)
- `GET /api/tasks/:id` - Get task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local instance or MongoDB Atlas)

### Local Development

**Backend:**
```bash
cd server
npm install
cp .env.example .env   # adjust MONGO_URI / secrets as needed
npm run dev
```

**Frontend:**
```bash
cd client
npm install
npm run dev
```

The Vite dev server runs on http://localhost:5173 and proxies `/api` to the
backend at http://localhost:5000. To target a different backend, set
`VITE_API_URL` in `client/.env`.

## Production Considerations

- Environment variables for secrets
- Rate limiting on API routes
- Input validation on all endpoints
- CORS configuration
- Helmet security headers
- Error logging with Winston
- MongoDB indexes for performance
- Pagination on list endpoints
- JWT token expiration
- Stateless API design for horizontal scaling

## Scaling to Millions

1. **Database:** MongoDB sharding, read replicas, connection pooling
2. **API:** Load balancer + multiple server instances
3. **Caching:** Redis for session data and frequent queries
4. **CDN:** CloudFront/Cloudflare for static assets
5. **Monitoring:** Application insights, error tracking
6. **CI/CD:** Automated testing and deployment
