# Blog Application

## 📌 Overview
This is a full-stack blog application built using **React**, **Node.js**, **Express**, and **MySQL**. It allows users to create, edit, delete, and view blog posts. The app also implements user authentication using **JWT (JSON Web Tokens)** to ensure security.

## ✨ Features
- **User Authentication:** Secure login & signup with JWT-based authentication.
- **CRUD Operations:** Users can create, read, update, and delete posts.
- **Responsive UI:** A clean and intuitive interface built with React.
- **Category-Based Filtering:** Users can filter blog posts by category.
- **Image Upload Support:** Users can upload images for blog posts.
- **Secure Routes:** Only authenticated users can create or modify posts.

## 🛠️ Tech Stack
### Frontend
- **React.js** - For building the user interface
- **React Router** - For navigation
- **Axios** - For handling API requests

### Backend
- **Node.js & Express.js** - For building the REST API
- **MySQL** - For storing blog posts & user data
- **JWT (JSON Web Tokens)** - For secure authentication
- **bcrypt.js** - For password hashing

## 🚀 Getting Started
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-repo/blog-app.git
cd blog-app
```

### 2️⃣ Install Dependencies
#### Backend:
```sh
cd backend
npm install
```
#### Frontend:
```sh
cd frontend
npm install
```

### 3️⃣ Setup Environment Variables
Create a `.env` file inside the **backend** folder and add:
```env
PORT=8800
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=blog_db
JWT_SECRET=yourjwtsecret
```

### 4️⃣ Start the Application
#### Backend:
```sh
cd backend
npm start
```
#### Frontend:
```sh
cd frontend
npm start
```

## 🔌 API Routes
### Authentication
| Method | Endpoint      | Description           |
|--------|--------------|-----------------------|
| POST   | /api/auth/register | Register a new user  |
| POST   | /api/auth/login    | Login user & get token |
| POST   | /api/auth/logout   | Logout user          |

### Posts
| Method | Endpoint         | Description           |
|--------|-----------------|-----------------------|
| GET    | /api/posts      | Get all posts         |
| GET    | /api/posts/:id  | Get single post       |
| POST   | /api/posts      | Create a new post     |
| PUT    | /api/posts/:id  | Update a post        |
| DELETE | /api/posts/:id  | Delete a post        |

## 🛠️ Challenges & Solutions
### 🔹 Token Expiration Issue
- **Issue:** Tokens were expiring too soon, leading to frequent reauthentication.
- **Solution:** Implemented refresh tokens and proper expiration handling.

### 🔹 Handling Authorization for Post Updates
- **Issue:** Users could update any post if they had the post ID.
- **Solution:** Implemented authentication middleware that verifies user ownership before allowing updates or deletions.

## 🚀 Future Enhancements
- **Role-Based Access Control (RBAC)** to allow different user roles (e.g., Admin, Editor, User)
- **Server-Side Rendering (SSR)** for better SEO performance
- **Dark Mode Toggle** for improved UI accessibility

## 🏆 Author
Developed by **Your Name**. Feel free to contribute or suggest improvements!

---
**Happy Coding! 🚀**
