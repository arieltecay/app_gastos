const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
const userRouter = require('./routes/userRouter');
const categoryRouter = require('./routes/categoryRouter');
const transactionRouter = require('./routes/transactionRouter');
const errorHandlerMiddle = require('./middlewares/errorHandlerMiddle');
const app = express();
const dotenv = require('dotenv');

dotenv.config();
const urlLocal = "mongodb://localhost:27017/expense-tracker";
console.log('CORS_ORIGIN:', process.env.CORS_ORIGIN);
const urlDev = `mongodb+srv://${process.env.DB_USERNAME_TEST}:${process.env.DB_PASSWORD_TEST}@firstcluster.ws89f.mongodb.net/?retryWrites=true&w=majority&appName=FirstCluster`
const urlprod = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.APP_NAME}.tlbsv.mongodb.net/?retryWrites=true&w=majority&appName=${process.env.APP_NAME}`
mongoose.connect(urlprod).then(() => {
    console.log("Connected to the database");
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
}).catch((error) => {
    console.log("Error: ", error);
});

const corsOptions = {
    origin: process.env.CORS_ORIGIN_PROD,
    AccessControlAllowOrigin: process.env.CORS_ORIGIN_PROD,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
//Middlewares
app.use(express.json());
//routes
app.use("/", userRouter);
app.use("/", categoryRouter);
app.use("/", transactionRouter);
app.use(errorHandlerMiddle);
