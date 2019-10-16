const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
require('dotenv/config')

app.use(bodyparser.urlencoded({extended : true}));

app.use(bodyparser.json());

app.use(cors());


const roughRoute = require('./routes/rough');
app.use('/rough',roughRoute);



const userRoute = require('./routes/sorting');
app.use('/sort',userRoute);

const registrationRoute = require('./routes/registration');
app.use('/registration',registrationRoute);

const loginRoute = require('./routes/login');
app.use('/login',loginRoute);

const unusedRough = require('./routes/unused');
app.use('/unused',unusedRough);

app.get('/',(req,res) => {
    res.send('home');
});



mongoose.connect(
    process.env.DCONT,
    {useNewUrlParser : true}
    ,()=> console.log("connected")
    );



app.listen('3000');
