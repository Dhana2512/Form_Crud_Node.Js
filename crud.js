'use strict';
const express = require('express');
const { v4: uuid } = require('uuid');
const mongoose = require('mongoose');
const cors = require('cors')
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });
const port = 3000;

const app = express();
app.use(cors())
app.use(express.urlencoded({ extends: true }))
app.use(express.json());
const user = mongoose.model('user', {
    Fname: String,
    Lname: String,
    DOB: String,
    Gender: String,
    DetailsOfSiblings: String,
    Fname1: String,
    Lname1: String,
    FathersQualification: String,
    PhoneNumber: Number,
    Email: String,
    FathersOccupation: String,
    Fname2: String,
    Lname2: String,
    MothersQualification: String,
    PhoneNumber1: Number,
    Email1: String,
    MothersOccupation: String,
    Address: String,
    AddressLine2: String,
    City: String,
    Region: String,
    PostalZipCode: Number,
    Country: String,
    PaymentDetails: String,
    id: { type: String, default: uuid }
});

//create new user
app.post('/users', (req, res) => {
    user.create(req.body)
        .then((result) => {
            res.json(result);
        })
        .catch((error) => {
            res.status(500).json(error);
        });
});

//retrive the user list
app.get('/users', (req, res) => {
    user.find({})
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            res.status(500).json(error);
        })
})

//update the user list
app.put('/users/:id', (req, res) => {
    user.findOneAndUpdate({id: req.params.id }, req.body, { new: true})
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            res.status(500).json(error);
        })
})

//delete the user list
app.delete('/users/:id', (req, res) => {
    user.findOneAndDelete({id: req.params.id })
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            res.status(500).json(error);
        })
})

app.listen(port, () => {
    console.log(`server listening at port ${port}`);
});