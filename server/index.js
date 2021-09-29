const userRoutes = require('./routes/users');
const express = require("express");
const mongoose = require("mongoose");
const http =require("http");
const https=require('https');
const fs = require('fs');
const path = require('path');
const cors = require("cors");

const PORT = process.env.PORT || 5000;

const app=express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const server = https.createServer({
    key: fs.readFileSync(path.join(__dirname,'/server.key')),
    cert: fs.readFileSync(path.join(__dirname,'server.crt'))
  },app);
 //const server = https.createServer(app);
  const io = require('socket.io')(server,{
    cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }});



app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(cors());


app.use('/user',userRoutes);


io.on("connection", (socket) => {
  socket.emit("me", socket.id);

  socket.on("callUser", ({ userToCall, signalData, from, name }) => {
    io.to(userToCall).emit("callUser", {
      signal: signalData,
      from,
      name,
    });
  });

  socket.on("updateMyMedia", ({ type, currentMediaStatus }) => {
    console.log("updateMyMedia");
    socket.broadcast.emit("updateUserMedia", { type, currentMediaStatus });
  });

  socket.on("msgUser", ({ name, to, msg, sender }) => {
    io.to(to).emit("msgRcv", { name, msg, sender });
  });

  socket.on("answerCall", (data) => {
    socket.broadcast.emit("updateUserMedia", {
      type: data.type,
      currentMediaStatus: data.myMediaStatus,
    });
    io.to(data.to).emit("callAccepted", data);
  });
  socket.on("endCall", ({ id }) => {
    io.to(id).emit("endCall");
  });
});


const CONNECTION_URL='mongodb+srv://ali:ali@cluster0.atffd.mongodb.net/FirstProject?retryWrites=true&w=majority';
//const CONNECTION_URL = 'mongodb+srv://islem:islem@cluster0.lxjee.mongodb.net/FirstProject';

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => server.listen(PORT,'0.0.0.0', () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

app.get('/', (req,res)=>{
    res.send('Server is running.');
});
