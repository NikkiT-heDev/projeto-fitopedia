function csvParaJson(csv) { //Converte o formato original da planilha para json
    // Divide o CSV em linhas, removendo espaços em branco no início e no final
    const linhas = csv.trim().split("\n");
    const cabecalhos = linhas[0].split(",").map(cabecalho => cabecalho.trim());

    return linhas.slice(1).map(linha => { //Ignora o cabeçalho
        const values = []; // Armazena os valores extraídos da linha atual
        let current = "";  // String temporária para montar valores entre vírgulas
        let inQuotes = false; // Indica se o caractere atual está dentro de aspas

        for (const char of linha) {
            if (char === '"' && inQuotes) {
                // Fecha o estado de aspas, quando encontra aspas de fechamento
                inQuotes = false; 
            } else if (char === '"' && !inQuotes) {
                // Abre o estado de aspas, quando encontra aspas de abertura
                inQuotes = true;
            } else if (char === ',' && !inQuotes) {
                // Encontra uma vírgula fora de aspas, indicando o fim de um valor
                values.push(current.trim()); // Adiciona o valor ao array `values`
                current = ""; // Reseta o valor temporário
            } else {
                // Adiciona o caractere atual ao valor temporário
                current += char;
            }
        }

        // Adiciona o último valor após o loop, que não é seguido por uma vírgula
        values.push(current.trim());

        // Cria um objeto mapeando cabeçalhos para valores da linha atual
        return Object.fromEntries(cabecalhos.map((h, i) => [h, values[i] || ""]));
    });
} 

function carregarPlantas() {
    const planilhaPlantas = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTQuvR4PrLT5oRpaKi6MqGV0i7VrmYt0rKisGs0rxRd_-ubbgNYR6qL9ObzFpiwQA-0jGS9-yVQkrmo/pub?gid=0&single=true&output=csv'
    
    fetch(planilhaPlantas) //Solicitação para recuperar dados do servidor
        .then(resposta => resposta.text()) // CSV para texto
        .then(csv => {
            const plantas = csvParaJson(csv); // Converte CSV para JSON
            console.log("Plantas carregadas da planilha:", plantas)

            localStorage.setItem('plantas', JSON.stringify(plantas))
            
        })
        .catch(error => {
            console.error("Erro ao carregar plantas:", error)
        })
}

export default carregarPlantas;