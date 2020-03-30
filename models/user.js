const mongoose = require('mongoose'); // Import mongoose 

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 4 },
    email: { type: String, required: true, unique: true, match: /.+@.+\.+/ },
    password: String,
    posts: { type: Array, default: []}
})

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;