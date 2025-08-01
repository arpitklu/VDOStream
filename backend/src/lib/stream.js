import {StreamChat} from "stream-chat";
import "dotenv/config"

const apiKey = process.env.STREAM_API_KEY
const apiSecret = process.env.STREAM_SECRET_KEY

if(!apiKey || !apiSecret) {
    console.log("Stream API Key or Secret is missing !!")
}

const streamClient = StreamChat.getInstance(apiKey,apiSecret);

export const createStreanUser = async (userData) => {
    try{
        await streamClient.upsertUsers([userData]);
        return userData;
    }catch(error){
        console.log("Error creating Stream user:", error);
    }
};

//todo: do it later
export const generateStreamToken = (userId) =>{};