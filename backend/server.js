const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");

const { notFound, errorHandler } = require("./middlewares/errorMiddleware.js");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");

const app = express();

dotenv.config({
  path: ".env",
});

app.use(express.json());
connectDB();

const PORT = process.env.PORT;

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

// -------------DEPLOYMENT-------------

const dirName1 = path.resolve();
// -------------DEPLOYMENT-------------

app.use(notFound);
app.use(errorHandler);

const server = app.listen(
  PORT,
  console.log("Server is running on PORT : " + PORT)
);

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");

  socket.on("setup", (userData) => {
    socket.join(userData.id);
    console.log(userData.id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room : " + room);
  });

  socket.on("new message", (newMessageReceived) => {
    var chat = newMessageReceived.chat;
    if (!chat.users) {
      return console.log("chat.users not defined");
    }

    chat.users.forEach((user) => {
      if (user._id === newMessageReceived.sender._id) return;
      socket.in(user._id).emit("message received", newMessageReceived);
    });
  });

  socket.on("typing", (room) => {
    socket.in(room).emit("typing");
  });

  socket.on("stop typing", (room) => {
    socket.in(room).emit("stop typing");
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
