const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const POST = mongoose.model("POST");
const USER = mongoose.model("USER");

// get user profile
router.get("/user/:_id", 
  requireLogin,
   async (req, res) => {
  try {
    const user = await USER.findOne({ _id: req.params._id }).select("-password")
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    } else {
        const post = await POST.find({ postedBy: req.params._id }).populate("postedBy", "_id");
        return res.status(200).json({ user, post });                              
    }
    
          
  } catch (err) {
    return res.status(404).json({ error: "User not found" });
  }
});

// to follow user
router.put("/follow",
  requireLogin,
  async (req,res)=>{
  try{
      const followUser = await USER.findByIdAndUpdate(req.body.followId,{
      $push:{followers:req.user._id}
    },{
      new:true
    })
    if(!followUser){
      return res.status(422).json({error:"User to follow not found"})
    }
    const UpdateUser = await USER.findByIdAndUpdate(
      req.user._id, 
      { $push: { following: req.body.followId } },
      { new: true }
    );
    if (!UpdateUser) {
      return res.status(404).json({ error: "Current user not found" });
    } else{
      res.json({ message: "Followed successfully", UpdateUser });
    }
  }catch(err){
    console.log(err)
  }
})

router.put("/unfollow",
  requireLogin,
   async (req,res)=>{
  try{
      const followUser = await USER.findByIdAndUpdate(req.body.followId,{
      $pull:{followers:req.user._id}
    },{
      new:true
    })
    if(!followUser){
      return res.status(422).json({error:"User to follow not found"})
    }
    const UpdateUser = await USER.findByIdAndUpdate(
      req.user._id, 
      { $pull: { following: req.body.followId } },
      { new: true }
    );
    if (!UpdateUser) {
      return res.status(404).json({ error: "Current user not found" });
    } else{
      res.json({ message: "UnFollowed successfully", UpdateUser });
    }
  }catch(err){
    console.log(err)
  }
})

// to update profile pic

router.put("/uploadProfilePic", requireLogin, async (req, res) => {
  try {
    const updatedUser = await USER.findByIdAndUpdate(
      req.user._id,
      { $set: { Photo: req.body.pic } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(422).json({ error: "Pic cannot be updated" });
    }

    res.json(updatedUser);
  } catch (err) {
    console.error("Error updating profile picture:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = router;