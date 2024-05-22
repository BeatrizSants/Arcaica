localStorage.setItem("vez", "X"); //abrir local storage f12
localStorage.setItem("jogo", "---------"); //colocando no armazenamento local uma chave 'jogo' com o valor de 9 espaços (grades do jogo da velha) que serão alterados durante o jogo(verificar ganhador)

function start(modo) {
  document.getElementById("menu").style.display = "none"; //faz ser visivel ou não as divs menu e jogo
  document.getElementById("jogo").style.display = "flex";
  localStorage.setItem("modo", modo);
  if (modo == "pc") localStorage.setItem("jogando", "p");
}

function fieldClick(id) {
  var jogo = localStorage.getItem("jogo");
  if (jogo[Number(id) - 1] == "-") {
    placeOnField(id);
    if (localStorage.getItem("modo") == "pc") pcPlays();
  }
  mudarJogador();
}

function mudarJogador() {
  if (localStorage.getItem("jogando") == "p")
    localStorage.setItem("jogando", "pc");
  else localStorage.setItem("jogando", "p");
}

function placeOnField(id) {
  var vez = localStorage.getItem("vez");
  var jogo = localStorage.getItem("jogo");
  var botao = document.getElementById(id);
  // ! negação (se botao vazio executa)  esse if verifica se o botão já foi preenchido (não haver sobreposição)
  if (!botao.innerHTML) {
    botao.innerHTML = vez;
    if (vez == "X") {
      localStorage.setItem("vez", "O");
    } else {
      localStorage.setItem("vez", "X");
    }
    jogo = jogo.substring(0, Number(id) - 1) + vez + jogo.substring(Number(id)); //substituindo valor na string (chave) "jogo"
    localStorage.setItem("jogo", jogo);
    var vencedor = verificarVencedor(jogo);
    if (vencedor)
      setTimeout(function () {
        window.alert(`${vencedor} venceu!`); //mensagem de vencedor
      }, 100);
  }
}
//computador joga
function pcPlays() {
  var jogo = localStorage.getItem("jogo");
  var espacoVazio = [];
  for (let i = 0; i < jogo.length; i++) {
    if (jogo[i] == "-") espacoVazio.push(i + 1);
  }
  var id = espacoVazio[Math.floor(Math.random() * espacoVazio.length)];
  placeOnField(id);
}

//verifica vencedor
function verificarVencedor(jogo) {
  var vencedor;
  vencedor = verificaLinha(jogo);
  if (!vencedor) {
    vencedor = verificaColuna(jogo);
    if (!vencedor) {
      vencedor = verificaDiagonal(jogo);
    }
  }
  return vencedor;
}

function verificaLinha(jogo) {
  if (jogo[0] != "-" && jogo[0] == jogo[1] && jogo[0] == jogo[2]) {
    return jogo[0];
  }
  if (jogo[3] != "-" && jogo[3] == jogo[4] && jogo[3] == jogo[5]) {
    return jogo[3];
  }
  if (jogo[6] != "-" && jogo[6] == jogo[7] && jogo[6] == jogo[8]) {
    return jogo[6];
  }
  return;
}

function verificaColuna(jogo) {
  if (jogo[0] != "-" && jogo[0] == jogo[3] && jogo[0] == jogo[6]) {
    return jogo[0];
  }
  if (jogo[1] != "-" && jogo[1] == jogo[4] && jogo[1] == jogo[7]) {
    return jogo[1];
  }
  if (jogo[2] != "-" && jogo[2] == jogo[5] && jogo[2] == jogo[8]) {
    return jogo[2];
  }
  return;
}

function verificaDiagonal(jogo) {
  if (jogo[0] != "-" && jogo[0] == jogo[4] && jogo[0] == jogo[8]) {
    return jogo[0];
  }
  if (jogo[2] != "-" && jogo[2] == jogo[4] && jogo[2] == jogo[6]) {
    return jogo[2];
  }
  return;
}
