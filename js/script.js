//Adicionar uma animação na barra de pesquisa
var barraDePesquisa = document.querySelector("#barra");
var buttonBarra = document.querySelector("#button-pesquisar")
var imgLupa = buttonBarra.querySelectorAll("img")[0]

var barraDiv = document.querySelector("#barra-de-pesquisa")

barraDePesquisa.addEventListener("focus", animacaoBarraOn)
barraDePesquisa.addEventListener("blur", animacaoBarraOff)

function animacaoBarraOn (){
    buttonBarra.style.display = "block"
    imgLupa.style.opacity = 1;
}

function animacaoBarraOff (){
    imgLupa.style.opacity = 0;
    setTimeout(function (){
        buttonBarra.style.display = "none"
    },150)
}

//Adicionar uma animação na alteração de tema
var divTema = document.querySelector("#tema-do-site");
var divTemaAtual = divTema.querySelector("#tema-atual")

divTema.addEventListener("click",alterarTema)

var direcaoTemaPixel = divTemaAtual.style.marginLeft
var novoTema = ""

var direcaoTema = ""
var inverterCor = ""
var ativoTema = false

function alterarTema(){
    if(!ativoTema){
        ativoTema = true
        var nomeDaImagem = window.getComputedStyle(divTemaAtual).backgroundImage
        divTemaAtual.style.margin = "0"

        if (nomeDaImagem.includes("sol")){
            direcaoTema= "right"
            novoTema = "lua"
            inverterCor = "100%"
            divTemaAtual.style.marginLeft = "30px"
        }else{
            novoTema = "sol"
            direcaoTema= "left"
            inverterCor = "0%"
            divTemaAtual.style.marginRight = "30px"
        }
        divTemaAtual.style.backgroundImage = `url(../imgs/icons/${novoTema}.png)`
        divTema.style.filter = `invert(${inverterCor})`

        setTimeout(function(){
            divTema.style.justifyContent = direcaoTema
            ativoTema = false
        },500)

        //Altera o icone e propriedades da barra do Tema
    }
}