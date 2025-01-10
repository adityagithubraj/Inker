const express = require('express');
const userRoutes = require('./router/userRouter');
const connectDB = require('./config/db');


const path = require('path');
const cors = require("cors");
const PORT = process.env.PORT || 4000;

const app = express();

// MongoDB connection
connectDB();

require('dotenv').config();


// Apply CORS middleware
app.use(cors()); // ........allow CORS for all domains


const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


// Elasticsearch client
// const esClient = new elasticsearch.Client({
//   host: process.env.ELASTICSEARCH_HOST,
//   log: 'trace',
// });


// OpenAI configuration
// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);

// Middleware
app.use(express.json());



// Routes
app.use('/user', userRoutes);
app.get("/",(req,res)=>{
res.send("welcome to the Inker api  mkdir -  Khushi Gupta ")
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
