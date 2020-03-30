const express = require("express");
const PostModel = require("../models/post");

const router = express.Router();

// List Posts
router.get("/", function(req, res) {
    PostModel.find({}, (err, posts) => {
        if (err) return res.send(err);
        res.json(posts);
    });
});

// List One Post by has Id
router.get("/:id", function(req, res) {
    PostModel.findById(req.params.id, (err, post) => {
        if (err) return res.send(err);
        res.json(post);
    });
});

// Add Post
router.post("/", function(req, res) {
    const {
        body: { title, content }
    } = req;
    const post = new PostModel({
        title,
        content
    })

    post.save((err, post) => {
        if (err) return res.send(err);
        res.json(post);
    })
});

// Upadte Post Date
router.patch("/:id", function(req, res) {
    PostModel.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
        if (err) return res.send(err);
        res.json(post);
    });
});

// Delete Post Data
router.delete("/:id", function(req, res) {
    PostModel.findByIdAndDelete(req.params.id, req.body, (err, post) => {
        if (err) return res.send(err);
        res.json(post);
    });
});

// export Rout file
module.exports = router;