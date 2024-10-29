const express= require('express');
//const dotenv = require('dotenv').config();
const path = require('path');
const mongoose= require('mongoose');
const app=express();
const paging= require('./Routes/myRoute.js');

//const port =4000;

require('dotenv').config();

mongoose.connect(process.env.Mongo)
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

app.use(express.urlencoded({extended:true}));




app.use(express.json())



app.use('/', paging)
app.use(express.static('./Public'))

//Home Page 
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, 'public/home.html'));
 });
 
 //Using for registration Users
 app.get('/register',(req,res)=>{
    
    res.sendFile(path.join(__dirname, 'public/register.html'));
 })
 
 //Using for Password
 app.get('/login',(req,res)=>{
     res.sendFile(path.join(__dirname, 'public/login.html'));   
 })
 const PORT = process.env.PORT || 4000;
app.listen(PORT,()=>{
    console.log(`Server is connected ${PORT}`);
})


