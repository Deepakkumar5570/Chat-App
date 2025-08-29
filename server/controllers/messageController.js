import User from "../models/User.js";
import Message from "../models/Message.js";
import cloudinary from "../lib/cloudinary.js";
import { io, userSocketmap } from "../server.js";




// Get all users except the logged-in user
export const getUsersForSidebar = async (req, res) => {
    try {
        const userId = req.user._id;

        // Find all users except the current logged-in user
        const filteredUsers = await User.find({ _id: { $ne: userId } })
        .select("-password");

        // count message that not seen
        const unseenMessages = {};
        const promises= filteredUsers.map(async(user)=>{
            const messages = await Message.find({senderId:user._id, receiverId:userId, seen:false});
            if(messages.length>0){
                unseenMessages[user._id] = messages.length;
            }

        });
        await Promise.all(promises);
        res.json({ success: true, users: filteredUsers, unseenMessages });
    } catch(error){
        console.error("Error in getUsersForSidebar:", error.message);
        res.json({ success: false, message: error.message });
    }
}

//get all messages for selected user
export const getMessages = async (req, res) => {
    try{
        const { id: selectedUserId } = req.params;
        const myId= req.user._id;

        const messages= await Message.find({
            $or: [
                { senderId: myId, receiverId: selectedUserId },
                { senderId: selectedUserId, receiverId: myId }
            ]
        });

        await Message.updateMany(
            { senderId: selectedUserId, receiverId: myId },
            { seen: true } );

        res.json({ success: true, messages });

    }catch(error){
        console.error("Error in getMessages:", error.message);
        res.json({ success: false, message: error.message });
    }
}

// api to mark messages as seen
export const markMessagesAsSeen = async (req, res) => {
    try {
        const { id} = req.params;
        await Message.findByIdAndUpdate(id,{seen:true})

        res.json({ success: true });
    } catch (error) {
        console.error("Error in markMessagesAsSeen:", error.message);
        res.json({ success: false, message: error.message });
    }
};


// send message to selected user
export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const receiverId=req.params.id;
        const senderId = req.user._id;

        let imageUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image)
            imageUrl = uploadResponse.secure_url;
        }
        // storing data in to mongoDB
        const newMessage = await Message.create({
            senderId,
            receiverId,
            text,
            image: imageUrl
        });

        // emit the new message to the receiver's socket
        const receiverSocketId = userSocketmap[receiverId];
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("getMessage", newMessage);
        }

        res.json({ success: true, message: newMessage });
    } catch (error) {
        console.error("Error in sendMessage:", error.message);
        res.json({ success: false, message: error.message });
    }
};   