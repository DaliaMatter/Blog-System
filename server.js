const express = require("express"); // Import express framwork
const mongoose = require("mongoose"); // Import mongoose
const userRouter = require("./routes/users"); // Import exported route file for user pages
const postRouter = require("./routes/posts"); // Import exported route file for posts pages

// Read from enviroment var.(5000) OR  set the defualt value (4000)
const PORT = process.env.PORT || 4000;

const app = express(); // create express application

// Connect to mongoDB
mongoose.connect(
    "mongodb://localhost:27017/blog",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    err => {
        if (!err) console.log("Connected Successfully to mongoDB");
        else console.log(err);
    }
);

app.use(express.json());

// App Level Middelware for Logging
app.use(function(req, res, next) {
    console.log("LOGGED");
    next();
});

// function to test error handling middelware
app.get("/user", function(req, res, next) {
    // This middleware throws an error, so Express will go straight to
    // the next error handler
    throw new Error("woops");
});

// Error-handling Middleware
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});
// Use Routes
app.use("/users", userRouter);
app.use("/posts", postRouter);

// Listen on PORT or desplay errors
app.listen(PORT, err => {
    if (!err) console.log(`Started server on port ${PORT}`);
});
