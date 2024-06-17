const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const porta = 3000;

router.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/home/home.html'));
});

router.get('/login',function(req,res){
    res.sendFile(path.join(__dirname+'/home/login/login.html'));
});

router.get('/about',function(req,res){
    res.sendFile(path.join(__dirname+'/home/about/about.html'));
});

router.get('/game_selection',function(req,res){
    res.sendFile(path.join(__dirname+'/game_selection/game_selection.html'));
});

router.get('/settings',function(req,res){
    res.sendFile(path.join(__dirname+'/configuracoes/configuracoes.html'));
});



app.use('/',router);
app.use(express.static(__dirname + '/public'));
app.listen(process.env.port || porta);
console.log(`Rodando servidor na porta ${porta}`);