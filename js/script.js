var body = document.body
var heade = document.querySelector("header")

//Adaptação do tamanho do home inicial
console.log(document.querySelector("#home-inicial").clientHeight)
var homeInicial = document.querySelector("#home-inicial")


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

function temaClaro(){
    var inverter0 = document.querySelectorAll(".inverter0")
    var claroVerde1 = document.querySelectorAll(".claroVerde1")
    var bordaPreta = document.querySelectorAll(".bordaPreta")
    var corPreta = document.querySelectorAll(".preto")

    claroVerde1.forEach(elemento => {elemento.style.color = "#2b6200"});
    bordaPreta.forEach(elemento => {elemento.style.borderColor = "#000000"})
    inverter0.forEach(elemento => {elemento.style.filter = "invert(0%)"})
    corPreta.forEach(elemento => {elemento.style.color = "#000000"})

    body.style.backgroundColor = "#FFFFFF"
    heade.style.backgroundImage = "linear-gradient(to left, #99ed00,#408602)"
}

function temaEscuro(){
    var inverter100 = document.querySelectorAll(".inverter100")
    var escuroVerde1 = document.querySelectorAll(".escuroVerde1")
    var bordaBranca = document.querySelectorAll(".bordaBranca")
    var corBranca = document.querySelectorAll(".branco")

    escuroVerde1.forEach(elemento => {elemento.style.color = "#85e838"});
    bordaBranca.forEach(elemento => {elemento.style.borderColor = "#ffffff"})
    inverter100.forEach(elemento => {elemento.style.filter = "invert(100%)"})
    corBranca.forEach(elemento => {elemento.style.color = "#ffffff"})

    body.style.backgroundColor = "#272924" 
    heade.style.backgroundImage = "linear-gradient(to right, #99ed00,#408602)"
}

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
            temaEscuro()
        }else{
            novoTema = "sol"
            direcaoTema= "left"
            inverterCor = "0%"
            divTemaAtual.style.marginRight = "30px"
            temaClaro()
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

