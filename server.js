const express = require("express");  // Import express framwork
const mongoose = require('mongoose'); // Import mongoose 
const userRouter = require("./routes/users"); // Import exported route file for user pages
const postRouter = require("./routes/posts"); // Import exported route file for posts pages

// Read from enviroment var.(5000) OR  set the defualt value (4000)
const PORT = process.env.PORT || 4000;

const app = express();  // create express application

// Connect to mongoDB 
mongoose.connect('mongodb://localhost:27017/blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if(!err) console.log("Connected Successfully to mongoDB");
    else console.log(err);   
})

app.use(express.json());

// Use Routes
app.use('/users', userRouter); 
app.use('/posts', postRouter);

// Listen on PORT or desplay errors 
app.listen(PORT, (err) => {
    if (!err) console.log(`Started server on port ${PORT}`);
})