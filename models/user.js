const mongoose = require('mongoose'); // Import mongoose 
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 4 },
    email: { type: String, required: true, unique: true, match: /.+@.+\.+/ },
    password: String,
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true }]
})

userSchema.pre('save', function(next) {
    if (this.isNew || this.isModified('password')) {
        bcrypt.hash(this.password, saltRounds, (error, hashedPassword) => {
            if (error) {
                next(error);
            } else {
                this.password = hashedPassword;
                next();
            }
        });
    } else {
        next();
    }
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;