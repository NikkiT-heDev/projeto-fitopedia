import carregarPlantas from '../js/dadosPlanilha.js'
import { proximoCard, voltarCard } from '../js/novaPagina.js'

const barraDePesquisa = document.querySelector("#barra-de-pesquisa")
const barra = document.querySelector("#barraPlantas")
const lupa = barraDePesquisa.querySelector("button")

console.log(barra)

document.addEventListener("DOMContentLoaded", function () {
    const PLANTAS = JSON.parse(localStorage.getItem('plantas'))
    gerarCarroselRecomendacoes(PLANTAS)
    carregarPlantas()
})

barra.addEventListener("keyup", function(valor){
    console.log(barra.value)
    const PLANTAS = JSON.parse(localStorage.getItem('plantas'))
    procurarPlantas(PLANTAS,barra.value)
})

function procurarPlantas(plantas,valor){ //Procura na planilha o valor correspondente ao digitado
    var colunaCards = criarDiv()

    if (valor != "" && valor != " "){
        plantas.forEach(planta => {
            var nomesPopulares = planta.nomes_populares  || []
            var nomesCientificos = planta.nomes_cientifico || []

            if (nomesPopulares.toLowerCase().includes(valor.toLowerCase()) || nomesCientificos.toLowerCase().includes(valor.toLowerCase())){
                
                criarCards(planta,colunaCards)
            }
        })
    }else{
        apagarDiv()
    }
}

const SRC_PLANTA_PADRAO = "../imgs/icons/planta.png" 
const SRC_REMEDIO_PADRAO = "../imgs/icons/capsula.png" 

function cardExtendido(planta,img, nomeP, nomeC){ //Replica todas os elementos para padronizar os cards
    var div1 = document.createElement("div")
    div1.classList.add("card-planta-extendido")

    var div2 = document.createElement("div")
    div2.classList.add("informacoes-card-extendido")

    var imagem = document.createElement("img")
    imagem.classList.add("img-card-extendido")
    imagem.alt = "Imagem da Planta"
    imagem.src = img

    var div3 = document.createElement("div")

    var h1 = document.createElement("h1")
    h1.innerText = nomeP
    h1.classList.add("nome-planta")
    h1.classList.add("nome-card")

    var h2 = document.createElement("h2")
    h2.innerText = "Informações"
    h2.classList.add("button-card-extendido")
    h2.classList.add("botao-card")

    var p = document.createElement("p")
    p.classList.add("nome-cientifico")
    p.classList.add("nome-cientifico-card")
    p.innerText = nomeC

    div1.appendChild(div2)
    div1.appendChild(h2)

    div2.appendChild(imagem)
    div2.appendChild(div3)

    div3.appendChild(h1)
    div3.appendChild(p)

    h2.addEventListener("click",function(){
        exibirInformacoes(planta)
    })
    
    return div1
}

const PARTE_INICIAL = document.querySelectorAll(".parte-inicial")[0]
var plantaAtual

function apagarDiv(){ //Exclui a coluna de cards atual
    var colunaCards = document.querySelector("#coluna-de-cards")
    if (colunaCards){
        colunaCards.parentNode.removeChild(colunaCards)
    }
}

function criarDiv(){ //Recria a coluna de cards
    apagarDiv()

    var colunaCards = document.createElement("div")
    colunaCards.id = "coluna-de-cards"
    console.log(colunaCards)

    return colunaCards
}

function criarCards(planta,colunaCards){//Informa a função de criação dos elementos do card suas informações
    var nomesPopulares = planta.nomes_populares
    var nomesCientificos = planta.nomes_cientifico
    var imgPlanta = planta.imagem_demonstracao1 || SRC_PLANTA_PADRAO
    
    const cardPlantaExt = cardExtendido(planta,imgPlanta,nomesPopulares,nomesCientificos)
    colunaCards.appendChild(cardPlantaExt)
    PARTE_INICIAL.appendChild(colunaCards)
}

function informacoesGerais(nomeP,img1,localizacao,img2,nomeC){
    var quadradoRemedio = document.querySelectorAll(".informacoes-da-planta")[0]

    var nomePlanta = document.querySelector("#nome-planta")
    nomePlanta.innerText = nomeP

    var nomeCientifico = document.querySelector("#nomecientifico")
    nomeCientifico.innerText = nomeC

    var imgsPlanta = quadradoRemedio.querySelectorAll(".imgs-planta")
    imgsPlanta[0].src = img1
    imgsPlanta[1].src = localizacao
    imgsPlanta[2].src = img2

    return quadradoRemedio
}

//Configura o Div do Remedio de Acordo com a planta selecionada
function preparacoesFarmaceuticas(nomeR,laboratorio,indicacao,posologia,descarte,contraIndicacoes,imgR){
    var quadradoRemedio = document.querySelectorAll(".quadrado-informativo")[0]

    var nomeRemedio = document.querySelector("#nome-remedio")
    nomeRemedio.innerText = nomeR

    var imgRemedio = document.querySelectorAll(".img-capsulas")[0]
    imgRemedio = imgRemedio.querySelectorAll("img")[0]

    imgRemedio.src = imgR

    var textoTopicos = quadradoRemedio.querySelectorAll(".texto-remedios")
    textoTopicos[0].innerText = laboratorio//laboratorio	
    textoTopicos[1].innerText = indicacao//indicacao
    textoTopicos[2].innerText = posologia//posologia
    textoTopicos[3].innerText = descarte//descarte	
    textoTopicos[4].innerText = contraIndicacoes//contra_indicacoes

    return quadradoRemedio
}

function indicacoesExtemporaneas(parte_usada,indicacoes_extemporaneas,modo_de_preparo,modo_de_uso,contra_indicacoes_extemporaneas){
    var quadradoCha = document.querySelectorAll(".quadrado-informativo")[1]
    var textoTopicos = quadradoCha.querySelectorAll(".texto-remedios")
    
    textoTopicos[0].innerText = parte_usada	
    textoTopicos[1].innerText = indicacoes_extemporaneas	
    textoTopicos[2].innerText = modo_de_preparo	
    textoTopicos[3].innerText = modo_de_uso	
    textoTopicos[4].innerText = contra_indicacoes_extemporaneas	

    return quadradoCha
}

//Organiza as informações da planilha para o Div
function criarPainelInformativo(planta){
    var nomeRemedio = planta.remedio
    var nomesPopulares = planta.nomes_populares
    var nomesCientificos = planta.nomes_cientifico

    var imgPlanta1 = planta.imagem_demonstracao1 || SRC_PLANTA_PADRAO
    var imgPlanta2 = planta.imagem_demonstracao2 || SRC_PLANTA_PADRAO
    var imgRemedio = planta.img_remedio_demonstracao || SRC_REMEDIO_PADRAO

    var localizacao = planta.localizacao || ""
    var laboratorio = planta.laboratorio
    var indicacao = planta.indicacao
    var posologia = planta.posologia
    var descarte = planta.descarte
    var contraIndicacoes = planta.contra_indicacoes

    var parteUsada = planta.parte_usada	
    var indicacoesExtemporaneasTexto = planta.indicacoes_extemporaneas	
    var modoDePreparo = planta.modo_de_preparo	
    var modoDeUso	= planta.modo_de_uso	
    var contraIndicacoesExtemporaneas = planta.contra_indicacoes_extemporaneas

    var informacoesGeraisDiv = informacoesGerais(nomesPopulares,imgPlanta1,localizacao,imgPlanta2,nomesCientificos)
    informacoesGeraisDiv.style.display = "block"

    var quadradoRemedio = preparacoesFarmaceuticas(nomeRemedio,laboratorio,indicacao,posologia,descarte,contraIndicacoes,imgRemedio)
    var quadradoCha = indicacoesExtemporaneas(parteUsada,indicacoesExtemporaneasTexto,modoDePreparo,modoDeUso,contraIndicacoesExtemporaneas)
    
    quadradoRemedio.style.display = "none"
    quadradoCha.style.display = "flex"
    informacoesGeraisDiv.style.display = "block"
    //<div class="div-informacoes-da-planta">
}

var remedioButton = document.querySelector("#especialidades-button")
var chaButton = document.querySelector("#preparacoes-button")
var quadradoInformativos = document.querySelectorAll(".quadrado-informativo")

remedioButton.addEventListener("click",function(){
    quadradoInformativos[1].style.display = "none"
    quadradoInformativos[0].style.display = "flex"
})

chaButton.addEventListener("click",function(){
    quadradoInformativos[0].style.display = "none"
    quadradoInformativos[1].style.display = "flex"
})

function exibirInformacoes(planta){
    var elementosBody = document.body.children
    body.style.backgroundColor = "rgb(23, 18, 18)"

    for (let i = 0; i < elementosBody.length; i++) {
        var elemento = elementosBody[i]
        elemento.style.display = "none"
    }

    plantaAtual = planta
    criarPainelInformativo(planta)
}

function ocultarInformacoes(){
    var elementosBody = document.body.children
    body.style.backgroundColor = "#e4e4e4"

    var divInformacoesGerais = document.querySelectorAll(".informacoes-da-planta")[0]

    for (let i = 0; i < elementosBody.length; i++) {
        var elemento = elementosBody[i]

        if (!(elemento.tagName === document.createElement("script").tagName)){
            if(elemento.className === "parte-inicial"){
                elemento.style.display = "flex"
            }else{
                elemento.style.display = "block"
            }
            
        }
    }

    divInformacoesGerais.style.display = 'none'
    barra.value = ""
    apagarDiv()
}

var voltarButton = document.querySelector("#voltar-pagina")

voltarButton.addEventListener('click',function(){
    ocultarInformacoes()
})




//Palavras chaves para encontrar as plantas de cada categoria
const ACAO_GASTROINTESTINAL_PC = ["Ação Gastrointestinal",'intestinal','intestivo','gastrointestinal','gastrointestinais','flatulência','dispéptico']
const ACAO_SISTEMA_RESPIRATORIO_PC = ["Ação no Tratamento Respiratório",'resfriado', 'sinusite', 'rinofaringite', 'bronquite', 'garganta']
const ACAO_ANTI_INFLAMATORIA = ["Ação Anti-Inflamatório",'inflamação', 'inflamações', 'anti-inflamatória', 'anti-inflamatório']
const ACAO_CALMANTE = ["Efeito Calmante",'ansiedade', 'insônia', 'sono']
const ACAO_CICATRIZANTE = ["Ação Cicatrizante",'ferimento', 'cicatrizar', 'cicatrizante']

const CATEGORIAS = [ACAO_SISTEMA_RESPIRATORIO_PC, ACAO_ANTI_INFLAMATORIA, ACAO_CALMANTE, ACAO_CICATRIZANTE, ACAO_GASTROINTESTINAL_PC]

var CARD_ATUAL_INDEX = 1

function gerarCarroselRecomendacoes(plantas){ //Gera as divs de acordo com as categorias adicionadas
    CATEGORIAS.forEach((categoria, i) => {
        var nomeCategoria = categoria[0]
        var divCategoria = cardCarrosel(nomeCategoria)

        console.log("Categoria: "+ nomeCategoria)
        plantas.forEach(planta => {
            var plantaAdicionada = false

            var indicacaoRemedio = planta.indicacao
            var indicacoesExtemporaneas = planta.indicacoes_extemporaneas

            
            categoria.forEach(password => {
                if (plantaAdicionada === false){//Se uma planta for adicionada, plantaAdicionada = true
                    if(indicacaoRemedio.toLowerCase().includes(password.toLowerCase()) || indicacoesExtemporaneas.toLowerCase().includes(password.toLowerCase())){
                        plantaAdicionada = true
                        gerarPlantasRecomendadas(divCategoria,planta)
                    }
                }
            })

            
        })

        atualizarCards(divCategoria)
    })
}

var gradeCards = document.querySelectorAll(".grade-cards")[0]
var categoriaGrade = gradeCards.querySelectorAll(".categoria-planta")[0]

const CARACTERES_MAXIMO = 15

function gerarPlantasRecomendadas(divCategoria, planta){//Seleciona as plantas de acordo com as acoes que cada uma possui
    var cardPlanta = divCategoria.querySelector("#card-planta-exemplo").cloneNode(true)
    console.log("Display:" + cardPlanta.style.display)
    cardPlanta.id = " "

    cardPlanta.classList.add("card-planta")

    var imgCard = cardPlanta.querySelectorAll(".img-card")[0]
    var nomePopularDiv = cardPlanta.querySelectorAll(".nome-planta")[0]
    var nomeCientificoDiv = cardPlanta.querySelectorAll(".nome-cientifico")[0]

    var srcImg = planta.imagem_demonstracao1 || SRC_PLANTA_PADRAO
    var nomePopular = planta.nomes_populares
    var nomeCientifico = planta.nomes_cientifico

    imgCard.src = srcImg
    nomeCientificoDiv.innerText = nomeCientifico

    if (nomePopular.length >= CARACTERES_MAXIMO){
        var nomeResumido = nomePopular.slice(0,CARACTERES_MAXIMO - 1)
        nomePopularDiv.innerText = nomeResumido+"..."
    }else{
        nomePopularDiv.innerText =  nomePopular
    }

    var plantaSucessoraButton = divCategoria.querySelectorAll(".planta-proxima")[0]
    divCategoria.insertBefore(cardPlanta,plantaSucessoraButton)
    cardPlanta.style.display = "block"
}

function cardCarrosel(nomeCategoria){ //Gera os quadrados onde irá ficar as plantas

    var cloneCategoriaGrade = categoriaGrade.cloneNode(true)

    var tituloCategoria = cloneCategoriaGrade.querySelectorAll(".titulo-categoria")[0]
    var divCategoriaPlanta = cloneCategoriaGrade.querySelectorAll(".div-categoria-planta")[0]

    tituloCategoria.innerText = nomeCategoria

    var nomeClasse = nomeCategoria.toLowerCase().replace(/ /g, "a")
    divCategoriaPlanta.classList.add(nomeClasse)

    gradeCards.appendChild(cloneCategoriaGrade)
    cloneCategoriaGrade.style.display = "block"

    return divCategoriaPlanta
}

function atualizarCards(divCategoria){
    var plantaSucessoraButton = divCategoria.querySelectorAll(".planta-proxima")[0]
    var plantaAntecessoraButton = divCategoria.querySelectorAll(".planta-anterior")[0]

    plantaSucessoraButton.addEventListener("click", function(){
        proximoCard(plantaSucessoraButton)
    })

    plantaAntecessoraButton.addEventListener("click", function(){
        voltarCard(plantaAntecessoraButton)
    })

    proximoCard(plantaSucessoraButton)
}