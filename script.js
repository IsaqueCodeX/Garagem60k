const cardContainer = document.querySelector(".card-container");
const campoBusca = document.getElementById("campo-busca");
let carros = [];

const API_KEY = "AIzaSyCx6ARmqJ_LV2XDiOnN7VrjWeKD4PFmaIc";

// Obtém o modelo Gemini disponível para uso
async function obterModeloDisponivel() {
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`);
        const data = await response.json();

        if (data.error) throw new Error(data.error.message);

        // Seleciona o melhor modelo disponível
        const modelo = data.models.find(m => m.name.includes("gemini-2.5-flash") && m.supportedGenerationMethods.includes("generateContent"))
            || data.models.find(m => m.supportedGenerationMethods.includes("generateContent") && (m.name.includes("flash") || m.name.includes("pro")))
            || data.models.find(m => m.supportedGenerationMethods.includes("generateContent"));

        if (!modelo) throw new Error("Nenhum modelo compatível encontrado.");

        console.log("Usando modelo:", modelo.name);
        return modelo.name; // Retorna ex: "models/gemini-1.5-flash"
    } catch (error) {
        console.error("Erro ao listar modelos:", error);
        return "models/gemini-1.5-flash";
    }
}

// Gera conteúdo usando a API Gemini
async function gerarConteudoGemini(prompt) {
    const modeloNome = await obterModeloDisponivel();
    // Constrói URL da API com o modelo selecionado

    const url = `https://generativelanguage.googleapis.com/v1beta/${modeloNome}:generateContent?key=${API_KEY}`;

    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
        })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Erro na requisição Gemini");
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
}

// Carrega os dados de carros via API Gemini
async function carregarDados() {
    cardContainer.innerHTML = "<p>⏳ Consultando a tabela FIPE aguarde...</p>";

    try {
        const prompt = `
            Liste 24 carros usados populares no Brasil até R$ 60.000.
            Retorne APENAS um array JSON puro (sem markdown) com os campos:
            id (numero), modelo (string), ano (string), categoria (string), preco_medio (numero).
            Exemplo: [{"id": 1, "modelo": "Honda Civic", "ano": "2010", "categoria": "Sedan", "preco_medio": 45000}]
        `;

        let textoResposta = await gerarConteudoGemini(prompt);

        // Limpeza básica caso venha com markdown ```json ... ```
        textoResposta = textoResposta.replace(/```json/g, "").replace(/```/g, "").trim();

        carros = JSON.parse(textoResposta);
        renderizarCards(carros);
    } catch (error) {
        console.error("Erro na API:", error);
        // Fallback para dados locais caso a API falhe
        console.log("Usando dados de fallback...");
        carros = [
            { id: 1, modelo: "Honda Civic", ano: "2008", categoria: "Sedan", preco_medio: 42000 },
            { id: 2, modelo: "Toyota Corolla", ano: "2009", categoria: "Sedan", preco_medio: 48000 },
            { id: 3, modelo: "Volkswagen Golf", ano: "2010", categoria: "Hatch", preco_medio: 45000 },
            { id: 4, modelo: "Fiat Palio", ano: "2015", categoria: "Hatch", preco_medio: 35000 },
            { id: 5, modelo: "Chevrolet Onix", ano: "2016", categoria: "Hatch", preco_medio: 50000 },
            { id: 6, modelo: "Ford Fiesta", ano: "2014", categoria: "Hatch", preco_medio: 38000 },
            { id: 7, modelo: "Hyundai HB20", ano: "2015", categoria: "Hatch", preco_medio: 40000 },
            { id: 8, modelo: "Renault Sandero", ano: "2016", categoria: "Hatch", preco_medio: 39000 },
            { id: 9, modelo: "Volkswagen Gol", ano: "2017", categoria: "Hatch", preco_medio: 38000 },
            { id: 10, modelo: "Fiat Uno", ano: "2018", categoria: "Hatch", preco_medio: 36000 },
            { id: 11, modelo: "Chevrolet Prisma", ano: "2015", categoria: "Sedan", preco_medio: 43000 },
            { id: 12, modelo: "Ford Ka", ano: "2016", categoria: "Hatch", preco_medio: 35000 },
            { id: 13, modelo: "Nissan March", ano: "2014", categoria: "Hatch", preco_medio: 32000 },
            { id: 14, modelo: "Peugeot 208", ano: "2015", categoria: "Hatch", preco_medio: 41000 },
            { id: 15, modelo: "Citroën C3", ano: "2016", categoria: "Hatch", preco_medio: 40000 },
            { id: 16, modelo: "Honda Fit", ano: "2012", categoria: "Hatch", preco_medio: 44000 },
            { id: 17, modelo: "Toyota Etios", ano: "2017", categoria: "Sedan", preco_medio: 47000 },
            { id: 18, modelo: "Volkswagen Voyage", ano: "2016", categoria: "Sedan", preco_medio: 42000 },
            { id: 19, modelo: "Fiat Argo", ano: "2018", categoria: "Hatch", preco_medio: 49000 },
            { id: 20, modelo: "Chevrolet Cruze", ano: "2013", categoria: "Sedan", preco_medio: 55000 },
            { id: 21, modelo: "Renault Logan", ano: "2016", categoria: "Sedan", preco_medio: 40000 },
            { id: 22, modelo: "Ford Focus", ano: "2012", categoria: "Hatch", preco_medio: 41000 },
            { id: 23, modelo: "Jeep Renegade", ano: "2016", categoria: "SUV", preco_medio: 58000 },
            { id: 24, modelo: "Nissan Kicks", ano: "2017", categoria: "SUV", preco_medio: 59000 }
        ];
        renderizarCards(carros);

        const aviso = document.createElement("div");
        aviso.style.textAlign = "center";
        aviso.style.padding = "10px";
        aviso.style.backgroundColor = "#e74c3c";
        aviso.style.color = "white";
        aviso.innerHTML = `<p>⚠️ A API falhou (${error.message}). Mostrando dados de exemplo.</p>`;
        document.body.insertBefore(aviso, document.querySelector("main"));
    }
}

function renderizarCards(lista) {
    cardContainer.innerHTML = "";

    if (lista.length === 0) {
        cardContainer.innerHTML = "<p>Nenhum veículo encontrado na garagem.</p>";
        return;
    }

    const htmlCards = lista.map(carro => `
        <div class="card" data-id="${carro.id}">
            <h2>${carro.modelo} (${carro.ano})</h2>
            <p><strong>Categoria:</strong> ${carro.categoria}</p>
            <p><strong>Preço Médio:</strong> R$ ${carro.preco_medio.toLocaleString('pt-BR')}</p>
            
            <div id="ia-area-${carro.id}">
                <button class="btn-ia" onclick="chamarMecanicoIA('${carro.modelo}', '${carro.ano}', ${carro.id})">
                    🔧 Mecânico (IA)
                </button>
            </div>
        </div>
    `).join("");

    cardContainer.innerHTML = htmlCards;
}

// Filtro de busca
campoBusca.addEventListener("input", (e) => {
    const termo = e.target.value.toLowerCase();
    const filtrados = carros.filter(c => c.modelo.toLowerCase().includes(termo));
    renderizarCards(filtrados);
});

// Função que chama o Gemini para opinião
async function chamarMecanicoIA(modelo, ano, id) {
    const area = document.getElementById(`ia-area-${id}`);
    // Loading State com Spinner
    area.innerHTML = `
        <div class="loading-container">
            <div class="spinner"></div>
            <p>Analisando financiamento...</p>
        </div>
    `;

    try {
        const prompt = `
            Atue como um consultor financeiro e especialista automotivo profissional.
            Faça uma análise breve e bem estruturada sobre o carro ${modelo} ano ${ano}.
            Foque no custo-benefício e viabilidade de financiamento.
            Use tópicos (bullet points) para organizar a resposta.
            Seja direto e profissional.
        `;

        let opiniao = await gerarConteudoGemini(prompt);

        // Formata a resposta para exibição HTML
        opiniao = opiniao.replace(/\*\*/g, "<strong>").replace(/\*/g, "</strong>");
        opiniao = opiniao.replace(/\n\*/g, "<br>•");
        opiniao = opiniao.replace(/\n/g, "<br>");

        area.innerHTML = `<div class="analise-ia" style="text-align: left; border-left-color: var(--tertiary-color);">${opiniao}</div>`;
    } catch (error) {
        console.error(error);
        area.innerHTML = "<p>O sistema de análise está temporariamente indisponível.</p>";
    }
}

// Inicializa o carregamento de dados
carregarDados();

// Funcionalidade do botão de acessibilidade - voltar ao topo
const scrollBtn = document.getElementById('scroll-to-top');

// Mostra o botão quando o usuário rolar a página
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollBtn.classList.add('visible');
    } else {
        scrollBtn.classList.remove('visible');
    }
});

// Ao clicar, volta suavemente para o topo
scrollBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
