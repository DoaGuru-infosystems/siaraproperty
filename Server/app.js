const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
var cookieParser = require('cookie-parser')
const path = require('path');
// const authRouter = require("./routes/authRoute.js");
const propertyRouter = require('./routes/propertyRouter.js')

const app = express();

app.use(express.json());
app.use(cookieParser())
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// app.use("/api/auth", authRouter);
app.use("/api/property", propertyRouter );

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
