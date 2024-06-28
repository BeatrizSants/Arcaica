import {openDb, criaDatabase} from './configDB.js';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import usersRoutes from './routes/usuarioRoutes.js/'
import partidasRoutes from './routes/partidaRoutes.js/'
import authRoutes from './routes/authRoutes.js'
import {authenticateToken} from './controllers/authController.js'; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const porta = 3000;

console.log("Tentando conectar ao banco SQLite ...");
openDb();
console.log("Conexão estabelecida com o banco SQLite!");
console.log("Criando a base de dados, se ainda não existir ...");
criaDatabase();
console.log("Base criada ou mantida!");

// ========================== ROTAS GET - Páginas  =========================== 
// (estes endpoints não têm regra de negócio, apenas retornam cópias dos htmls pro navegador do cliente usar. Muito simples)
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/paginas/home.html'));
});
app.get('/login',function(req,res){
    res.sendFile(path.join(__dirname+'/paginas/login.html'));
});
app.get('/about',function(req,res){
    res.sendFile(path.join(__dirname+'/paginas/about.html'));
});
app.get('/game_selection',function(req,res){
    res.sendFile(path.join(__dirname+'/paginas/game_selection.html'));
});
app.get('/settings',function(req,res){
    res.sendFile(path.join(__dirname+'/paginas/configuracoes.html'));
});


// ============================= ROTAS DE AUTH  ============================= 
app.use("/auth", authRoutes);

// ========================== ROTAS CRUD USUÁRIO  =========================== 
app.use("/usuarios", usersRoutes);

// ========================== ROTAS CRUD PARTIDAS  ========================== 
app.use("/partidas", partidasRoutes);

//TODO:
app.get('/recupera_pontuacao',function(req,res){
    console.log(`TODO: Implementar conexão com banco e buscar pontuação (organizar e formatar os dados, etc). Retornar um json!`);
});

// ===================================== CONFIGURAÇÕES GLOBAIS DA APLICAÇÃO DO BACKEND ===================================== 
app.use(express.static(__dirname + '/public'));
app.listen(porta, () => console.log(`Rodando servidor na porta ${porta}... Acesse em http://127.0.0.1:3000/`));