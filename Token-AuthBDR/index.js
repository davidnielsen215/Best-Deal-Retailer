const express = require("express");
const app = express();
require("dotenv").config();
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;
const expressJwt = require("express-jwt");

//HTTP Request Logger Middleware
app.use(morgan("dev"));
//Middleware that parses information to JSON format
app.use(bodyParser.json());

//connect Application to Mongodb
mongoose.set('useCreateIndex', true);
mongoose.connect("mongodb://localhost:27017/bdr-subscription",
{ useNewUrlParser: true },
(err) => {
    if (err) throw err;
    console.log("mongoDB connection established");
}
);

//Route user info from application to DB
app.use("/auth", require("./routes/auth"))
// app.use("/subscription", require("./routes/subscription"));

app.use("/api/subscription", require("./routes/subscription"));
//User has a JWT assinged to payload
app.use("/api", expressJwt({secret: process.env.SECRET}));

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
