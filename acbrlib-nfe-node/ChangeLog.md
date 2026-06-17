# Changelog - @projetoacbr/acbrlib-nfe-node

Todas as mudanças notáveis neste pacote são documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

> As entradas refletem o **diff líquido publicado** entre versões — não commits intermediários revertidos ou não publicados.

## [1.0.10] - 2026-04-24

### Novidades

- Adicionado `eslint.config.cjs` com `@typescript-eslint/parser` e `@typescript-eslint/eslint-plugin` para lint de arquivos `.ts`

### Correções

- Parâmetro `ufAutor` de `LIB_DistribuicaoDFePorUltNSU` alterado de `string` para `number`, alinhando com a assinatura FFI do bridge (`int`) e com `ACBrLibDFeMT` — valor esperado: código numérico da UF (ex.: `35` para SP)

## [1.0.9] - 2026-03-05

### Novidades

- Campo `"type": "commonjs"` adicionado ao `package.json`
- Dependência de desenvolvimento `@typescript-eslint/eslint-plugin` adicionada

### Correções

- `LIB_Enviar` corrigido para repassar o parâmetro `handle` recebido à função nativa `NFE_Enviar`, em vez de chamar `this.getHandle()` internamente

## [1.0.8] - 2025-11-24

### Novidades

- Método público `enviar(lote: number, imprimir: boolean, sincrono: boolean, zipado: boolean): string` adicionado, encapsulando `NFE_Enviar` com `ACBrBuffer` e retorno processado como string

## [1.0.7] - 2025-10-28

### Correções

- Assinatura de `LIB_SalvarEventoPDF` atualizada para incluir `buffer: Buffer` e `refTamanho: any`, conforme a API nativa
- Interface `NFE_SalvarEventoPDF` no bridge ajustada de `(handle, eArquivoXmlNFe, eArquivoXmlEvento)` para `(handle, eArquivoXmlNFe, eArquivoXmlEvento, buffer, refTamanho)`
- Retorno de `salvarEventoPDF` na classe base DFe passa a ser `string` (PDF em Base64) em vez de `number`

## [1.0.6] - 2025-09-29

### Documentação

- `README.md` expandido com exemplos separados para TypeScript e JavaScript, `tsconfig.json` recomendado e chamada explícita a `inicializar()`

## [1.0.5] - 2025-08-27

### Build

- Dependência `@projetoacbr/acbrlib-dfe-node` alterada de `^1.0.0` para `latest`

## [1.0.4] - 2025-08-26

### Novidades

- Método público `consultaCadastro(cUF: string, nDocumento: string, nIE: boolean): string` implementado, expondo `NFE_ConsultaCadastro`
- JSDoc adicionado aos métodos `inutilizar`, `imprimirInutilizacao`, `imprimirInutilizacaoPDF` e `salvarInutilizacaoPDF`

### Refatoração

- Implementações duplicadas de `LIB_ConsultaCadastro`, `LIB_ImprimirInutilizacao`, `LIB_SalvarInutilizacaoPDF` e `LIB_ImprimirInutilizacaoPDF` removidas de `ACBrLibNFeMT` — passam a ser herdadas de `ACBrLibDFeMT`

### Documentação

- `README.md` reestruturado com badges, seções de arquitetura, funcionalidades e dependências

### Build

- Dependência `@projetoacbr/acbrlib-dfe-node` fixada em `^1.0.0`
- Licença corrigida de `ISC` para `LGPL-2.1`

## [1.0.2] - 2025-08-23

### Refatoração

- Classe `ACBrLibNFeMT` passa a estender `ACBrLibDFeMT` em vez de `ACBrLibBaseMT`, herdando métodos comuns de DFe
- Diretório legado `src/MT/` removido; bridge e implementação consolidados em `src/bridge/` e `src/index.ts`
- Bridge reestruturado com interface `TypeACBrNFeMT` tipada para IntelliSense
- Pacote renomeado para `@projetoacbr/acbrlib-nfe-node`

### Correções

- Imports e caminhos de módulos ajustados após reorganização da estrutura

### Limpeza

- Arquivos duplicados da implementação antiga em `src/MT/` removidos

## [1.0.0] - 2025-07-17

### Novidades

- Lançamento inicial do pacote com classe `ACBrLibNFeMT`, bridge FFI via `koffi` e bindings para os métodos da ACBrLibNFe
