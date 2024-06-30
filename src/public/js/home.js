//pop-up include
w3.includeHTML();

//troca background
document.addEventListener("DOMContentLoaded", function () {
  const background = document.getElementById("background");
  const imageOverlay = document.getElementById("image-overlay");
  const buttons = background.querySelectorAll(".button");
  buttons.forEach(function (button) {
    button.addEventListener("mouseover", function () {
      const imgUrl = button.getAttribute("data-img");
      imageOverlay.style.backgroundImage = "url(" + imgUrl + ")";
      imageOverlay.style.opacity = 1;
    });

    button.addEventListener("mouseout", function () {
      background.style.backgroundImage = "url(img/All_Page.png)";
      imageOverlay.style.opacity = 0;
    });
  });
});

//onclick pop-up
function showpopup(id) {
  var element = document.getElementById(id);
  element.style.display = "flex";

  element.classList.add("show-popup");
  if (id === "popupLog") {
    var b1 = document.getElementById("b1");
    var b2 = document.getElementById("b2");
    if (b1) {
      b1.style.display = "block";
      b1.style.pointerEvents = "auto";
    }
    if (b2) {
      b2.style.pointerEvents = "auto";
    }
  }
}
function hidepopup(id) {
  var element = document.getElementById(id);
  element.classList.remove("show-popup");

  if (id === "popupLog") {
    var b1 = document.getElementById("b1");
    var b2 = document.getElementById("b2");
    if (b1) {
      b1.style.display = "none";
      b1.style.pointerEvents = "none";
    }
    if (b2) {
      b2.style.display = "none";
      b2.style.pointerEvents = "none";
    }
  }
}

//onclik game page
function opengames() {
  window.location.href = "../game_selection";
}

//troca login e registro
function register(id) {
  document.getElementById("b1").style.display = "none";
  showpopup(id);
}
function login(id) {
  document.getElementById("b2").style.display = "none";
  showpopup(id);
}

//turn on/off
function toggleEfect(button) {
  let turn = button.closest(".turn");
  turn.classList.toggle("off"); //off é adicionado a turn ou removido se já estiver presente
}

//TODO: Refatorar e melhorar as seguintes funções, pois a fiz apenas O MÍNIMO
//      com POPUPS EM ALERT HORROROSAS! (pouco tempo até entrega...)
function chamaApiLogin(event) {
  event.preventDefault();
  const form = document.getElementById("login");

  const formData = new FormData(form);
  const formDataObj = {};
  formData.forEach((value, key) => {
    formDataObj[key] = value;
  });

  var callbackSucesso = function (data) {
    if (data.message)
      alert(`${data.message}\r\(TODO: Fazer popup bonitinho depois)`);
    localStorage.setItem("jwtToken", data.token);
    form.submit();
  };
  var callbackFalha = function (error) {
    event.preventDefault();
    alert(
      `${
        error && error.message ? error.message : "Erro inesperado"
      }. \r\n(TODO: Fazer popup bonitinho depois)`
    );
  };

  enviaRequisicaoApi(
    '/auth/login', 
    'POST',
    formDataObj, 
    false, 
    callbackSucesso,
    callbackFalha
  );
}

function chamaApiCadastraUsuario(event){
  event.preventDefault();
  const form = document.getElementById('register');

  const formData = new FormData(form);
  const formDataObj = {};
  formData.forEach((value, key) => {
      formDataObj[key] = value;
  });

  var callbackSucesso = function(data){
    if(data.message)
      alert(`${data.message}\r\(TODO: Fazer popup bonitinho depois)`);
    form.submit();
  };
  var callbackFalha = function(error){ 
    event.preventDefault();
    alert(`${error && error.message ? error.message : "Erro inesperado"}. \r\n(TODO: Fazer popup bonitinho depois)`);
  };

  enviaRequisicaoApi(
    '/usuarios/cadastra', 
    'POST',
    formDataObj, 
    false, 
    callbackSucesso, 
    callbackFalha
  );
  
}
function enviaRequisicaoApi(url, metodoHttp, formDataObj, requerAutenticacao, callback, callbackFalha){
  
  const jwtToken = localStorage.getItem('jwtToken');
  if (requerAutenticacao && !jwtToken) {
    alert('Token JWT não encontrado!');
    return;
  }
  
  const requestOptions = (requerAutenticacao ? {
    // com header de autenticação
    method: metodoHttp, headers: { 'Authorization': `Bearer ${jwtToken}`, 'Content-Type': 'application/json' }, body: JSON.stringify(formDataObj)
  } : { 
    // sem header de autenticação
    method: metodoHttp, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formDataObj)  
  });

  fetch(url, requestOptions)
    .then((response) => {
      if (!response.ok) {
          if (response.status === 404) {
              throw new Error('Não encontrado');
          }else if (response.status === 401) {
            throw new Error('Não autorizado');
          } else {
              throw new Error('Erro interno');
          }
      }
      return response.json();
    })
    .then((data) => {
      callback(data);
    })
    .catch((error) => {
      callbackFalha(error);
    });
}
function removeSessaoUsuario() {
  localStorage.removeItem("jwtToken");
}
