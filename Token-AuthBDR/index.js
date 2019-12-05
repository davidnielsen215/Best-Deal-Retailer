const express = require("express");
const app = express();
require("dotenv").config();
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const expressJwt = require("express-jwt");
const PORT = process.env.PORT || 5000;

//HTTP Request Logger Middleware
app.use(morgan("dev"));
//Middleware that parses information to JSON format
app.use(bodyParser.json());

//connect Application to Mongodb
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.connect("mongodb://localhost:27017/bdr-subscription",
{ useNewUrlParser: true },
(err) => {
    if (err) throw err;
    console.log("mongoDB connection established");
}
);

//User has a JWT assinged to payload
app.use("/api", expressJwt({secret: process.env.SECRET}));

app.use("/api/subscription", require("./routes/subscription"));

//Route user info from application to DB
app.use("/auth", require("./routes/auth"))

//Error Handling
app.use((err, req, res, next) => {
    console.error(err);
    if (err.name === "UnauthorizedError") {
        // express-jwt gives the 401 status to the err object for us
        res.status(err.status);
    }
    return res.send({ message: err.message });
});

app.listen(PORT, () => {
    console.log(`[+] Starting server on port ${PORT}`);
});

//Testing Github link to trello