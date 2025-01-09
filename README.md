# Inker
Inker


Client (Frontend)
   ↓ REST API
Node.js (Backend)
   ├── MongoDB (Database for users, posts, comments)
   ├── Elasticsearch (Search engine)
   ├── OpenAI API (AI image generation)
   ├── Multer & AWS S3 (Image storage)
   └── JWT Middleware (Authentication)



User Authentication: User → /auth/signup or /auth/login → MongoDB → JWT → Client.

Post Creation: User → /post/create → AI Image (Optional) → MongoDB → ELK Sync.

Search: User → /search → Elasticsearch → Results → Client.

Feed: User → /feed/global or /feed/personal → MongoDB → Results → Client.

Follow System: User → /user/follow → MongoDB → Success → Client.


# System Design Flow
1. User Authentication and Management
Frontend:
User accesses the login/signup form on the client-side (e.g., Angular, React, or any other framework).

Backend:
API /auth/signup: Validates input and stores user data (hashed password) in MongoDB.
API /auth/login: Authenticates user and returns a JWT token.

Database:
MongoDB stores user data, including followers and following relationships.

JWT Middleware:
Validates token for protected routes like creating posts, liking, and commenting.
