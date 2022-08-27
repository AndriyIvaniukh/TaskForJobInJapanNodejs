const path = require("path");
require('dotenv').config({path: path.join(process.cwd(), 'environments', 'dev.env')});
const express = require('express');
const mongoose = require('mongoose');

const {applicantRouter,positionRouter} = require('./routers');
const {configs} = require('./configs');

mongoose.connect(configs.MONGO_URL);

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('/positions', positionRouter);
app.use('/applicants', applicantRouter);

app.use('*', (req, res) => {
    res.status(400).json('Unknown routs');
});

app.use((err, req, res, next)=>{
    res
        .status(err.status || 500)
        .json({
            error: err.message || 'Unknown error',
            status: err.status || 500
        })
})


app.listen(configs.PORT, () => {
    console.log(`Started at port ${configs.PORT}`)
});