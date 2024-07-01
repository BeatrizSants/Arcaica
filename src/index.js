import { openDb, criaDatabase } from "./configDB.js";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import usersRoutes from "./routes/usuarioRoutes.js/";
import partidasRoutes from "./routes/partidaRoutes.js/";
import pontuacaoRoutes from "./routes/pontuacaoRoutes.js/";
import authRoutes from "./routes/authRoutes.js";

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
app.get("/", function (req, res) {
  console.log("Requisição p/ tela de home recebida");
  res.sendFile(path.join(__dirname + "/paginas/home.html"));
});
app.get("/login", function (req, res) {
  console.log("Requisição p/ tela de login recebida");
  res.sendFile(path.join(__dirname + "/paginas/login.html"));
});
app.get("/about", function (req, res) {
  console.log("Requisição p/ tela de about recebida");
  res.sendFile(path.join(__dirname + "/paginas/about.html"));
});
app.get("/game_selection", function (req, res) {
  console.log("Requisição p/ tela de game selection recebida");
  res.sendFile(path.join(__dirname + "/paginas/game_selection.html"));
});
app.get("/settings", function (req, res) {
  console.log("Requisição p/ tela de settings recebida");
  res.sendFile(path.join(__dirname + "/paginas/configuracoes.html"));
});
app.get("/jvelha", function (req, res) {
  console.log("Requisição p/ tela de jogo da velha recebida");
  res.sendFile(path.join(__dirname + "/paginas/jvelha.html"));
});
app.get("/damas", function (req, res) {
  console.log("Requisição p/ tela de jogo da dama recebida");
  res.sendFile(path.join(__dirname + "/paginas/damas.html"));
});
app.get("/cminado", function (req, res) {
  console.log("Requisição p/ tela de jogo do campo minado recebida");
  res.sendFile(path.join(__dirname + "/paginas/cminado.html"));
});
app.get("/info", function (req, res) {
  console.log("Requisição p/ tela de info recebida");
  res.sendFile(path.join(__dirname + "/paginas/info.html"));
});
app.get("/jv-easy", function (req, res) {
  console.log("Requisição p/ tela de jv-easy recebida");
  res.sendFile(path.join(__dirname + "/paginas/jv-easy.html"));
});
app.get("/jv-medium", function (req, res) {
  console.log("Requisição p/ tela de jv-medium recebida");
  res.sendFile(path.join(__dirname + "/paginas/jv-medium.html"));
});
app.get("/jv-hard", function (req, res) {
  console.log("Requisição p/ tela de jv-hard recebida");
  res.sendFile(path.join(__dirname + "/paginas/jv-hard.html"));
});
app.get("/jv-offline", function (req, res) {
  console.log("Requisição p/ tela de jv-offline recebida");
  res.sendFile(path.join(__dirname + "/paginas/jv-offline.html"));
});
app.get("/jv-online", function (req, res) {
  console.log("Requisição p/ tela de jv-online recebida");
  res.sendFile(path.join(__dirname + "/paginas/jv-online.html"));
});
app.get("/jd-easy", function (req, res) {
  console.log("Requisição p/ tela de jd-easy recebida");
  res.sendFile(path.join(__dirname + "/paginas/jd-easy.html"));
});
app.get("/jd-medium", function (req, res) {
  console.log("Requisição p/ tela de jd-medium recebida");
  res.sendFile(path.join(__dirname + "/paginas/jd-medium.html"));
});
app.get("/jd-hard", function (req, res) {
  console.log("Requisição p/ tela de jd-hard recebida");
  res.sendFile(path.join(__dirname + "/paginas/jd-hard.html"));
});
app.get("/jd-offline", function (req, res) {
  console.log("Requisição p/ tela de jd-offline recebida");
  res.sendFile(path.join(__dirname + "/paginas/jd-offline.html"));
});
app.get("/jd-online", function (req, res) {
  console.log("Requisição p/ tela de jd-online recebida");
  res.sendFile(path.join(__dirname + "/paginas/jd-online.html"));
});
app.get("/building", function (req, res) {
  console.log("Requisição p/ tela de building recebida");
  res.sendFile(path.join(__dirname + "/paginas/building.html"));
});
// ============================= ROTAS DE AUTH  =============================

app.use("/auth", authRoutes);

// ========================== ROTAS CRUD USUÁRIO  ===========================
app.use("/usuarios", usersRoutes);

// ========================== ROTAS CRUD PARTIDAS  ==========================
app.use("/partidas", partidasRoutes);

// ========================== ROTAS CRUD PONTUACAO  ==========================
app.use("/pontuacao", pontuacaoRoutes);

// ===================================== CONFIGURAÇÕES GLOBAIS DA APLICAÇÃO DO BACKEND =====================================
app.use(express.static(__dirname + "/public"));
app.listen(porta, () =>
  console.log(
    `Rodando servidor na porta ${porta}... Acesse em http://127.0.0.1:3000/`
  )
);
