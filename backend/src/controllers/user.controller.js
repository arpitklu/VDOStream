import User from "../models/User.js"


//get recommended users:
export async function getRecommendedUsers(req, res){

    try{
        const curretnUserId = req.user.id;
        const curretnUser = req.user;

        const recommendedUsers = await User.find({
            $and:[
                {_id: {$ne: curretnUserId}}, //exclude current user.
                {$id: {$nin: curretnUser.friends}}, //exclude current user's friends.
                {isOnboarded: true},
            ],
        });
        res.status(200).json(recommendedUsers);
    } catch (error) {
        console.log("Error in getRecommendedUsers controller !!", error.message);
        res.status(500).json({message: "Internak Server Error !!"});
    }
}

//get myFriends: 
export async function getMyFriends(req, res) {

    try{
        const user = await User.findById(req.user.id).select("friends").populate("friends","fullName profilePic nativeLanguage learningLanguage");
        res.status(200).json(user.friends);
    }catch (error){
        console.log("Error in getMyFriends controller", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
}


export async function sendFriendRequest(req, res) {
    try{

    }catch (error){

    }
}