import PostMessage from "../models/postMessage.js"
import mongoose from"mongoose"


export const getPost = async(req,res)=>{
    try {
        const postMessages =await PostMessage.find()
        res.status(201).json(postMessages)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

export const createPost= async(req,res)=>{
    const post = req.body
    const newPost =new PostMessage(post)

    try {
        await newPost.save() 
        res.status(200).json(newPost)
        console.log(newPost)
        
    } catch (error) {
        res.status(400).json({message: error.message})    
    }
}
export const updatePost= async(req,res)=>{
   const {id:_id}= req.params;
   const post= req.body;
   if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No post with id: ${_id}`);
   const updatedPost =await PostMessage.findByIdAndUpdate(_id,{...post,_id},{new: true})
   res.json(updatedPost)
}
export const deletePost =async (req,res)=>{
    const {id}=req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id`);
    await PostMessage.findByIdAndRemove(id);
    //console.log("delete")
    res.json({message:"post deleted successfully"})
}
export const likePost=async (req,res)=>{
    const {id}=req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id`);
    const post = await PostMessage.findById(id);
    const updatedPost=await PostMessage.findByIdAndUpdate(id,{likeCount:post.likeCount + 1},{new:true})
    res.json(updatedPost)
}


