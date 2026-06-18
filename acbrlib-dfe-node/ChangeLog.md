# Changelog - @projetoacbr/acbrlib-dfe-node

Todas as mudanças notáveis neste pacote são documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

> As entradas refletem o **diff líquido publicado** entre versões — não commits intermediários revertidos ou não publicados.

## [1.0.12] - 2026-06-18

### Documentação

- `ChangeLog.md` adicionado com histórico completo de versões publicadas
- `README.md` atualizado com seção de Changelog e badge de versão `1.0.12`

## [1.0.11] - 2026-04-24

### Correções

- Parâmetro `ufAutor` de `distribuicaoDFePorUltNSU` e `LIB_DistribuicaoDFePorUltNSU` alterado de `string` para `number`, alinhando com a assinatura FFI (`int`) — valor esperado: código numérico da UF autorizadora

## [1.0.10] - 2026-02-15

### Novidades

- Enum `AmbienteEmissaoDFe` adicionado em `dfe-comum/index.ts` com valores `PRODUCAO` (0) e `HOMOLOGACAO` (1), comum a NFe, MDFe e NFSe

## [1.0.9] - 2026-01-05

### Documentação

- JSDoc e reorganização de seções em `ACBrLibDFeMT` (`src/index.ts`) sem alteração de assinaturas públicas

## [1.0.8] - 2025-11-24

### Refatoração

- Método público `enviar()` e método abstrato `LIB_Enviar` removidos de `ACBrLibDFeMT` — o envio passa a ser responsabilidade dos pacotes específicos (`acbrlib-nfe-node`, `acbrlib-mdfe-node`), que possuem assinaturas nativas distintas (NFe com `zipado`, MDFe sem)

## [1.0.7] - 2025-10-28

### Correções

- `salvarEventoPDF()` alterado para retornar `string` (PDF em Base64 via `_processaResult`) em vez de `number` (código de status)
- `LIB_SalvarEventoPDF` atualizado para receber `buffer: Buffer` e `refTamanho: any`, conforme a API nativa

## [1.0.6] - 2025-09-29

### Documentação

- `README.md` expandido com exemplos TypeScript/JavaScript e configuração recomendada

## [1.0.5] - 2025-08-27

### Build

- Dependência `@projetoacbr/acbrlib-base-node` alterada de versão fixa para `latest`

## [1.0.4] - 2025-08-26

### Novidades

- Métodos públicos `cancelar(chave, justificativa, CNPJ, lote): string` e `enviarEmailEvento(...): number` implementados em `ACBrLibDFeMT`
- JSDoc adicionado aos métodos de `ACBrLibDFeComum` (`carregarXML`, `obterXml`, `limparLista`, etc.)

### Documentação

- `README.md` reestruturado com badges, instalação e referência de funcionalidades

### Build

- Licença corrigida de `ISC` para `LGPL-2.1`

## [1.0.2] - 2025-08-23

### Novidades

- Pacote `@projetoacbr/acbrlib-dfe-node` criado com hierarquia `ACBrLibDFeComum` → `ACBrLibDFeMT`

### Refatoração

- Métodos comuns de DFe movidos para `src/dfe-comum/index.ts` (`ACBrLibDFeComum`), compartilhados por NFe, MDFe, NFSe e CTe
- Métodos específicos de distribuição, envio, cancelamento e e-mail definidos como abstratos em `ACBrLibDFeMT`

## [1.0.0] - 2025-07-17

### Novidades

- Estrutura inicial do pacote DFe compartilhado no monorepo ACBrLib-Nodejs
