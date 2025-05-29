
# Airepro-Solution Mini Productivity Dashboard

A full-stack productivity dashboard to manage daily tasks and goals, built with React.js, Node.js, Express, and MongoDB. Users can authenticate securely with JWT, create, update, drag and drop tasks, view motivational quotes, and toggle between dark and light themes.

## [Click here to view the Live App](https://airepro-solution.netlify.app/)

## Features

- JWT-based user authentication (Login/Register)
- CRUD operations for Tasks and Goals
- Drag-and-drop task management (To Do, In Progress, Done)
- Motivational quote fetched from external API
- Light/Dark theme toggle
- Responsive UI with Ant Design and Tailwind CSS
- Realtime UI updates with optimistic rendering

---

## Tech Stack

### Frontend:

- React.js
- Ant Design
- Tailwind CSS
- Axios
- @hello-pangea/dnd

### Backend:

- Node.js
- Express.js
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- dotenv

---

### 1. Clone the repo client site :

- https://github.com/harun708280/Airepro-Solution-Client.git
-  Airepro-Solution
- npm install
- npm run dev

### 2. Clone the repo Backend

- https://github.com/harun708280/Airepro-Solution-Server.git

- PORT=5000
- MONGODB_URI=mongodb_connection_string
- JWT_SECRET=jwt_secret
- npm install
- nodemon
