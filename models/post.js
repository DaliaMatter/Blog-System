const mongoose = require('mongoose'); // Import mongoose 
const userModel = require("./user");


const postSchema = new mongoose.Schema({
    title: { type: String, required: true},
    content: { type: String, required: true},
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
})

postSchema.pre('save', function(){
    if(this.isNew) {
        userModel.findByIdAndUpdate(this.author, { $push: { posts: this._id } }, (err) => {
            console.log("here");
        });
    }
})

const PostModel = mongoose.model('Post', postSchema);

module.exports = PostModel;