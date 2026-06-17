# Changelog - @projetoacbr/acbrlib-cte-node

Todas as mudanças notáveis neste pacote são documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

> As entradas refletem o **diff líquido publicado** entre versões — não commits intermediários revertidos ou não publicados.

## [1.0.2] - 2026-04-24

### Correções

- Parâmetro `AcUFAutor` de `CTE_DistribuicaoDFePorUltNSU` no bridge alterado de `string` para `number`, alinhando com a assinatura FFI (`int`)

### Build

- Dependência `@projetoacbr/acbrlib-dfe-node` fixada em `^1.0.11` (antes `latest`)

## [1.0.1] - 2026-04-24

### Correções

- Parâmetro `ufAutor` de `LIB_DistribuicaoDFePorUltNSU` em `ACBrLibCTeMT` alterado de `string` para `number`

### Documentação

- `README.md` corrigido: referências a MDFe substituídas por CTe (título, exemplos, nomes de bibliotecas nativas e métodos)

## [1.0.0] - 2026-03-11

### Novidades

- Lançamento experimental do pacote com classe `ACBrLibCTeMT` estendendo `ACBrLibDFeMT`, bridge FFI via `koffi` e bindings para os métodos da ACBrLibCTe (envio, cancelamento, distribuição DFe, inutilização, impressão e e-mail)
