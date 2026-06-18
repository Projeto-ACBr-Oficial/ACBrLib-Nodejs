# Changelog - @projetoacbr/acbrlib-mdfe-node

Todas as mudanças notáveis neste pacote são documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

> As entradas refletem o **diff líquido publicado** entre versões — não commits intermediários revertidos ou não publicados.

## [1.0.10] - 2026-06-18

### Documentação

- `ChangeLog.md` adicionado com histórico completo de versões publicadas
- `README.md` atualizado com seção de Changelog, badge de versão `1.0.10` e exemplos de inicialização com `path` e `os` para resolução cross-platform da DLL/SO e do arquivo de configuração

## [1.0.9] - 2026-04-24

### Correções

- Parâmetro `ufAutor` de `LIB_DistribuicaoDFePorUltNSU` alterado de `string` para `number`, alinhando com a assinatura FFI do bridge (`int`) e com `ACBrLibDFeMT`

## [1.0.8] - 2025-11-24

### Novidades

- Método público `enviar(lote: number, imprimir: boolean, sincrono: boolean): string` adicionado, encapsulando `MDFE_Enviar` (MDFe não utiliza parâmetro `zipado`, diferente da NFe)

### Correções

- Assinatura de `MDFE_Enviar` no bridge corrigida: removido parâmetro `AZipado` (`bool`) da interface FFI e da chamada `koffi.func`, alinhando com a API nativa do MDFe
- `MDFE_SalvarEventoPDF` no bridge atualizado para receber `buffer: Buffer` e `refTamanho`
- `LIB_SalvarEventoPDF` atualizado para repassar `buffer` e `refTamanho` à função nativa
- Removida implementação obsoleta de `LIB_Enviar` com parâmetro `zipado` (substituída pelo método público `enviar`)

## [1.0.7] - 2025-10-28

### Correções

- Assinatura de `LIB_SalvarEventoPDF` atualizada de `(handle, eArquivoXmlDocumento, eArquivoXmlEvento)` para incluir `buffer: Buffer` e `refTamanho: any`, conforme a API nativa

## [1.0.6] - 2025-09-29

### Documentação

- `README.md` expandido com exemplos TypeScript/JavaScript, `tsconfig.json` recomendado e documentação de `inicializar()`

## [1.0.5] - 2025-08-27

### Build

- Dependência `@projetoacbr/acbrlib-dfe-node` alterada de `^1.0.0` para `latest`

## [1.0.4] - 2025-08-26

### Refatoração

- Implementações completas dos métodos abstratos `LIB_*` adicionadas em `ACBrLibMDFeMT` (inicialização, configuração, manipulação de XML/INI, envio, cancelamento, distribuição DFe, e-mail, impressão, etc.)
- Classe passa a cumprir integralmente o contrato de `ACBrLibDFeMT` para MDFe

### Documentação

- `README.md` reestruturado com badges, instalação, arquitetura e referência de métodos

### Build

- Licença corrigida de `ISC` para `LGPL-2.1`

## [1.0.2] - 2025-08-23

### Refatoração

- Classe `ACBrLibMDFeMT` passa a estender `ACBrLibDFeMT` em vez de implementação monolítica em `src/MT/`
- Bridge `ACBrLibMDFeBridgeMT` com interface `TypeACBrMDFeMT` tipada para IntelliSense
- `tsconfig.json` atualizado para `target: es2022`
- Pacote renomeado para `@projetoacbr/acbrlib-mdfe-node`

### Limpeza

- Diretório legado `src/MT/` e implementação duplicada removidos

### Build

- Dependência `koffi` atualizada de `^2.6.0` para `^2.12.0`

## [1.0.0] - 2025-07-17

### Novidades

- Lançamento inicial com classe `ACBrLibMDFeMT`, bridge FFI e bindings para os métodos da ACBrLibMDFe
