# ⏰ Automação de Relógio Digital com Playwright

Projeto de testes automatizados para validação de lógica de tempo real e condicionais de alarme em um relógio digital, desenvolvido com **Playwright** e **TypeScript**.

## 📌 Sobre o Projeto

Este projeto demonstra como testar componentes sensíveis ao tempo sem depender do avanço real do relógio do sistema, utilizando as APIs avançadas de simulação de tempo (`page.clock`) do Playwright.

### 🧪 Cenários de Teste Cobertos
1. **Sincronização de Tempo:** Captura a hora atual do sistema operacional, renderiza no relógio e valida o avanço correto do tempo após a manipulação virtual.
2. **Condicional de Alarme:** Configura um alarme dinâmico para o futuro, simula o avanço do tempo e valida a alteração do DOM quando a condicional do alarme é atingida (`⏰ ALARME DISPARADO!`).

---

## 🛠️ Tecnologias Utilizadas

* **[Playwright](https://playwright.dev/):** Framework de testes end-to-end.
* **TypeScript:** Linguagem de programação tipada.
* **Node.js:** Ambiente de execução para os scripts.

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
* **Node.js** instalado (versão 18 ou superior).
* **Git** instalado.

### 1. Clonar o repositório
```bash
git clone [https://github.com/leticyadanielly/Relogio_Programacao.git](https://github.com/leticyadanielly/Relogio_Programacao.git)
cd Relogio_Programacao/relogio-playwright

2. Instalar as dependências
npm install

3. Instalar os navegadores do Playwright
npx playwright install chromium

💻 Executando os Testes
Rodar em modo Headless (Terminal):
npx playwright test --config=playwright.config.ts

Rodar vendo o navegador (Headed):
npx playwright test --config=playwright.config.ts --headed

Rodar no modo de Interface Visual (Playwright UI):
npx playwright test --config=playwright.config.ts --ui

📂 Estrutura do Projeto
relogio-playwright/
├── tests/
│   └── relogio.spec.ts     # Scripts de automação e asserções
├── .gitignore              # Arquivos ignorados pelo Git
├── package.json            # Dependências e scripts do projeto
├── playwright.config.ts    # Configuração global do Playwright
└── README.md               # Documentação do repositório
