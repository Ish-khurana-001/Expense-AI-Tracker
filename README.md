# Expense Tracker Web Application

Expense Tracker is a full-stack personal finance management web application built to help users track their income, expenses, balance, and recent transactions in one place. The project includes secure user authentication, dashboard analytics, chart visualizations, Excel report downloads, profile image upload, and an AI-powered chat assistant for finance-related questions.

The application is designed to make daily money management easier. Users can create an account, log in securely, add income sources, record expenses, view financial summaries, analyze spending patterns through charts, and export their financial data when needed.

## Live Project Links

Frontend Live Site:

```txt
https://your-netlify-site.netlify.app
```

Backend API:

```txt
https://your-backend-api-url.com
```

GitHub Repository:

```txt
https://github.com/your-username/your-repository-name
```

## Project Overview

This project follows a full-stack architecture with a React frontend and a Node.js/Express backend. MongoDB is used as the database to store user accounts, income records, expense records, and transaction-related data.

The frontend provides a user-friendly dashboard where users can interact with the app, while the backend handles authentication, database operations, file uploads, Excel exports, and AI chat requests.

The AI chat feature is connected through the backend using the OpenAI API. This allows users to ask finance-related questions, such as how to improve savings, reduce spending, or manage a monthly budget.

## Key Features

### User Authentication

- User registration and login
- JWT-based authentication
- Password hashing using bcrypt
- Protected API routes
- User-specific financial data

### Dashboard

- Total balance overview
- Total income summary
- Total expense summary
- Recent transaction list
- Last 30 days expense summary
- Last 60 days income summary
- Chart-based financial visualization

### Income Management

- Add income records
- View all income records
- Delete income records
- Store income source, amount, date, and icon
- Download income details as an Excel file

### Expense Management

- Add expense records
- View all expense records
- Delete expense records
- Store expense category, amount, date, and icon
- Download expense details as an Excel file

### AI Chat Assistant

- Users can ask finance-related questions
- Backend securely communicates with the OpenAI API
- API key is stored only on the backend
- Helps users with savings, budgeting, and spending advice

### Excel Export

- Income report download
- Expense report download
- Exported files are generated using the xlsx package

### Profile Image Upload

- Users can upload profile images
- Backend handles uploads using Multer
- Uploaded images are served from the backend

## What Makes This Project Unique

This project is more than a simple CRUD app. It combines financial tracking, authentication, dashboard analytics, downloadable reports, and AI assistance in one application.

Unique points:

- Complete full-stack architecture
- Secure JWT authentication
- User-specific income and expense data
- Dashboard calculations performed on the backend
- Interactive charts for better financial understanding
- Excel export for offline record keeping
- AI-powered finance chat assistant
- Separate frontend and backend deployment setup
- Environment-based configuration for local and production use

## Tech Stack

### Frontend

- React.js
- Vite
- Tailwind CSS
- React Router
- Axios
- Recharts
- React Hot Toast
- React Icons
- Moment.js
- Emoji Picker React

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Multer
- xlsx
- dotenv
- cors
- OpenAI API

### Deployment

- Frontend: Netlify
- Backend: Render, Railway, Azure, or another Node.js hosting platform
- Database: MongoDB Atlas
- AI Service: OpenAI API

## Project Structure

```txt
project/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── incomeController.js
│   │   ├── expenseController.js
│   │   ├── dashboardController.js
│   │   └── chatController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── uploadMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Income.js
│   │   └── Expense.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── incomeRoutes.js
│   │   ├── expenseRoutes.js
│   │   ├── dashboardRoutes.js
│   │   └── chatRoutes.js
│   ├── uploads/
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
└── frontend/
    └── expense_tracker/
        ├── public/
        ├── src/
        │   ├── assets/
        │   ├── components/
        │   ├── context/
        │   ├── hooks/
        │   ├── pages/
        │   ├── utils/
        │   ├── App.jsx
        │   ├── main.jsx
        │   └── index.css
        ├── package.json
        ├── vite.config.js
        └── netlify.toml
```

## How The Project Works

### 1. Registration and Login

When a user registers, the frontend sends the user details to the backend. The backend validates the request, checks if the email already exists, hashes the password, creates the user in MongoDB, and returns a JWT token.

When a user logs in, the backend checks the email and password. If the details are correct, a JWT token is generated and sent to the frontend. The frontend stores this token and sends it with future protected API requests.

### 2. Protected API Requests

Protected requests include the JWT token in the request header:

```txt
Authorization: Bearer user_jwt_token
```

The backend verifies the token before allowing access to user-specific data.

### 3. Income and Expense Tracking

When a user adds income or expense data, the frontend sends the data to the backend. The backend stores the record in MongoDB with the logged-in user's ID. This ensures each user only sees their own financial records.

### 4. Dashboard Calculations

The backend calculates important financial summaries such as:

```txt
Total Balance = Total Income - Total Expense
```

It also calculates total income, total expenses, recent transactions, last 30 days expenses, and last 60 days income.

### 5. AI Chat Flow

The frontend sends the user's chat message to the backend:

```txt
POST /api/v1/chat
```

The backend forwards the message to the OpenAI API using the secret API key stored in the backend environment variables. The AI response is sent back to the frontend and displayed in the chat interface.

This keeps the OpenAI API key safe because it is never exposed in the frontend.

## Local Setup

### Backend Setup

Go to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the backend folder:

```env
PORT=8000
CLIENT_URL=http://localhost:5173
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=gpt-4.1-mini
```

Start the backend:

```bash
npm run dev
```

Backend local URL:

```txt
http://localhost:8000
```

### Frontend Setup

Go to the frontend folder:

```bash
cd frontend/expense_tracker
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the frontend folder:

```env
VITE_API_BASE_URL=http://localhost:8000
```

Start the frontend:

```bash
npm run dev
```

Frontend local URL:

```txt
http://localhost:5173
```

## Deployment Summary

This project uses separate deployment for frontend and backend.

Netlify hosts only the frontend. It does not run the Express backend. The backend must be deployed separately on a Node.js hosting platform.

### Frontend Deployment On Netlify

Add this environment variable in Netlify:

```env
VITE_API_BASE_URL=https://your-backend-api-url.com
```

After adding the environment variable, redeploy the site.

### Backend Deployment

Deploy the backend on a Node.js hosting platform such as Render, Railway, Azure, or another backend hosting service.

Add these backend environment variables:

```env
PORT=8000
CLIENT_URL=https://your-netlify-site.netlify.app
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=gpt-4.1-mini
```

### Database Deployment

MongoDB Atlas can be used as the cloud database.

Basic steps:

1. Create a MongoDB Atlas account.
2. Create a cluster.
3. Create a database user.
4. Allow network access.
5. Copy the MongoDB connection string.
6. Add it as `MONGO_URI` in the backend environment variables.

## Important Deployment Note

For local development, the frontend can call:

```env
VITE_API_BASE_URL=http://localhost:8000
```

For production deployment, the frontend must call the deployed backend:

```env
VITE_API_BASE_URL=https://your-backend-api-url.com
```

`localhost` should not be used in the deployed Netlify site because `localhost` means the visitor's own computer, not the deployed backend server.

## API Routes

### Authentication Routes

```txt
POST /api/v1/auth/register
POST /api/v1/auth/login
GET  /api/v1/auth/getUser
POST /api/v1/auth/upload-image
```

### Income Routes

```txt
POST   /api/v1/income/add
GET    /api/v1/income/get
DELETE /api/v1/income/:id
GET    /api/v1/income/downloadexcel
```

### Expense Routes

```txt
POST   /api/v1/expense/add
GET    /api/v1/expense/get
DELETE /api/v1/expense/:id
GET    /api/v1/expense/downloadexcel
```

### Dashboard Routes

```txt
GET /api/v1/dashboard
```

### Chat Routes

```txt
POST /api/v1/chat
```

## Future Improvements

- Monthly budget limits
- Edit income and expense records
- Category-based filtering
- PDF report generation
- Advanced AI financial insights
- Recurring income and expenses
- Email reminders for budget limits
- Better mobile optimization
- More detailed analytics by month and category


