var body = document.querySelector("body")
var heade = document.querySelector("header")
var elementos = document.body.children;

//Adaptação do tamanho do home inicial
var homeInicial = document.querySelector("#home-inicial")

//Adicionar uma animação na barra de pesquisa
var barraDePesquisa = document.querySelector("#barra");

var barras = document.querySelectorAll(".barra")
var barraDiv = document.querySelector("#barra-de-pesquisa")
var divPesquisas = document.querySelector("#pagina-de-pesquisa")

barraDePesquisa.addEventListener("click", ativarNovaPaginaPesquisa)
var buttonVoltarPagina = document.querySelector("#voltar-pagina")

buttonVoltarPagina.addEventListener("click",desativarNovaPaginaPesquisa)

barras.forEach(barra => { // Ativa a animação para todas as tags com classe Barra 
    inputAtual = barra.querySelector("input")

    inputAtual.addEventListener("focus", function() {
        animacaoBarraOn(barra.querySelector("button"));

    }); 
    inputAtual.addEventListener("blur", function() {
        animacaoBarraOff(barra.querySelector("button"))
    }) 
})

var barraDePesquisaPlantas = document.querySelector("#barra-de-pesquisa-plantas")
var displaySalvos = []

function ativarNovaPaginaPesquisa(){ //Irá ocutar todos os elementos. Com exceção da navbar e nova pagina
/*
    Array.from(elementos).forEach(elemento => {
        if(elemento.id !== divPesquisas.id && elemento.tagName !== heade.tagName && elemento.tagName.toLowerCase() !== "script"){
            displaySalvos.push(window.getComputedStyle(elemento).display)
            elemento.style.display = "none"
        }
    })   

    setTimeout(function (){
        divPesquisas.style.display = "block"
    }, 1500)

    transicaoDeTelas()*/
}

var transicaoAtiva = false

function transicaoDeTelas(){
    if (!transicaoAtiva){
        transicaoAtiva = true
        var divTransicao = document.querySelector("#transicao")
        divTransicao.style.display = "block"
        divTransicao.style.animation = "bodyEscurecer 3s"

        setTimeout(function(){
            divTransicao.style.display = "none"
            transicaoAtiva = false
        },3000)
    }
}

function desativarNovaPaginaPesquisa(){
    transicaoDeTelas()

    setTimeout(function(){
        Array.from(elementos).forEach((elemento , i) => {
            if(elemento.id !== divPesquisas.id && elemento.tagName !== heade.tagName){
                elemento.style.display = displaySalvos[i]
            }
            divPesquisas.style.display = "none"
        })
    },1500)
}

function teste(){

}

function animacaoBarraOn (botaoAtual){
    console.log(123)
    var imgLupa = botaoAtual.querySelector("img")
    var botaoAtual = document.querySelector("#"+botaoAtual.id)

    botaoAtual.style.display = "block"
    imgLupa.style.opacity = 1;
}

function animacaoBarraOff (botaoAtual){
    var botaoAtual = document.querySelector("#"+botaoAtual.id)
    var imgLupa = botaoAtual.querySelectorAll("img")[0]
    imgLupa.style.opacity = 0;
    setTimeout(function (){
        botaoAtual.style.display = "none"
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

var inverterEscala = document.querySelectorAll(".inverterEscala")
var verde1 = document.querySelectorAll(".verde1")
var bordaPB = document.querySelectorAll(".bordaPB")

var corBranca = document.querySelectorAll(".branco")
var corPreta = document.querySelectorAll(".preto")

var gradienteVerdeTop = document.querySelectorAll(".gradienteVerdeTop")
var gradienteVerdeLado = document.querySelectorAll(".gradienteVerdeLado")

function temaClaro(){
    verde1.forEach(elemento => {elemento.style.color = "#2b6200"});
    bordaPB.forEach(elemento => {elemento.style.borderColor = "#000000"})
    inverterEscala.forEach(elemento => {elemento.style.filter = "invert(0%)"})
    corPreta.forEach(elemento => {elemento.style.color = "#000000"})

    body.style.backgroundColor = "#eee"
    gradienteVerdeTop.forEach(elemento => {elemento.style.backgroundImage = "linear-gradient(to bottom, #3bed00, #012200"})
    gradienteVerdeLado.forEach(elemento => {elemento.style.backgroundImage = "linear-gradient(to right, #99ed00, #408602)"})
}

function temaEscuro(){
    verde1.forEach(elemento => {elemento.style.color = "#85e838"});
    bordaPB.forEach(elemento => {elemento.style.borderColor = "#ffffff"})
    inverterEscala.forEach(elemento => {elemento.style.filter = "invert(100%)"})
    corBranca.forEach(elemento => {elemento.style.color = "#ffffff"})

    body.style.backgroundColor = "#272924" 
    gradienteVerdeTop.forEach(elemento => {elemento.style.backgroundImage = "linear-gradient(to top, #3bed00, #012200)"})
    gradienteVerdeLado.forEach(elemento => {elemento.style.backgroundImage = "linear-gradient(to left, #99ed00, #408602)"})
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
            divTemaAtual.style.marginLeft = "45px"
            temaEscuro()
        }else{
            novoTema = "sol"
            direcaoTema= "left"
            inverterCor = "0%"
            divTemaAtual.style.marginRight = "45px"
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

//atualização

(function(document, window, $){
    $(document).ready(function(){
      $('.core-tabNav li').each(function(e){
        $(this).find('a').on('click', function(e){
            e.preventDefault();
          var paragraphID = $(this).attr('href'),
              pragraph = $(paragraphID);
              hideAll(function () {
                  pragraph.fadeIn('slow');
              console.log(pragraph);
              });
        });
  });
      
  function hideAll(callback){
      var count = 0;
    $('.core-p').fadeOut(400, function () {
        count++;
        if (count ===3)
       callback();
    });
    }
  });
  
      $(window).scroll(function() {
      $('#object').each(function(){
      var imagePos = $(this).offset().top;
  
      var topOfWindow = $(window).scrollTop();
        if (imagePos < topOfWindow+1000) {
          $(this).addClass("fadeIn");
        }
      });
    });
  }(document, window, jQuery));

  function mudarTexto(novoTexto, event) {
    // Evita o comportamento padrão do link
    event.preventDefault();
    
    // Altera o texto no parágrafo
    document.getElementById('texto-principal').innerText = novoTexto;
  }