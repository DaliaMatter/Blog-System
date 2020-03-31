const express = require("express");
const UserModel = require("../models/user");

const router = express.Router();

// List Users
router.get("/", function(req, res) {
    UserModel.find({}, (err, users) => {
        if (err) return res.send(err);
        res.json(users);
    });
});

// List One User by has Id
router.get("/:id", function(req, res) {
    UserModel.findById(req.params.id, (err, user) => {
        if (err) return res.send(err);
        res.json(user);
    });
});

// Add User
router.post("/", function(req, res) {
    const {
        body: { name, email, password, posts }
    } = req;
    const user = new UserModel({
        name,
        email,
        password,
        posts
    });
    user.save((err, user) => {
        if (err) return res.send(err);
        res.json(user);
    });
});

// Upadte User Date
router.patch("/:id", function(req, res) {
    UserModel.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
        if (err) return res.send(err);
        res.json(user);
    });
});

// Delete User Data
router.delete("/:id", function(req, res) {
    UserModel.findByIdAndDelete(req.params.id, req.body, (err, user) => {
        if (err) return res.send(err);
        res.json(user);
    });
});

// List User Posts

router.get("/:id/posts", function(req, res) {
    UserModel.findById(req.params.id)
        .populate("posts")
        .exec((err, posts) => {
            if (err) return res.send(err);
            res.json(posts);
        });
});

// export Rout file
module.exports = router;
