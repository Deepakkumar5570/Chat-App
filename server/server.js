import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";

import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoute.js";
import { Server } from "socket.io";


// create express appp and http server

const app = express();
const server = http.createServer(app);

// Initialize Socket.IO
export const io = new Server(server, {
    cors: {
        origin: "*",
        // methods: ["GET", "POST", "PUT"]
    }
});


// store online users
export const userSocketmap = {};   // userId: socketId

// socket.io connection handler
io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    console.log("User connected:", userId);
    // userSocketmap[userId] = socket.id;

    if(userId){
        userSocketmap[userId] = socket.id;
    }

    //emit online users to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketmap));

    socket.on("disconnect", () => {
        console.log("User disconnected:", userId);
        delete userSocketmap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketmap));
    });
});

//middleware
app.use(express.json({limit: "5mb"}));
app.use(cors());

//route setup

app.use("/api/status", (req,res)=> res.send("API is running..."));
app.use("/api/auth", userRouter);

app.use("/api/messages", messageRouter);

// filepath: f:\Chat-App\server\server.js
(async () => {
    await connectDB();

    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})(); 