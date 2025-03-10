const express = require("express");
const players = express();

const multer = require("multer");
const path = require('path');
const bodyParser = require("body-parser");


players.use(bodyParser.urlencoded({extended:true}));

players.use(express.static(path.resolve(__dirname,'public')));

const storage =  multer.diskStorage({
    destination:(req,file,cb) =>{
cb(null,'./public/uploads')
    },
    filename:(req,file,cb)=>{
cb(null,file.originalname)
    }
})

const upload = multer({storage:storage});

const playerControllers = require("../controllers/playerControllers")


players.post('/importPlayers',upload.single('file'),playerControllers.importPlayers);
players.get('/players',playerControllers.getAllUsers);


module.exports = players