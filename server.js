// import express from "express";
//
// const app = express();
// const PORT = 4000;
//
// app.use(express.json());
//
// app.get("/", (req, res) => {
//     res.send("Server is Running 🚀");
// });
//
// app.get("/api/test", (req, res) => {
//     res.json({
//         message: "API Working Successfully ✅"
//     });
// });
//
// app.listen(PORT, () => {
//     console.log(`Server started on http://localhost:${PORT}`);
// });


// const app = require("express")();
// const  http = require("http").Server(app);
//
// const mongoose = require("mongoose");
//
//mongoose.connect("mongodb+srv://fenilthummar22_db_user:PLz3EgDxvmL1sNfG@cluster1.hgxwqfz.mongodb.net/?appName=Cluster1")
//
// const User = require('./models/userModel');
//
// http.listen(3000, function () {
//     console.log("Listening on 3000");
// });


const express = require("express");
const app = express();
const http = require("http").Server(app);
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://fenilthummar22_db_user:PLz3EgDxvmL1sNfG@cluster1.hgxwqfz.mongodb.net/?appName=Cluster1")
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

const User = require('./models/userModel');
const productRoutes = require('./routes/productRoute');
const userRoute = require("./routes/userRoute");
const profileRoute = require("./routes/profileRoute");
const orderRoute = require("./routes/orderRoute");
const contactRoute = require("./routes/contactRoutes");
const feedbackRoute = require("./routes/feedbackRoute");
const subscriptionRoute = require("./routes/subscriptionRoute");
const subscriptionpamentRoute = require("./routes/subscriptionpaymentRoutes");

app.use('/uploads', express.static('uploads'));
app.use('/images', express.static('uploads'));
app.use(express.json());

// API
app.get("/api/test", (req, res) => {
    res.json({message: "Backend Connected Successfully"});
});
app.use('/api/product', productRoutes);
app.use("/api/user", userRoute);
app.use("/api/profile" , profileRoute);
app.use("/api/order", orderRoute);
app.use("/api/contact" , contactRoute);
app.use("/api/feedback", feedbackRoute);
app.use("/api/subscription" , subscriptionRoute);
app.use("/api/subscriptionpayment" , subscriptionpamentRoute);

http.listen(5000, function () {
    console.log("Server running on http://localhost:5000");
});


