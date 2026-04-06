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
| `npm run deploy` | Alternativa manual: publica `dist/` via pacote `gh-pages` (opcional) |

## Estrutura de diretórios

```
portfolio/
├── .github/
│   └── workflows/
│       └── deploy-pages.yml
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

## Deploy (GitHub Pages com GitHub Actions)

Configuração **única** no repositório GitHub:

1. **Settings → Pages → Build and deployment**
   - **Source**: *GitHub Actions* (não use branch `gh-pages` se for usar só o workflow).
2. Garantir que o `base` em `vite.config.js` coincide com a URL (ex.: repositório `portfolio` → `base: '/portfolio/'`).
3. Fazer **push** para a branch `main` ou `master` (ou disparar manualmente em **Actions → Deploy to GitHub Pages → Run workflow**).

O arquivo `.github/workflows/deploy-pages.yml` executa `npm ci`, `npm run build` e publica a pasta `dist/` automaticamente a cada commit nas branches configuradas.

## Licença

Uso pessoal. A inclusão de um arquivo `LICENSE` na raiz do repositório define os termos para terceiros reutilizarem o código.
