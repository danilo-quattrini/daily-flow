# habit-tracker
Project for the course Advanced Web Technology, this one is going to use all the resources that we learn during this course like NodeJS, Express, MongoDB and more.

# Project Structure
```
habit-tracker/
├── public/                # Static files
│   ├── css/               # CSS stylesheets
│   ├── js/                # Client-side JavaScript
│   └── images/            # Images
├── views/                 # Pug templates
│   ├── layout.pug         # Main layout file
│   ├── signup.pug         # Sign-up page
│   └── dashboard.pug      # Dashboard page (future feature)
├── routes/                # Express routes
│   ├── auth.js            # Authentication routes (Sign-Up, Login, Logout)
│   └── habits.js          # Routes for habit management
├── models/                # Database models
│   └── User.js            # User schema for MongoDB
├── config/                # Configuration files
│   └── db.js              # Database connection
├── app.js                 # Main application entry point
├── package.json           # Project dependencies
└── README.md              # Project documentation
