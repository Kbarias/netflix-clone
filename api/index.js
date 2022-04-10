const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");

dotenv.config();

//connecting to mongoose database
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
}).then(() => console.log("DB connection success")).catch((err) => console.log(err));

app.use(express.json());

app.use('/api/auth', authRoute);

app.listen(8800, () => {
    console.log("Backend running");
});