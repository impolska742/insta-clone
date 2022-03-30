const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const { notFound, errorHandler } = require("./middlewares/errorMiddleware.js");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const chatRoutes = require("./routes/chatRoutes");

const app = express();

dotenv.config({
  path: ".env",
});

app.use(express.json());
connectDB();

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/chat", chatRoutes);

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
    socket.emit("connected");
  });
});
