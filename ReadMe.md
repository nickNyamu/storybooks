# StoryBooks

## Overview
StoryBooks is an Express-based web application that allows users to create and share public and private stories from their lives. It leverages several powerful Node.js packages and utilizes MongoDB for data storage. Authentication is handled through Google OAuth 2.0.

## Getting Started

### Prerequisites
Ensure you have the following installed on your system:
- Node.js
- npm (Node Package Manager)
- MongoDB (or use a MongoDB cloud service like MongoDB Atlas)

### Installation

1. **Clone the repository:**
    ```sh
    git clone https://github.com/nickNyamu/storybooks.git
    cd storybooks
    ```

2. **Install dependencies:**
    ```sh
    npm install
    ```

3. **Set up environment variables:**
    Create a `.env` file in the root directory and add the following environment variables:
    ```sh
    PORT=3000
    NODE_ENV=development
    MONGO_URI=your_mongodb_connection_string
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    ```

4. **Run the application:**
    ```sh
    npm run dev
    ```

## Project Structure

```
storybooks/
├── config/
│   ├── config.env
│   ├── db.js
│   └── passport.js
├── helpers/
│   └── hbs.js
├── middleware/
│   └── auth.js
├── models/
│   ├── Story.js
│   └── User.js
├── public/
│   ├── css/
│   │   └── style.css
├── routes/
│   ├── auth.js
│   ├── index.js
│   └── stories.js
├── views/
│   ├── partials/
│   │   ├── _add_btn.hbs
│   │   ├── _header.hbs
│   ├── layouts/
│   │   ├── login.hbs
│   │   └── main.hbs
│   ├── error/
│   │   ├── 404.hbs
│   │   └── 500.hbs
│   ├── stories/
│   │   ├── add.hbs
│   │   ├── edit.hbs
│   │   ├── index.hbs
│   │   └── show.hbs
│   ├── dashboard.hbs
│   └── login.hbs
├── .gitignore
├── app.js
└── package.json
```

## Key Features

- **Authentication:** Google OAuth 2.0 using Passport.js.
- **Story Management:** Create, edit, delete, and view public and private stories.
- **Handlebars Templating:** Dynamic content rendering with Handlebars.js.
- **Session Management:** Sessions managed using express-session and connect-mongo.
- **Logging:** HTTP request logging with Morgan.
- **Date Formatting:** Date manipulation with Moment.js.
- **Method Override:** Use HTTP verbs like PUT and DELETE where the client doesn’t support it.

## Packages Used

- **connect-mongo:** MongoDB session store for Express.
- **dotenv:** Loads environment variables from a .env file into `process.env`.
- **express:** Fast, unopinionated, minimalist web framework for Node.js.
- **express-handlebars:** Handlebars view engine for Express.
- **express-session:** Session middleware for Express.
- **method-override:** Allows the use of HTTP verbs such as PUT or DELETE.
- **moment:** JavaScript date library for parsing, validating, manipulating, and formatting dates.
- **mongoose:** MongoDB object modeling tool designed to work in an asynchronous environment.
- **morgan:** HTTP request logger middleware for Node.js.
- **passport:** Express-compatible authentication middleware for Node.js.
- **passport-google-oauth20:** Google (OAuth 2.0) authentication strategies for Passport and Node.js.
- **cross-env:** Run scripts that set and use environment variables across platforms.
- **nodemon:** Automatically restarts the Node application when file changes are detected.

## Usage

1. **Login:**
   Users can log in using their Google account.

2. **Dashboard:**
   Once logged in, users are directed to the dashboard where they can see their stories.

3. **Add Stories:**
   Users can add new stories, which can be either public or private.

4. **Edit Stories:**
   Users can edit their existing stories.

5. **Delete Stories:**
   Users can delete their stories.

6. **View Public Stories:**
   Users can view all public stories.

## License
This project is licensed under the MIT License.

---
