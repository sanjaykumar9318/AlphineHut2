# 🏔️ AlphineHut

A modern full-stack hotel listing platform , built using the MERN backend ecosystem. Users can explore, create, edit, and review hotel listings with secure authentication and image uploads.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-8BC34A?style=for-the-badge)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)
![Passport.js](https://img.shields.io/badge/Passport.js-34E27A?style=for-the-badge)
![Cloudinary](https://img.shields.io/badge/Cloudinary-4285F4?style=for-the-badge&logo=cloudinary&logoColor=white)

---

# ✨ About

AlphineHut is a full-stack hotel listing application where users can browse accommodations, create their own listings, upload property images, write reviews, and securely manage their accounts.

## 🌐 Live Demo
🔗 https://alphinehut.onrender.com
> **Note:** This project is hosted on Render's free tier. The first request after inactivity may take 30–60 seconds while the server wakes up.


The project follows RESTful architecture and implements secure authentication, authorization, server-side validation, and cloud image storage to provide a production-ready web application.

---


# 🚀 Features

### 🏠 Listings
- View all hotel listings
- View detailed listing page
- Create new listings
- Edit existing listings
- Delete listings
- Responsive UI

### 👤 Authentication
- User Signup
- User Login
- User Logout
- Password hashing using Passport Local Mongoose
- Session-based Authentication

### 🔐 Authorization
- Only owners can edit/delete their listings
- Only review authors can delete reviews
- Protected routes

### ⭐ Reviews
- Add reviews
- Delete reviews
- Rating system

### 📷 Image Upload
- Cloudinary image hosting
- Multer integration
- Automatic image storage

### ✅ Validation
- Client-side validation
- Server-side validation using Joi
- Custom error handling

---

# 🛠 Tech Stack

## Frontend

- HTML5
- CSS3
- Bootstrap
- JavaScript
- EJS

## Backend

- Node.js
- Express.js

## Database

- MongoDB
- Mongoose

## Authentication

- Passport.js
- Express Session
- Passport Local Mongoose

## Cloud Services

- Cloudinary
- Multer

## Other Tools

- REST APIs
- Joi Validation
- Connect Flash
- Method Override

---



---

# ⚙ Installation

Clone the repository

```bash
git clone https://github.com/sanjaykumar9318/AlphineHut2
```

Move into project

```bash
cd AlphineHut
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
ATLASDB_URL=Your MongoDB Atlas URL

SECRET=Your Session Secret

CLOUD_NAME=Your Cloudinary Cloud Name

CLOUD_API_KEY=Your Cloudinary API Key

CLOUD_API_SECRET=Your Cloudinary API Secret
```

Run

```bash
npm start
```

Open

```
http://localhost:8080
```

---

# 📖 What I Learned

- RESTful Architecture
- MVC Project Structure
- Authentication & Authorization
- Passport.js
- Session Management
- MongoDB Atlas
- Cloudinary Integration
- Image Uploads using Multer
- Error Handling
- Joi Validation
- Express Middleware
- Deployment

---

# 🎯 Future Improvements

- ❤️ Wishlist Feature
- 🔍 Search & Filters
- 📍 Google Maps Integration
- 💳 Online Booking
- 📅 Availability Calendar
- 📱 Progressive Web App
- 📧 Email Verification
- 🔔 Notifications

---

# 👨‍💻 Author

**Sanjay Kumar S**

📧 sanjayswiz26@gmail.com

🔗 LinkedIn: https://linkedin.com/in/your-profile

💻 GitHub: https://github.com/your-github

---

## ⭐ If you like this project

Give this repository a ⭐ on GitHub!
