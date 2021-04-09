const parrots_tuple = [
    [`<img src="imagens/bobrossparrot.gif">`, 0],
    [`<img src="imagens/explodyparrot.gif">`, 0],
    [`<img src="imagens/fiestaparrot.gif">`, 0],
    [`<img src="imagens/metalparrot.gif">`, 0],
    [`<img src="imagens/revertitparrot.gif">`, 0],
    [`<img src="imagens/tripletsparrot.gif">`, 0],
    [`<img src="imagens/unicornparrot.gif">`, 0]
];
let numofCards = 0;
let selectedCards = "";
let contadorJogadas = 0;
let id;
let segundos = 0;
let cardMatches = 0;

function incrementarSegundos() {
    document.querySelector(".segundos").innerHTML = segundos;
    segundos++;
    //condição de vitória
    if (cardMatches == numofCards) {
        clearInterval(id);
        alert("Você venceu em " + contadorJogadas + " jogadas");
        let elemento = document.querySelector(".reset-game");
        elemento.classList.remove("hidden");
    }

}

function startGame() {
    id = setInterval(incrementarSegundos, 1000);
    let numofCards = prompt("Com quantas cartas você quer jogar ?");
    while (numofCards > 14 || numofCards < 4 || numofCards % 2 !== 0) {
        alert("Número Inválido. Selecione um número par entre 4 e 14.")
        numofCards = prompt("Com quantas cartas você quer jogar ?");

    }
    addCards(numofCards);
}

function addCards(num) {
    const elemento = document.querySelector(".card-container");
    console.log(elemento);
    let id = 0;
    for (let i = 0; i < parseInt(num); i++) {
        elemento.innerHTML += `<div onclick="flipCard(this)" class="card c${id}">
                                <div class="front-face face"><img src="imagens/front.png"></div>
                                <div class="back-face face"></div>
                               </div>`


        id++;
    }
    numofCards = num;
    change_img();
}

function change_img() {
    let parrots_tuple_local = [...parrots_tuple];
    let img_selector = 0;
    parrots_tuple_local.sort(shuffler);
    parrots_tuple_local.splice(0, 7 - (numofCards / 2));
    console.log(parrots_tuple_local[0]);
    for (let i = 0; i < numofCards; i++) {
        img_selector = Math.floor(Math.random() * parrots_tuple_local.length);
        let elemento = document.querySelector(`.c${i} .back-face`);
        elemento.innerHTML = parrots_tuple_local[img_selector][0];
        parrots_tuple_local[img_selector][1] += 1;
        if (parrots_tuple_local[img_selector][1] === 2) {
            parrots_tuple_local.splice(img_selector, 1);
        }
    }
}

function flipCard(elemento) {
    // verifica se não há carta selecionada
    elemento.classList.add("selected");
    if (selectedCards === "") {
        selectedCards = elemento;
        // se já houver carta selecionada
    } else {

        // se acertar
        if ((selectedCards.innerHTML === elemento.innerHTML) && selectedCards.classList !== elemento.classList) {
            setTimeout(stayFlipped, 250, elemento, selectedCards)
            selectedCards = "";
            contadorJogadas++;
        } else if ((selectedCards.innerHTML === elemento.innerHTML) && selectedCards.classList === elemento.classList) {
            setTimeout(voltarCarta, 500, selectedCards, elemento);
            selectedCards = "";
            contadorJogadas++;
            //se errar
        } else {
            setTimeout(voltarCartas, 1000, elemento, selectedCards);
            selectedCards = "";
            contadorJogadas++;
        }

    }
    document.querySelector(".jogadas").innerHTML = contadorJogadas;
}

function stayFlipped(elemento, selectedCards) {
    selectedCards.classList.add("stay-flipped");
    elemento.classList.add("stay-flipped");
    cardMatches += 2;
    selectedCards.classList.remove("selected");
    elemento.classList.remove("selected");
    selectedCards = "";
    elemento = "";
}

function voltarCarta(selectedCards, elemento) {
    selectedCards.classList.remove("selected");
    elemento.classList.remove("selected");
    selectedCards = "";
    elemento = "";
}

function voltarCartas(elemento, selectedCards) {
    elemento.classList.remove("selected");
    elemento = selectedCards;
    elemento.classList.remove("selected");
    selectedCards = "";
    elemento = "";
}

function shuffler() {
    return Math.random() - 0.5;
}

startGame();