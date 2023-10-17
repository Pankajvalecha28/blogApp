const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");

//Create post
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savePost = await newPost.save();
    res.status(200).json(savePost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Update post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (error) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//Delete post
// router.delete("/:id", async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     if (post.username === req.body.username) {
//       try {
//         await post.delete();
//         res.status(200).json("Post has been deleted...");
//       } catch (error) {
//         res.status(500).json(err);
//       }
//     } else {
//       res.status(401).json("You can delete only your post");
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.deleteOne();
        res.status(200).json("Post has been deleted...");
      } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).json("Error deleting post: " + error.message);
      }
    } else {
      res.status(401).json("You can delete only your post");
    }
  } catch (error) {
    console.error("Error finding post:", error);
    res.status(500).json("Error finding post: " + error.message);
  }
});


//Get post

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all posts
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if(username){
      posts = await Post.find({username})
    } else if(catName){
      posts = await Post.find({categories:{
        $in:[catName]
      }})
    } else{
      posts = await Post.find();
    }
    res.status(200).json(posts)
   
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
