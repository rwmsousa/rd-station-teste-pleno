# Recomendador de Produtos RD Station

Solução para o desafio técnico de front-end (Júnior/Pleno) da RD Station: implementação da lógica de recomendação de produtos em uma aplicação React.js + json-server já existente.

Repositório: https://github.com/rwmsousa/rd-station-teste-pleno

## Sobre o desafio

A aplicação permite que o usuário selecione preferências, funcionalidades desejadas e um tipo de recomendação ("Produto Único" ou "Múltiplos Produtos") em um formulário, e recebe como resposta o(s) produto(s) RD Station que melhor correspondem aos critérios escolhidos. O enunciado original do desafio (escopo, critérios de aceite e requisitos técnicos) está descrito mais abaixo, em [Enunciado original do desafio](#enunciado-original-do-desafio).

## Stack técnica

- **Frontend**: React.js (Create React App) + Tailwind CSS
- **Backend**: [json-server](https://github.com/typicode/json-server) simulando uma API REST a partir de `backend/db.json`
- **Testes**: Jest + Testing Library (`react-scripts test`)
- **Node.js**: versão 18.3 ou superior (exigido pelo enunciado do desafio)

## Como executar

```bash
# 1. Instalar dependências (raiz + frontend + backend)
yarn install
./install.sh

# 2. Subir frontend e backend juntos
yarn dev
```

A aplicação fica disponível em `http://localhost:3000` e a API do json-server em `http://localhost:3001`.

### Scripts disponíveis (raiz do monorepo)

| Comando | Descrição |
| --- | --- |
| `yarn dev` | Sobe frontend e backend simultaneamente |
| `yarn start:frontend` | Sobe apenas o frontend (porta 3000) |
| `yarn start:backend` | Sobe apenas o backend/json-server (porta 3001) |

O frontend depende do backend estar no ar (consome `http://localhost:3001/products`); para rodar só o frontend isoladamente é necessário also subir o backend em paralelo.

### Testes

```bash
cd frontend
yarn test              # modo watch
CI=true yarn test --watchAll=false   # execução única (CI)
CI=true yarn test --watchAll=false --coverage   # com relatório de cobertura
```

35 testes automatizados cobrindo a lógica de recomendação, os hooks e os componentes de UI (loading, erro, bloqueio de submissão, acessibilidade).

### Lint

```bash
cd frontend
yarn lint
```

## O que foi implementado

O escopo original do desafio previa alterações em três arquivos (`App.js`, `Form.js` e `recommendation.service.js`), que estavam apenas com stubs/comentários indicando onde a lógica deveria entrar. A implementação final tocou os seguintes pontos:

### Lógica de recomendação (`frontend/src/services/recommendation.service.js`)

- Cálculo de uma pontuação de correspondência por produto, somando o número de preferências e de funcionalidades selecionadas pelo usuário que o produto também possui.
- **Modo "Produto Único"**: retorna o produto de maior pontuação. Em caso de empate, prevalece o **último** produto empatado (percorrendo a lista de produtos na ordem de cadastro).
- **Modo "Múltiplos Produtos"**: retorna todos os produtos com pontuação maior que zero, na ordem original de cadastro (sem reordenar por pontuação).
- Ausência de critérios selecionados ou de qualquer correspondência resulta em lista vazia.
- Lógica estruturada de forma modular (`SCORING_CRITERIA`, `RECOMMENDATION_STRATEGIES`) para permitir adicionar novos critérios de pontuação ou novos tipos de recomendação sem reescrever o que já existe.
- Complexidade O(produtos × critérios selecionados), com verificação de pertencimento em O(1) via `Set` — sem comparações aninhadas entre produtos.

### Integração com a UI (`Form.js` / `App.js` / hooks)

- `Form.js` repassa o resultado de `getRecommendations` para `App.js`, que mantém o estado da lista de recomendações e o repassa para `RecommendationList`.
- `useProducts` passa a expor `isLoading`/`error`, permitindo indicação de carregamento e mensagem amigável caso a busca de dados falhe.
- Envio do formulário é bloqueado enquanto nenhum "Tipo de Recomendação" é selecionado (único campo obrigatório; preferências e funcionalidades continuam opcionais).
- Nova submissão substitui integralmente o resultado anterior.

### Acessibilidade

- Labels associados corretamente aos campos (`htmlFor`/`id` ou wrapping nativo de `<label>`).
- Navegação e operação completas via teclado, com foco visível em todos os campos interativos.
- Estados de carregamento e erro anunciados a leitores de tela (`role="status"` / `role="alert"`, `aria-live="polite"`).

### Layout

O layout original usava Tailwind CSS, mas praticamente sem estilização visível (checkboxes/radios nativos, sem paleta de cores, fonte padrão do sistema). Foram feitos ajustes de forma para não alterar nenhuma regra de negócio:

- Plugin `@tailwindcss/forms` instalado e configurado (as classes `form-checkbox`/`form-radio` já eram referenciadas no código, mas o plugin nunca havia sido instalado).
- Fonte Inter (Google Fonts) e paleta de cores de marca (`brand`) adicionadas ao `tailwind.config.js`.
- Cartões de recomendação, estados de foco, loading (spinner) e erro com estilo consistente.

### Testes

Além dos 4 testes originais de `recommendation.service.test.js` (mantidos sem alteração), foram adicionados testes para: edge cases do serviço de recomendação (sem critérios, sem correspondência, empate), os hooks `useProducts`/`useRecommendations`, e os componentes `Form`, `SubmitButton`, `RecommendationType` e `Checkbox`.

## Estrutura do monorepo

```
.
├── backend/    # json-server + db.json (dados dos produtos)
├── frontend/   # aplicação React.js + Tailwind CSS
├── install.sh  # instala dependências de todos os pacotes
└── lerna.json  # orquestração do monorepo
```

## Possíveis melhorias futuras

- Extrair os textos fixos da UI para um arquivo de i18n.
- Adicionar testes end-to-end (Cypress/Playwright) cobrindo o fluxo completo pelo navegador.
- Persistir a última seleção do usuário (localStorage) entre recarregamentos de página.

---

## Enunciado original do desafio

<details>
<summary>Clique para expandir o enunciado original enviado pela RD Station</summary>

### Objetivo

A equipe de engenharia da RD Station tem alguns princípios nos quais baseia seu trabalho diário. Um deles é: projete seu código para ser mais fácil de entender, não mais fácil de escrever. Portanto, é mais importante um código de fácil leitura do que um que utilize recursos complexos e/ou desnecessários.

### Contexto

Aplicação base já construída com React.js e json-server; o foco do desafio é a implementação da lógica de recomendação e sua integração com a UI existente.

### Requisitos funcionais

- Implementar lógica de recomendação baseada nas preferências do usuário.
- Consumir a API do json-server para os dados de produtos.
- Seguir boas práticas de desenvolvimento.
- Implementar testes unitários.

### Critérios de aceite

1. Receber as preferências e funcionalidades desejadas do usuário através de um formulário.
2. Retornar recomendações de produtos com base nas preferências e funcionalidades selecionadas.
3. Modo **"SingleProduct"**: retornar apenas um produto.
4. Modo **"MultipleProducts"**: retornar uma lista de produtos.
5. Em caso de empate, retornar o **último** produto válido.
6. Lidar com diferentes tipos de preferências e funcionalidades.
7. Serviço modular e facilmente extensível.

</details>

## Autor

Ricardo Sousa
