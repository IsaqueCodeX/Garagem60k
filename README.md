# 🚗 Garagem 60k

> Guia inteligente para compra de carros usados até R$ 60.000 com análise de IA

![Imersão Dev](https://img.shields.io/badge/Imers%C3%A3o%20Dev-Google%20Gemini%2010%C2%AA%20Ed-4285F4?style=for-the-badge&logo=google&logoColor=white)

## 📋 Sobre o Projeto

**Garagem 60k** é uma aplicação web que auxilia usuários na escolha de carros usados dentro do orçamento de até R$ 60.000. A plataforma integra a API Google Gemini para fornecer análises profissionais e personalizadas sobre viabilidade de financiamento e custo-benefício de cada veículo.

*Projeto desenvolvido durante a **Imersão Dev com Google Gemini - 10ª Edição***

## 🛠️ Tecnologias Utilizadas

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Google Gemini](https://img.shields.io/badge/Google%20Gemini-8E75B2?style=for-the-badge&logo=google&logoColor=white)

## ✨ Funcionalidades

- 📊 **Listagem de 24 Carros Populares**: Carros usados no Brasil até R$ 60.000
- 🤖 **Análise de IA**: Consultor financeiro virtual powered by Google Gemini
- 🔍 **Busca Dinâmica**: Filtro de carros por modelo, categoria ou marca
- 📱 **Design Responsivo**: Layout adaptável para desktop e mobile (2 colunas fixas)
- 🎨 **Interface Moderna**: Paleta de cores elegante com tons de cinza e bege
- ♿ **Acessibilidade**: Botão "Voltar ao Topo" para melhor navegação
- 📜 **Scroll Customizado**: Áreas de análise com scroll personalizado

## 🚀 Como Usar

### Pré-requisitos

- Navegador web moderno (Chrome, Firefox, Edge, Safari)
- Chave de API do Google Gemini ([obtenha aqui](https://ai.google.dev/))

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/garagem60k.git
cd garagem60k
```

2. Configure sua API Key:
   - Abra o arquivo `script.js`
   - Substitua a variável `API_KEY` pela sua chave:
   ```javascript
   const API_KEY = "SUA_CHAVE_AQUI";
   ```

3. Abra o arquivo `index.html` no navegador

## 📁 Estrutura do Projeto

```
garagem60k/
├── index.html          # Estrutura HTML principal
├── style.css           # Estilos e layout responsivo
├── script.js           # Lógica de negócio e integração com Gemini API
├── assets/             # Imagens e ícones
│   └── car-icon.png   # Ícone do carro
└── README.md          # Documentação
```

## 🔑 Funcionalidades da API

A aplicação utiliza a **Google Gemini API** para:

- **Geração de Lista de Carros**: Lista dinâmica de 24 veículos populares
- **Análise Financeira**: Avaliação profissional de custo-benefício
- **Recomendações de Financiamento**: Insights sobre viabilidade de crédito
- **Seleção Automática de Modelo**: Adaptação dinâmica ao melhor modelo Gemini disponível

### Sistema de Fallback

Em caso de falha da API (quota excedida, erro de rede), o sistema automaticamente:
- Exibe dados de exemplo (24 carros populares)
- Mostra mensagem de aviso ao usuário
- Mantém a aplicação totalmente funcional

## 🎨 Paleta de Cores

| Cor | Hex | Uso |
|-----|-----|-----|
| Cinza Escuro | `#1F2937` | Fundo principal |
| Cinza Médio | `#374151` | Cards |
| Bege Claro | `#E5D4B4` | Títulos e botões |
| Bege Marrom | `#A89979` | Texto secundário |

## 👨‍💻 Autor

**Isaque Santos**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/IsaqueCodeX)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/isaque-santos-720b8b15a)

## 📄 Licença

© 2025 Isaque Santos. Todos os direitos reservados.

---

⭐ Se este projeto foi útil para você, considere dar uma estrela no repositório!
