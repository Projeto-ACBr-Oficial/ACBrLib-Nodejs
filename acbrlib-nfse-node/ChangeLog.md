# Changelog - @projetoacbr/acbrlib-nfse-node

Todas as mudanças notáveis neste pacote são documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

> As entradas refletem o **diff líquido publicado** entre versões — não commits intermediários revertidos ou não publicados.

## [1.0.11] - 2026-01-06

### Novidades

- Métodos públicos `carregarLoteXML(arquivoXML: string)` e `obterXmlRps(indice: number): string` adicionados
- `LIB_OpenSSLInfo` implementado via `NFSE_OpenSSLInfo` (antes lançava erro informando indisponibilidade)

### Correções

- Assinatura de `emitir` simplificada: removido parâmetro `xml` — de `emitir(xml, aLote, modoEnvio, imprimir)` para `emitir(aLote: string, modoEnvio: NFSeModoEnvio, imprimir: boolean)`, alinhando com `NFSE_Emitir` nativo

## [1.0.10] - 2025-11-24

### Novidades

- Enum `NFSeModoEnvio` exportado com valores `AUTOMATICO` (0), `LOTE_ASSINCRONO` (1), `LOTE_SINCRONO` (2), `UNITARIO` (3) e `TESTE` (4)

### Refatoração

- `emitir`: parâmetro `aLote` alterado de `number` para `string`; adicionado parâmetro `modoEnvio: NFSeModoEnvio`; assinatura de `NFSE_Emitir` no bridge atualizada de `(xml, aLote: int, imprimir)` para `(aLote: string, modoEnvio: int, imprimir)`

## [1.0.9] - 2025-11-19

### Correções

- `cancelarNFSe(xml, protocolo, motivo, aLote)` renomeado e simplificado para `cancelar(infoCancelamentoNFSe: string)`, alinhando com `NFSE_Cancelar` nativo que recebe apenas o XML/INI de cancelamento

## [1.0.8] - 2025-11-17

### Novidades

- Classe de exceção `ACBrLibNFSeError` adicionada em `src/exception/`; `_checkResult` passa a lançar exceções específicas do NFSe

### Refatoração

- Assinaturas do bridge e métodos públicos de consulta, emissão e cancelamento realinhadas com a API nativa da ACBrLibNFSe — parâmetros tipados individualmente em vez de XML genérico único (ex.: `consultarNFSePorRps(numeroRps, serie, tipo, codigoVerificacao)` em vez de `consultarNFSePorRps(xml)`)
- Método público `enviarEvento(infoEvento: string)` restaurado com assinatura correta (`NFSE_EnviarEvento` com parâmetro `infEvento`)

## [1.0.7] - 2025-11-12

### Refatoração

- Método público `enviarEvento(infoEvento)` removido; adicionado `LIB_EnviarEvento` protegido (sem parâmetro `infoEvento` — corrigido na 1.0.8)
- Código não utilizado removido

## [1.0.6] - 2025-09-29

### Documentação

- `README.md` expandido com exemplos TypeScript/JavaScript e configuração recomendada

## [1.0.5] - 2025-08-27

### Build

- Dependência `@projetoacbr/acbrlib-dfe-node` alterada de versão fixa para `latest`

## [1.0.4] - 2025-08-26

### Documentação

- `README.md` reestruturado com badges, instalação e referência de funcionalidades

### Build

- Licença corrigida de `ISC` para `LGPL-2.1`

## [1.0.2] - 2025-08-23

### Novidades

- Métodos de consulta adicionados: `consultarSituacao`, `consultarLoteRPS`, `consultarNFSePorRPS`, `consultarNFSePorFaixa`, `consultarNFSeGenerico`, consultas de serviços prestados/tomados, `consultarDPSPorChave`, `consultarNFSePorChave`, `consultarEvento` e `consultarDFe`

### Refatoração

- Classe `ACBrLibNFSeMT` passa a estender `ACBrLibDFeComum` do pacote `@projetoacbr/acbrlib-dfe-node`
- Imports atualizados para escopo `@projetoacbr`

## [1.0.0] - 2025-08-20

### Novidades

- Lançamento inicial do pacote com classe `ACBrLibNFSeMT`, bridge FFI e métodos básicos de emissão, cancelamento e impressão
