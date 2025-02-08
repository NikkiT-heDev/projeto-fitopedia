var categoriasPlanta = document.querySelectorAll(".categoria-planta")
var cardAtual = 1

categoriasPlanta.forEach(categoria =>{
    var cards = categoria.querySelectorAll(".card-planta")
    cards.forEach((card,i) => {
        ocultarCards(card,i)
    })
})


export function proximoCard(botao){
    console.log(botao)
    var categorias = botao.parentElement
    var cardsPlanta = categorias.querySelectorAll(".card-planta")
    var tamanho = cardsPlanta.length

    if(tamanho > 3){ //Se a classe tiver mais de 3 cards, os botoes funcionarão
        if(cardAtual < tamanho-1){ //Se o card for menor q o penultimo, o card atual irá aumentar
            cardAtual += 1
            cardsPlanta.forEach((card,i) => {
                ocultarCards(card,i)
            })
        }
    }
}

export function voltarCard(botao){
    var categorias = botao.parentElement
    var cardsPlanta = categorias.querySelectorAll(".card-planta")
    var tamanho = cardsPlanta.length
    const TAMANHO_MINIMO = 2

    if(tamanho > 3){ //Se a classe tiver mais de 3 cards, os botoes funcionarão
        if(cardAtual > TAMANHO_MINIMO){ //Se o card for maior que o 3º, o card atual irá diminuir
            cardAtual -= 1 //cardAtual = 4
            cardsPlanta.forEach((card,i) => {
                ocultarCards(card,i)
            })
        }
    }
}

function ocultarCards(card,i){
    if(i >= cardAtual-2 && i < cardAtual + 1){//Ex: i = 3 e cardAtual = 2. Se 3 é maior que 0 e menor que 3? 
        card.style.display = "block"
        card.style.marginTop = "2px"
        setTimeout(function(){
            card.style.opacity = 1
            card.style.marginTop = "0px"
        },800)
    }else{
        card.style.opacity = 0
        setTimeout(function(){
            card.style.display = "none" //Oculta todos os cards
        },800)
    }
}

export default {proximoCard, voltarCard};