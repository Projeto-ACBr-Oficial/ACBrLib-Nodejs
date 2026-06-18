# Changelog - @projetoacbr/acbrlib-cep-node

Todas as mudanças notáveis neste pacote são documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

> As entradas refletem o **diff líquido publicado** entre versões — não commits intermediários revertidos ou não publicados.


- Script `local-release` adicionado (`npm run build && npx yalc publish`)

## [1.0.6] - 2025-09-25

### Correções

- `buscarPorCep(cep)`: parâmetro `cep` passado diretamente como `string` à função nativa, em vez de `Buffer.from(cep, 'utf8')`
- `buscarPorLogradouro`: assinatura alterada de `(logradouro, numero, complemento, bairro, cidade)` para `(cidade, tipoLogradouro, logradouro, uf, bairro)`, alinhando com `CEP_BuscarPorLogradouro` no bridge

### Documentação

- JSDoc adicionado em `ACBrLibCepMT`, bridge e métodos de busca

## [1.0.5] - 2025-08-27

### Build

- Dependência `@projetoacbr/acbrlib-base-node` alterada de versão fixa para `latest`

## [1.0.4] - 2025-08-26

### Documentação

- `README.md` reestruturado com badges, instalação e exemplos de uso

### Build

- Licença corrigida de `ISC` para `LGPL-2.1`

## [1.0.2] - 2025-08-23

### Refatoração

- Estrutura reorganizada: `src/MT/` removido; código consolidado em `src/bridge/` e `src/index.ts`
- Gerenciamento de buffers migrado de `_createAcbrBuffer()` para `using new ACBrBuffer()` (Explicit Resource Management)
- Pacote renomeado para `@projetoacbr/acbrlib-cep-node`
- Imports atualizados de `acbrlib-base-node` para `@projetoacbr/acbrlib-base-node`

### Build

- Dependência `@projetoacbr/acbrlib-base-node` adicionada

## [1.0.0] - 2025-07-17

### Novidades

- Lançamento inicial com classe `ACBrLibCepMT`, bridge FFI e métodos `buscarPorCep` e `buscarPorLogradouro`
