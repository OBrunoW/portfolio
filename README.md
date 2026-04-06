<div align="center">

# Portfólio — Bruno Santos

**Site pessoal de apresentação profissional (projetos, stack e trajetória).**

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)

</div>

---

## Visão geral

Aplicação **single-page** em React, empacotada com Vite, com conteúdo editável de forma centralizada. Interface responsiva com efeitos visuais leves (fundo animado, cards com interação).

## Stack

| Tecnologia | Uso |
|------------|-----|
| React 18 | Interface e componentes |
| Vite 5 | Build e servidor de desenvolvimento |
| JavaScript (JSX) | Implementação |

## Pré-requisitos

- Node.js **18** ou superior (recomendado: [LTS](https://nodejs.org/))
- Gerenciador **npm** (incluso na instalação do Node)

## Instalação e execução

Clone o repositório, instale dependências e inicie o ambiente de desenvolvimento:

```bash
git clone <url-do-repositorio>.git
cd portfolio
npm install
npm run dev
```

O endereço local é exibido no terminal (padrão do Vite: `http://localhost:5173`).

## Scripts npm

| Script | Finalidade |
|--------|------------|
| `npm run dev` | Servidor de desenvolvimento com recarregamento ao salvar |
| `npm run build` | Gera artefatos otimizados em `dist/` |
| `npm run preview` | Serve localmente o build de produção |
| `npm run deploy` | Envia `dist/` para GitHub Pages (pacote `gh-pages`) |

## Estrutura de diretórios

```
portfolio/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── data/
    │   └── portfolioData.js   # Projetos, habilidades, timeline
    └── components/
        ├── Starfield.jsx
        └── ProjectCard.jsx
```

## Configuração de URL base (Vite)

Em `vite.config.js`, a propriedade `base` define o caminho público dos assets:

- Repositório publicado em `https://<usuario>.github.io/portfolio/`: manter `base: '/portfolio/'`.
- Site na raiz de um domínio (ou repositório com outro nome): ajustar para `base: '/'` (ou `'/<nome-do-repo>/'`) antes do build.

## Deploy (GitHub Pages)

1. Confirmar `base` no `vite.config.js` conforme a URL final.
2. Executar `npm run build`.
3. Executar `npm run deploy`.

No GitHub: **Settings → Pages → Build and deployment**: branch `gh-pages`, pasta raiz (`/`).

## Licença

Uso pessoal. A inclusão de um arquivo `LICENSE` na raiz do repositório define os termos para terceiros reutilizarem o código.
