const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const porta = 3000;

router.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/home/login.html'));
});

router.get('/login',function(req,res){
    res.sendFile(path.join(__dirname+'/home/home.html'));
});

router.get('/game_selection',function(req,res){
    res.sendFile(path.join(__dirname+'/game_selection/game_selection.html'));
});


app.use('/',router);
app.use(express.static(__dirname + '/public'));
app.listen(process.env.port || porta);
console.log(`Rodando servidor na porta ${porta}`);