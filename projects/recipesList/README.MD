# Lista de Receitas

🔙 [Voltar ao README principal do Portfólio](../../README.md)

## Descrição

A **Lista de Receitas** é uma aplicação web interativa que permite ao utilizador criar, editar, visualizar e eliminar receitas culinárias.
Todas as receitas são guardadas no LocalStorage, garantindo persistência dos dados mesmo após fechar o navegador.
O utilizador pode adicionar ingredientes dinamicamente, visualizar detalhes completos e exportar todas as receitas em formato JSON.

## Estrutura do Projeto / Organização do Código

O projeto foi estruturado para garantir clareza, modularidade e fácil manutenção.

```text
recipesList/
├── css
│   ├── base.css
│   ├── main.css                # Estilos gerais da aplicação
│   ├── recipes-form.css        # Estilos do formulário de receitas
│   └── recipes-list.css        # Estilos da lista de receitas
├── index.html                  # Estrutura principal da aplicação
├── js
│   └── recipes.js              # Lógica principal (CRUD + UI)
└── README.md                   # Documentação do projeto
```

## Tecnologias Utilizadas

- HTML5  
- CSS3  
- JavaScript (ES6)  
- LocalStorage
- Manipulação dinâmica do DOM
- JSON Handling

## Funcionalidades

- Adicionar receitas com título, instruções e ingredientes dinâmicos
- Editar receitas existentes
- Eliminar receitas
- Visualizar detalhes completos numa janela pop‑up
- Guardar automaticamente no LocalStorage
- Exportar todas as receitas em formato JSON
- Interface dinâmica e intuitiva
- Renderização automática após qualquer alteração

## Conclusão

Este projeto demonstra domínio de CRUD no front‑end, manipulação avançada do DOM, uso prático do LocalStorage e organização de interfaces dinâmicas.
É um excelente exemplo de como criar aplicações web completas sem necessidade de backend, mantendo uma experiência fluida e responsiva para o utilizador.
