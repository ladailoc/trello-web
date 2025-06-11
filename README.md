# 📝 Trello Web – Task Management App (MERN Stack)

This project is a Trello-like task management web application built with the **MERN Stack** (MongoDB, Express.js, React, Node.js) and **Vite**. It features a modern Kanban-style board with drag-and-drop support, light/dark themes, and mock backend data.

## 🚀 Features

- **MERN Stack** – Full-stack JavaScript application.
- **React + Vite** – Fast front-end with hot module reload.
- **Express.js + Node.js** – RESTful API server setup.
- **MongoDB Integration (Planned)** – Structured storage for boards, lists, cards, and users.
- **Material UI (MUI)** – Prebuilt responsive components with theming support.
- **Drag and Drop** – Smooth reordering of columns/cards using `@dnd-kit`.
- **Theme Toggle** – Switch between light/dark/system modes.
- **Mock Data** – Demo board data defined in `src/apis/mock_data.js`.
- **Modular Codebase** – Reusable components and services.

## 🧱 Tech Stack

| Layer        | Tech                          |
|--------------|-------------------------------|
| Frontend     | React, Vite, MUI, dnd-kit     |
| Backend      | Node.js, Express.js           |
| Database     | MongoDB (Planned integration) |
| Styling      | Material UI, SCSS (optional)  |
| Dev Tools    | ESLint, Prettier, Git         |

## 📁 Project Structure

```
├── index.html
├── public/                    # Static files
├── src/
│   ├── App.jsx                # App root
│   ├── components/            # Reusable UI components
│   ├── pages/                 # Page-level components (Boards, Users, Auth)
│   ├── utils/                 # Helpers and utilities
│   ├── apis/                  # Mock API services
│   └── theme.js               # MUI theme configuration
├── server/                   # Backend server (Express)
│   ├── routes/                # API route handlers
│   ├── controllers/           # Request logic
│   └── app.js                 # Entry point for Express
├── vite.config.js             # Vite config
├── package.json
└── README.md
```

> 🛠️ **Note**: MongoDB database integration and full CRUD API for cards/columns are planned features.

## 🧑‍💻 Getting Started

### 📦 Prerequisites

- [Node.js](https://nodejs.org/) (v16 or newer)
- [MongoDB](https://www.mongodb.com/) (optional for mock-free version)
- Yarn or npm

---

### 📥 Install Dependencies

```bash
# Frontend
cd client/
yarn install    # or npm install

# Backend
cd server/
yarn install    # or npm install
```

---

### 🧪 Run Development Servers

**Frontend:**

```bash
cd client/
yarn dev    # or npm run dev
```

Access at: [http://localhost:5173](http://localhost:5173)

**Backend:**

```bash
cd server/
yarn dev    # or npm run dev
```

Access API at: `http://localhost:5000/api/...`

---

### 🏗️ Build for Production

```bash
# Frontend
cd client/
yarn build    # or npm run build
```

---

### 👀 Preview Production Build

```bash
cd client/
yarn preview    # or npm run preview
```

---

## ⚙️ Environment Variables

Create a `.env` file in `/server` with:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/trello_clone
```

> 💡 Update values based on your MongoDB config.

---

## ✅ TODO / Roadmap

- [x] Drag & Drop with dnd-kit
- [x] Theme switching (light/dark)
- [x] Board layout with MUI
- [ ] Connect with MongoDB
- [ ] Add user authentication (JWT)
- [ ] Real-time updates (Socket.IO or polling)
- [ ] REST API for cards, lists, boards

---

## 📄 License

This project is for educational purposes. You are welcome to use and modify it as needed.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 🙌 Acknowledgements

- Trello (for UI inspiration)
- Vite, React, MUI
- dnd-kit (amazing drag-and-drop lib)
