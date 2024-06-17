const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const porta = 3000;

// ========================== ROTAS GET - Páginas  =========================== 
router.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/paginas/home.html'));
});

router.get('/login',function(req,res){
    res.sendFile(path.join(__dirname+'/paginas/login.html'));
});

router.get('/about',function(req,res){
    res.sendFile(path.join(__dirname+'/paginas/about.html'));
});

router.get('/game_selection',function(req,res){
    res.sendFile(path.join(__dirname+'/paginas/game_selection.html'));
});

router.get('/settings',function(req,res){
    res.sendFile(path.join(__dirname+'/paginas/configuracoes.html'));
});

//TODO: FAZER ENDPOINTS DE LOGIN!

//TODO: Dentre vários, outros, os seguintes enpoints:
// // ======================== GET - Endpoint para dados  ======================= 
// router.get('/recupera_pontuacao',function(req,res){
//     console.log('TODO: Implementar conexão com banco e buscar pontuação. Retornar um json!');
// });
// // ======================= POST - Endpoint para dados  ======================= 
// router.post('/salva_pontuacao',function(req,res){
//     console.log('TODO: Implementar conexão com banco e salvar pontuação. Retornar status 200 se ok.');
// });

app.use('/',router);
app.use(express.static(__dirname + '/public'));
app.listen(process.env.port || porta);
console.log(`Rodando servidor na porta ${porta}... Acesse em http://127.0.0.1:3000/`);