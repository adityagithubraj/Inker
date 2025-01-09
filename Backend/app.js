const express = require('express');
const userRoutes = require('./router/userRouter');


const path = require('path');
const cors = require("cors");
const PORT = process.env.PORT || 4000;

const app = express();
require('dotenv').config();


// Apply CORS middleware
app.use(cors()); // ........allow CORS for all domains

app.use(express.json());

const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// routers
app.use('/user', userRoutes);

app.get("/",(req,res)=>{
res.send("welcome to the Inker api  mkdir -  Khushi Gupta ")
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
