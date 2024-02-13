const express = require('express');
const mongoose = require('mongoose');
const bookRouter = require('./route/books');
const cors = require('cors');
// const dev = require("dotenv").config();
// const userRouter = require('./route/users');


const app = express();
const corsOptions = {
  origin: 'http://localhost:3000', // or '*' to allow all origins
  credentials: true, // to support credentials mode on the frontend
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

// 2 Conecting MongoDB process.env.MONGo
mongoose.connect('mongodb+srv://argaw:T0s5dulUxxnAVlWN@books.20i1kvj.mongodb.net/?retryWrites=true&w=majority')
.then(console.log('Database connection is successful!'))
.catch((err) => console.log('MongoDB connection error:',err));

// 1 setup our server for Build and local server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//  Middlewares 
app.use(express.json());
app.use('/api/books',bookRouter);
// app.use('/api/users',userRouter )