# Changelog - @projetoacbr/acbrlib-reinf-node

Todas as mudanças notáveis neste pacote são documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

> As entradas refletem o **diff líquido publicado** entre versões — não commits intermediários revertidos ou não publicados.

## [1.0.5] - 2025-08-27

### Novidades

- `ACBrLibReinfMT` alterado de `export class` para `export default class`, permitindo importação padrão (`import ACBrLibReinfMT from '...'`)

### Documentação

- `README.md` adicionado com instalação, arquitetura, funcionalidades e pré-requisitos

### Build

- Dependência `@projetoacbr/acbrlib-base-node` alterada de `^1.0.3` para `latest`

## [1.0.3] - 2025-08-26

### Build

- Apenas bump de versão no `package.json` (sem alterações de código)

## [1.0.2] - 2025-08-26

### Correções

- Prefixos das funções FFI no bridge corrigidos de `REINF_*` para `Reinf_*`, alinhando com os símbolos exportados pela biblioteca nativa ACBrLibReinf
- Dependência circular `@projetoacbr/acbrlib-reinf-node: file:.yalc/...` removida do `package.json`

### Build

- Dependência `@projetoacbr/acbrlib-base-node` atualizada para `^1.0.3`

## [1.0.0] - 2025-08-23

### Novidades

- Lançamento inicial com classe `ACBrLibReinfMT` estendendo `ACBrLibBaseMT`, bridge FFI e métodos para criação, validação, envio e consulta de eventos REINF (`criarEventoReinf`, `enviarReinf`, `consultarReinf`, `consultarReciboReinf`, configuração de contribuinte/transmissor, etc.)
