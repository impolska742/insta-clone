const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const { notFound, errorHandler } = require("./middlewares/errorMiddleware.js");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const conversationRoutes = require("./routes/conversationRoutes");

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
app.use("/api/conversation", conversationRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, console.log("Server is running on PORT : " + PORT));
