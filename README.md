# Arthur Gomes — Portfólio

🔗 **Acesse o portfólio ao vivo: https://taksz.github.io/portfolio/**

Portfólio de Arthur Gomes, estudante do 6º semestre de Ciência da Computação na UDF (Brasília), em busca do primeiro estágio em dados, automação ou Python. O visual segue o banner e as cores do perfil do GitHub.

- GitHub: https://github.com/taksz
- LinkedIn: https://www.linkedin.com/in/arthur-gomes-822313446

## O que tem no site

- Banner animado com ondas, foto e janelas flutuantes
- Faixas de ferramentas em movimento
- Projetos com demonstração ao vivo e link para o código
- Números do GitHub carregados em tempo real pela API pública

## Tecnologias

React 19 · Vite · CSS puro · GitHub Pages

## Rodando localmente

```bash
npm install
npm run dev
```

O site abre em `http://localhost:5173/portfolio/`. Para gerar a versão de produção: `npm run build`.

## Estrutura

```
src/
  App.jsx      componentes e hooks da página
  data.js      textos, projetos, ferramentas e links
  styles.css   estilos
public/        foto
```

O deploy é automático: cada push na branch `main` publica o site via GitHub Actions.
