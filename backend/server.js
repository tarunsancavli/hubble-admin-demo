const express = require('express');

const errorFunction = require('./utils/error');

require('./config/db').connectDB();

const routes = require('./routes/routes');

const cors = require('cors');

require('dotenv').config();

const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
    next(); 
})

var corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

app.route('/', (req, res) => {
    res.status(200).json(
        errorFunction(false, "Home page", "Welcome to login, sign-up api")
    )
});

app.use('/api', routes);

const port = process.env.PORT || 3000;

app.listen(process.env.PORT,() => {
    console.log(`app running on port ${port}`);
})