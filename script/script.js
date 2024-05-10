let x = document.querySelector(".x");
let o = document.querySelector(".o");
let boxes = document.querySelectorAll(".box");
let buttons = document.querySelectorAll("#buttons-container button");
let messageContainer = document.querySelector("#message");
let messageText = document.querySelector("#message p");
let secondPlayer;

// Contador de Jogadas

let player1 = 0;
let player2 = 0;

// Adicionando o evento de click nas caixas

for (let i = 0; i < boxes.length; i++) {
  // Quando alguém clica na caixa

  boxes[i].addEventListener("click", function () {
    let el = checkEl(player1, player2);

    // Verifica se já tem x ou o
    if (this.childNodes.length == 0) {
      let cloneEl = el.cloneNode(true);
      this.appendChild(cloneEl);

      // Computar jogada
      if (player1 == player2) {
        player1++;

        if (secondPlayer == 'ai-player') {
          // Função para executar a jogada
          computerPlay();

          player2++;
        }
      } else {
        player2++;
      }
      // Checa quem venceu

      checkWinCondition();
    }
  });
}

// Evento para verificar se é 2 players ou IA

  document.getElementById("2-players").addEventListener("click", function () {
    secondPlayer = "2-players";
  startGame ();
  })

  document.getElementById("ai-player").addEventListener("click", function () {
    secondPlayer = "ai-player";
  startGame ();
  })

  function startGame (){
    document.querySelectorAll(".game-mode").forEach(element=> {
      element.style.display = "none";
    })

    setTimeout(function () {
      let container = document.querySelector("#container");
      container.classList.remove("hide");
    }, 500);
  }

// Verifica quem será o próximo a jogar
function checkEl(player1, player2) {
  if (player1 == player2) {
    // x
    el = x;
  } else {
    // o
    el = o;
  }
  return el;
}

// Ver quem ganhou
function allElementsHaveChildren (elements) {
  for (let i = 0; i < elements.length; i++) {
    if (elements[i].childNodes.length == 0) {
      return false;
    }
  } 
  
  return true;
} 

function allElementsHaveSameClass (elements) {
  let classes = elements.map(element => {
    if (typeof element.childNodes[0] == 'undefined') {
      return "";
    }
    return element.childNodes[0].className;
  });

  console.log([classes,elements]);

  for (let i = 0; i < classes.length;i++) {
    if (classes[i] !== classes[0] || classes[0] == "") {
      return false;
    }
  }
  return true;
}


function checkWinCondition() {
  let b1 = document.getElementById("block-1");
  let b2 = document.getElementById("block-2");
  let b3 = document.getElementById("block-3");
  let b4 = document.getElementById("block-4");
  let b5 = document.getElementById("block-5");
  let b6 = document.getElementById("block-6");
  let b7 = document.getElementById("block-7");
  let b8 = document.getElementById("block-8");
  let b9 = document.getElementById("block-9");

  let horizontais = [[b1,b2,b3],[b4,b5,b6],[b7,b8,b9]]
  let verticais = [[b1,b4,b7],[b2,b5,b8],[b3,b6,b9]]
  let diagonais = [[b1,b5,b9],[b3,b5,b7]]

  let check = false;

  horizontais.forEach(Element=> {
    if(allElementsHaveChildren(Element)) {
        check = true;
      }
     });

  verticais.forEach(Element=> {
  if(allElementsHaveChildren(Element)) {
      check = true;
    }
    });   

  diagonais.forEach(Element=> {
  if(allElementsHaveChildren(Element)) {
      check = true;
    }
    });  

  if (!check) {
    return false;
  }

  let winner = null;

  for (let i = 0;i < 3;i++) {
    if (i <= 1) {
      if (typeof diagonais[i] !=="undefined" && allElementsHaveSameClass(diagonais[i]) && winner == null) {
      console.log([ diagonais, diagonais[i]]);
        winner = diagonais[i][0].childNodes[0].className;
      }
    }

    if (typeof horizontais[i] !=="undefined" && allElementsHaveSameClass(horizontais[i]) && winner == null) {
    console.log([ horizontais, horizontais[i]]);
      winner =  horizontais[i][0].childNodes[0].className;
    } 
    if (typeof verticais[i] !=="undefined" && allElementsHaveSameClass(verticais[i]) && winner == null) {
    console.log([ verticais, verticais[i]]);
      winner = verticais[i][0].childNodes[0].className;
    } 

    console.log(winner);
    
    if (winner !== null) {
      declareWinner(winner);
    }
  }

  // Empate

  if (winner == null) {
    let counter = 0;
    for (let i = 0; i < boxes.length; i++) {
      if (boxes[i].childNodes[0] != undefined) {
        counter++;
      }
    }
  
    if (counter == 9) {
      declareWinner("Deu velha!");
    }
  }
}
  
// Limpa o jogo, declara o vencedor e atualiza o placar

function declareWinner(winner) {
  let scoreboardx = document.querySelector("#scoreboard-1");
  let scoreboardo = document.querySelector("#scoreboard-2");
  let msg = "";

  if (winner == "x") {
    scoreboardx.textContent = parseInt(scoreboardx.textContent) + 1;
    msg = "O jogador 1 venceu!";
  } else if (winner == "o") {
    scoreboardo.textContent = parseInt(scoreboardo.textContent) + 1;
    if (secondPlayer == "2-players") {
    msg = "O jogador 2 venceu!";
    } else {
    msg = "O computador venceu!";
    }
  } else {
    msg = "Deu velha";
  } 

  // Show the message
  messageText.innerHTML = msg;
  messageContainer.classList.remove("hide");

  // Hide the message

  setTimeout(function () {
    messageContainer.classList.add("hide");
  }, 3000);

  // Zera as jogadas

  player1 = 0;
  player2 = 0;

  // Remove x e o
  let boxesToRemove = document.querySelectorAll(".box div");

  for (let i = 0; i < boxesToRemove.length; i++) {
    boxesToRemove[i].parentNode.removeChild(boxesToRemove[i]);
  }
}

// Lógica jogada da CPU

function computerPlay() {
  let cloneO = o.cloneNode(true);
  counter = 0;
  filled = 0;

  for (let i = 0; i < boxes.length; i++) {
    
    let randomNumber = Math.floor(Math.random() * 5);

    // Só preencher se estiver vazio o filho
    if(boxes[i].childNodes[0] == undefined) {

      if(randomNumber <= 1) {
        boxes[i].appendChild(cloneO);
        counter++;
        break;
      }

      // Checagem de quantas estão preenchidas

    } else {
      filled++;
    }
  }
    if (counter == 0 && filled < 9) {
      computerPlay();
    
  }
}