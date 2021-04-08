// const parrots = [`<img src="imagens/bobrossparrot.gif">`, `<img src="imagens/explodyparrot.gif">`, `<img src="imagens/fiestaparrot.gif">`, `<img src="imagens/metalparrot.gif">`, `<img src="imagens/revertitparrot.gif">`, `<img src="imagens/tripletsparrot.gif">`, `<img src="imagens/unicornparrot.gif">`];
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

function howManyCards() {

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
    elemento.classList.add("selected");

}

function shuffler() {
    return Math.random() - 0.5;
}

howManyCards();