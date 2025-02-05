const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const socketIo = require("socket.io");
require("dotenv").config();

const app = express();
const mongouri = "mongodb+srv://rallaankitha2004:CYzMeJKeREgYxqG6@cluster0.36tqu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const PORT = process.env.PORT || 5000;

app.use(express.static("views"));
app.use(express.json());
app.use(cors());

mongoose.connect(mongouri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  firstname: String,
  lastname: String,
  password: String,
  createdOn: { type: Date, default: Date.now }
});
const User = mongoose.model("User", UserSchema);

const GroupMessageSchema = new mongoose.Schema({
  from_user: String,
  room: String,
  message: String,
  date_sent: { type: Date, default: Date.now }
});
const GroupMessage = mongoose.model("GroupMessage", GroupMessageSchema);

const PrivateMessageSchema = new mongoose.Schema({
  from_user: String,
  to_user: String,
  message: String,
  date_sent: { type: Date, default: Date.now }
});
const PrivateMessage = mongoose.model("PrivateMessage", PrivateMessageSchema);

app.post("/signup", async (req, res) => {
    try {
        console.log("Signup request received:", req.body);
        
        const { username, firstname, lastname, password } = req.body;
        if (!username || !firstname || !lastname || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: "Username already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, firstname, lastname, password: hashedPassword });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.error("Signup error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});


app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ username: user.username }, "secretkey", { expiresIn: "1h" });
    res.json({ token, username });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const io = socketIo(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("User connected");
  
  socket.on("joinRoom", (room) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });

  socket.on("chatMessage", async ({ from_user, room, message }) => {
    const msg = new GroupMessage({ from_user, room, message });
    await msg.save();
    io.to(room).emit("message", msg);
  });
  
  socket.on("typing", (room) => {
    socket.to(room).emit("typing", "User is typing...");
  });
  
  socket.on("disconnect", () => console.log("User disconnected"));
});
